"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { projects as staticProjects, Project } from "../data/projects";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import ProjectCard from "./ProjectCard";
import ProjectFilters, { FilterCategory } from "./ProjectFilters";
import { fetchGitHubProjects, GitHubProject } from "@/lib/github";


const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  // GitHubからプロジェクトを取得
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const githubProjects = await fetchGitHubProjects();
        
        if (githubProjects.length === 0) {
          // GitHubから取得できない場合は静的データを使用
          console.log('No projects from GitHub, using static data');
          setProjects(staticProjects);
        } else {
          // GitHubProjectをProjectに変換
          const convertedProjects: Project[] = githubProjects.map(gp => ({
            id: gp.id,
            title: gp.title,
            description: gp.description,
            longDescription: gp.longDescription,
            technologies: gp.technologies,
            link: gp.link,
            github: gp.github,
            category: gp.category,
            status: gp.status,
            featured: gp.featured
          }));
          setProjects(convertedProjects);
        }
      } catch (err) {
        console.error('Error loading projects from GitHub:', err);
        // エラー時は静的データを使用
        setProjects(staticProjects);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [language]);

  // フィルタリングされたプロジェクト
  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <section
      ref={ref}
      className="relative py-20"
      id="projects"
      role="region"
      aria-label="Projects Section"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            {translations[language].projects.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            {language === 'ja' 
              ? 'さまざまなカテゴリのプロジェクトをご覧ください。フィルターを使用して特定の技術分野に絞り込むことができます。' 
              : 'Explore projects across various categories. Use filters to narrow down to specific technology areas.'}
          </p>
        </motion.div>

        {/* フィルター */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProjectFilters 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />
        </motion.div>

        {/* ローディング状態 */}
        {isLoading && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            <p className="text-gray-400 mt-4">
              {language === 'ja' ? 'プロジェクトを読み込み中...' : 'Loading projects...'}
            </p>
          </motion.div>
        )}

        {/* エラー状態 */}
        {error && !isLoading && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-400 text-lg">{error}</p>
          </motion.div>
        )}

        {/* プロジェクトグリッド */}
        {!isLoading && !error && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              role="list"
              aria-label="Project List"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  setSelectedProject={setSelectedProject}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* プロジェクトが見つからない場合 */}
        {!isLoading && !error && filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-400 text-lg">
              {language === 'ja' 
                ? 'このカテゴリにはプロジェクトがありません。' 
                : 'No projects found in this category.'}
            </p>
          </motion.div>
        )}

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
