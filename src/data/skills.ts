import { FaPython, FaReact, FaJs, FaJava, FaDocker, FaGitAlt, FaDatabase, FaServer } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiC, SiTailwindcss, SiAmazonaws, SiGooglecloud } from 'react-icons/si';

export const skillCategories = [
  {
    name: "フロントエンド",
    skills: [
      { name: 'React', icon: FaReact, level: 40, description: 'webアプリケーションの作成に使用。調べながら任意の処理を記述できるレベル。' },
      { name: 'Next.js', icon: SiNextdotjs, level: 40, description: 'webアプリケーションの作成に使用。調べながら任意の処理を記述できるレベル。' },
      { name: 'JavaScript', icon: FaJs, level: 40, description: 'webアプリケーションの作成に使用。調べながら任意の処理を記述できるレベル。' },
      { name: 'TypeScript', icon: SiTypescript, level: 40, description: 'webアプリケーション作成に使用。調べながら任意の処理を記述できるレベル。' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 35, description: 'UIデザインに使用。基本的なスタイリングができるレベル。' },
    ]
  },
  {
    name: "バックエンド",
    skills: [
      { name: 'Python', icon: FaPython, level: 50, description: '大学の講義で使用。pandas, numpy, matplotlibなどのライブラリを使用して簡単なデータ分析を行うことができるレベル。' },
      { name: 'C/C++', icon: SiC, level: 20, description: '大学の講義や競技プログラミングで使用。基本的な文法やポインタの使い方がわかるレベル。' },
      { name: 'Java', icon: FaJava, level: 20, description: '大学の講義で使用。基本的な文法やオブジェクト指向がわかるレベル。' },
      { name: 'SQL', icon: FaDatabase, level: 30, description: '基本的なクエリの作成ができるレベル。' },
    ]
  },
  {
    name: "開発ツール・インフラ",
    skills: [
      { name: 'Docker', icon: FaDocker, level: 30, description: '開発環境を構築する際に使用。基本的なCLI操作を行うことはできるが、DockerFileなどを空から書くのは苦戦するレベル。' },
      { name: 'Git', icon: FaGitAlt, level: 30, description: 'バージョン管理を行うのに使用。基本的な操作を行うことができるレベル。' },
      { name: 'Linux', icon: FaServer, level: 20, description: '基本的なコマンドラインの操作ができるレベル。' },
    ]
  },
];
