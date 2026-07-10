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
- **静的エクスポート**: GitHub Pages へ自動デプロイ | Static export deployed to GitHub Pages

## 技術スタック | Tech Stack

- Next.js 16 (App Router, static export)
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
| `npm run build` | 本番ビルド（`out/` に静的エクスポート） |
| `npm run start` | 本番ビルドのローカル確認 |
| `npm run lint` | ESLint の実行 |

## デプロイ | Deployment

`main` ブランチへの push をトリガーに、GitHub Actions（[.github/workflows/nextjs.yml](.github/workflows/nextjs.yml)）が `next build` で `out/` を生成し GitHub Pages へデプロイします。

Pushing to `main` triggers GitHub Actions to build the static export and deploy it to GitHub Pages.

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
│   ├── styles/        # 共通レイアウト定数
│   └── utils/         # ユーティリティ関数
├── next.config.mjs    # Next.js 設定（output: 'export'）
└── eslint.config.mjs  # ESLint 設定
```

## カスタマイズ | Customization

コンテンツは `src/data` 内のファイルで管理しています。 | Content is managed in `src/data`.

- `projects.ts`: プロジェクト情報 | Project information
- `skills.ts`: スキル情報 | Skill information
- `translations.ts`: 日英翻訳データ | JA/EN translation data

## 連絡先 | Contact

- GitHub: [shigureeeeeeeeee](https://github.com/shigureeeeeeeeee)
