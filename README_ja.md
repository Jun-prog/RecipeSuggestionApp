# RecipeSuggestionApp

このアプリは、食品の写真から材料を読み取り、今日の夕食のレシピを提案します。フリックジェスチャーでレシピを選択できます。

## ディレクトリ構造

- **app/**: アプリケーションの主要なページとレイアウト
  - `globals.css`: グローバルスタイル
  - `layout.tsx`: レイアウトコンポーネント
  - `page.tsx`: メインページコンポーネント
  - **api/**: API関連のファイル
  - **components/**: ページ固有のコンポーネント
  - **data/**: データ関連のファイル
- **components/**: 再利用可能なコンポーネント
  - `theme-provider.tsx`: テーマプロバイダーコンポーネント
  - **ui/**: UIコンポーネント
- **hooks/**: カスタムフック
  - `use-mobile.tsx`: モバイルデバイス用のカスタムフック
  - `use-toast.ts`: トースト通知用のカスタムフック
- **lib/**: ユーティリティ関数
  - `utils.ts`: ユーティリティ関数
- **public/**: 公開リソース
  - `placeholder-logo.png`: プレースホルダーロゴ
- **styles/**: スタイルシート

## 使用技術

- **Next.js**: Reactフレームワーク
- **Tailwind CSS**: ユーティリティファーストのCSSフレームワーク
- **TypeScript**: 型安全なJavaScript

## セットアップ

プロジェクトをクローンし、依存関係をインストールします。

```sh
git clone <repository-url>
cd RecipeSuggestionApp
pnpm install
```

## 開発サーバーの起動

開発サーバーを起動するには、以下のコマンドを実行します。

```sh
pnpm dev
```

ブラウザで `http://localhost:3000` にアクセスしてアプリを確認できます。

## ビルド

プロジェクトをビルドするには、以下のコマンドを実行します。

```sh
pnpm build
```

## ライセンス

このプロジェクトは [MIT License](./LICENSE) のもとでライセンスされています。