"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const { language } = useLanguage();
  const projectsCopy = translations[language].projects;

  return (
    <section
      id="projects"
      className={sectionPadding}
      aria-labelledby="projects-heading"
    >
      <div className={sectionContainer}>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className={sectionKicker}># {projectsCopy.title}</p>
          <h2 id="projects-heading" className={sectionHeading}>
            {projectsCopy.heading}
          </h2>
          <p className={`${sectionBody} max-w-2xl`}>
            {projectsCopy.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className={`group flex h-full flex-col overflow-hidden ${cardSurface} transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/40 hover:shadow-[0_8px_40px_rgba(34,211,238,0.12)]`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-44 w-full overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title[language]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_35%),linear-gradient(135deg,rgba(39,39,42,0.95),rgba(9,9,11,0.98))] px-6 text-center">
                    <span className="font-mono text-sm text-zinc-400">
                      {project.title[language]}
                    </span>
                  </div>
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="text-lg font-semibold text-white">
                  {project.title[language]}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {project.description[language]}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs text-zinc-400"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center gap-4 pt-2 text-sm font-medium">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-accent-400 transition-colors hover:text-accent-300"
                  >
                    {projectsCopy.viewSite}
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-white"
                  >
                    {projectsCopy.viewGithub}
                    <SiGithub size={14} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
