// 必要なモジュールとコンポーネントをインポート
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowUp, FaHeart } from "react-icons/fa";
import Link from "next/link";

// Footerコンポーネントの定義
const Footer: React.FC = () => {
  // メールアドレスがコピーされたかどうかを管理するstate
  const [copied, setCopied] = useState(false);
  // 要素が画面内に表示されているかを検出するフック
  const [ref, inView] = useInView({ threshold: 0.1 });
  // アニメーションを制御するフック
  const controls = useAnimation();
  // 連絡先メールアドレス
  const contactEmail = "b1022150@fun.ac.jp";

  // 要素が画面内に表示されたらアニメーションを開始
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // メールアドレスをクリップボードにコピーする関数
  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      // 2秒後にコピー成功メッセージを非表示にする
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
      alert("メールアドレスのコピーに失敗しました。もう一度お試しください。");
    }
  }, [contactEmail]);

  // ソーシャルリンクの配列
  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/shigureeeeeeeeee", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/%E9%81%94%E4%BA%BA-%E7%AB%8B%E7%9F%B3-aaa63131b/", label: "LinkedIn" },
    { icon: <FaTwitter />, url: "https://twitter.com/shigure_FUN", label: "Twitter" },
  ];

  // 連絡先情報の配列
  const contactInfo = [
    { icon: <FaEnvelope />, text: contactEmail, action: copyEmail, label: "Email" },
  ];

  // ナビゲーション項目の配列
  const navItems = ["Home", "About", "Skills", "Projects"];

  return (
    // フッターセクション全体のコンテナ
    <footer ref={ref} className="relative py-16 bg-gradient-to-b from-gray-900 to-black text-white" id="contact">
      {/* 背景のグラデーション効果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-blue-900/5 to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* フッターコンテンツのグリッド */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
            hidden: { opacity: 0, y: 50 }
          }}
        >
          {/* 連絡先情報 */}
          <motion.div variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}>
            <h2 className="text-3xl font-bold text-purple-400 mb-6">Contact</h2>
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="flex items-center mb-4 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={info.action}
              >
                <span className="text-purple-400 mr-2">{info.icon}</span>
                <span className="text-lg hover:text-purple-400 transition-colors">
                  {info.text}
                </span>
              </motion.div>
            ))}
            {/* メールアドレスコピー成功時のメッセージ */}
            <AnimatePresence>
              {copied && (
                <motion.p
                  className="text-green-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  メールアドレスをコピーしました！
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
          {/* ナビゲーションリンク */}
          <motion.div variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}>
            <h2 className="text-3xl font-bold text-purple-400 mb-6">Links</h2>
            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase()}`} className="hover:text-purple-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
          {/* ソーシャルリンク */}
          <motion.div variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}>
            <h2 className="text-3xl font-bold text-purple-400 mb-6">Follow</h2>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-purple-400 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
        {/* コピーライト情報 */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
            hidden: { opacity: 0 }
          }}
        >
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} shigure. All rights reserved.
          </p>
          <motion.p
            className="text-sm text-gray-400 mt-2"
            whileHover={{ scale: 1.1 }}
          >
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;