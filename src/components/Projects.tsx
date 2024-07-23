"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import dynamic from "next/dynamic";

// PinContainer の型定義を拡張
interface PinContainerProps {
  title: string;
  href: string;
  children: React.ReactNode;
}

const PinContainer = dynamic<PinContainerProps>(
  () => import("../components/ui/3d-pin").then((mod) => mod.PinContainer),
  {
    ssr: false,
  }
);

interface Project {
  title: string;
  description: string;
  link: string;
  gradient: string;
}

const projects: Project[] = [
  {
    title: "ポートフォリオサイト",
    description: "基本的な私の情報がわかるポートフォリオサイト",
    link: "https://github.com/shigureeeeeeeeee/Portfolio",
    gradient: "from-purple-500 via-pink-500 to-red-500",
  },

  {
    title: "タスク管理アプリ",
    description: "Todo、カレンダー、ポモドーロタイマー機能を備えている。",
    link: "https://github.com/shigureeeeeeeeee/TodoApp",
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
  },
  {
    title: "情報抽出を行う機械学習モデル",
    description: "講義の一環で作成中。レビューからユーザーが購買行動の意思決定に利用する情報抽出を行う。",
    link: "https://github.com/shigureeeeeeeeee/-A-machine-learning-model-for-extracting-information-from-reviews",
    gradient: "from-green-500 via-teal-500 to-blue-500"
  }
];

const ProjectPin: React.FC<{ project: Project }> = ({ project }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading placeholder
  }

  return (
    <PinContainer title={project.title} href={project.link}>
      <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]">
        <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
          {project.title}
        </h3>
        <div className="text-base !m-0 !p-0 font-normal">
          <span className="text-slate-300">{project.description}</span>
        </div>
        <div
          className={`flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br ${project.gradient}`}
        />
      </div>
    </PinContainer>
  );
};

export const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const containerStyles = {
    display: "grid",
    gridTemplateColumns:
      projects.length === 1 ? "1fr" : `repeat(${columns}, minmax(0, 1fr))`,
    gap: "2rem",
    placeItems: "center",
    width: "100%",
    maxWidth: projects.length === 1 ? "400px" : "100%",
    margin: "0 auto",
  };

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-gray-800" id="projects">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-purple-900/5 to-transparent pointer-events-none"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 星のアニメーションを実装する場所 */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center text-purple-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>
        <div style={containerStyles}>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectPin project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;;