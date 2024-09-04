import React, { useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { IconType } from 'react-icons';
import { skillCategories } from '../data/skills';

// スキルの型定義
interface Skill {
  name: string;
  icon: IconType;
  level: number;
  description: string;
}

// スキルカテゴリーの型定義
interface SkillCategory {
  name: string;
  skills: Skill[];
}

// スキルカードコンポーネント
const SkillCard: React.FC<{ skill: Skill }> = React.memo(({ skill }) => {
  const [isHovered, setIsHovered] = useState(false);

  // ホバー状態を管理するコールバック関数
  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);

  const Icon = skill.icon;

  return (
    <motion.div
      className="relative bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      {/* スキルアイコンと名前 */}
      <div className="flex items-center mb-4">
        <div className="text-4xl mr-4 text-purple-400"><Icon /></div>
        <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
      </div>
      {/* スキルレベルを表すプログレスバー */}
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
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
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-white text-center">{skill.description}</p>
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
  const [activeCategory, setActiveCategory] = useState('All');

  // カテゴリー変更のハンドラー
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  // 全スキルのリストをメモ化
  const allSkills = useMemo(() => 
    skillCategories.flatMap(category => category.skills),
    []
  );

  // 表示するスキルのリストをメモ化
  const displaySkills = useMemo(() => 
    activeCategory === 'All' 
      ? allSkills 
      : skillCategories.find(cat => cat.name === activeCategory)?.skills || [],
    [activeCategory, allSkills]
  );

  return (
    <section 
      ref={ref} 
      className="relative py-20 bg-gradient-to-b from-gray-800 via-gray-900 to-black" 
      id="skills"
    >
      {/* 背景のグラデーション */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-blue-900/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* セクションタイトル */}
        <motion.h2 
          className="text-4xl font-bold text-center text-purple-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>

        {/* カテゴリー選択ボタン */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2 space-y-2">
          <motion.button
            key="All"
            className={`px-3 py-1 rounded-full text-sm ${
              activeCategory === 'All' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryChange('All')}
            aria-label="Show all skills"
          >
            All
          </motion.button>
          {skillCategories.map((category) => (
            <motion.button
              key={category.name}
              className={`px-3 py-1 rounded-full text-sm ${
                activeCategory === category.name ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(category.name)}
              aria-label={`Show ${category.name} skills`}
            >
              {category.name}
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