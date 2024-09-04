"use client";

import React, { useRef, useState } from "react"; // Reactとフックをインポート
import { motion } from "framer-motion"; // アニメーションを作成するためのライブラリ
import { useInView } from "../hooks/useInView"; // 要素が画面内に表示されているかを検出するカスタムフック
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"; // カスタムカードコンポーネント
import { FiExternalLink, FiGithub } from "react-icons/fi"; // アイコンコンポーネント
import Image from "next/image"; // 画像を最適化して表示するためのコンポーネント
import { projects, Project } from '../data/projects'; // プロジェクトデータと型をインポート
import styled from 'styled-components';

const CustomSlider = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;

  .slider-content {
    display: flex;
    animation: slide 15s linear infinite;
  }

  .slider-item {
    flex: 0 0 33.333%;
    padding: 0 10px;
  }

  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  &:hover .slider-content {
    animation-play-state: paused;
  }
`;

// Projectsコンポーネントの定義
const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null); // セクションの参照を作成
  const isInView = useInView(ref, { threshold: 0.1 }); // 要素が画面内に表示されているかをチェック
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // 選択されたプロジェクトを管理するステート

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-gray-800" id="projects">
      {/* 背景のグラデーションを設定 */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-purple-900/5 to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center text-purple-300 mb-16"
          initial={{ opacity: 0, y: 20 }} // 初期状態のアニメーション
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} // スクロールで表示されるときのアニメーション
          transition={{ duration: 0.5 }} // アニメーションの持続時間
        >
          Projects
        </motion.h2>
        <CustomSlider>
          <div className="slider-content">
            {projects.concat(projects).map((project, index) => (
              <div key={`${project.id}-${index}`} className="slider-item">
                <ProjectCard project={project} setSelectedProject={setSelectedProject} />
              </div>
            ))}
          </div>
        </CustomSlider>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          // プロジェクトが選択されている場合、モーダルを表示
        )}
      </div>
    </section>
  );
};

// ProjectCardコンポーネントの定義
const ProjectCard: React.FC<{ project: Project; setSelectedProject: (project: Project) => void }> = ({ project, setSelectedProject }) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-800 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-[500px] rounded-xl p-8 border flex flex-col justify-between">
        <div>
          <CardItem
            translateZ="50"
            className="text-2xl font-bold text-purple-300 mb-4"
          >
            {project.title} {/* プロジェクトのタイトルを表示 */}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-gray-300 mb-4 text-sm"
          >
            {project.description} {/* プロジェクトの説明を表示 */}
          </CardItem>
        </div>
        <CardItem translateZ="100" className="w-full mb-4 flex items-center justify-center">
          <div className="w-full h-48 relative">
            <Image
              src={project.image}
              layout="fill"
              objectFit="cover"
              className="rounded-xl group-hover/card:shadow-xl"
              alt={project.title} // 画像の代替テキスト
            />
          </div>
        </CardItem>
        <div className="flex justify-between items-center">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-bold"
            onClick={() => setSelectedProject(project)} // ボタンをクリックするとプロジェクトを選択
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
            GitHub {/* GitHubリンクを表示 */}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

// ProjectModalコンポーネントの定義
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
                {tech} {/* 使用技術を表示 */}
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
            サイトを見る {/* プロジェクトのリンクを表示 */}
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <FiGithub className="mr-2" />
            GitHub {/* GitHubリンクを表示 */}
          </a>
          <button
            onClick={onClose} // モーダルを閉じるボタン
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