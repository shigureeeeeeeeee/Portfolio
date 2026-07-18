"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import { skillCategories } from "@/data/skills";
import {
  cardSurface,
  sectionBody,
  sectionContainer,
  sectionHeading,
  sectionKicker,
  sectionPadding,
} from "@/styles/layout";

export const SkillsSection: React.FC = () => {
  const { language } = useLanguage();
  const copy = translations[language].skills;

  return (
    <section id="skills" className={sectionPadding} aria-labelledby="skills-heading">
      <div className={sectionContainer}>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className={sectionKicker}># {copy.title}</p>
          <h2 id="skills-heading" className={sectionHeading}>
            {copy.heading}
          </h2>
          <p className={`${sectionBody} max-w-2xl`}>{copy.description}</p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => (
            <motion.article
              key={category.name}
              className={`${cardSurface} overflow-hidden transition-colors hover:border-accent-400/30`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.08 }}
            >
              <div className="border-b border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-sm text-accent-400">
                    {copy.categories[category.name]}
                  </h3>
                  <span className="font-mono text-xs text-zinc-700">
                    0{categoryIndex + 1}
                  </span>
                </div>
                <p className="mt-3 min-h-12 text-sm leading-6 text-zinc-500">
                  {category.description[language]}
                </p>
              </div>

              <ul className="divide-y divide-white/[0.06] px-6">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="flex items-center gap-3 py-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300">
                      <skill.icon className="size-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-zinc-200">{skill.name}</p>
                      <p className="mt-0.5 truncate text-xs text-zinc-600">
                        {copy.evidenceLabel}: {skill.evidence}
                      </p>
                    </div>
                    <CheckCircle2 size={15} className="shrink-0 text-emerald-400/70" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
