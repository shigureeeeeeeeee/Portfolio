# Shigure — Software Engineer Portfolio

[公開サイトを見る](https://aboutme-shigure.vercel.app) · [View live site](https://aboutme-shigure.vercel.app)

Web、AI、Windowsネイティブ開発に取り組むShigureのポートフォリオです。採用担当者や開発者が、制作物の目的・担当範囲・技術的な工夫を短時間で確認できるように設計しています。

Shigure's software engineering portfolio, designed to show the context, responsibilities, and engineering decisions behind selected work across Web, AI, and native development.

## 掲載プロジェクト | Selected work

- **AIプログラミング学習支援システム** — Vue 3、FastAPI、Gemini、Ollamaを用いた卒業研究
- **Abyss World** — Java 17とMinecraft Forgeによる大規模コンテンツMod
- **Audio Switcher** — Core Audio APIを直接利用するC++17製Windows常駐アプリ

作品一覧は `src/data/projects.ts` を唯一の情報源としています。環境変数や外部APIの有無にかかわらず、ローカル、Preview、本番ですべて同じ内容を表示します。

Project content is curated in `src/data/projects.ts` as the single source of truth, so local, preview, and production builds always render the same work.

## 主な機能 | Highlights

- 日本語・英語切り替えと選択内容の保存
- レスポンシブな1ページ構成とスクロールナビゲーション
- `prefers-reduced-motion`に対応したアニメーション
- セマンティックHTML、キーボードフォーカス、スキップリンク
- OGP画像、構造化データ、sitemap、robots設定
- App Routerによる静的生成

## 技術スタック | Stack

- Next.js 16 / React 19 / TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React / React Icons

## ローカル実行 | Local development

```bash
git clone https://github.com/shigureeeeeeeeee/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 品質チェック | Quality checks

```bash
npm run check
npm run build
```

| Command | Purpose |
| --- | --- |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type checking |
| `npm run check` | Lint + type checking |
| `npm run build` | Production build |

## コンテンツの更新 | Updating content

- `src/data/projects.ts` — project case studies
- `src/data/skills.ts` — skills and project evidence
- `src/data/translations.ts` — Japanese and English copy

## Contact

- Email: [shigure.tk1090@gmail.com](mailto:shigure.tk1090@gmail.com)
- GitHub: [shigureeeeeeeeee](https://github.com/shigureeeeeeeeee)
