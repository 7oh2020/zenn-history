import { getBucket } from "@extend-chrome/storage";
import { commonValue, messageActions, targetUrls } from "../CommonValue";
import { HistoryBucket, HistoryItem } from "../popup/types/BucketData";
import { DocumentData } from "../popup/types/DocumentData";
import { SendMessage } from "../popup/types/Message";

/// 履歴のストレージ領域を取得する
const historyBucket = getBucket<HistoryBucket>("history");

/// インストール時のイベント
chrome.runtime.onInstalled.addListener(() => {
  // ストレージに初期値をセットする
  initHistories();
});

/// タブのページ遷移を監視するイベント
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // ページの読み込みが未完了の場合はスルー
  if (changeInfo.status !== "complete") {
    return;
  }

  // 現在アクティブなタブを取得する
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!(tabs[0]?.id && tabs[0].url)) {
      return;
    }

    // URLが監視対象ドメインではない場合はスルー
    if (!tabs[0].url.startsWith(targetUrls.base)) {
      return;
    }

    /// URLが監視対象ページかどうかチェックする
    const { isMatched, type } = checkTargetUrl(tabs[0].url);
    if (!(isMatched && type)) {
      return;
    }

    // 履歴データをストレージに保存する
    saveHistory(tabs[0].id, tabs[0].url, type);
  });
});

/// 受信メッセージを監視するイベント
chrome.runtime.onMessage.addListener((request, sender, respond) => {
  switch (request.action) {
    // ストレージから履歴データを取得する
    case messageActions.getHistories: {
      historyBucket
        .get("items")
        .then((res) => respond(res.items))
        .catch((e) => console.error(e));
      break;
    }
    // ストレージから履歴データを全て削除する
    case messageActions.clearHistories: {
      initHistories();
      break;
    }
    default: {
      throw new Error(`no action: ${request.action}`);
    }
  }
  return true;
});

/// URLが監視対象ページかどうかチェックする
export const checkTargetUrl = (
  tabUrl: string,
): { isMatched: boolean; type?: string } => {
  const url = tabUrl.replace(targetUrls.base, "");
  const matched = url.match(
    /^\/[0-9a-z_-]+\/(articles|books|scraps)\/[0-9a-z_-]+$/i,
  );
  if (matched == null) {
    return { isMatched: false };
  }

  return { isMatched: true, type: matched[1] };
};

/// ストレージに履歴データの初期値をセットする
export const initHistories = async () => {
  await historyBucket.set({ items: [] });
};

// 履歴データをストレージに保存する
export const saveHistory = async (
  tabId: number,
  tabUrl: string,
  type: string,
) => {
  try {
    // 指定したタブのcontentScriptからページタイトルなどのドキュメント情報を取得する
    const doc = await chrome.tabs.sendMessage<SendMessage, DocumentData>(
      tabId,
      { action: messageActions.getDocument },
    );

    // 新しい履歴データを先頭に追加してストレージへ保存する
    historyBucket.set(({ items }) => {
      const newItem: HistoryItem = {
        title: doc.title,
        url: tabUrl,
        createdAt: new Date().toLocaleString(),
        type,
      };

      // 重複または最大件数を超過した履歴データを除外する
      const filterdItems = items
        .filter((item) => item.url !== tabUrl)
        .slice(0, commonValue.maxHistories - 1);

      return {
        items: [newItem, ...filterdItems],
      };
    });
  } catch (e) {
    console.error(e);
  }
};
