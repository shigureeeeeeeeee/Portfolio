"use client";

import React, { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { IconType } from "react-icons";
import { skillCategories } from "../data/skills";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

// スキルの型定義
interface Skill {
  name: string;
  icon: IconType;
  level: number;
  description: {
    ja: string;
    en: string;
  };
}


// ミニマルスキルカード
const MinimalSkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useLanguage();
  const Icon = skill.icon;

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="glass-card p-6 h-full transition-all duration-300 cursor-pointer"
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* アイコンとタイトル */}
        <div className="flex items-center mb-4">
          <motion.div
            className="w-12 h-12 flex items-center justify-center mr-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300"
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <Icon size={24} className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-gradient transition-all duration-300">
              {skill.name}
            </h3>
          </div>
        </div>

        {/* 説明文 */}
        <motion.p
          className="text-gray-400 text-sm leading-relaxed"
          animate={{
            opacity: isHovered ? 1 : 0.7,
          }}
          transition={{ duration: 0.2 }}
        >
          {skill.description[language]}
        </motion.p>

        {/* ホバー時のグロー効果 */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// カテゴリータブ（ミニマル版）
const MinimalCategoryTabs: React.FC<{
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ categories, activeCategory, onCategoryChange }) => {
  const { language } = useLanguage();

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((category, index) => {
        const isActive = activeCategory === category;
        const categoryKey = category === "All" ? "all" : category.toLowerCase();
        
        return (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isActive 
                ? 'text-white bg-white/10 backdrop-blur-sm' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {translations[language].skills.categories[categoryKey as keyof typeof translations[typeof language]["skills"]["categories"]]}
            
            {/* アクティブインジケーター */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full border border-purple-500/50"
                layoutId="activeCategory"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

// シンプルな統計表示
const SimpleStats: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const { language } = useLanguage();
  
  const totalSkills = skills.length;

  return (
    <motion.div
      className="flex justify-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-card px-6 py-3 rounded-full">
        <div className="flex items-center space-x-2 text-sm">
          <div className="text-xl font-bold text-gradient">{totalSkills}</div>
          <div className="text-gray-400">{language === 'ja' ? 'スキル' : 'Skills'}</div>
        </div>
      </div>
    </motion.div>
  );
};

// メインのMinimalSkillsコンポーネント
export const MinimalSkills: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [activeCategory, setActiveCategory] = useState("All");
  const { language } = useLanguage();

  // カテゴリーリスト
  const categories = ["All", ...skillCategories.map(cat => cat.name)];

  // 表示するスキル
  const displaySkills = useMemo(() => {
    if (activeCategory === "All") {
      return skillCategories.flatMap(cat => cat.skills);
    }
    return skillCategories.find(cat => cat.name === activeCategory)?.skills || [];
  }, [activeCategory]);

  return (
    <section ref={ref} className="relative py-20" id="skills">
      <div className="container mx-auto px-4 relative z-10">
        {/* セクションタイトル */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-display font-bold text-gradient mb-4">
            {translations[language].skills.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {language === 'ja' 
              ? '私の技術スキルと専門知識をご覧ください。'
              : 'Explore my technical skills and expertise.'}
          </p>
        </motion.div>

        {/* スキル統計 */}
        <SimpleStats skills={displaySkills} />

        {/* カテゴリータブ */}
        <MinimalCategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* スキルグリッド */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displaySkills.map((skill, index) => (
              <MinimalSkillCard
                key={skill.name}
                skill={skill}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* スキルなしの場合 */}
        {displaySkills.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-400">
              {language === 'ja' 
                ? 'このカテゴリにはスキルがありません。' 
                : 'No skills found in this category.'}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MinimalSkills;