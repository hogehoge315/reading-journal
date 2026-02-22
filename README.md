# Reading Journal

読書の備忘を記録するWebアプリ。本ごと・章ごとにマークダウンでメモを管理できます。

## 機能

- 📚 本の登録・削除
- 📑 章の追加・削除
- ✏️ マークダウンエディタ（プレビュー付き）
- ✅ 読了マーク & 進捗バー
- 💾 ブラウザのlocalStorageに自動保存

## 技術スタック

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [marked](https://marked.js.org/) + [DOMPurify](https://github.com/cure53/DOMPurify)（マークダウン描画）

## ローカル開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## 公開URL

GitHub Pagesで公開: `https://hogehoge315.github.io/reading-journal/`
