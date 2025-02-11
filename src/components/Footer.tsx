"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaHeart,
  FaArrowUp,
} from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

// Footerコンポーネントの定義
const Footer: React.FC = () => {
  // メールアドレスがコピーされたかどうかを管理するstate
  const [copied, setCopied] = useState(false);
  // 連絡先メールアドレス
  const contactEmail = "b1022150@fun.ac.jp";
  const { language } = useLanguage();

  // メールアドレスをクリップボードにコピーする関数
  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      // 2秒後にコピー成功メッセージを非表示にする
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
      alert(translations[language].footer.copyFailed);
    }
  }, [contactEmail, language]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  // ソーシャルリンクの配列
  const socialLinks = [
    {
      icon: <FaGithub size={20} />,
      url: "https://github.com/shigureeeeeeeeee",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin size={20} />,
      url: "https://www.linkedin.com/in/%E9%81%94%E4%BA%BA-%E7%AB%8B%E7%9F%B3-aaa63131b/",
      label: "LinkedIn",
    },
    {
      icon: <FaTwitter size={20} />,
      url: "https://twitter.com/shigure_FUN",
      label: "Twitter",
    },
  ];

  // ナビゲーション項目の配列
  const navItems = [
    { name: translations[language].nav.home, href: "#home" },
    { name: translations[language].nav.about, href: "#about" },
    { name: translations[language].nav.skills, href: "#skills" },
    { name: translations[language].nav.projects, href: "#projects" },
  ];

  return (
    <footer className="relative py-16" id="contact">
      {/* トップに戻るボタン */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 glass-card rounded-full hover:scale-110 transition-transform duration-300 z-50"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FaArrowUp className="text-purple-400" size={20} />
      </motion.button>

      <div className="container mx-auto px-4">
        <div className="glass-card p-8 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* ナビゲーション */}
            <div>
              <h3 className="text-lg font-semibold text-gradient-static mb-6">
                {translations[language].footer.navigation}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="glass-effect px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* コンタクト */}
            <div>
              <h3 className="text-lg font-semibold text-gradient-static mb-6">
                {translations[language].footer.contact}
              </h3>
              <div className="flex justify-center">
                <motion.button
                  onClick={copyEmail}
                  className="flex items-center gap-2 glass-effect px-4 py-2 rounded-lg text-sm group hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope className="text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300">{contactEmail}</span>
                  {copied && (
                    <span className="text-xs text-purple-400 ml-2">
                      {translations[language].footer.copied}
                    </span>
                  )}
                </motion.button>
              </div>
            </div>

            {/* ソーシャルリンク */}
            <div>
              <h3 className="text-lg font-semibold text-gradient-static mb-6">
                {translations[language].footer.social}
              </h3>
              <div className="flex justify-center gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-effect p-3 rounded-lg text-gray-400 hover:text-purple-400 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
