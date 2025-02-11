"use client";

import { Skills } from "@/components/Skills";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import AboutMe from "@/components/AboutMe";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden">
        {/* 動的な背景効果 */}
        <div className="fixed inset-0 bg-gradient-to-b from-purple-900/30 via-background to-background/95 animated-gradient-bg">
          {/* グリッドパターン */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] opacity-25" />

          {/* マウス追従グラデーション */}
          <motion.div
            className="pointer-events-none fixed inset-0 z-30"
            style={{
              background: `
                radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
                  rgba(147, 51, 234, 0.15), 
                  transparent 20%
                ),
                radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, 
                  rgba(139, 92, 246, 0.1), 
                  transparent 35%
                ),
                radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, 
                  rgba(167, 139, 250, 0.05), 
                  transparent 45%
                ),
                radial-gradient(1200px circle at ${mousePosition.x}px ${mousePosition.y}px, 
                  rgba(147, 51, 234, 0.02), 
                  transparent 55%
                )
              `,
              backgroundBlendMode: "screen",
            }}
          />

          {/* アニメーションする背景要素 */}
          <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
            {/* 浮遊する円形1 */}
            <motion.div
              className="absolute w-[1200px] h-[1200px] rounded-full bg-gradient-radial from-purple-500/15 via-violet-500/15 to-transparent blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 50,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{ top: "-10%", left: "0%" }}
            />

            {/* 浮遊する円形2 */}
            <motion.div
              className="absolute w-[1000px] h-[1000px] rounded-full bg-gradient-radial from-violet-500/20 via-purple-500/20 to-transparent blur-3xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 80, 0],
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 45,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{ top: "20%", right: "-5%" }}
            />

            {/* 浮遊する円形3 */}
            <motion.div
              className="absolute w-[1400px] h-[1400px] rounded-full bg-gradient-radial from-purple-600/20 via-violet-500/20 to-transparent blur-3xl"
              animate={{
                x: [0, 60, 0],
                y: [0, -40, 0],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{ bottom: "-10%", left: "10%" }}
            />

            {/* 追加の装飾要素 */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_200px,rgba(147,51,234,0.15),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_1000px_at_80%_50%,rgba(139,92,246,0.1),transparent)]" />
          </div>

          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/95 pointer-events-none" />
        </div>

        {/* コンテンツコンテナ */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.45, 0, 0.55, 1] }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Hero />
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1], delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <AboutMe />
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1], delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Skills />
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1], delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Projects />
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1], delay: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Footer />
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
