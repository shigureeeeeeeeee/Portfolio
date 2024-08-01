"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Image from "next/image";

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
    description: "基本的な私の情報がわかるポートフォリオサイト",
    longDescription: "Next.js、TypeScript、Tailwind CSSを使用して作成した個人ポートフォリオサイトです。アニメーションにはFramer Motionを使用し、インタラクティブな要素を追加しています。",
    image: "/img/portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://portfolio-plum-phi-54.vercel.app",
    github: "https://github.com/shigureeeeeeeeee/Portfolio",
  },
  {
    id: "2",
    title: "タスク管理アプリ",
    description: "Todo、カレンダーアプリ、ポモドーロタイマー機能を備えている。",
    longDescription: "React、TypeScript、Tailwind CSSを使用して作成したタスク管理アプリです。ユーザーインターフェースはMaterial-UIを使用し、データストレージにはFirebaseを使用しています。",
    image: "/img/taskmanagement.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Material-UI", "Firebase"],
    link: "https://github.com/shigureeeeeeeeee/Productify",
    github: "https://github.com/shigureeeeeeeeee/Productify",
  },
  {
    id: "3",
    title: "情報抽出を行う機械学習モデル",
    description: "講義の一環で作成中。レビューからユーザーが購買行動の意思決定に利用する情報抽出を行う。",
    longDescription: "Python、TensorFlowを使用して作成中の機械学習モデルです。自然言語処理技術を使用して、レビューから購買意思決定に影響する情報を抽出しています。",
    image: "/img/mlmodel.jpg",
    technologies: ["Python", "TensorFlow", "自然言語処理"],
    link: "https://github.com/shigureeeeeeeeee/-A-machine-learning-model-for-extracting-information-from-reviews",
    github: "https://github.com/shigureeeeeeeeee/-A-machine-learning-model-for-extracting-information-from-reviews",
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
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-800 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-8 border">
        <CardItem
          translateZ="50"
          className="text-2xl font-bold text-purple-300 mb-6"
        >
          {project.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-gray-300 mb-6 text-sm"
        >
          {project.description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-6">
          <Image
            src={project.image}
            height="200"
            width="300"
            className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={project.title}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-bold"
          >
            詳細を見る
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
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