"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageToggle from "@/components/common/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

const SECTION_IDS = ["home", "about", "skills", "projects", "contact"] as const;

export const Header: React.FC = () => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = useMemo(() => {
    const nav = translations[language].nav;
    return SECTION_IDS.map((id) => ({ id, label: nav[id] }));
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
      const current = SECTION_IDS.map((id) => document.getElementById(id)).find(
        (section) => {
          if (!section) return false;
          const rect = section.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
      );
      if (current) {
        setActiveSection((prev) => (prev === current.id ? prev : current.id));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offsetTop - 72, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || mobileOpen
          ? "border-white/10 bg-zinc-950/80 backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-10">
        <button
          onClick={() => handleNavigate("home")}
          className="font-mono text-sm font-semibold tracking-tight text-white"
          aria-label="Back to top"
        >
          <span className="text-accent-400">~/</span>shigure
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-px h-px bg-accent-400"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex size-9 items-center justify-center rounded-md border border-white/10 text-zinc-300 transition-colors hover:border-white/25 hover:text-white md:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/10 md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white/5 text-accent-400"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
