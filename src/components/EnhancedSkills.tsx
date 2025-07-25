"use client";

import React, { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { IconType } from "react-icons";
import { skillCategories } from "../data/skills";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import { Enhanced3DCard } from "./Enhanced3DEffects";

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

// 円形プログレスバーコンポーネント
const CircularProgress: React.FC<{
  percentage: number;
  size?: number;
  strokeWidth?: number;
  delay?: number;
}> = ({ percentage, size = 120, strokeWidth = 8, delay = 0 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative">
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* 背景円 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(147, 51, 234, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-30"
        />
        {/* プログレス円 */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{
            duration: 1.5,
            delay,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
        {/* グラデーション定義 */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* 中央のパーセンテージ */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-2xl font-bold text-gradient"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
        >
          {percentage}%
        </motion.span>
      </div>
    </div>
  );
};

// 3Dスキルカードコンポーネント
const SkillCard3D: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useLanguage();
  const Icon = skill.icon;

  return (
    <Enhanced3DCard
      className="relative h-[280px] glass-card group cursor-pointer overflow-hidden"
      intensity={8}
      glowEffect={true}
    >
      <div className="p-6 h-full flex flex-col items-center justify-center text-center">
        {/* 3Dアイコン */}
        <motion.div
          className="relative mb-4"
          whileHover={{ 
            rotateY: 360,
            scale: 1.2,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* アイコンのグロー効果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
            <Icon 
              size={48} 
              className="relative z-10 text-purple-400 group-hover:text-white transition-colors duration-300"
            />
          </div>
        </motion.div>

        {/* スキル名 */}
        <h3 className="text-xl font-bold text-gradient-static mb-4 group-hover:text-shadow-glow transition-all duration-300">
          {skill.name}
        </h3>

        {/* 円形プログレス */}
        <div className="mb-4">
          <CircularProgress 
            percentage={skill.level} 
            size={100}
            strokeWidth={6}
            delay={index * 0.2}
          />
        </div>

        {/* スキル説明（ホバー時） */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-300 text-center text-sm leading-relaxed">
                {skill.description[language]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ホバーイベント */}
      <div 
        className="absolute inset-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </Enhanced3DCard>
  );
};

// スキルチャート（レーダーチャート風）
const SkillChart: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const size = 300;
  const center = size / 2;
  const maxRadius = 120;
  const levels = 5;

  // 多角形の頂点を計算
  const getPoint = (index: number, level: number) => {
    const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
    const radius = (level / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // 背景の同心円を描画
  const backgroundPolygons = Array.from({ length: levels }, (_, i) => {
    const level = ((i + 1) * 100) / levels;
    const points = skills.map((_, index) => getPoint(index, level));
    return points.map(p => `${p.x},${p.y}`).join(' ');
  });

  // スキルレベルのポリゴン
  const skillPoints = skills.map((skill, index) => getPoint(index, skill.level));
  const skillPolygon = skillPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex items-center justify-center p-8">
      <svg width={size} height={size} className="drop-shadow-2xl">
        {/* 背景グリッド */}
        {backgroundPolygons.map((polygon, i) => (
          <polygon
            key={i}
            points={polygon}
            fill="none"
            stroke="rgba(147, 51, 234, 0.2)"
            strokeWidth="1"
          />
        ))}

        {/* 軸線 */}
        {skills.map((_, index) => {
          const endPoint = getPoint(index, 100);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="rgba(147, 51, 234, 0.3)"
              strokeWidth="1"
            />
          );
        })}

        {/* スキルレベルのエリア */}
        <motion.polygon
          points={skillPolygon}
          fill="url(#skillGradient)"
          stroke="#8b5cf6"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* スキルポイント */}
        {skillPoints.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#a855f7"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
        ))}

        {/* ラベル */}
        {skills.map((skill, index) => {
          const labelPoint = getPoint(index, 110);
          return (
            <text
              key={skill.name}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm font-medium fill-gray-300"
            >
              {skill.name}
            </text>
          );
        })}

        <defs>
          <radialGradient id="skillGradient">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

// カテゴリータブコンポーネント
const CategoryTabs: React.FC<{
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ categories, activeCategory, onCategoryChange }) => {
  const { language } = useLanguage();

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category, index) => {
        const isActive = activeCategory === category;
        const categoryKey = category === "All" ? "all" : category.toLowerCase();
        
        return (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              isActive 
                ? 'text-white shadow-lg shadow-purple-500/25' 
                : 'text-gray-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* 背景 */}
            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
              isActive 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 opacity-100' 
                : 'bg-white/5 opacity-60 hover:opacity-100'
            }`} />
            
            {/* テキスト */}
            <span className="relative z-10">
              {translations[language].skills.categories[categoryKey as keyof typeof translations[typeof language]["skills"]["categories"]]}
            </span>

            {/* アクティブインジケーター */}
            {isActive && (
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

// メインのEnhancedSkillsコンポーネント
export const EnhancedSkills: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"cards" | "chart">("cards");
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
          <h2 className="text-5xl font-bold text-gradient mb-4">
            {translations[language].skills.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {language === 'ja' 
              ? '私の技術スキルと習熟度をご覧ください。各スキルの詳細は、カードにホバーすると表示されます。'
              : 'Explore my technical skills and proficiency levels. Hover over cards to see detailed descriptions.'}
          </p>
        </motion.div>

        {/* カテゴリータブ */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* 表示モード切り替え */}
        <div className="flex justify-center mb-8">
          <div className="glass-effect rounded-full p-1">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                viewMode === "cards" 
                  ? 'bg-purple-500 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {language === 'ja' ? 'カード表示' : 'Card View'}
            </button>
            <button
              onClick={() => setViewMode("chart")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                viewMode === "chart" 
                  ? 'bg-purple-500 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {language === 'ja' ? 'チャート表示' : 'Chart View'}
            </button>
          </div>
        </div>

        {/* スキル表示 */}
        <AnimatePresence mode="wait">
          {viewMode === "cards" ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {displaySkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.215, 0.610, 0.355, 1.000]
                  }}
                >
                  <SkillCard3D skill={skill} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="chart"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              {displaySkills.length > 0 && (
                <div className="glass-card p-8 rounded-3xl">
                  <SkillChart skills={displaySkills.slice(0, 8)} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EnhancedSkills;