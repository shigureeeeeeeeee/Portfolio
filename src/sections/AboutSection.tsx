"use client";

import { motion } from "framer-motion";
import { BookOpen, Briefcase, GraduationCap, Sparkles } from "lucide-react";
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

type TimelineEntry = {
  year: string;
  category: string;
  detail: string;
};

const parseEntry = (raw: string): TimelineEntry => {
  const [year, category, ...rest] = raw.split(" - ");
  return { year, category, detail: rest.join(" - ") };
};

export const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  const aboutCopy = translations[language].about;

  const timeline = [
    ...aboutCopy.experience.map((item) => ({
      ...parseEntry(item),
      icon: Briefcase,
    })),
    ...aboutCopy.education.map((item) => ({
      ...parseEntry(item),
      icon: GraduationCap,
    })),
  ].sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <section
      id="about"
      className={sectionPadding}
      aria-labelledby="about-heading"
    >
      <div className={sectionContainer}>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className={sectionKicker}># {aboutCopy.title}</p>
          <h2 id="about-heading" className={sectionHeading}>
            {aboutCopy.heading}
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            className="space-y-6 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={`${cardSurface} space-y-3 p-6`}>
              {aboutCopy.profile.paragraphs.map((paragraph) => (
                <p key={paragraph} className={sectionBody}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className={`${cardSurface} p-6`}>
              <p className="flex items-center gap-2 font-mono text-sm text-accent-400">
                <Sparkles size={16} />
                {aboutCopy.labels.interests}
              </p>
              <ul className="mt-4 space-y-3">
                {aboutCopy.interests.map((item) => {
                  const [title, detail] = item.split(" - ");
                  return (
                    <li key={item} className="text-sm">
                      <span className="font-medium text-zinc-200">{title}</span>
                      <span className="text-zinc-500"> — {detail}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={`${cardSurface} p-6`}>
              <p className="flex items-center gap-2 font-mono text-sm text-accent-400">
                <BookOpen size={16} />
                {aboutCopy.labels.experience} / {aboutCopy.labels.education}
              </p>
              <ol className="relative mt-6 space-y-8 border-l border-white/10 pl-6">
                {timeline.map((entry) => (
                  <li key={`${entry.year}-${entry.detail}`} className="relative">
                    <span
                      className="absolute -left-[31px] top-1 flex size-2.5 rounded-full bg-accent-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-mono text-sm text-accent-400">
                        {entry.year}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-zinc-400">
                        <entry.icon size={12} />
                        {entry.category}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                      {entry.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
