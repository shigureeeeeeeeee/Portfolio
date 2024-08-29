"use client"; 

import React, { useEffect, useState, useCallback } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import Header from "./Header";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Loading from "./Loading";

// ソーシャルリンクの配列
const socialLinks = [
  { icon: <FaTwitter size={24} />, url: "https://x.com/shigure_FUN", label: "Twitter" },
  { icon: <FaGithub size={24} />, url: "https://github.com/shigureeeeeeeeee", label: "GitHub" },
  { icon: <FaLinkedin size={24} />, url: "https://www.linkedin.com/in/%E9%81%94%E4%BA%BA-%E7%AB%8B%E7%9F%B3-aaa63131b/", label: "LinkedIn" },
];

// コンテナのアニメーション設定
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 子要素のアニメーションを0.1秒ずつ遅らせる
    },
  },
};

// 各アイテムのアニメーション設定
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// Heroコンポーネントの定義
export const Hero: React.FC = () => {
  const { t } = useTranslation(); // 国際化のためのフック
  const controls = useAnimation(); // アニメーションコントロール
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // コンポーネントがマウントされた時の処理
  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2秒後にローディングを終了

    return () => clearTimeout(timer); // クリーンアップ関数
  }, []);

  // 要素が表示された時のアニメーション制御
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // プロジェクトセクションへのスクロール処理
  const scrollToProjects = useCallback(() => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // コンポーネントがマウントされていない場合は何も表示しない
  if (!isMounted) return null;
  // ローディング中はLoadingコンポーネントを表示
  if (isLoading) return <Loading />;

  return (
    <>
      <Header />
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white"
        ref={ref}
      >
        {/* 背景のグラデーション */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-purple-900/10 to-transparent" aria-hidden="true" />
        
        {/* メインコンテンツ */}
        <motion.div
          className="text-center relative z-10 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* プロフィール画像 */}
          <motion.div
            className="mb-8 relative"
            variants={itemVariants}
          >
            {/* 画像の背景エフェクト */}
            <motion.div
              className="absolute inset-0 bg-purple-500 rounded-full filter blur-xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                top: '0%',
                left: '25%',
                width: '50%',
                height: '100%',
              }}
              aria-hidden="true"
            />
            {/* プロフィール画像 */}
            <Image
              src="/img/icon.jpg"
              alt={t("hero.profileAlt")}
              width={128}
              height={128}
              className="rounded-full border-4 border-purple-500 mx-auto relative z-10"
              priority
            />
          </motion.div>
          
          {/* 歓迎メッセージ */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4"
            variants={itemVariants}
          >
            Welcome!
          </motion.h1>
          
          {/* サブタイトル */}
          <motion.div
            className="text-xl md:text-2xl text-gray-300 mb-8"
            variants={itemVariants}
          >
            <motion.span
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Web Developer | AI Enthusiast | Student
            </motion.span>
          </motion.div>
          
          {/* ソーシャルリンク */}
          <motion.div
            className="flex justify-center space-x-4 mb-8"
            variants={itemVariants}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
          
          {/* プロジェクト表示ボタン */}
          <motion.button
            onClick={scrollToProjects}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            variants={itemVariants}
          >
            {t("ViewWork")}
          </motion.button>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;