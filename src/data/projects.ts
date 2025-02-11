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
  image: string;
  technologies: string[];
  link: string;
  github: string;
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
  },
];
