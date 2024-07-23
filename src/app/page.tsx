"use client"

import { Skills } from "@/components/Skills";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import Footer from "@/components/Footer";
import AboutMe from "@/components/AboutMe";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5"></div>
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/5 via-purple-900/5 to-transparent pointer-events-none"></div>
        <Hero />
        <AboutMe />
        <Skills />
        <Projects />
        <Footer />
      </motion.div>
    </main>
  );
}