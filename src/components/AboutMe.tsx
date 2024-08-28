import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import Image from 'next/image';
import { FaCode, FaLaptopCode, FaBookReader, FaGraduationCap, FaCoffee, FaUniversity, FaAward, FaProjectDiagram } from 'react-icons/fa';

type TabId = 'profile' | 'education' | 'achievements' | 'interests';

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
  ];

  const tabContent: TabContent = {
    profile: (
      <>
        <p className="text-gray-300 mb-4">
          はじめまして。公立はこだて未来大学の学生で、Web開発とAI技術に情熱を注いでいます。私の目標は、技術を通じて人々の生活を豊かにし、社会に貢献することです。
        </p>
        <p className="text-gray-300 mb-4">
          大学では情報科学を専攻し、アルゴリズム、データ構造、機械学習の基礎を学んでいます。授業外では、React、Next.js、TypeScriptを用いたWebアプリケーション開発に取り組み、ユーザー体験の向上に力を入れています。また、PythonとTensorFlowを活用し、画像認識や自然言語処理などのAIプロジェクトにも挑戦しています。
        </p>
        <p className="text-gray-300 mb-4">
          最近は、Pythonを使って日常生活を便利にするアプリケーションの開発にも取り組んでいます。例えば、自動化スクリプトやスケジュール自動生成アプリなど、実用的なソリューションの作成に挑戦しています。
        </p>
        <p className="text-gray-300 mb-4">
          技術の急速な進化に常に興味を持ち、新しい知識やスキルの習得に励んでいます。将来は、Web技術とAIを融合させた革新的なサービスを開発し、テクノロジーの力で社会課題の解決に貢献したいと考えています。
        </p>
      </>
    ),
    education: (
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        <li>公立はこだて未来大学 システム情報科学部 複雑系知能学科 在学中</li>
        <li>GPA: 2.14/4.0</li>
      </ul>
    ),
    achievements: (
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        <li>AtCoder 茶色</li>
        <li>Paiza Sランク</li>
        <li>TOEIC スコア 645</li>
      </ul>
    ),
    interests: (
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        <li>ウェブアプリケーション開発: React, Next.js, TypeScript</li>
        <li>機械学習と深層学習: TensorFlow, PyTorch</li>
        <li>クラウドコンピューティング: Vercel, Google Cloud Platform</li>
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
              <span className="text-gray-300">趣味：コーヒー、読書、料理、Web開発、競技プログラミング</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;