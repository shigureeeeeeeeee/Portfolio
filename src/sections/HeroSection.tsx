"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight, CheckCircle2, Mail, MapPin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: "easeOut" as const },
  }),
};

export const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const copy = translations[language].hero;

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden px-4 pb-16 pt-28 md:px-10 lg:px-16"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-80" aria-hidden="true" />
      <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-400/50 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col items-start">
          <motion.div
            className="mb-6 flex flex-wrap items-center gap-3"
            variants={fadeUp}
            initial={false}
            animate="visible"
            custom={0}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {copy.availability}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
              <MapPin size={13} aria-hidden="true" />
              {copy.location}
            </span>
          </motion.div>

          <motion.p
            className="font-mono text-sm tracking-wide text-accent-400"
            variants={fadeUp}
            initial={false}
            animate="visible"
            custom={0.05}
          >
            {copy.role}
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
            variants={fadeUp}
            initial={false}
            animate="visible"
            custom={0.12}
          >
            {copy.heading}{" "}
            <span className="bg-gradient-to-r from-accent-300 via-cyan-400 to-sky-400 bg-clip-text text-transparent text-glow">
              {copy.accent}
            </span>
          </motion.h1>

          <motion.p
            className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg"
            variants={fadeUp}
            initial={false}
            animate="visible"
            custom={0.2}
          >
            {copy.tagline}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            variants={fadeUp}
            initial={false}
            animate="visible"
            custom={0.28}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-accent-300 hover:shadow-[0_0_28px_rgba(34,211,238,0.3)]"
            >
              {copy.viewProjects}
              <ArrowDownRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="mailto:shigure.tk1090@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-accent-400/40 hover:text-white"
            >
              <Mail size={16} aria-hidden="true" />
              {copy.contactMe}
            </a>
            <a
              href="https://github.com/shigureeeeeeeeee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
            >
              <SiGithub size={16} aria-hidden="true" />
              {copy.github}
            </a>
          </motion.div>

          <motion.dl
            className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3"
            variants={fadeUp}
            initial={false}
            animate="visible"
            custom={0.34}
          >
            {copy.facts.map((fact) => (
              <div key={fact.label} className="bg-zinc-950/80 px-4 py-4">
                <dt className="text-xs text-zinc-500">{fact.label}</dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-zinc-200">
                  {fact.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end"
          initial={false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease: "easeOut" }}
          aria-label="Developer profile snapshot"
        >
          <div className="absolute -inset-8 rounded-full bg-accent-500/10 blur-3xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/85 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-rose-400/70" />
                <span className="size-2.5 rounded-full bg-amber-400/70" />
                <span className="size-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <span className="font-mono text-[11px] text-zinc-500">profile.ts</span>
              <span className="w-10" aria-hidden="true" />
            </div>

            <div className="bg-panel-grid p-6 sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-xs text-zinc-500">const developer =</p>
                  <p className="mt-1 text-2xl font-semibold text-white">Shigure</p>
                  <p className="mt-1 text-sm text-accent-400">Software Engineer</p>
                </div>
                <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-accent-400/30 bg-zinc-800">
                  <Image
                    src="/img/icon.jpg"
                    alt="Shigure's cat avatar"
                    fill
                    sizes="80px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="mt-8 space-y-3 font-mono text-xs sm:text-sm">
                {[
                  ["focus", '"Web + AI"'],
                  ["builds", '["products", "tools"]'],
                  ["mindset", '"learn → build → improve"'],
                ].map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[5rem_1fr] gap-3">
                    <span className="text-violet-300">{key}</span>
                    <span className="break-words text-zinc-300">: {value},</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <CheckCircle2 size={16} className="text-emerald-400" aria-hidden="true" />
                  <p className="mt-3 text-xs text-zinc-500">Current research</p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">AI × Learning</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <CheckCircle2 size={16} className="text-accent-400" aria-hidden="true" />
                  <p className="mt-3 text-xs text-zinc-500">Also building</p>
                  <p className="mt-1 text-sm font-medium text-zinc-200">Native tools</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
