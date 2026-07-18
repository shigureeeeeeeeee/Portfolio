"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Check,
  Gem,
  Keyboard,
  Mountain,
  Radio,
  Volume2,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import type { Project } from "@/data/projects";
import {
  cardSurface,
  sectionBody,
  sectionContainer,
  sectionHeading,
  sectionKicker,
  sectionPadding,
} from "@/styles/layout";

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectVisual = ({ visual }: { visual: Project["visual"] }) => {
  if (visual === "research") {
    return (
      <div className="relative flex h-full min-h-72 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,0.18),transparent_35%),linear-gradient(145deg,#111827,#09090b)] p-6" aria-hidden="true">
        <div className="absolute inset-0 bg-panel-grid opacity-60" />
        <div className="relative w-full max-w-sm rounded-xl border border-white/10 bg-zinc-950/90 p-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Bot size={15} className="text-accent-400" />
              Reflective AI
            </div>
            <span className="size-2 rounded-full bg-emerald-400" />
          </div>
          <div className="mt-4 space-y-3">
            <div className="mr-10 rounded-lg rounded-tl-sm bg-white/[0.06] p-3 text-[11px] leading-5 text-zinc-400">
              夜に人がいないとき、チャイムはどうなると思いますか？
            </div>
            <div className="ml-12 rounded-lg rounded-tr-sm bg-accent-500/15 p-3 text-[11px] leading-5 text-cyan-100/80">
              条件を組み合わせて、シミュレーションで確かめます。
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {["DAY", "NIGHT", "USER", "AI"].map((item, index) => (
              <div key={item} className={`rounded-md border p-2 text-center font-mono text-[8px] ${index === 3 ? "border-accent-400/30 bg-accent-400/10 text-accent-300" : "border-white/10 text-zinc-600"}`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (visual === "abyss") {
    return (
      <div className="relative flex h-64 items-end overflow-hidden bg-[radial-gradient(circle_at_50%_15%,rgba(139,92,246,0.28),transparent_35%),linear-gradient(#10101a,#050507)] p-6" aria-hidden="true">
        <div className="absolute left-1/2 top-10 size-28 -translate-x-1/2 rotate-45 rounded-[28%] border border-violet-300/30 bg-violet-500/10 shadow-[0_0_60px_rgba(139,92,246,0.25)]" />
        <Mountain className="absolute -bottom-6 left-2 size-48 text-zinc-800" strokeWidth={0.7} />
        <Mountain className="absolute -bottom-8 right-0 size-56 text-zinc-800/80" strokeWidth={0.7} />
        <div className="relative w-full rounded-xl border border-violet-300/10 bg-black/40 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.22em] text-violet-300">ABYSS LAYER 01</span>
            <Gem size={14} className="text-violet-300" />
          </div>
          <div className="mt-3 flex gap-1.5">
            {[0, 1, 2, 3, 4].map((item) => (
              <span key={item} className={`h-1.5 flex-1 rounded-full ${item === 0 ? "bg-violet-400" : "bg-white/10"}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_75%_20%,rgba(14,165,233,0.22),transparent_38%),linear-gradient(145deg,#111827,#09090b)] p-6" aria-hidden="true">
        <div className="absolute inset-0 bg-panel-grid opacity-40" />
        <div className="relative w-full max-w-xs rounded-xl border border-white/10 bg-zinc-950/90 p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-200">
              <Volume2 size={16} className="text-sky-400" /> Audio Switcher
            </div>
            <Radio size={14} className="text-emerald-400" />
          </div>
          <div className="mt-4 space-y-2">
            {["Headphones", "Desktop Speakers"].map((device, index) => (
              <div key={device} className={`flex items-center justify-between rounded-lg border p-3 ${index === 0 ? "border-sky-400/30 bg-sky-400/10" : "border-white/10 bg-white/[0.02]"}`}>
                <span className="text-[11px] text-zinc-300">{device}</span>
                {index === 0 ? <Check size={13} className="text-sky-400" /> : <Keyboard size={13} className="text-zinc-600" />}
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

const ProjectContent = ({ project, compact = false }: { project: Project; compact?: boolean }) => {
  const { language } = useLanguage();
  const copy = translations[language].projects;

  return (
    <div className={`flex flex-1 flex-col ${compact ? "p-6" : "p-6 sm:p-8"}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-accent-400/20 bg-accent-400/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-300">
          {project.statusLabel[language]}
        </span>
        <span className="font-mono text-xs text-zinc-600">{project.period}</span>
      </div>
      <h3 className={`${compact ? "mt-4 text-xl" : "mt-5 text-2xl sm:text-3xl"} font-semibold tracking-tight text-white`}>
        {project.title[language]}
      </h3>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{project.description[language]}</p>
      {!compact && <p className="mt-4 text-sm leading-6 text-zinc-500">{project.longDescription[language]}</p>}

      <div className="mt-6">
        <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">{copy.highlights}</p>
        <ul className="mt-3 space-y-2.5">
          {project.highlights[language].map((highlight) => (
            <li key={highlight} className="flex gap-2.5 text-xs leading-5 text-zinc-400">
              <Check size={14} className="mt-0.5 shrink-0 text-accent-400" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span key={technology} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-zinc-500">
            {technology}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-6">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-zinc-600">{copy.role}</p>
          <p className="mt-1 text-xs text-zinc-300">{project.role[language]}</p>
        </div>
        <div className="flex items-center gap-3">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-400 transition-colors hover:text-accent-300">
              {copy.liveDemo}<ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:text-white" aria-label={`${project.title[language]} — ${copy.repository}`}>
            <SiGithub size={14} aria-hidden="true" />{copy.repository}<ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const { language } = useLanguage();
  const copy = translations[language].projects;
  const [primary, ...rest] = projects;

  return (
    <section id="projects" className={sectionPadding} aria-labelledby="projects-heading">
      <div className={sectionContainer}>
        <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
          <p className={sectionKicker}># {copy.title}</p>
          <h2 id="projects-heading" className={sectionHeading}>{copy.heading}</h2>
          <p className={`${sectionBody} max-w-3xl`}>{copy.description}</p>
        </motion.div>

        {primary && (
          <motion.article className={`overflow-hidden ${cardSurface} lg:grid lg:grid-cols-[0.9fr_1.1fr]`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }}>
            <div className="relative border-b border-white/10 lg:border-b-0 lg:border-r">
              <span className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-zinc-950/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-300 backdrop-blur-md">{copy.featured}</span>
              <ProjectVisual visual={primary.visual} />
            </div>
            <ProjectContent project={primary} />
          </motion.article>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((project, index) => (
            <motion.article key={project.id} className={`group flex h-full flex-col overflow-hidden ${cardSurface} transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/30 hover:shadow-[0_16px_50px_rgba(0,0,0,0.25)]`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: index * 0.08 }}>
              <div className="overflow-hidden border-b border-white/10"><ProjectVisual visual={project.visual} /></div>
              <ProjectContent project={project} compact />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
