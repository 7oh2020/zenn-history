import { useCallback, useEffect, useState } from "react";
import { messageActions } from "../../CommonValue";
import { HistoryItem } from "../types/BucketData";
import { SendMessage } from "../types/Message";

/// 履歴データのstateを管理するカスタムフック
export const useHistoryData = (keyword: string) => {
  const [histories, setHistories] = useState<HistoryItem[]>([]);

  // ストレージから履歴データを取得してstateにセットする
  useEffect(() => {
    const loadData = async () => {
      const res = await chrome.runtime.sendMessage<SendMessage, HistoryItem[]>({
        action: messageActions.getHistories,
      });
      const items = res.filter((i) =>
        i.title.toLowerCase().includes(keyword.toLowerCase()),
      );
      setHistories(items);
    };
    loadData();
  }, [keyword]);

  // 全削除ボタンを押下した時のイベント
  const handleClearHistories = useCallback(() => {
    setHistories([]);
    chrome.runtime.sendMessage<SendMessage>({
      action: messageActions.clearHistories,
    });
  }, []);

  return { histories, handleClearHistories };
};
