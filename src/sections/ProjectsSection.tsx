"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
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

const ProjectContent = ({
  project,
  compact = false,
  featured = false,
}: {
  project: Project;
  compact?: boolean;
  featured?: boolean;
}) => {
  const { language } = useLanguage();
  const copy = translations[language].projects;

  return (
    <div className={`flex flex-1 flex-col ${compact ? "p-6" : "p-6 sm:p-8"}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-accent-400/20 bg-accent-400/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-300">
          {project.statusLabel[language]}
        </span>
        <span className="font-mono text-xs text-zinc-600">{project.period}</span>
        {featured && (
          <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            {copy.featured}
          </span>
        )}
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
          <motion.article className={`overflow-hidden ${cardSurface}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }}>
            <ProjectContent project={primary} featured />
          </motion.article>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((project, index) => (
            <motion.article key={project.id} className={`group flex h-full flex-col overflow-hidden ${cardSurface} transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/30 hover:shadow-[0_16px_50px_rgba(0,0,0,0.25)]`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: index * 0.08 }}>
              <ProjectContent project={project} compact />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
