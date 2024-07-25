import React, { useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FaPython, FaReact, FaJs, FaJava, FaDocker, FaGitAlt, FaDatabase, FaServer } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiC, SiTailwindcss, SiAmazonaws, SiGooglecloud } from 'react-icons/si';

interface Skill {
  name: string;
  icon: React.ReactElement;
  level: number;
  description: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "フロントエンド",
    skills: [
      { name: 'React', icon: <FaReact />, level: 40, description: 'webアプリケーションの作成に使用。調べながら任意の処理を記述できるレベル。' },
      { name: 'Next.js', icon: <SiNextdotjs />, level: 40, description: 'webアプリケーションの作成に使用。調べながら任意の処理を記述できるレベル。' },
      { name: 'JavaScript', icon: <FaJs />, level: 40, description: 'webアプリケーションの作成に使用。調べながら任意の処理を記述できるレベル。' },
      { name: 'TypeScript', icon: <SiTypescript />, level: 40, description: 'webアプリケーション���作成に使用。調べながら任意の処理を記述できるレベル。' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 35, description: 'UIデザインに使用。基本的なスタイリングができるレベル。' },
    ]
  },
  {
    name: "バックエンド",
    skills: [
      { name: 'Python', icon: <FaPython />, level: 50, description: '大学の講義で使用。pandas, numpy, matplotlibなどのライブラリを使用して簡単なデータ分析を行うことができるレベル。' },
      { name: 'C', icon: <SiC />, level: 20, description: '大学の講義で使用。基本的な文法やポインタの使い方がわかるレベル。' },
      { name: 'Java', icon: <FaJava />, level: 20, description: '大学の講義で使用。基本的な文法やオブジェクト指向がわかるレベル。' },
      { name: 'SQL', icon: <FaDatabase />, level: 30, description: '基本的なクエリの作成ができるレベル。' },
    ]
  },
  {
    name: "開発ツール・インフラ",
    skills: [
      { name: 'Docker', icon: <FaDocker />, level: 30, description: '開発環境を構築する際に使用。基本的なCLI操作を行うことはできるが、DockerFileなどを空から書くのは苦戦するレベル。' },
      { name: 'Git', icon: <FaGitAlt />, level: 30, description: 'バージョン管理を行うのに使用。基本的な操作を行うことができるレベル。' },
      { name: 'AWS', icon: <SiAmazonaws />, level: 20, description: 'EC2, S3などの基本的なサービスを使用できるレベル。' },
    ]
  },
];

const SkillCard: React.FC<{ skill: Skill }> = React.memo(({ skill }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      className="relative bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <div className="flex items-center mb-4">
        <div className="text-4xl mr-4 text-purple-400">{skill.icon}</div>
        <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <p className="text-gray-400 text-sm">{skill.level}% Proficiency</p>
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

export const Skills: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const allSkills = useMemo(() => 
    skillCategories.flatMap(category => category.skills),
    []
  );

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
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-blue-900/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-4xl font-bold text-center text-purple-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>

        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <motion.button
            key="All"
            className={`mx-2 px-4 py-2 rounded-full ${
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
              className={`mx-2 px-4 py-2 rounded-full ${
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