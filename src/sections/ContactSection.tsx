"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Mail } from "lucide-react";
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

const EMAIL = "shigure.tk1090@gmail.com";
const GITHUB_URL = "https://github.com/shigureeeeeeeeee";

export const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const copy = translations[language].contact;

  return (
    <section id="contact" className={sectionPadding} aria-labelledby="contact-heading">
      <div className={`${sectionContainer} max-w-5xl`}>
        <motion.div
          className={`${cardSurface} relative overflow-hidden`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30" aria-hidden="true" />
          <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
            <div>
              <p className={sectionKicker}># {copy.title}</p>
              <h2 id="contact-heading" className={`${sectionHeading} mt-4 max-w-2xl`}>
                {copy.heading}
              </h2>
              <p className={`${sectionBody} mt-5 max-w-2xl`}>{copy.description}</p>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 text-xs text-emerald-300">
                <CheckCircle2 size={14} aria-hidden="true" />
                {copy.availability}
              </div>
            </div>

            <div className="flex min-w-64 flex-col gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center justify-between gap-5 rounded-xl bg-accent-400 px-5 py-4 font-semibold text-zinc-950 transition-all hover:bg-accent-300 hover:shadow-[0_0_28px_rgba(34,211,238,0.25)]"
              >
                <span className="flex items-center gap-3">
                  <Mail size={18} aria-hidden="true" />
                  <span>
                    <span className="block text-[10px] uppercase tracking-wider opacity-60">{copy.emailLabel}</span>
                    <span className="block text-sm">{copy.emailCta}</span>
                  </span>
                </span>
                <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-5 rounded-xl border border-white/15 bg-zinc-950/50 px-5 py-4 text-sm font-semibold text-zinc-200 transition-colors hover:border-accent-400/40 hover:text-white"
              >
                <span className="flex items-center gap-3"><SiGithub size={18} aria-hidden="true" />{copy.githubCta}</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="relative border-t border-white/10 bg-black/10 px-7 py-4 sm:px-10 lg:px-12">
            <a href={`mailto:${EMAIL}`} className="font-mono text-xs text-zinc-500 transition-colors hover:text-accent-300">
              {EMAIL}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
