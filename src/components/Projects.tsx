"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { PinContainer } from "../components/ui/3d-pin";
import { FiExternalLink, FiGithub } from "react-icons/fi";

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
    description: "Todo、カレンダー、ポモドーロタイマー機能を備えている。",
    longDescription: "React、TypeScript、Tailwind CSSを使用して作成したタスク管理アプリです。ユーザーインターフェースはMaterial-UIを使用し、データストレージにはFirebaseを使用しています。",
    image: "/img/taskmanagement.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Material-UI", "Firebase"],
    link: "https://github.com/shigureeeeeeeeee/TodoApp",
    github: "https://github.com/shigureeeeeeeeee/TodoApp",
  },
  {
    id: "3",
    title: "情報抽出を行う機械学習モデル",
    description: "講義の一環で作成中。レビューからユーザーが購買行動の意思決定に利用する情報抽出を行う。",
    longDescription: "Python、TensorFlowを使用して作成中の機械学習モデルです。自然言語処理技術を使用して、レビューから購買意思決定に影響する情報を抽出しています。",
    image: "/img/mlmodel.jpg",//画像を追加
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
          className="text-4xl font-bold text-center text-purple-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PinContainer title={project.title} href={project.link}>
                <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]">
                  <h3 className="text-base font-bold text-slate-100 mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-300 mb-4">{project.description}</p>
                  <div className="flex-1 relative overflow-hidden rounded-lg">
                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
                      >
                        詳細を見る
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex space-x-2">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="bg-gray-700 text-xs text-white px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                        <FiExternalLink size={20} />
                      </a>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                        <FiGithub size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </PinContainer>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">{project.title}</h2>
        <p className="text-gray-300 mb-4">{project.longDescription}</p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-purple-300 mb-2">使用技術：</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span key={index} className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FiExternalLink className="mr-2" />
            サイトを見る
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <FiGithub className="mr-2" />
            GitHub
          </a>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;