"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="border-t border-white/10 px-4 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center text-sm text-zinc-500 md:flex-row md:justify-between md:text-left">
        <p>
          <span className="font-mono text-zinc-400">
            <span className="text-accent-400">~/</span>shigure
          </span>{" "}
          © {new Date().getFullYear()}
        </p>
        <p>{translations[language].footer.tagline}</p>
      </div>
    </footer>
  );
};

export default Footer;
