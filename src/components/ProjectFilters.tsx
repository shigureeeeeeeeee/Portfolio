"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCode, FiDatabase, FiTool, FiLayers, FiSmartphone, FiGrid } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

export type FilterCategory = 'all' | 'web' | 'api' | 'tool' | 'library' | 'mobile';

interface ProjectFiltersProps {
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
}

const filterConfig = {
  all: { 
    icon: FiGrid, 
    label: { ja: 'すべて', en: 'All' },
    gradient: 'from-gray-500 to-gray-700'
  },
  web: { 
    icon: FiCode, 
    label: { ja: 'Webアプリ', en: 'Web Apps' },
    gradient: 'from-blue-500 to-purple-600'
  },
  api: { 
    icon: FiDatabase, 
    label: { ja: 'API', en: 'APIs' },
    gradient: 'from-green-500 to-emerald-600'
  },
  tool: { 
    icon: FiTool, 
    label: { ja: 'ツール', en: 'Tools' },
    gradient: 'from-orange-500 to-red-600'
  },
  library: { 
    icon: FiLayers, 
    label: { ja: 'ライブラリ', en: 'Libraries' },
    gradient: 'from-purple-500 to-pink-600'
  },
  mobile: { 
    icon: FiSmartphone, 
    label: { ja: 'モバイル', en: 'Mobile' },
    gradient: 'from-indigo-500 to-blue-600'
  }
};

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ activeFilter, onFilterChange }) => {
  const { language } = useLanguage();

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {Object.entries(filterConfig).map(([key, config]) => {
        const IconComponent = config.icon;
        const isActive = activeFilter === key;
        
        return (
          <motion.button
            key={key}
            onClick={() => onFilterChange(key as FilterCategory)}
            className={`
              relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
              ${isActive 
                ? 'text-white shadow-lg scale-105' 
                : 'text-gray-400 hover:text-white hover:scale-105'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Object.keys(filterConfig).indexOf(key) * 0.1 }}
          >
            {/* Background */}
            <div 
              className={`
                absolute inset-0 rounded-full transition-all duration-300
                ${isActive 
                  ? `bg-gradient-to-r ${config.gradient} opacity-100` 
                  : 'bg-white/10 hover:bg-white/20 opacity-60'
                }
              `}
            />
            
            {/* Content */}
            <div className="relative flex items-center space-x-2">
              <IconComponent className="w-4 h-4" />
              <span className="text-sm font-medium">
                {config.label[language]}
              </span>
            </div>

            {/* Active Indicator */}
            {isActive && (
              <motion.div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                layoutId="activeIndicator"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default ProjectFilters;