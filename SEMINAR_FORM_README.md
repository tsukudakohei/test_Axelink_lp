# セミナー申込フォーム実装ドキュメント

## 概要

セミナー申込フォームをセキュアなバックエンド経由で実装しました。

### アーキテクチャ

```
ブラウザ → Next.js API (バックエンド) → Google Apps Script → スプレッドシート
         ↓
    Cloudflare Turnstile検証
```

## 特徴

- ✅ **セキュア**: GAS URLをフロントエンドに公開しない
- ✅ **ボット対策**: Cloudflare Turnstileによるキャプチャ検証
- ✅ **適切なエラーハンドリング**: no-corsを使用せず、正しくレスポンスを返す
- ✅ **イチサンフォーム連携**: 会社名の自動補完機能
- ✅ **レスポンシブデザイン**: デスクトップ/モバイル対応

## セットアップ

### 1. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```bash
# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here

# Google Apps Script
GAS_WEB_APP_URL=https://script.google.com/macros/s/.../exec
```

#### Cloudflare Turnstileの取得方法

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)にログイン
2. 「Turnstile」セクションに移動
3. 「サイトを追加」をクリック
4. サイト名とドメインを入力
5. Site KeyとSecret Keyをコピーして`.env.local`に設定

**開発環境用のテストキー**（本番では必ず変更してください）:
- Site Key: `1x00000000000000000000AA`
- Secret Key: `1x0000000000000000000000000000000AA`

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

アクセス: http://localhost:3002/seminar/20260224

## ファイル構成

```
app/
├── api/
│   └── seminar/
│       └── submit/
│           └── route.ts          # バックエンドAPI
├── seminar/
│   └── 20260224/
│       ├── layout.tsx            # セミナー専用レイアウト
│       ├── page.tsx              # フォームページ
│       ├── seminar.css           # スタイル
│       └── hide-lp-layout.css    # LPヘッダー非表示用
public/
├── AIセミナー_20260224.png        # セミナー画像
├── bizlink_group.png             # ロゴ
└── seminar-apple-touch-icon.png  # ファビコン
.env.local                         # 環境変数
.env.example                       # 環境変数のサンプル
```

## API仕様

### POST /api/seminar/submit

セミナー申込フォームの送信を処理します。

#### リクエスト

```json
{
  "turnstileToken": "string (required)",
  "seminar_name": "string",
  "event_date": "string",
  "company_name": "string (required)",
  "position": "string (required)",
  "last_name": "string (required)",
  "first_name": "string (required)",
  "email": "string (required)",
  "phone": "string (required)",
  ...
}
```

#### レスポンス

**成功時 (200)**:
```json
{
  "success": true,
  "message": "セミナーのお申し込みを受け付けました"
}
```

**エラー時 (400/500)**:
```json
{
  "success": false,
  "message": "エラーメッセージ"
}
```

## セキュリティ

1. **Turnstile検証**: すべてのフォーム送信でキャプチャを検証
2. **バリデーション**: サーバーサイドで必須項目をチェック
3. **環境変数**: シークレットキーとGAS URLは環境変数で管理
4. **HTTPS**: 本番環境ではHTTPSを使用

## デプロイ

### Vercelへのデプロイ

1. Vercelにプロジェクトをインポート
2. 環境変数を設定:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - `TURNSTILE_SECRET_KEY`
   - `GAS_WEB_APP_URL`
3. デプロイ

### Cloudflare Pagesへのデプロイ

1. Cloudflare Pagesにプロジェクトをインポート
2. ビルドコマンド: `npm run build`
3. 出力ディレクトリ: `.next`
4. 環境変数を設定

## トラブルシューティング

### Turnstileが表示されない

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`が正しく設定されているか確認
- ブラウザのコンソールでエラーを確認

### フォーム送信が失敗する

- ネットワークタブでAPIレスポンスを確認
- サーバーログでエラー内容を確認
- Turnstileトークンが正しく取得されているか確認

### GASへの送信が失敗する

- `GAS_WEB_APP_URL`が正しく設定されているか確認
- GASのデプロイ設定で「全員」にアクセス権限が付与されているか確認

## 今後の改善案

- [ ] フォーム入力のクライアントサイドバリデーション強化
- [ ] 送信完了後のアナリティクスイベント送信
- [ ] メール確認機能の追加
- [ ] A/Bテスト対応
- [ ] 多言語対応

## サポート

質問や問題がある場合は、開発チームにお問い合わせください。
