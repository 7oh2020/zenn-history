/// 送信メッセージ
export type SendMessage = {
  action: string;
};

/// 送信メッセージ（値付き）
export type SendMessageWithValue<T> = {
  action: string;
  value: T;
};
