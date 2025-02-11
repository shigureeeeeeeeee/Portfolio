"use client";

import React, { useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { IconType } from "react-icons";
import { skillCategories } from "../data/skills";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";

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

// スキルカテゴリーの型定義
interface SkillCategory {
  name: string;
  skills: Skill[];
}

// スキルカードコンポーネント
const SkillCard: React.FC<{ skill: Skill }> = React.memo(({ skill }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useLanguage();

  // ホバー状態を管理するコールバック関数
  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);

  const Icon = skill.icon;

  return (
    <motion.div
      className="glass-card relative p-6"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      {/* スキルアイコンと名前 */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 flex items-center justify-center mr-4">
          {Icon && (
            <Icon
              size={32}
              className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
            />
          )}
        </div>
        <h3 className="text-xl font-semibold text-gradient-static">
          {skill.name}
        </h3>
      </div>
      {/* スキルレベルを表すプログレスバー */}
      <div className="w-full glass-effect rounded-full h-1 mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 via-violet-500 to-fuchsia-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <p className="text-gray-400 text-sm">{skill.level}% Proficiency</p>
      {/* ホバー時に表示される説明 */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 glass-card flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-gray-300 text-center">
              {skill.description[language]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// メインのSkillsコンポーネント
export const Skills: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState("All");
  const { language } = useLanguage();

  // カテゴリー変更のハンドラー
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  // 全スキルのリストをメモ化
  const allSkills = useMemo(
    () => skillCategories.flatMap((category) => category.skills),
    []
  );

  // 表示するスキルのリストをメモ化
  const displaySkills = useMemo(
    () =>
      activeCategory === "All"
        ? allSkills
        : skillCategories.find((cat) => cat.name === activeCategory)?.skills ||
          [],
    [activeCategory, allSkills]
  );

  return (
    <section ref={ref} className="relative py-20" id="skills">
      <div className="container mx-auto px-4 relative z-10">
        {/* セクションタイトル */}
        <motion.h2
          className="text-4xl font-bold text-center text-gradient mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {translations[language].skills.title}
        </motion.h2>

        {/* カテゴリー選択ボタン */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <motion.button
            className={`px-4 py-2 rounded-xl text-sm ${
              activeCategory === "All"
                ? "glass-card text-gradient"
                : "glass-effect text-gradient-static"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryChange("All")}
            aria-label="Show all skills"
          >
            {translations[language].skills.categories.all}
          </motion.button>
          {skillCategories.map((category) => (
            <motion.button
              key={category.name}
              className={`px-4 py-2 rounded-xl text-sm ${
                activeCategory === category.name
                  ? "glass-card text-gradient"
                  : "glass-effect text-gradient-static"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(category.name)}
              aria-label={`Show ${category.name} skills`}
            >
              {category.name === "All"
                ? translations[language].skills.categories.all
                : translations[language].skills.categories[
                    category.name.toLowerCase() as keyof (typeof translations)[typeof language]["skills"]["categories"]
                  ]}
            </motion.button>
          ))}
        </div>

        {/* スキルカードのグリッド */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displaySkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
