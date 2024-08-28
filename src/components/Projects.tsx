"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Image from "next/image";
import { projects, Project } from '../data/projects';

const Projects: React.FC = () => {
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
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} setSelectedProject={setSelectedProject} />
            </motion.div>
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