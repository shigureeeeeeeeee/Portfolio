import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      type="button"
      onClick={toggleLanguage}
      className="flex items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 font-mono text-xs font-semibold text-zinc-400 transition-colors hover:border-accent-400/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400"
      whileTap={{ scale: 0.95 }}
      aria-label={language === "ja" ? "Switch to English" : "日本語に切り替え"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={language}
          className="flex items-center gap-1"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
        >
          <span className={language === "ja" ? "text-accent-400" : ""}>JA</span>
          <span className="text-zinc-600">/</span>
          <span className={language === "en" ? "text-accent-400" : ""}>EN</span>
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default LanguageToggle;
