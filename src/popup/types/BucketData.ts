/// 履歴データのストレージ領域
export type HistoryBucket = {
  items: HistoryItem[];
};

/// 履歴データ
export type HistoryItem = {
  type: string;
  title: string;
  url: string;
  createdAt: string;
};
