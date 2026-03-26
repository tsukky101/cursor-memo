# cursor-memo

ブラウザだけで動くシンプルなメモアプリです。メモは **localStorage** に保存され、サーバーは不要です。

**公開サイト（GitHub Pages）:** [https://tsukky101.github.io/cursor-memo/](https://tsukky101.github.io/cursor-memo/)

## 使い方

- **新しいメモ**でメモを追加
- **タイトル**（任意）と**本文**を編集（入力と同時に保存）
- **検索**でタイトル・本文を絞り込み
- **削除**でメモを消去（削除後は隣のメモが選ばれます）

## 必要な環境

- [Node.js](https://nodejs.org/)（LTS 推奨）

## セットアップと起動

```powershell
cd cursor-memo
npm install
npm run dev
```

ブラウザで表示される URL（通常は `http://localhost:5173`）を開いてください。

## その他のコマンド

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番用ビルド（`dist/` に出力） |
| `npm run preview` | ビルド結果のプレビュー |

## GitHub Pages での公開

`main` へ push すると [GitHub Actions](https://github.com/tsukky101/cursor-memo/actions) がビルドしてデプロイします。

初回だけリポジトリの **Settings → Pages → Build and deployment** で **Source** を **GitHub Actions** にしてください（「Deploy from a branch」ではなく Actions 用の設定です）。

反映まで 1〜2 分かることがあります。URL は上記の `/cursor-memo/` です（リポジトリ名と一致）。

## 技術スタック

- [Vite](https://vitejs.dev/) 6
- [React](https://react.dev/) 19
- TypeScript

## データについて

- 保存キー: `memo-app:v1`
- ブラウザや端末を変えると共有されません。バックアップが必要な場合はエクスポート機能の追加などを検討してください。

## ライセンス

このリポジトリのライセンスは未設定です。必要に応じて `LICENSE` を追加してください。
