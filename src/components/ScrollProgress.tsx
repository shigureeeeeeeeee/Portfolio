"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const ScrollProgress: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // スムーズなアニメーション用のSpring設定
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 円形プログレスの計算
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = 100;
      setIsVisible(scrolled > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>

      {/* セクションインジケーター（左側） */}
      <motion.div
        className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : -20,
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <SectionIndicator />
      </motion.div>
    </>
  );
};

// セクションインジケーター
const SectionIndicator: React.FC = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期実行
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {sections.map((section, index) => {
        const isActive = activeSection === section.id;
        
        return (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            {/* ドット */}
            <motion.div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? "bg-purple-500 border-purple-500 shadow-lg shadow-purple-500/50"
                  : "bg-transparent border-white/30 group-hover:border-purple-500/70"
              }`}
              animate={{
                scale: isActive ? 1.2 : 1,
              }}
            />
            
            {/* ラベル */}
            <motion.span
              className={`ml-4 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "text-white opacity-100"
                  : "text-gray-400 opacity-0 group-hover:opacity-100"
              }`}
              animate={{
                x: isActive ? 0 : -10,
                opacity: isActive ? 1 : 0,
              }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              {section.label}
            </motion.span>
            
            {/* 接続線 */}
            {index < sections.length - 1 && (
              <div className="absolute top-6 left-1.5 w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default ScrollProgress;