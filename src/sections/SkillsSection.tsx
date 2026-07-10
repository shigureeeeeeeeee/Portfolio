"use client";

import { motion } from "framer-motion";
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
  const skillsCopy = translations[language].skills;

  return (
    <section
      id="skills"
      className={sectionPadding}
      aria-labelledby="skills-heading"
    >
      <div className={sectionContainer}>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className={sectionKicker}># {skillsCopy.title}</p>
          <h2 id="skills-heading" className={sectionHeading}>
            {skillsCopy.heading}
          </h2>
          <p className={`${sectionBody} max-w-2xl`}>{skillsCopy.description}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              className={`${cardSurface} p-6 transition-colors hover:border-accent-400/30`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <p className="font-mono text-sm text-accent-400">
                {
                  skillsCopy.categories[
                    category.name as keyof typeof skillsCopy.categories
                  ]
                }
              </p>
              <ul className="mt-5 space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skill.name}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-medium text-zinc-200">
                        <skill.icon className="size-4 text-zinc-400" />
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-zinc-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent-600 to-accent-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: 0.2 + skillIndex * 0.08,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-500">
                      {skill.description[language as "ja" | "en"]}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
