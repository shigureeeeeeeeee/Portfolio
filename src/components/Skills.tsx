"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FaPython, FaReact, FaJs, FaJava, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiC } from 'react-icons/si';

interface Skill {
  name: string;
  icon: React.ReactElement;
  level: number;
  description: string;
}

const skills: Skill[] = [
  { name: 'Python', icon: <FaPython />, level: 50, description: '大学の講義で使用。pandas, numpy, matplotlibなどのライブラリを使用して簡単なデータ分析を行うことができるレベル。' },
  { name: 'React', icon: <FaReact />, level: 40, description: 'webアプリケーションの作成に使用。調べながら任意の処理を記述できるレベル。' },
  { name: 'Next.js', icon: <SiNextdotjs />, level: 40, description: 'webアプリケーションの作成に使用。調べながら任意の処理を記述できるレベル。' },
  { name: 'JavaScript', icon: <FaJs />, level: 40, description: 'webアプリケーションの作成に使用。調べながら任意の処理を記述できるレベル。' },
  { name: 'TypeScript', icon: <SiTypescript />, level: 40, description: 'webアプリケーションの作成に使用。調べながら任意の処理を記述できるレベル。' },
  { name: 'C', icon: <SiC />, level: 20, description: '大学の講義で使用。基本的な文法やポインタの使い方がわかるレベル。' },
  { name: 'Java', icon: <FaJava />, level: 20, description: '大学の講義で使用。基本的な文法やオブジェクト指向がわかるレベル。' },
  { name: 'Docker', icon: <FaDocker />, level: 30, description: '開発環境を構築する際に使用。基本的なCLI操作を行うことはできるが、DockerFileなどを空から書くのは苦戦するレベル。' },
  { name: 'Git', icon: <FaGitAlt />, level: 30, description: 'バージョン管理を行うのに使用。基本的な操作を行うことができるレベル。' },
];

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  return (
    <motion.div
      className="relative group bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center mb-4">
        <div className="text-4xl mr-4 text-purple-400">{skill.icon}</div>
        <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
        <motion.div
          className="bg-purple-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <p className="text-gray-400 text-sm">{skill.level}% Proficiency</p>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <p className="text-white text-center p-4">{skill.description}</p>
      </motion.div>
    </motion.div>
  );
};

export const Skills: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <section 
      ref={ref} 
      className="relative py-20 bg-black" 
      id="skills"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 via-purple-900/5 to-gray-900/5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-4xl font-bold text-center text-purple-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Tech Stack
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;