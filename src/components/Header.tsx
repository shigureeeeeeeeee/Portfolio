"use client"; 

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Headerコンポーネントの定義
const Header: React.FC = () => {
  // スクロール状態を管理するstate
  const [isScrolled, setIsScrolled] = useState(false);
  // アクティブなセクションを管理するstate
  const [activeSection, setActiveSection] = useState("");
  // モバイルメニューの開閉状態を管理するstate
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // スクロール位置を取得するframer-motionのフック
  const { scrollYProgress } = useScroll();
  // スクロールバーのアニメーション設定
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // スクロールイベントを処理するuseEffect
  useEffect(() => {
    const handleScroll = () => {
      // スクロール位置が50px以上ならヘッダーの背景を変更
      setIsScrolled(window.scrollY > 50);

      // 各セクションの位置を確認し、現在のアクティブセクションを設定
      const sections = ["home", "about", "skills", "projects"];
      let current = "";

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            current = section;
            break;
          }
        }
      }

      // ページ最下部の場合、最後のセクションをアクティブに
      if (!current && window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        current = sections[sections.length - 1];
      }

      setActiveSection(current);
    };

    // スクロールイベントリスナーを追加
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期状態を設定するために一度呼び出す
    // コンポーネントのアンマウント時にイベントリスナーを削除
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 指定されたIDの要素にスムーズスクロールする関数
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // スクロール後にモバイルメニューを閉じる
  };

  // ナビゲーションメニューの項目
  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      } text-white`}
    >
      {/* スクロールプログレスバー */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500"
        style={{ scaleX }}
      />
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-center items-center">
          {/* ロゴ（現在は非表示） */}
          <motion.h1
            className="text-2xl font-bold text-purple-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            
          </motion.h1>
          {/* デスクトップ用ナビゲーションメニュー */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-lg hover:text-purple-400 transition-colors ${
                  activeSection === item.id ? "text-purple-400 font-bold" : ""
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
          {/* テーマ切り替えボタンとモバイルメニューボタン（現在は非表示） */}
          {/* <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800 text-purple-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </motion.button>
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-2xl text-purple-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </motion.button>
            </div>
          </div> */}
        </div>
      </nav>
      {/* モバイル用ナビゲーションメニュー */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-gray-900 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block w-full py-2 px-4 text-left text-lg hover:bg-gray-800 transition-colors ${
                activeSection === item.id ? "bg-gray-800 text-purple-400 font-bold" : ""
              }`}
              whileHover={{ x: 10 }}
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </header>
  );
};

export default Header;