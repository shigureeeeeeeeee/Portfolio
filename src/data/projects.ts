export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  link: string;
  github: string;
}

export const projects: Project[] = [
    {
      id: "1",
      title: "ポートフォリオサイト",
      description: "Next.js、TypeScript、Tailwind CSSを駆使した、インタラクティブで魅力的な個人ポートフォリオサイト。Framer Motionによるスムーズなアニメーションを実装。",
      longDescription: "Next.js、TypeScript、Tailwind CSSを使用して作成した個人ポートフォリオサイトです。アニメーションにはFramer Motionを使用し、インタラクティブな要素を追加しています。レスポンシブデザインにより、様々なデバイスで最適な表示を実現しています。",
      image: "/img/portfolio.jpg",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      link: "https://portfolio-plum-phi-54.vercel.app",
      github: "https://github.com/shigureeeeeeeeee/Portfolio",
    },
    {
      id: "2",
      title: "ブログ作成アプリ",
      description: "React、TypeScript、Supabase を活用した、フル機能のブログ管理システム。Markdownエディタ、タグ付け、カテゴリ分類機能を搭載。",
      longDescription: "React、TypeScript、Tailwind CSSを使用して開発したブログ管理アプリケーションです。Markdownエディタを実装し、記事の作成と編集を容易にしています。Firebaseを利用してユーザー認証とデータの永続化を実現。タグ付けやカテゴリ分類機能により、効率的な記事管理が可能です。",
      image: "/img/BrogCraft.png",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Markdown"],
      link: "https://github.com/shigureeeeeeeeee/BlogCraft",
      github: "https://github.com/shigureeeeeeeeee/BlogCraft",
    },
    {
      id: "3",
    title: "スケジュールジェネレーター",
    description: "Python、Gemini1.5 Flash APIを組み合わせた、AI駆動のスケジュール最適化ツール。",
    longDescription: "Python、FastAPI、React、TypeScriptを使用して開発したAI駆動のスケジュール生成アプリケーションです。機械学習モデルを用いてユーザーの好みや制約を考慮し、最適なスケジュールを提案します。直感的なUIにより、ユーザーは簡単に予定を入力し、AIが生成したスケジュールを確認・調整できます。",
    image: "/img/schedulegenerator.jpg",
    technologies: ["Python", "FastAPI", "React", "TypeScript", "機械学習"],
    link: "https://github.com/shigureeeeeeeeee/ScheduleGenerator",
    github: "https://github.com/shigureeeeeeeeee/ScheduleGenerator",
  }
];