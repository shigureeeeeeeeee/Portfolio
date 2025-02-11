import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiPython,
  SiDjango,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiFigma,
} from "react-icons/si";

export const skillCategories = [
  {
    name: "frontend",
    skills: [
      {
        name: "React",
        icon: SiReact,
        level: 90,
        description: {
          ja: "モダンなUIコンポーネントの開発",
          en: "Development of modern UI components",
        },
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        level: 85,
        description: {
          ja: "フルスタックWebアプリケーションの構築",
          en: "Building full-stack web applications",
        },
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        level: 85,
        description: {
          ja: "型安全なコードの実装",
          en: "Implementation of type-safe code",
        },
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        level: 90,
        description: {
          ja: "モダンなUIデザインの実装",
          en: "Implementation of modern UI designs",
        },
      },
      {
        name: "Framer Motion",
        icon: SiFramer,
        level: 80,
        description: {
          ja: "スムーズなアニメーションの実装",
          en: "Implementation of smooth animations",
        },
      },
    ],
  },
  {
    name: "backend",
    skills: [
      {
        name: "Node.js",
        icon: SiNodedotjs,
        level: 80,
        description: {
          ja: "サーバーサイドアプリケーションの開発",
          en: "Development of server-side applications",
        },
      },
      {
        name: "Python",
        icon: SiPython,
        level: 85,
        description: {
          ja: "データ処理とバックエンド開発",
          en: "Data processing and backend development",
        },
      },
      {
        name: "Django",
        icon: SiDjango,
        level: 75,
        description: {
          ja: "Webアプリケーションフレームワーク",
          en: "Web application framework",
        },
      },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        level: 80,
        description: {
          ja: "リレーショナルデータベース管理",
          en: "Relational database management",
        },
      },
    ],
  },
  {
    name: "tools",
    skills: [
      {
        name: "Docker",
        icon: SiDocker,
        level: 75,
        description: {
          ja: "コンテナ化とデプロイメント",
          en: "Containerization and deployment",
        },
      },
      {
        name: "Git",
        icon: SiGit,
        level: 85,
        description: {
          ja: "バージョン管理とチーム開発",
          en: "Version control and team development",
        },
      },
      {
        name: "Figma",
        icon: SiFigma,
        level: 80,
        description: {
          ja: "UIデザインとプロトタイピング",
          en: "UI design and prototyping",
        },
      },
    ],
  },
];
