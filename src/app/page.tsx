"use client"

import { Hero } from "@/components/Hero";
import { Skills } from "@/components/About";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-custom text-white">
      <Hero />
      <Skills />
      <Projects />
    </main>
  );
}