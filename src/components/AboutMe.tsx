import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import Image from 'next/image';
import { FaCode, FaLaptopCode, FaBookReader, FaGraduationCap, FaCoffee, FaUniversity, FaAward, FaProjectDiagram } from 'react-icons/fa';
import { aboutMeContent } from '../data/aboutMe';

// タブのIDを定義する型
type TabId = 'profile' | 'education' | 'achievements' | 'interests';

// タブの内容を定義する型
type TabContent = {
  [key in TabId]: JSX.Element;
};

// AboutMeコンポーネントの定義
const AboutMe: React.FC = () => {
  // セクションの参照を作成
  const ref = useRef<HTMLDivElement>(null);
  // セクションが表示されているかどうかを検出
  const isInView = useInView(ref, { threshold: 0.1 });
  // アクティブなタブを管理するstate
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  // タブの定義
  const tabs: { id: TabId; label: string; icon: JSX.Element }[] = [
    { id: 'profile', label: 'プロフィール', icon: <FaGraduationCap /> },
    { id: 'education', label: '学歴', icon: <FaUniversity /> },
    { id: 'achievements', label: '実績', icon: <FaAward /> },
    { id: 'interests', label: '興味分野', icon: <FaProjectDiagram /> },
  ];

  // タブの内容を定義
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
  };

  return (
    // AboutMeセクション
    <section ref={ref} className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-gray-800" id="about">
      {/* 背景のグラデーション効果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-purple-900/5 to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* セクションタイトル */}
        <motion.h2
          className="text-4xl font-bold text-center text-purple-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* プロフィール画像 */}
          <motion.div
            className="lg:w-1/3 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 mx-auto">
              {/* 画像の背景エフェクト */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full opacity-75 blur-2xl"></div>
              {/* プロフィール画像 */}
              <Image
                src="/img/icon.jpg"
                alt="shigure"
                layout="fill"
                objectFit="cover"
                className="rounded-full border-4 border-purple-500/50 relative z-10"
              />
            </div>
          </motion.div>

          {/* プロフィール情報 */}
          <motion.div
            className="lg:w-2/3 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-4xl font-semibold text-purple-300 mb-4">Hello!</h3>
            
            {/* タブボタン */}
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

            {/* タブの内容 */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {tabContent[activeTab]}
            </motion.div>

            {/* 趣味セクション */}
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