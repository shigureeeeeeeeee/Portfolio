"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="border-t border-white/10 px-4 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center text-sm text-zinc-500 md:flex-row md:justify-between md:text-left">
        <p>
          <span className="font-mono text-zinc-400">
            <span className="text-accent-400">~/</span>shigure
          </span>{" "}
          © {new Date().getFullYear()}
        </p>
        <p>{translations[language].footer.tagline}</p>
        <a
          href="#home"
          className="rounded font-mono text-xs text-zinc-500 transition-colors hover:text-accent-400"
        >
          ↑ {translations[language].footer.backToTop}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
