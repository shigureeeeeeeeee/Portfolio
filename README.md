# ポートフォリオウェブサイト | Portfolio Website

## 📝 概要 | Overview

### 🇯🇵 日本語

このリポジトリには、私の個人ポートフォリオウェブサイトのソースコードが含まれています。モダンな技術スタックを活用し、視覚的に魅力的でインタラクティブな体験を提供することを目指しています。サイトには私のスキル、プロジェクト、および経歴が詳細に紹介されています。

### 🇬🇧 English

This repository contains the source code for my personal portfolio website. Built with a modern tech stack, it aims to provide a visually appealing and interactive experience. The site showcases my skills, projects, and background in detail.

## ✨ 特徴 | Features

### 🇯🇵 日本語

- **レスポンシブデザイン**: すべてのデバイスで最適な表示を実現
- **インタラクティブなUI**: Framer Motionを使用した洗練されたアニメーション
- **ダイナミックな背景効果**: 視覚的な魅力を高める背景アニメーション
- **多言語対応**: 日本語と英語のコンテンツ切り替え機能
- **プロジェクトショーケース**: 3Dカードエフェクトを用いたプロジェクト紹介
- **スキル可視化**: インタラクティブなスキルレベル表示
- **パフォーマンス最適化**: 画像の最適化とコード分割による高速読み込み

### 🇬🇧 English

- **Responsive Design**: Optimal viewing on all devices
- **Interactive UI**: Refined animations using Framer Motion
- **Dynamic Background Effects**: Animated backgrounds that enhance visual appeal
- **Multilingual Support**: Content switching between Japanese and English
- **Project Showcase**: Project presentations with 3D card effects
- **Skills Visualization**: Interactive skill level displays
- **Performance Optimization**: Fast loading through image optimization and code splitting

## 🛠 技術スタック | Tech Stack

### 🇯🇵 日本語

- **フロントエンド**:
  - Next.js (React)
  - TypeScript
  - Tailwind CSS
  - Framer Motion

- **デプロイ**:
  - Vercel

### 🇬🇧 English

- **Frontend**:
  - Next.js (React)
  - TypeScript
  - Tailwind CSS
  - Framer Motion

- **Deployment**:
  - Vercel

## 🚀 インストールと実行 | Installation and Running

### 🇯🇵 日本語

1. リポジトリをクローンします:
```bash
git clone https://github.com/shigureeeeeeeeee/Portfolio.git
```

2. プロジェクトディレクトリに移動します:
```bash
cd Portfolio
```

3. 依存関係をインストールします:
```bash
npm install
```

4. 開発サーバーを起動します:
```bash
npm run dev
```

5. ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### 🇬🇧 English

1. Clone the repository:
```bash
git clone https://github.com/shigureeeeeeeeee/Portfolio.git
```

2. Navigate to the project directory:
```bash
cd Portfolio
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 プロジェクト構造 | Project Structure

### 🇯🇵 日本語

```
Portfolio/
├── public/            # 静的ファイル（画像など）
├── src/               # ソースコード
│   ├── app/           # Next.jsのページコンポーネント
│   ├── components/    # 再利用可能なUIコンポーネント
│   ├── contexts/      # Reactコンテキスト（言語切り替えなど）
│   ├── data/          # プロジェクトやスキルのデータ
│   ├── hooks/         # カスタムReactフック
│   └── utils/         # ユーティリティ関数
├── styles/            # グローバルスタイル
├── next.config.mjs    # Next.js設定
└── tailwind.config.ts # Tailwind CSS設定
```

### 🇬🇧 English

```
Portfolio/
├── public/            # Static files (images, etc.)
├── src/               # Source code
│   ├── app/           # Next.js page components
│   ├── components/    # Reusable UI components
│   ├── contexts/      # React contexts (language switching, etc.)
│   ├── data/          # Project and skill data
│   ├── hooks/         # Custom React hooks
│   └── utils/         # Utility functions
├── styles/            # Global styles
├── next.config.mjs    # Next.js configuration
└── tailwind.config.ts # Tailwind CSS configuration
```

## 🌟 主要コンポーネント | Key Components

### 🇯🇵 日本語

- **Header**: ナビゲーションと言語切り替え
- **Hero**: 自己紹介とメインビジュアル
- **AboutMe**: 経歴と詳細な自己紹介
- **Skills**: スキルセットのビジュアル表示
- **Projects**: プロジェクト作品のショーケース
- **Footer**: 連絡先とソーシャルリンク

### 🇬🇧 English

- **Header**: Navigation and language switching
- **Hero**: Self-introduction and main visual
- **AboutMe**: Background and detailed self-introduction
- **Skills**: Visual display of skill sets
- **Projects**: Showcase of project works
- **Footer**: Contact information and social links

## 📝 カスタマイズ | Customization

### 🇯🇵 日本語

プロジェクトデータやスキルの情報は `src/data` ディレクトリ内のファイルで管理されています。自身の情報に合わせて以下のファイルを編集することで、サイトの内容をカスタマイズできます：

- `projects.ts`: プロジェクト情報
- `skills.ts`: スキル情報
- `translations.ts`: 言語翻訳データ

### 🇬🇧 English

Project data and skill information are managed in files within the `src/data` directory. You can customize the site's content by editing the following files to match your information:

- `projects.ts`: Project information
- `skills.ts`: Skill information
- `translations.ts`: Language translation data

## 📄 ライセンス | License

### 🇯🇵 日本語

このプロジェクトはMITライセンスの下で公開されています。詳細については[LICENSE](LICENSE)ファイルを参照してください。

### 🇬🇧 English

This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📧 連絡先 | Contact

### 🇯🇵 日本語

質問や提案がありましたら、以下の方法でご連絡ください：

- GitHub: [shigureeeeeeeeee](https://github.com/shigureeeeeeeeee)

### 🇬🇧 English

For questions or suggestions, please contact me through:

- GitHub: [shigureeeeeeeeee](https://github.com/shigureeeeeeeeee)
