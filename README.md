# rectime-admin

管理画面です。

## ログイン導線

1. Firebase Authentication で Microsoft OAuth
2. `rectime-entry-api /v1/resolve` で接続先イベント API を解決
3. `rectime-api /v1/auth/login` に `entry token` を渡してログイン
4. セッションを `sessionStorage` に保存して `/dashboard` へ遷移

## 必要な環境変数

`.env.example` を参照してください。

## 起動

```bash
npm install
npm run typecheck
npm run dev
```
