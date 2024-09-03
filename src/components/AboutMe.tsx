import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import Image from 'next/image';
import { FaCode, FaLaptopCode, FaBookReader, FaGraduationCap, FaCoffee, FaUniversity, FaAward, FaProjectDiagram, FaBriefcase } from 'react-icons/fa';
import { aboutMeContent, AboutMeContent } from '../data/aboutMe';

type TabId = 'profile' | 'education' | 'achievements' | 'interests' | 'experience';

type TabContent = {
  [key in TabId]: JSX.Element;
};

const AboutMe: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  const tabs: { id: TabId; label: string; icon: JSX.Element }[] = [
    { id: 'profile', label: 'プロフィール', icon: <FaGraduationCap /> },
    { id: 'education', label: '学歴', icon: <FaUniversity /> },
    { id: 'achievements', label: '実績', icon: <FaAward /> },
    { id: 'interests', label: '興味分野', icon: <FaProjectDiagram /> },
    { id: 'experience', label: '経験', icon: <FaBriefcase /> },
  ];

  const tabContent: TabContent = {
    profile: (
      <>
        {aboutMeContent.profile.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-300 mb-4">{paragraph}</p>
        ))}
      </>
    ),
    education: (
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        {aboutMeContent.education.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ),
    achievements: (
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        {aboutMeContent.achievements.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ),
    interests: (
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        {aboutMeContent.interests.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ),
    experience: (
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        {aboutMeContent.experience.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ),
  };

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-gray-800" id="about">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-purple-900/5 to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center text-purple-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            className="lg:w-1/3 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full opacity-75 blur-2xl"></div>
              <Image
                src="/img/icon.jpg"
                alt="shigure"
                layout="fill"
                objectFit="cover"
                className="rounded-full border-4 border-purple-500/50 relative z-10"
              />
            </div>
          </motion.div>
          <motion.div
            className="lg:w-2/3 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-4xl font-semibold text-purple-300 mb-4">Hello!</h3>
            <div className="flex justify-center lg:justify-start space-x-4 mb-6">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-full ${
                    activeTab === tab.id ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </motion.button>
              ))}
            </div>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {tabContent[activeTab]}
            </motion.div>
            <div className="mt-6 flex items-center justify-center lg:justify-start">
              <FaCoffee className="text-purple-400 mr-2" />
              <span className="text-gray-300">趣味：{aboutMeContent.hobbies}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;