# ポートフォリオウェブサイト | Portfolio Website

## 概要 | Overview

### 日本語

私の個人ポートフォリオサイトのソースコードです。ダーク基調のテック系デザインで、スキル・プロジェクト・経歴を日英2言語で紹介しています。

### English

Source code for my personal portfolio website. A dark, tech-inspired design showcasing my skills, projects, and background in both Japanese and English.

## 特徴 | Features

- **ダークテーマ**: zinc ベースの配色にシアンのアクセントを効かせたデザイン | Dark zinc-based theme with cyan accents
- **多言語対応**: 日英切り替え（選択は localStorage に保存） | JA/EN switching persisted to localStorage
- **1ページ構成**: スクロールスパイ付き固定ヘッダーでセクションを移動 | Single-page layout with a scroll-spy header
- **アニメーション**: Framer Motion によるフェードイン・スキルバー演出 | Framer Motion driven reveal animations
- **Vercelデプロイ**: `main` ブランチへの push で自動デプロイ | Automatically deployed to Vercel from the `main` branch
- **GitHub連携**: プロフィールにピン留めした作品をISRで自動反映 | Pinned GitHub repositories automatically refreshed with ISR

## 技術スタック | Tech Stack

- Next.js 16 (App Router, ISR)
- React 19
- TypeScript
- Tailwind CSS v4 (CSS-first configuration)
- Framer Motion
- lucide-react / react-icons

## インストールと実行 | Installation and Running

```bash
git clone https://github.com/shigureeeeeeeeee/Portfolio.git
cd Portfolio
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。 | Open [http://localhost:3000](http://localhost:3000) in your browser.

### その他のコマンド | Other Commands

| コマンド | 内容 |
| --- | --- |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番ビルドのローカル確認 |
| `npm run lint` | ESLint の実行 |

## デプロイ | Deployment

VercelでこのGitHubリポジトリをImportすると、`main` ブランチへのpushをトリガーに自動デプロイされます。Framework Presetには`Next.js`を使用し、Build CommandとOutput DirectoryはVercelの初期値から変更しません。

Import this GitHub repository into Vercel to deploy automatically whenever changes are pushed to `main`. Use the `Next.js` framework preset and keep the default build and output settings.

GitHubプロフィールのピン留め作品はISRにより1時間ごとに再検証されるため、再デプロイなしで更新されます。期限切れ後の最初のアクセスではキャッシュ済みページを表示しながらバックグラウンドで更新し、それ以降のアクセスに最新内容を反映します。`Portfolio` リポジトリは作品一覧から自動的に除外されます。

### GitHub APIの設定

ピン留め作品を取得するには、GitHubプロフィールと公開リポジトリを読み取れる最小権限のPersonal Access Tokenを、Vercelプロジェクトの `Settings` → `Environment Variables` に `GITHUB_PROFILE_TOKEN` という名前で登録してください。Production・Preview・Developmentのうち必要な環境を選び、設定後に再デプロイします。

ユーザー名を変更する場合は、同じ画面で `GITHUB_USERNAME` も設定してください。未設定時は `shigureeeeeeeeee` を使用します。トークンが未設定、またはAPI取得に失敗した場合は、`src/data/projects.ts` の静的データ（`Portfolio` を除く）を表示します。ローカル開発では `.env.example` を `.env.local` にコピーして値を設定できます。

## プロジェクト構造 | Project Structure

```
Portfolio/
├── public/            # 静的ファイル（画像など）
├── src/
│   ├── app/           # App Router（layout / page / globals.css）
│   ├── sections/      # Hero, About, Skills, Projects, Contact
│   ├── components/    # Header, LanguageToggle などの UI
│   ├── contexts/      # LanguageContext（言語切り替え）
│   ├── data/          # translations / skills / projects
│   ├── lib/           # GitHub API 連携
│   └── styles/        # 共通レイアウト定数
└── eslint.config.mjs  # ESLint 設定
```

## カスタマイズ | Customization

コンテンツは `src/data` 内のファイルで管理しています。 | Content is managed in `src/data`.

- `projects.ts`: プロジェクト情報 | Project information
- `skills.ts`: スキル情報 | Skill information
- `translations.ts`: 日英翻訳データ | JA/EN translation data

## 連絡先 | Contact

- GitHub: [shigureeeeeeeeee](https://github.com/shigureeeeeeeeee)
