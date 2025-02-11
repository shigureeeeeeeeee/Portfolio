"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import Image from "next/image";
import {
  FaCode,
  FaLaptopCode,
  FaBookReader,
  FaGraduationCap,
  FaCoffee,
  FaUniversity,
  FaAward,
  FaProjectDiagram,
  FaBriefcase,
  FaGamepad,
  FaMusic,
  FaCamera,
  FaBook,
  FaPalette,
  FaCalendarAlt,
  FaMedal,
  FaLightbulb,
  FaRocket,
  FaChevronRight,
} from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

type TabId = "profile" | "education" | "interests" | "experience";

type TabContent = {
  [key in TabId]: JSX.Element;
};

const HobbyCard: React.FC<{
  icon: JSX.Element;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <motion.div
    className="glass-effect p-4 rounded-xl flex flex-col items-center gap-2 hover-lift h-[180px]"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="text-purple-400 text-2xl">{icon}</div>
    <h4 className="text-gradient-static font-semibold">{title}</h4>
    <p className="text-gray-400 text-sm text-center line-clamp-3">
      {description}
    </p>
  </motion.div>
);

const TimelineItem: React.FC<{
  year: string;
  title: string;
  description: string;
  icon?: JSX.Element;
}> = ({ year, title, description, icon }) => (
  <div className="flex gap-4 relative">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full glass-effect flex items-center justify-center text-purple-400">
        {icon || <FaCalendarAlt />}
      </div>
      <div className="w-0.5 h-full bg-purple-500/20 absolute top-12 left-6 -z-10" />
    </div>
    <div className="flex-1 glass-effect p-4 rounded-xl mb-8">
      <div className="text-sm text-purple-400 mb-1">{year}</div>
      <h4 className="text-gradient-static font-semibold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </div>
);

const AchievementCard: React.FC<{
  icon: JSX.Element;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <motion.div
    className="glass-effect p-4 rounded-xl flex items-start gap-4 hover-lift"
    whileHover={{ scale: 1.02 }}
  >
    <div className="text-purple-400 text-2xl mt-1">{icon}</div>
    <div>
      <h4 className="text-gradient-static font-semibold mb-1">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </motion.div>
);

const InterestCard: React.FC<{
  icon: JSX.Element;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <motion.div
    className="glass-effect p-4 rounded-xl hover-lift"
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="text-purple-400 text-xl">{icon}</div>
      <h4 className="text-gradient-static font-semibold">{title}</h4>
    </div>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.div>
);

const TabButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  icon: JSX.Element;
  label: string;
}> = ({ isActive, onClick, icon, label }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center px-6 py-3 rounded-xl text-sm transition-all duration-300 ${
      isActive
        ? "glass-card neon-glow text-white font-medium"
        : "glass-effect text-gray-400 hover:text-white"
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-lg">{icon}</span>
    <span className="ml-2">{label}</span>
    {isActive && (
      <motion.span
        className="ml-2 text-purple-400"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <FaChevronRight size={12} />
      </motion.span>
    )}
  </motion.button>
);

const AboutMe: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const { language } = useLanguage();

  const tabs = [
    {
      id: "profile" as TabId,
      label: translations[language].about.tabs.profile,
      icon: <FaGraduationCap />,
    },
    {
      id: "education" as TabId,
      label: translations[language].about.tabs.education,
      icon: <FaUniversity />,
    },
    {
      id: "interests" as TabId,
      label: translations[language].about.tabs.interests,
      icon: <FaProjectDiagram />,
    },
    {
      id: "experience" as TabId,
      label: translations[language].about.tabs.experience,
      icon: <FaBriefcase />,
    },
  ];

  const hobbies = translations[language].about.hobbies.items.map(
    (hobby, index) => ({
      icon: [
        <FaGamepad />,
        <FaMusic />,
        <FaCamera />,
        <FaBook />,
        <FaPalette />,
      ][index],
      title: hobby.title,
      description: hobby.description,
    })
  );

  const tabContent: TabContent = {
    profile: (
      <div className="space-y-6">
        {translations[language].about.profile.paragraphs.map(
          (paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-gray-300 leading-relaxed"
            >
              {paragraph}
            </motion.p>
          )
        )}
      </div>
    ),
    education: (
      <div className="space-y-4">
        {translations[language].about.education.map((item, index) => (
          <TimelineItem
            key={index}
            year={item.split(" - ")[0]}
            title={item.split(" - ")[1]}
            description={item.split(" - ")[2] || ""}
            icon={<FaUniversity />}
          />
        ))}
      </div>
    ),
    interests: (
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {translations[language].about.interests.map((item, index) => (
            <InterestCard
              key={index}
              icon={<FaLightbulb />}
              title={item.split(" - ")[0]}
              description={item.split(" - ")[1] || ""}
            />
          ))}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gradient-static mb-4">
            {translations[language].about.hobbies.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <HobbyCard {...hobby} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
    experience: (
      <div className="space-y-4">
        {translations[language].about.experience.map((item, index) => (
          <TimelineItem
            key={index}
            year={item.split(" - ")[0]}
            title={item.split(" - ")[1]}
            description={item.split(" - ")[2] || ""}
            icon={<FaRocket />}
          />
        ))}
      </div>
    ),
  };

  return (
    <section ref={ref} className="relative py-20" id="about">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-5xl font-bold text-center mb-16 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {translations[language].about.title}
        </motion.h2>

        <div className="max-w-5xl mx-auto">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* タブナビゲーション */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  icon={tab.icon}
                  label={tab.label}
                />
              ))}
            </div>

            {/* タブコンテンツ */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-effect p-8 rounded-2xl"
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* 装飾的な背景要素 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default AboutMe;
