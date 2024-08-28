"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  link: string;
  github: string;
}

const projects: Project[] = [
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

export const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-gray-800" id="projects">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-purple-900/5 to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center text-purple-300 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} setSelectedProject={setSelectedProject} />
          ))}
        </div>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; setSelectedProject: (project: Project) => void }> = ({ project, setSelectedProject }) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-800 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-[500px] rounded-xl p-8 border flex flex-col justify-between">
        <div>
          <CardItem
            translateZ="50"
            className="text-2xl font-bold text-purple-300 mb-4"
          >
            {project.title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-gray-300 mb-4 text-sm"
          >
            {project.description}
          </CardItem>
        </div>
        <CardItem translateZ="100" className="w-full mb-4 flex items-center justify-center">
          <div className="w-full h-48 relative">
            <Image
              src={project.image}
              layout="fill"
              objectFit="cover"
              className="rounded-xl group-hover/card:shadow-xl"
              alt={project.title}
            />
          </div>
        </CardItem>
        <div className="flex justify-between items-center">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-bold"
            onClick={() => setSelectedProject(project)}
          >
            詳細を見る
          </CardItem>
          <CardItem
            translateZ={20}
            as="a"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-gray-700 text-white text-sm font-bold"
          >
            <FiGithub className="inline-block mr-2" />
            GitHub
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default Projects;