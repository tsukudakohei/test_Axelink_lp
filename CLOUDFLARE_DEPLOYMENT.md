# Cloudflare Pagesデプロイ手順

## 📋 事前準備

GitHubへのプッシュは完了しました。次の手順でCloudflare Pagesを設定してください。

## 🚀 Cloudflare Pagesの設定

### 1. Cloudflare Dashboardにアクセス

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)にログイン
2. 左メニューから「Pages」を選択
3. 既存のプロジェクトを選択

### 2. 環境変数の設定

プロジェクトの設定ページで、以下の環境変数を追加してください：

#### 本番環境（Production）

**Settings** → **Environment variables** → **Production**

必須の環境変数：

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_production_site_key
TURNSTILE_SECRET_KEY=your_production_secret_key
GAS_WEB_APP_URL=https://script.google.com/macros/s/AKfycby9bsHJsQFnneVWTMXtPfE5oyIkpnXWwC2QYXSBVordWYEEZYmvGKTVfU4-kwzZhYyw/exec
```

#### プレビュー環境（Preview）（オプション）

**Settings** → **Environment variables** → **Preview**

テスト用の環境変数：

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
GAS_WEB_APP_URL=https://script.google.com/macros/s/AKfycby9bsHJsQFnneVWTMXtPfE5oyIkpnXWwC2QYXSBVordWYEEZYmvGKTVfU4-kwzZhYyw/exec
```

### 3. Cloudflare Turnstileの取得

#### 本番用のキーを取得する手順

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)にログイン
2. 左メニューから「Turnstile」を選択
3. 「サイトを追加」をクリック
4. サイト情報を入力：
   - **サイト名**: Axelink Seminar Form
   - **ドメイン**: あなたのCloudflare Pagesのドメインまたはカスタムドメイン
   - **ウィジェットモード**: Managed（推奨）
5. 「作成」をクリック
6. 表示される **Site Key** と **Secret Key** をコピー
7. Cloudflare Pagesの環境変数に設定

### 4. ビルド設定の確認

**Settings** → **Builds & deployments**

以下の設定になっていることを確認：

```
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: /
Node version: 18 以上
```

### 5. 再デプロイのトリガー

環境変数を設定したら、再デプロイが必要です：

1. **Deployments** タブに移動
2. 最新のデプロイメントの右側にある「...」メニューをクリック
3. 「Retry deployment」を選択

または、新しいコミットをプッシュすると自動的に再デプロイされます。

## ✅ デプロイ完了後の確認

### 動作確認

1. セミナーページにアクセス：
   ```
   https://your-site.pages.dev/seminar/20260224
   ```

2. 以下の機能を確認：
   - ✅ ページが正常に表示される
   - ✅ Turnstileキャプチャが表示される
   - ✅ イチサンフォーム（会社名自動補完）が動作する
   - ✅ フォーム送信が成功する
   - ✅ レスポンシブデザインが正しく動作する

### APIエンドポイントの確認

```bash
# セミナー設定API
curl https://your-site.pages.dev/api/seminar/config/20260224

# 期待されるレスポンス
{
  "success": true,
  "data": {
    "seminar_name": "...",
    ...
  }
}
```

## 🔧 トラブルシューティング

### Turnstileが表示されない

- 環境変数が正しく設定されているか確認
- Site Keyが `NEXT_PUBLIC_` プレフィックス付きか確認
- ドメインがTurnstileの許可リストに含まれているか確認

### フォーム送信が失敗する

- ブラウザのコンソールでエラーを確認
- Cloudflare Pagesの「Functions」ログを確認
- GAS URLが正しく設定されているか確認

### ビルドエラー

- Node.jsのバージョンが18以上か確認
- `package.json`の依存関係が正しくインストールされているか確認
- ビルドログで具体的なエラーメッセージを確認

## 📊 監視とログ

### Cloudflare Pagesのログ確認

1. プロジェクトダッシュボードの「Functions」タブ
2. リアルタイムログでAPI呼び出しを監視
3. エラーが発生した場合は詳細を確認

### Google Apps Scriptのログ確認

1. [Google Apps Script](https://script.google.com/)にアクセス
2. 該当のプロジェクトを開く
3. 「実行数」タブでリクエストを確認

## 🔐 セキュリティチェックリスト

- ✅ 環境変数がGitにコミットされていない（`.env.local`は`.gitignore`に含まれる）
- ✅ TurnstileのSecret Keyが本番環境の環境変数に設定されている
- ✅ GAS URLが環境変数に設定されている（フロントエンドに公開されていない）
- ✅ HTTPSでアクセスできる
- ✅ CSPヘッダーが適切に設定されている（Cloudflareが自動で設定）

## 📈 次のステップ

1. **カスタムドメインの設定**（オプション）
   - Settings → Custom domains でカスタムドメインを追加

2. **分析の設定**
   - Cloudflare Web Analyticsを有効化

3. **パフォーマンス最適化**
   - Cloudflare Cacheの設定を確認
   - 画像の最適化を検討

## 📞 サポート

問題が発生した場合：
1. ビルドログを確認
2. Functionsログを確認
3. ブラウザのコンソールを確認
4. このドキュメントのトラブルシューティングセクションを参照

---

デプロイが完了しました！🎉
