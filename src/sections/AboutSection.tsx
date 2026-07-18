"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Layers3,
  Lightbulb,
  Microscope,
  Wrench,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import {
  cardSurface,
  sectionBody,
  sectionContainer,
  sectionHeading,
  sectionKicker,
  sectionPadding,
} from "@/styles/layout";

const strengthIcons = [Lightbulb, Layers3, Wrench];
const timelineIcons = {
  research: Microscope,
  work: BriefcaseBusiness,
  education: GraduationCap,
};

export const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  const copy = translations[language].about;

  return (
    <section id="about" className={sectionPadding} aria-labelledby="about-heading">
      <div className={sectionContainer}>
        <motion.div
          className="max-w-3xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className={sectionKicker}># {copy.title}</p>
          <h2 id="about-heading" className={sectionHeading}>
            {copy.heading}
          </h2>
          <p className="text-lg leading-8 text-zinc-300">{copy.lead}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className={`${cardSurface} relative overflow-hidden p-6 sm:p-8`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div className="absolute right-0 top-0 size-40 bg-hero-glow" aria-hidden="true" />
            <div className="relative">
              <div className="flex size-10 items-center justify-center rounded-xl border border-accent-400/20 bg-accent-400/10 text-accent-300">
                <BookOpen size={19} aria-hidden="true" />
              </div>
              <div className="mt-6 space-y-5">
                {copy.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={sectionBody}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-mono text-xs text-zinc-500">CURRENTLY</p>
                <p className="mt-2 text-sm font-medium text-zinc-200">
                  Future University Hakodate · Information Systems
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`${cardSurface} p-6 sm:p-8`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.14 }}
          >
            <p className="font-mono text-sm text-accent-400">{copy.timelineLabel}</p>
            <ol className="relative mt-7 space-y-7 border-l border-white/10 pl-7">
              {copy.timeline.map((entry) => {
                const Icon = timelineIcons[entry.type];
                return (
                  <li key={`${entry.year}-${entry.title}`} className="relative">
                    <span className="absolute -left-[39px] top-0 flex size-6 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-zinc-500">
                      <Icon size={12} aria-hidden="true" />
                    </span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <time className="font-mono text-xs text-accent-400">{entry.year}</time>
                      <h3 className="text-sm font-semibold text-zinc-200">{entry.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{entry.description}</p>
                  </li>
                );
              })}
            </ol>
          </motion.div>
        </div>

        <div>
          <p className="mb-5 font-mono text-sm text-zinc-500">{copy.strengthsLabel}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {copy.strengths.map((strength, index) => {
              const Icon = strengthIcons[index];
              return (
                <motion.article
                  key={strength.title}
                  className={`${cardSurface} p-6 transition-colors hover:border-accent-400/30`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={20} className="text-accent-400" aria-hidden="true" />
                    <span className="font-mono text-xs text-zinc-700">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 font-semibold text-white">{strength.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">{strength.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
