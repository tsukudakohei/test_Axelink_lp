This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Cloudflare Workers/Pages へのデプロイ

このプロジェクトは Cloudflare Workers（Pages）にデプロイするように設定されています。

### デプロイ方法

1. **Cloudflare アカウントのセットアップ**

   - [Cloudflare Dashboard](https://dash.cloudflare.com/)にログイン
   - Wrangler CLI を認証: `npx wrangler login`

2. **ビルドとデプロイ**

   ```bash
   # ビルドとデプロイを一度に実行
   npm run pages:deploy
   ```

   または、個別に実行:

   ```bash
   # ビルドのみ
   npm run pages:build

   # デプロイのみ（ビルド後）
   wrangler pages deploy .vercel/output/static
   ```

3. **GitHub 連携（推奨）**
   - [Cloudflare Dashboard](https://dash.cloudflare.com/)で「Workers & Pages」→「Create application」→「Pages」を選択
   - 「Connect to Git」を選択して GitHub リポジトリを接続
   - ビルド設定:
     - **フレームワーク**: Next.js
     - **ビルドコマンド**: `npm run pages:build`
     - **出力ディレクトリ**: `.vercel/output/static`
     - **ルートディレクトリ**: `/` (プロジェクトルート)

### 重要な設定

**`nodejs_compat`互換性フラグ**

- `@cloudflare/next-on-pages`を使用する場合、`nodejs_compat`フラグが必要です
- `wrangler.toml`に`compatibility_flags = ["nodejs_compat"]`が設定されています
- GitHub 連携を使用する場合、Cloudflare Dashboard でも設定が必要です：
  1. プロジェクトの「設定」→「Functions」→「互換性フラグ」
  2. `nodejs_compat`を追加（本番環境とプレビュー環境の両方）

### 注意事項

- `@cloudflare/next-on-pages`を使用して Next.js アプリを Cloudflare Workers/Pages に最適化しています
- 静的エクスポート（`output: "export"`）は削除されています
- Cloudflare Pages は実際には Cloudflare Workers 上で動作します

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
