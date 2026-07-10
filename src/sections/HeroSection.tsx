"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const heroCopy = translations[language].hero;

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offset - 72, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden px-4 pt-16 md:px-10 lg:px-16"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-grid-pattern" aria-hidden="true" />
      <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <motion.p
            className="font-mono text-sm text-accent-400"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            {heroCopy.role}
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            {heroCopy.greeting.split("Shigure").length > 1 ? (
              <>
                {heroCopy.greeting.split("Shigure")[0]}
                <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent text-glow">
                  Shigure
                </span>
                {heroCopy.greeting.split("Shigure")[1]}
              </>
            ) : (
              heroCopy.greeting
            )}
          </motion.h1>

          <motion.p
            className="max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            {heroCopy.tagline}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            <button
              onClick={() => scrollTo("projects")}
              className="group flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-accent-400 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
            >
              {heroCopy.viewProjects}
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-accent-400/50 hover:text-white"
            >
              <Mail size={16} />
              {heroCopy.contactMe}
            </button>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            className="absolute -inset-4 rounded-full bg-accent-500/20 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative size-48 overflow-hidden rounded-full border-2 border-accent-400/40 md:size-64">
            <Image
              src="/img/icon.jpg"
              alt="Shigure portrait"
              fill
              sizes="(max-width: 768px) 192px, 256px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
