import { commonValue, messageActions } from "../CommonValue";
import { DocumentData } from "../popup/types/DocumentData"; /// documentの読み込みを待機する時間(ミリ秒)/// documentの読み込みを待機する時間(ミリ秒)/// documentの読み込みを待機する時間(ミリ秒)/// 読み込み待機時間(ミリ秒)/// ドキュメントが更新されるまでの待機時間(ミリ秒)

/// 受信メッセージを監視するイベント
chrome.runtime.onMessage.addListener((request, sender, respond) => {
  switch (request.action) {
    // ページからドキュメント情報を取得する
    case messageActions.getDocument: {
      getDocument().then((doc) => {
        respond(doc);
      });
      break;
    }
    default: {
      throw new Error(`no action: ${request.action}`);
    }
  }
  return true;
});

/// ページからドキュメント情報を取得する
const getDocument = async (): Promise<DocumentData> => {
  // タイトルが変更されるまで待機する
  await new Promise((resolve) =>
    setTimeout(resolve, commonValue.documentLoadDelay),
  );

  // ここでページに対してquerySelectorやcreateElementによるDOM操作ができる

  return {
    title: document.title,
  };
};
