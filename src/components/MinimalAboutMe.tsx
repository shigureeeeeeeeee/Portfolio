"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  FiUser, 
  FiBookOpen, 
  FiHeart, 
  FiBriefcase,
  FiCode,
  FiMusic,
  FiCamera,
  FiBook,
  FiCalendar,
  FiAward,
  FiTarget
} from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

type TabId = "profile" | "education" | "interests" | "experience";

// ミニマルなタブボタン
const MinimalTabButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  index: number;
}> = ({ isActive, onClick, icon, label, index }) => (
  <motion.button
    onClick={onClick}
    className={`relative flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive 
        ? 'text-white bg-white/10 backdrop-blur-sm' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <span className={`${isActive ? 'text-purple-400' : ''}`}>{icon}</span>
    <span>{label}</span>
    
    {/* アクティブインジケーター */}
    {isActive && (
      <motion.div
        className="absolute inset-0 rounded-full border border-purple-500/50"
        layoutId="activeAboutTab"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
  </motion.button>
);

// シンプルなタイムラインアイテム
const MinimalTimelineItem: React.FC<{
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}> = ({ year, title, description, icon, index }) => (
  <motion.div
    className="flex gap-4 relative"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    {/* アイコンとライン */}
    <div className="flex flex-col items-center">
      <motion.div 
        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {icon}
      </motion.div>
      <div className="w-px h-full bg-gradient-to-b from-purple-500/30 to-transparent absolute top-10 left-5" />
    </div>
    
    {/* コンテンツ */}
    <div className="flex-1 pb-8">
      <div className="text-sm text-purple-400 font-medium mb-1">{year}</div>
      <h4 className="text-white font-semibold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// シンプルな趣味カード
const MinimalHobbyCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}> = ({ icon, title, description, index }) => (
  <motion.div
    className="glass-card p-4 text-center group cursor-pointer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -4, scale: 1.02 }}
  >
    <motion.div 
      className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
      whileHover={{ rotate: 10, scale: 1.1 }}
    >
      {icon}
    </motion.div>
    <h4 className="text-white font-medium mb-2 group-hover:text-gradient transition-all duration-300">
      {title}
    </h4>
    <p className="text-gray-400 text-sm leading-relaxed">
      {description}
    </p>
  </motion.div>
);

// 興味分野カード
const InterestCard: React.FC<{
  title: string;
  description: string;
  index: number;
}> = ({ title, description, index }) => (
  <motion.div
    className="glass-card p-4 group cursor-pointer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -2, scale: 1.01 }}
  >
    <div className="flex items-start space-x-3">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 mt-1 group-hover:text-purple-300 transition-colors duration-300">
        <FiTarget size={16} />
      </div>
      <div className="flex-1">
        <h4 className="text-white font-medium mb-1 group-hover:text-gradient transition-all duration-300">
          {title}
        </h4>
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

// メインのMinimalAboutMeコンポーネント
export const MinimalAboutMe: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const { language } = useLanguage();

  const tabs = [
    {
      id: "profile" as TabId,
      label: translations[language].about.tabs.profile,
      icon: <FiUser size={16} />,
    },
    {
      id: "education" as TabId,
      label: translations[language].about.tabs.education,
      icon: <FiBookOpen size={16} />,
    },
    {
      id: "interests" as TabId,
      label: translations[language].about.tabs.interests,
      icon: <FiHeart size={16} />,
    },
    {
      id: "experience" as TabId,
      label: translations[language].about.tabs.experience,
      icon: <FiBriefcase size={16} />,
    },
  ];

  // 趣味データの準備
  const hobbies = translations[language].about.hobbies.items.map((hobby, index) => ({
    icon: [
      <FiCode size={20} />,
      <FiMusic size={20} />,
      <FiCamera size={20} />,
      <FiBook size={20} />,
      <FiCode size={20} />,
    ][index] || <FiCode size={20} />,
    title: hobby.title,
    description: hobby.description,
  }));

  const tabContent = {
    profile: (
      <div className="space-y-6">
        {translations[language].about.profile.paragraphs.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="text-gray-300 leading-relaxed text-base"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    ),
    education: (
      <div className="space-y-6">
        {translations[language].about.education.map((item, index) => (
          <MinimalTimelineItem
            key={index}
            year={item.split(" - ")[0]}
            title={item.split(" - ")[1]}
            description={item.split(" - ")[2] || ""}
            icon={<FiBookOpen size={16} />}
            index={index}
          />
        ))}
      </div>
    ),
    interests: (
      <div className="space-y-8">
        {/* 興味分野 */}
        <div className="space-y-4">
          {translations[language].about.interests.map((item, index) => (
            <InterestCard
              key={index}
              title={item.split(" - ")[0]}
              description={item.split(" - ")[1] || ""}
              index={index}
            />
          ))}
        </div>
        
        {/* 趣味 */}
        <div>
          <motion.h3 
            className="text-lg font-semibold text-gradient mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {translations[language].about.hobbies.title}
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hobbies.map((hobby, index) => (
              <MinimalHobbyCard
                key={hobby.title}
                icon={hobby.icon}
                title={hobby.title}
                description={hobby.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    experience: (
      <div className="space-y-6">
        {translations[language].about.experience.map((item, index) => (
          <MinimalTimelineItem
            key={index}
            year={item.split(" - ")[0]}
            title={item.split(" - ")[1]}
            description={item.split(" - ")[2] || ""}
            icon={<FiAward size={16} />}
            index={index}
          />
        ))}
      </div>
    ),
  };

  return (
    <section ref={ref} className="relative py-20" id="about">
      <div className="container mx-auto px-4 relative z-10">
        {/* セクションタイトル */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-display font-bold text-gradient mb-4">
            {translations[language].about.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {language === 'ja' 
              ? '私について、学歴、興味分野、そして経験をご紹介します。'
              : 'Learn about me, my education, interests, and experience.'}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* タブナビゲーション */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {tabs.map((tab, index) => (
              <MinimalTabButton
                key={tab.id}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                icon={tab.icon}
                label={tab.label}
                index={index}
              />
            ))}
          </motion.div>

          {/* タブコンテンツ */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 rounded-2xl"
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MinimalAboutMe;