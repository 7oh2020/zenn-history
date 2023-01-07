/// グローバル定数
export const commonValue = {
  /// アプリ名
  appName: "Zenn History",

  /// アプリの説明
  appDescription: "Zennの履歴データを記録・検索できる非公式のChrome拡張",

  /// アプリのGithubリポジトリ
  appGithubUrl: "https://github.com/7oh2020/zenn-history",

  /// 履歴データの最大保存件数
  maxHistories: 100,

  /// ドキュメントが読み込まれるまでの待機時間（ミリ秒）
  documentLoadDelay: 500,
} as const satisfies { [key: string]: unknown };

/// 監視対象のURL
export const targetUrls = {
  /// トップページURL
  base: "https://zenn.dev",
} as const satisfies { [key: string]: string };

/// メッセージングによる操作の種類
export const messageActions = {
  /// ストレージから履歴データを取得する
  getHistories: "getHistories",

  /// ストレージから履歴データを全て削除する
  clearHistories: "clearHistories",

  /// ページからドキュメント情報を取得する
  getDocument: "getDocument",
} as const satisfies { [key: string]: string };
