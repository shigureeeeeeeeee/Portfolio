"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiExternalLink, FiGithub, FiCode, FiDatabase, FiTool, FiLayers, FiSmartphone, FiStar, FiGitBranch } from "react-icons/fi";
import { projects, Project } from "../data/projects";
import { fetchGitHubProjects, GitHubProject } from "@/lib/github";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

// フィルタータイプ
export type FilterCategory = 'all' | 'web' | 'api' | 'tool' | 'library' | 'mobile';

// カテゴリーアイコンの設定（統一されたパープル系カラー）
const getCategoryConfig = (category: string) => {
  const configs = {
    web: {
      icon: FiCode,
      color: "text-purple-400",
      bgColor: "from-purple-500/10 to-violet-500/10",
      borderColor: "border-purple-500/20"
    },
    api: {
      icon: FiDatabase,
      color: "text-purple-400", 
      bgColor: "from-purple-500/10 to-violet-500/10",
      borderColor: "border-purple-500/20"
    },
    tool: {
      icon: FiTool,
      color: "text-purple-400",
      bgColor: "from-purple-500/10 to-violet-500/10", 
      borderColor: "border-purple-500/20"
    },
    library: {
      icon: FiLayers,
      color: "text-purple-400",
      bgColor: "from-purple-500/10 to-violet-500/10",
      borderColor: "border-purple-500/20"
    },
    mobile: {
      icon: FiSmartphone,
      color: "text-purple-400",
      bgColor: "from-purple-500/10 to-violet-500/10",
      borderColor: "border-purple-500/20"
    }
  };
  
  return configs[category as keyof typeof configs] || configs.web;
};

// ステータス表示
const StatusIndicator: React.FC<{ status: string; language: string }> = ({ status, language }) => {
  const statusConfig = {
    completed: { 
      label: language === 'ja' ? '完成' : 'Completed', 
      color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
    },
    'in-progress': { 
      label: language === 'ja' ? '開発中' : 'In Progress', 
      color: 'bg-violet-500/20 text-violet-300 border-violet-500/30' 
    },
    archived: { 
      label: language === 'ja' ? 'アーカイブ' : 'Archived', 
      color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' 
    }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed;

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      {config.label}
    </span>
  );
};

// GitHub統計バッジ
const GitHubStats: React.FC<{ project: GitHubProject }> = ({ project }) => (
  <div className="flex items-center space-x-3 text-xs text-gray-500">
    {project.stars > 0 && (
      <div className="flex items-center space-x-1">
        <FiStar size={12} />
        <span>{project.stars}</span>
      </div>
    )}
    {project.forks > 0 && (
      <div className="flex items-center space-x-1">
        <FiGitBranch size={12} />
        <span>{project.forks}</span>
      </div>
    )}
  </div>
);

// ミニマルプロジェクトカード
const MinimalProjectCard: React.FC<{
  project: Project | GitHubProject;
  index: number;
  onSelect: (project: Project | GitHubProject) => void;
  isGitHubProject?: boolean;
}> = ({ project, index, onSelect, isGitHubProject = false }) => {
  const { language } = useLanguage();
  const categoryConfig = getCategoryConfig(project.category);
  const IconComponent = categoryConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            ★ {language === 'ja' ? '注目' : 'Featured'}
          </div>
        </div>
      )}

      <motion.div
        className="glass-card p-6 h-full cursor-pointer transition-all duration-300"
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect(project)}
      >
        {/* ヘッダー */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${categoryConfig.bgColor} ${categoryConfig.borderColor} border group-hover:scale-110 transition-transform duration-300`}
            whileHover={{ rotate: 5 }}
          >
            <IconComponent className={`w-6 h-6 ${categoryConfig.color}`} />
          </motion.div>
          <StatusIndicator status={project.status} language={language} />
        </div>

        {/* プロジェクト名 */}
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gradient transition-all duration-300">
          {project.title[language]}
        </h3>

        {/* 説明 */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {project.description[language]}
        </p>

        {/* 技術スタック */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1 mb-3">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
          
          {/* GitHub統計（GitHubプロジェクトの場合のみ） */}
          {isGitHubProject && 'stars' in project && (
            <GitHubStats project={project as GitHubProject} />
          )}
        </div>

        {/* アクション */}
        <div className="flex items-center justify-between mt-auto">
          <motion.button
            className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {translations[language].projects.viewDetails}
          </motion.button>

          <div className="flex space-x-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10"
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
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Visit live site for ${project.title[language]}`}
            >
              <FiExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ミニマルフィルター
const MinimalFilters: React.FC<{
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
}> = ({ activeFilter, onFilterChange }) => {
  const { language } = useLanguage();

  const filterConfig = {
    all: { 
      icon: FiCode, 
      label: { ja: 'すべて', en: 'All' }
    },
    web: { 
      icon: FiCode, 
      label: { ja: 'Web', en: 'Web' }
    },
    api: { 
      icon: FiDatabase, 
      label: { ja: 'API', en: 'API' }
    },
    tool: { 
      icon: FiTool, 
      label: { ja: 'ツール', en: 'Tools' }
    },
    library: { 
      icon: FiLayers, 
      label: { ja: 'ライブラリ', en: 'Libraries' }
    },
    mobile: { 
      icon: FiSmartphone, 
      label: { ja: 'モバイル', en: 'Mobile' }
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {Object.entries(filterConfig).map(([key, config], index) => {
        const isActive = activeFilter === key;
        
        return (
          <motion.button
            key={key}
            onClick={() => onFilterChange(key as FilterCategory)}
            className={`relative flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isActive 
                ? 'text-white bg-white/10 backdrop-blur-sm border border-purple-500/50' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <span className="text-sm">
              {config.label[language]}
            </span>

            {/* アクティブインジケーター */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                layoutId="activeFilter"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

// プロジェクト詳細モーダル（シンプル版）
const ProjectModal: React.FC<{
  project: (Project | GitHubProject) | null;
  onClose: () => void;
  isGitHubProject?: boolean;
}> = ({ project, onClose, isGitHubProject = false }) => {
  const { language } = useLanguage();

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="glass-card p-8">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-bold text-gradient">
                {project.title[language]}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {project.longDescription[language]}
            </p>

            {/* GitHub統計（GitHubプロジェクトの場合のみ） */}
            {isGitHubProject && 'stars' in project && (
              <div className="mb-6">
                <GitHubStats project={project as GitHubProject} />
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gradient mb-3">
                {translations[language].projects.technologies}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-white/10 text-gray-300 border border-white/20"
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
                className="flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <FiExternalLink className="mr-2" />
                {translations[language].projects.viewSite}
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <FiGithub className="mr-2" />
                {translations[language].projects.viewGithub}
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ローディング表示
const LoadingCard: React.FC<{ index: number }> = ({ index }) => (
  <motion.div
    className="glass-card p-6 h-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gray-700" />
        <div className="w-16 h-6 rounded-full bg-gray-700" />
      </div>
      <div className="w-3/4 h-6 rounded bg-gray-700 mb-3" />
      <div className="w-full h-4 rounded bg-gray-700 mb-2" />
      <div className="w-2/3 h-4 rounded bg-gray-700 mb-4" />
      <div className="flex gap-2 mb-6">
        <div className="w-16 h-6 rounded-full bg-gray-700" />
        <div className="w-20 h-6 rounded-full bg-gray-700" />
        <div className="w-14 h-6 rounded-full bg-gray-700" />
      </div>
      <div className="flex justify-between">
        <div className="w-20 h-8 rounded bg-gray-700" />
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-700" />
          <div className="w-8 h-8 rounded-lg bg-gray-700" />
        </div>
      </div>
    </div>
  </motion.div>
);

// メインのMinimalProjectsコンポーネント
export const MinimalProjects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedProject, setSelectedProject] = useState<(Project | GitHubProject) | null>(null);
  const [gitHubProjects, setGitHubProjects] = useState<GitHubProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useGitHub, setUseGitHub] = useState(true); // GitHub APIを使用するかどうか
  const { language } = useLanguage();

  // GitHub APIからプロジェクトを取得
  useEffect(() => {
    const loadGitHubProjects = async () => {
      if (!useGitHub) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const githubData = await fetchGitHubProjects();
        setGitHubProjects(githubData);
      } catch (error) {
        console.error('Failed to load GitHub projects:', error);
        setUseGitHub(false); // フォールバックとして静的データを使用
      } finally {
        setIsLoading(false);
      }
    };

    loadGitHubProjects();
  }, [useGitHub]);

  // 表示するプロジェクト（GitHub API または 静的データ）
  const displayProjects = useGitHub ? gitHubProjects : projects;

  // フィルタリングされたプロジェクト
  const filteredProjects = useMemo(() => {
    return displayProjects.filter(project => 
      activeFilter === 'all' || project.category === activeFilter
    );
  }, [activeFilter, displayProjects]);

  return (
    <section className="relative py-20" id="projects">
      <div className="container mx-auto px-4 relative z-10">
        {/* セクションタイトル */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-display font-bold text-gradient mb-4">
            {translations[language].projects.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {language === 'ja' 
              ? 'これまでに開発したプロジェクトをご覧ください。'
              : 'Explore the projects I\'ve developed.'}
          </p>
        </motion.div>

        {/* フィルター */}
        <MinimalFilters 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />

        {/* プロジェクトグリッド */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading ? (
              // ローディング状態
              Array.from({ length: 6 }).map((_, index) => (
                <LoadingCard key={index} index={index} />
              ))
            ) : (
              // プロジェクト表示
              filteredProjects.map((project, index) => (
                <MinimalProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onSelect={setSelectedProject}
                  isGitHubProject={useGitHub}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* プロジェクトが見つからない場合 */}
        {!isLoading && filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-400">
              {language === 'ja' 
                ? 'このカテゴリにはプロジェクトがありません。' 
                : 'No projects found in this category.'}
            </p>
          </motion.div>
        )}
      </div>

      {/* プロジェクト詳細モーダル */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)}
        isGitHubProject={useGitHub}
      />
    </section>
  );
};

export default MinimalProjects;