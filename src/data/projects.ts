export interface Project {
  id: string;
  title: {
    ja: string;
    en: string;
  };
  description: {
    ja: string;
    en: string;
  };
  longDescription: {
    ja: string;
    en: string;
  };
  image?: string; // オプションにして画像なしプロジェクトに対応
  technologies: string[];
  link: string;
  github: string;
  category: 'web' | 'api' | 'tool' | 'library' | 'mobile'; // プロジェクトカテゴリ
  status: 'completed' | 'in-progress' | 'archived'; // プロジェクト状況
  featured?: boolean; // 注目プロジェクトかどうか
}

export const projects: Project[] = [
  {
    id: "1",
    title: {
      ja: "ポートフォリオサイト",
      en: "Portfolio Website",
    },
    description: {
      ja: "Next.js、TypeScript、Tailwind CSSを駆使した、インタラクティブで魅力的な個人ポートフォリオサイト。Framer Motionによるスムーズなアニメーションを実装。",
      en: "An interactive and attractive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Implemented smooth animations using Framer Motion.",
    },
    longDescription: {
      ja: "Next.js、TypeScript、Tailwind CSSを使用して作成した個人ポートフォリオサイトです。アニメーションにはFramer Motionを使用し、インタラクティブな要素を追加しています。レスポンシブデザインにより、様々なデバイスで最適な表示を実現しています。",
      en: "A personal portfolio website created using Next.js, TypeScript, and Tailwind CSS. Interactive elements are added using Framer Motion for animations. The responsive design ensures optimal display across various devices.",
    },
    image: "/img/portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://portfolio-plum-phi-54.vercel.app",
    github: "https://github.com/shigureeeeeeeeee/Portfolio",
    category: "web",
    status: "completed",
    featured: true,
  },
  {
    id: "2",
    title: {
      ja: "ブログ作成アプリ",
      en: "Blog Creation App",
    },
    description: {
      ja: "React、TypeScript、Supabase を活用した、フル機能のブログ管理システム。Markdownエディタ、タグ付け、カテゴリ分類機能を搭載。",
      en: "A full-featured blog management system built with React, TypeScript, and Supabase. Features include Markdown editor, tagging, and category classification.",
    },
    longDescription: {
      ja: "React、TypeScript、Tailwind CSSを使用して開発したブログ管理アプリケーションです。Markdownエディタを実装し、記事の作成と編集を容易にしています。Firebaseを利用してユーザー認証とデータの永続化を実現。タグ付けやカテゴリ分類機能により、効率的な記事管理が可能です。",
      en: "A blog management application developed using React, TypeScript, and Tailwind CSS. Implements a Markdown editor for easy article creation and editing. User authentication and data persistence are achieved using Firebase. Efficient article management is possible through tagging and category classification features.",
    },
    image: "/img/BrogCraft.png",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "Markdown",
    ],
    link: "https://github.com/shigureeeeeeeeee/BlogCraft",
    github: "https://github.com/shigureeeeeeeeee/BlogCraft",
    category: "web",
    status: "completed",
  },
  {
    id: "3",
    title: {
      ja: "スケジュールジェネレーター",
      en: "Schedule Generator",
    },
    description: {
      ja: "Python、Gemini1.5 Flash APIを組み合わせた、AI駆動のスケジュール最適化ツール。",
      en: "An AI-driven schedule optimization tool combining Python and Gemini1.5 Flash API.",
    },
    longDescription: {
      ja: "Python、FastAPI、React、TypeScriptを使用して開発したAI駆動のスケジュール生成アプリケーションです。機械学習モデルを用いてユーザーの好みや制約を考慮し、最適なスケジュールを提案します。直感的なUIにより、ユーザーは簡単に予定を入力し、AIが生成したスケジュールを確認・調整できます。",
      en: "An AI-driven schedule generation application developed using Python, FastAPI, React, and TypeScript. Using machine learning models, it suggests optimal schedules considering user preferences and constraints. Through an intuitive UI, users can easily input plans and review/adjust AI-generated schedules.",
    },
    image: "/img/schedulegenerator.jpg",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Machine Learning",
    ],
    link: "https://github.com/shigureeeeeeeeee/ScheduleGenerator",
    github: "https://github.com/shigureeeeeeeeee/ScheduleGenerator",
    category: "tool",
    status: "completed",
  },
  {
    id: "4",
    title: {
      ja: "データ解析ライブラリ",
      en: "Data Analysis Library",
    },
    description: {
      ja: "Pythonで開発した統計分析とデータ可視化のためのユーティリティライブラリ。効率的なデータ処理機能を提供。",
      en: "A Python utility library for statistical analysis and data visualization. Provides efficient data processing capabilities.",
    },
    longDescription: {
      ja: "Python、Pandas、NumPy、Matplotlibを使用して開発したデータ分析ライブラリです。統計的手法を実装し、大量データの効率的な処理と可視化を実現。研究や業務でのデータ分析作業を大幅に簡素化します。",
      en: "A data analysis library developed using Python, Pandas, NumPy, and Matplotlib. Implements statistical methods for efficient processing and visualization of large datasets. Significantly simplifies data analysis work in research and business contexts.",
    },
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "SciPy"],
    link: "https://github.com/shigureeeeeeeeee/data-utils",
    github: "https://github.com/shigureeeeeeeeee/data-utils",
    category: "library",
    status: "in-progress",
  },
  {
    id: "5",
    title: {
      ja: "REST API サービス",
      en: "REST API Service",
    },
    description: {
      ja: "Node.js、Express、TypeScriptで構築したスケーラブルなREST APIサービス。JWT認証とRedisキャッシングを実装。",
      en: "A scalable REST API service built with Node.js, Express, and TypeScript. Implements JWT authentication and Redis caching.",
    },
    longDescription: {
      ja: "Node.js、Express、TypeScript、MongoDB、Redisを使用して開発したRESTful APIサービスです。JWT認証システム、レート制限、データキャッシング、エラーハンドリングを実装。高負荷に対応できるスケーラブルな設計となっています。",
      en: "A RESTful API service developed using Node.js, Express, TypeScript, MongoDB, and Redis. Implements JWT authentication system, rate limiting, data caching, and error handling. Features a scalable design capable of handling high loads.",
    },
    technologies: ["Node.js", "Express", "TypeScript", "MongoDB", "Redis", "JWT"],
    link: "https://github.com/shigureeeeeeeeee/api-service",
    github: "https://github.com/shigureeeeeeeeee/api-service",
    category: "api",
    status: "completed",
  },
];
