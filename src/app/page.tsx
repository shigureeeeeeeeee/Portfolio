"use client"

import { Skills } from "@/components/Skills";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import Footer from "@/components/Footer";
import AboutMe from "@/components/AboutMe";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      <div className="relative z-10">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-blue-900/10 to-transparent"></div>
        <Hero />
        <div className="relative backdrop-blur-sm bg-black/40">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-800/50"></div>
          <AboutMe />
        </div>
        <div className="relative backdrop-blur-sm bg-black/40">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 via-gray-900/50 to-transparent"></div>
          <Skills />
        </div>
        <div className="relative backdrop-blur-sm bg-black/40">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 via-gray-900/50 to-transparent"></div>
          <Projects />
        </div>
        <Footer />
      </div>
    </main>
  );
}