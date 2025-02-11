"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Image from "next/image";
import { projects, Project } from "../data/projects";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

// 画像の最適化設定
const imageLoader = ({
  src,
  width,
  quality = 75,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `${src}?w=${width}&q=${quality}`;
};

const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const preloadImages = async () => {
      try {
        await Promise.all(
          projects.map(
            (project) =>
              new Promise<void>((resolve, reject) => {
                const img = new window.Image();
                img.src = project.image;
                img.onload = () => resolve();
                img.onerror = reject;
              })
          )
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to preload images:", error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20"
      id="projects"
      role="region"
      aria-label="Projects Section"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {translations[language].projects.title}
        </motion.h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          role="list"
          aria-label="Project List"
        >
          {!isLoading &&
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                role="listitem"
              >
                <ProjectCard
                  project={project}
                  setSelectedProject={setSelectedProject}
                />
              </motion.div>
            ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  setSelectedProject: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  setSelectedProject,
}) => {
  const { language } = useLanguage();

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title[language]}`}
      onKeyPress={(e: React.KeyboardEvent) => {
        if (e.key === "Enter") setSelectedProject(project);
      }}
    >
      <CardContainer className="inter-var">
        <CardBody className="relative group/card h-[400px] w-full rounded-xl p-6 glass-card">
          <CardItem translateZ="100" className="w-full mb-4">
            <div className="relative w-full h-48 rounded-xl overflow-hidden">
              <Image
                src={project.image}
                layout="fill"
                objectFit="cover"
                className="group-hover/card:scale-110 transition-transform duration-500"
                alt={`Screenshot of ${project.title[language]}`}
                loading="lazy"
                quality={75}
              />
            </div>
          </CardItem>

          <CardItem
            translateZ="50"
            className="text-2xl font-bold text-gradient-static mb-2"
            as="h3"
          >
            {project.title[language]}
          </CardItem>

          <CardItem
            as="p"
            translateZ="60"
            className="text-sm text-gray-300 line-clamp-2 mb-4"
          >
            {project.description[language]}
          </CardItem>

          <div className="flex justify-between items-center mt-auto">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl glass-effect text-sm font-bold hover-lift focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={() => setSelectedProject(project)}
              aria-label={`View details for ${project.title[language]}`}
            >
              {translations[language].projects.viewDetails}
            </CardItem>
            <CardItem
              translateZ={20}
              as="a"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl glass-effect hover-lift focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label={`View GitHub repository for ${project.title[language]}`}
            >
              <FiGithub className="w-5 h-5" aria-hidden="true" />
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { language } = useLanguage();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-labelledby={`modal-title-${project.id}`}
      aria-modal="true"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-2xl w-full m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass-card p-8">
          <h2
            id={`modal-title-${project.id}`}
            className="text-2xl font-bold text-gradient-static mb-4"
          >
            {project.title[language]}
          </h2>
          <p className="text-gray-300 mb-6">
            {project.longDescription[language]}
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gradient-static mb-3">
              {translations[language].projects.technologies}
            </h3>
            <div
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="Technologies used"
            >
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="glass-effect px-3 py-1 rounded-full text-sm"
                  role="listitem"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center glass-effect px-4 py-2 rounded-xl hover-lift focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label={`Visit live site for ${project.title[language]}`}
            >
              <FiExternalLink className="mr-2" aria-hidden="true" />
              {translations[language].projects.viewSite}
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center glass-effect px-4 py-2 rounded-xl hover-lift focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label={`View GitHub repository for ${project.title[language]}`}
            >
              <FiGithub className="mr-2" aria-hidden="true" />
              {translations[language].projects.viewGithub}
            </a>
            <button
              onClick={onClose}
              className="glass-effect px-4 py-2 rounded-xl hover-lift focus:outline-none focus:ring-2 focus:ring-purple-500 ml-auto"
              aria-label="Close modal"
            >
              {translations[language].projects.close}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
