"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
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

const EMAIL = "shigure@example.com";
const GITHUB_URL = "https://github.com/shigureeeeeeeeee";

export const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const contactCopy = translations[language].contact;

  return (
    <section
      id="contact"
      className={sectionPadding}
      aria-labelledby="contact-heading"
    >
      <div className={`${sectionContainer} max-w-3xl`}>
        <motion.div
          className={`${cardSurface} relative overflow-hidden p-8 text-center md:p-12`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="absolute inset-x-0 top-0 h-40 bg-hero-glow"
            aria-hidden="true"
          />
          <div className="relative space-y-6">
            <p className={sectionKicker}># {contactCopy.title}</p>
            <h2 id="contact-heading" className={sectionHeading}>
              {contactCopy.heading}
            </h2>
            <p className={`${sectionBody} mx-auto max-w-xl`}>
              {contactCopy.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-accent-400 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
              >
                <Mail size={16} />
                {contactCopy.emailCta}
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-accent-400/50 hover:text-white"
              >
                <SiGithub size={16} />
                {contactCopy.githubCta}
              </a>
            </div>
            <p className="pt-2 font-mono text-sm text-zinc-500">{EMAIL}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
