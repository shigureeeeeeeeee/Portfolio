"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageToggle from "@/components/common/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

const SECTION_IDS = ["home", "about", "skills", "projects", "contact"] as const;

export const Header: React.FC = () => {
  const { language } = useLanguage();
  const copy = translations[language];
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = useMemo(
    () => SECTION_IDS.map((id) => ({ id, label: copy.nav[id] })),
    [copy.nav]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
      const current = SECTION_IDS.map((id) => document.getElementById(id)).find(
        (section) => {
          if (!section) return false;
          const rect = section.getBoundingClientRect();
          return rect.top <= 140 && rect.bottom >= 140;
        }
      );
      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        {copy.common.skipToContent}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || mobileOpen
            ? "border-white/10 bg-zinc-950/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-10">
          <a
            href="#home"
            className="rounded font-mono text-sm font-semibold tracking-tight text-white"
            aria-label="Shigure — Home"
            onClick={() => setMobileOpen(false)}
          >
            <span className="text-accent-400">~/</span>shigure
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                  aria-current={isActive ? "location" : undefined}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-px h-px bg-accent-400"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex size-9 items-center justify-center rounded-md border border-white/10 text-zinc-300 transition-colors hover:border-white/25 hover:text-white md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? copy.common.closeMenu : copy.common.openMenu}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              id="mobile-navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/10 bg-zinc-950/95 md:hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-md px-3 py-3 text-left text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-white/5 text-accent-400"
                          : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }`}
                      aria-current={isActive ? "location" : undefined}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
