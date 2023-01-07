# Zenn History

これは Zenn の閲覧履歴を記録・検索する非公式の Chrome 拡張です。
Chrome や Chrome 互換ブラウザで動作します。

## 機能

- Zenn の記事・本・スクラップの閲覧履歴が自動的にローカルストレージに保存されます。
- Ctrl(Command)+ Shift + X キーを押下すると履歴リストがポップアップします。履歴データのフィルタリングや全削除が行なえます。
- 履歴リストの各記事タイトルを押下すると元のページが開きます。

## 技術スタック

- React + TypeScript
- [CRXJS Vite Plugin](https://crxjs.dev/vite-plugin)
- [Mantine](https://mantine.dev/): UI Library
- [Rome](https://rome.tools/): Linter & Formatter

## インストール

以下のコマンドを実行すると dist ディレクトリが生成されます。

```bash
npm install
npm run build
```

続いて Chrome ブラウザを使用して「chrome://extensions/」にアクセスします:

1. 「デベロッパーモード」を有効にします。
2. 「パッケージ化されていない拡張機能を読み込む」ボタンを押下します。
3. 選択ダイアログが開くので先程の dist ディレクトリを指定します。
