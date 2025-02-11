"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiCode,
  FiFolder,
  FiMail,
  FiChevronUp,
} from "react-icons/fi";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import Link from "next/link";

// Headerコンポーネントの定義
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // スクロール方向の検出
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest < lastScrollY;
    setIsScrollingUp(direction);
    setLastScrollY(latest);
  });

  // ナビゲーション項目の定義
  const navItems = [
    {
      name: translations[language].nav.home,
      href: "#home",
      icon: <FiHome className="w-4 h-4" />,
    },
    {
      name: translations[language].nav.about,
      href: "#about",
      icon: <FiUser className="w-4 h-4" />,
    },
    {
      name: translations[language].nav.skills,
      href: "#skills",
      icon: <FiCode className="w-4 h-4" />,
    },
    {
      name: translations[language].nav.projects,
      href: "#projects",
      icon: <FiFolder className="w-4 h-4" />,
    },
  ];

  // スクロールハンドラー
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);

    const sections = navItems.map((item) => item.href.slice(1));
    const currentSection = sections.find((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });

    if (currentSection) {
      setActiveSection(currentSection);
    }
  }, [navItems]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // キーボードナビゲーション
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  // スムーズスクロール
  const scrollToSection = (
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
    setIsOpen(false);
  };

  // トップへスクロール
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-white/10 py-1 shadow-lg shadow-purple-500/5"
          : "bg-transparent py-3"
      }`}
      initial={{ y: -100 }}
      animate={{
        y: isScrollingUp || !isScrolled ? 0 : -100,
        opacity: isScrollingUp || !isScrolled ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      role="banner"
    >
      {/* スクロールプログレスバー */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 origin-left"
        style={{ scaleX }}
      />

      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav
          className="flex items-center justify-center h-16"
          role="navigation"
        >
          {/* デスクトップナビゲーション */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 relative overflow-hidden ${
                  activeSection === item.href.slice(1)
                    ? "text-white glass-effect shadow-md shadow-purple-500/10"
                    : "text-white/70 hover:text-white"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                aria-current={
                  activeSection === item.href.slice(1) ? "page" : undefined
                }
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {item.icon}
                <span className="text-sm font-medium relative z-10">
                  {item.name}
                </span>
                {activeSection === item.href.slice(1) && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-violet-500/20"
                    layoutId="activeSection"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* 言語切り替えボタン */}
          <motion.div
            className="hidden md:block absolute right-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <LanguageToggle />
          </motion.div>

          {/* モバイルメニューボタン */}
          <motion.button
            className="md:hidden relative p-2 glass-effect rounded-xl text-white/90 hover:text-white transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* モバイルメニュー */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden glass-effect rounded-2xl mt-2 overflow-hidden border border-white/10 shadow-lg shadow-purple-500/5"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              role="menu"
            >
              <div className="py-4 px-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                      activeSection === item.href.slice(1)
                        ? "bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-white shadow-sm shadow-purple-500/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    role="menuitem"
                    aria-current={
                      activeSection === item.href.slice(1) ? "page" : undefined
                    }
                    whileHover={{ x: 4 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {item.icon}
                    <span className="relative z-10">{item.name}</span>
                  </motion.a>
                ))}
                <motion.div
                  className="flex justify-center mt-4 pt-4 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <LanguageToggle />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* トップへ戻るボタン */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            className="fixed bottom-8 right-8 p-3 glass-effect rounded-full hover:scale-110 transition-transform duration-300 z-50 shadow-lg shadow-purple-500/10"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ y: -2 }}
            aria-label="Scroll to top"
          >
            <FiChevronUp className="text-purple-400" size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
