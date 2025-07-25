"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiCode, FiDatabase, FiTool, FiLayers, FiSmartphone } from "react-icons/fi";
import { Project } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

interface ProjectCardProps {
  project: Project;
  setSelectedProject: (project: Project) => void;
  index: number;
}

// カテゴリに応じたアイコンとグラデーション
const getCategoryConfig = (category: string) => {
  const configs = {
    web: {
      icon: FiCode,
      gradient: "from-blue-500 to-purple-600",
      bgPattern: "bg-gradient-to-br from-blue-500/10 to-purple-600/10"
    },
    api: {
      icon: FiDatabase,
      gradient: "from-green-500 to-emerald-600",
      bgPattern: "bg-gradient-to-br from-green-500/10 to-emerald-600/10"
    },
    tool: {
      icon: FiTool,
      gradient: "from-orange-500 to-red-600",
      bgPattern: "bg-gradient-to-br from-orange-500/10 to-red-600/10"
    },
    library: {
      icon: FiLayers,
      gradient: "from-purple-500 to-pink-600",
      bgPattern: "bg-gradient-to-br from-purple-500/10 to-pink-600/10"
    },
    mobile: {
      icon: FiSmartphone,
      gradient: "from-indigo-500 to-blue-600",
      bgPattern: "bg-gradient-to-br from-indigo-500/10 to-blue-600/10"
    }
  };
  
  return configs[category as keyof typeof configs] || configs.web;
};

// ステータスバッジ
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const { language } = useLanguage();
  
  const statusConfig = {
    completed: { 
      label: language === 'ja' ? '完成' : 'Completed', 
      color: 'bg-green-500/20 text-green-400 border-green-500/30' 
    },
    'in-progress': { 
      label: language === 'ja' ? '開発中' : 'In Progress', 
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' 
    },
    archived: { 
      label: language === 'ja' ? 'アーカイブ' : 'Archived', 
      color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' 
    }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed;

  return (
    <span className={`px-2 py-1 rounded-full text-xs border ${config.color}`}>
      {config.label}
    </span>
  );
};

// 技術スタック用のアイコン付きタグ
const TechTag: React.FC<{ tech: string; index: number }> = ({ tech, index }) => (
  <motion.span
    className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:bg-white/20 transition-all duration-300"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ scale: 1.05 }}
  >
    {tech}
  </motion.span>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project, setSelectedProject, index }) => {
  const { language } = useLanguage();
  const categoryConfig = getCategoryConfig(project.category);
  const IconComponent = categoryConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            ⭐ {language === 'ja' ? '注目' : 'Featured'}
          </div>
        </div>
      )}

      <div 
        className={`relative h-full glass-card p-6 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 ${categoryConfig.bgPattern} overflow-hidden`}
        onClick={() => setSelectedProject(project)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${project.title[language]}`}
        onKeyPress={(e: React.KeyboardEvent) => {
          if (e.key === "Enter") setSelectedProject(project);
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-gradient-to-br from-white to-transparent" />
          <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-gradient-to-tr from-white to-transparent" />
        </div>

        {/* Header with Icon and Status */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${categoryConfig.gradient} shadow-lg`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-gradient-static mb-3 group-hover:text-shadow-glow transition-all duration-300">
          {project.title[language]}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {project.description[language]}
        </p>

        {/* Technologies */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <TechTag key={tech} tech={tech} index={techIndex} />
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs text-gray-400 px-2 py-1">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <motion.button
            className="flex items-center space-x-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProject(project);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{translations[language].projects.viewDetails}</span>
          </motion.button>

          <div className="flex space-x-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`View GitHub repository for ${project.title[language]}`}
            >
              <FiGithub className="w-4 h-4" />
            </motion.a>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Visit live site for ${project.title[language]}`}
            >
              <FiExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default ProjectCard;