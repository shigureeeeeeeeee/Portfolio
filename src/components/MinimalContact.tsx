"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowUp,
  FiCopy,
  FiCheck
} from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

// スクロールトップボタン
const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 glass-card rounded-full hover:scale-110 transition-transform duration-300 z-50"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <FiArrowUp className="text-purple-400" size={20} />
    </motion.button>
  );
};

// メインのMinimalContactコンポーネント
export const MinimalContact: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const contactEmail = "b1022150@fun.ac.jp";

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
      alert(translations[language].footer.copyFailed);
    }
  }, [contactEmail, language]);

  const socialLinks = [
    {
      icon: <FiGithub size={18} />,
      url: "https://github.com/shigureeeeeeeeee",
      label: "GitHub",
    },
    {
      icon: <FiLinkedin size={18} />,
      url: "https://www.linkedin.com/in/%E9%81%94%E4%BA%BA-%E7%AB%8B%E7%9F%B3-aaa63131b/",
      label: "LinkedIn",
    },
    {
      icon: <FiTwitter size={18} />,
      url: "https://twitter.com/shigure_FUN",
      label: "Twitter",
    },
  ];

  return (
    <>
      <section ref={ref} className="relative py-16" id="contact">
        <div className="container mx-auto px-4 relative z-10">
          {/* セクションタイトル */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-display font-bold text-gradient mb-4">
              {language === 'ja' ? 'お問い合わせ' : 'Contact'}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {language === 'ja' 
                ? 'お気軽にご連絡ください。'
                : 'Feel free to reach out!'}
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* メール & ソーシャル */}
            <motion.div
              className="glass-card p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                {/* メールアドレス */}
                <motion.button
                  onClick={copyEmail}
                  className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-white hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMail className="w-4 h-4" />
                  {copied ? (
                    <>
                      <FiCheck className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-medium">
                        {translations[language].footer.copied}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">{contactEmail}</span>
                      <FiCopy className="w-4 h-4" />
                    </>
                  )}
                </motion.button>

                {/* ソーシャルリンク */}
                <div className="flex items-center space-x-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass-effect rounded-lg text-gray-400 hover:text-purple-400 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={link.label}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>

                {/* コピーライト */}
                <div className="text-center sm:text-right">
                  <p className="text-sm text-gray-500">
                    © 2024 Tatsuto Tateishi
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* スクロールトップボタン */}
      <ScrollToTopButton />
    </>
  );
};

export default MinimalContact;