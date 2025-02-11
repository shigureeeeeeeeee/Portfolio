"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

export const Hero: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const socialLinks = [
    {
      icon: <FaGithub size={24} />,
      url: "https://github.com/shigureeeeeeeeee",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin size={24} />,
      url: "https://www.linkedin.com/in/%E9%81%94%E4%BA%BA-%E7%AB%8B%E7%9F%B3-aaa63131b/",
      label: "LinkedIn",
    },
    {
      icon: <FaTwitter size={24} />,
      url: "https://twitter.com/shigure_FUN",
      label: "Twitter",
    },
  ];

  if (!isMounted) return null;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4"
      id="home"
    >
      {/* シンプルな背景グラデーション */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent" />
      </div>

      {/* グラデーションテキストのスタイル */}
      <style jsx global>{`
        .text-gradient {
          background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            {/* プロフィール画像 */}
            <motion.div
              className="relative w-64 h-64 mx-auto mb-12 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-full gradient-border">
                <div className="w-full h-full rounded-full overflow-hidden bg-background">
                  <Image
                    src="/img/icon.jpg"
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* 歓迎メッセージ */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {translations[language].hero.welcome}
            </motion.h1>

            {/* 自己紹介テキスト */}
            <motion.p
              className="text-2xl text-gray-200 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {translations[language].hero.description}
            </motion.p>
          </motion.div>

          {/* ソーシャルリンクとプロジェクトボタン */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center gap-10"
          >
            {/* ソーシャルリンク */}
            <div className="flex gap-8">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full hover:text-purple-400 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>

            {/* プロジェクトボタン */}
            <motion.button
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-8 py-3 text-base font-medium text-white/90 border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              {translations[language].hero.viewProjects}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* シンプルなスクロールインジケーター */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 border border-white/20 rounded-full relative">
          <div className="w-1 h-1 bg-white/50 rounded-full absolute left-1/2 top-2 -translate-x-1/2" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
