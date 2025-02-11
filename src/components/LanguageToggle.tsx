import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative group glass-effect px-3 py-2 rounded-xl text-gray-300 hover:text-white transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={language === "ja" ? "Switch to English" : "日本語に切り替え"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={language}
          className="relative text-sm font-medium tracking-wider"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <span
              className={language === "ja" ? "text-purple-400" : "opacity-50"}
            >
              JP
            </span>
            <span className="opacity-50">/</span>
            <span
              className={language === "en" ? "text-purple-400" : "opacity-50"}
            >
              EN
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ホバー時のグラデーション効果 */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(139, 92, 246, 0.1))",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      />
    </motion.button>
  );
};
