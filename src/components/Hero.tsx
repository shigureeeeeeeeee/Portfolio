import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaTwitter, FaGithub } from "react-icons/fa";
import Header from "./Header";

const ParticleAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
    }[] = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();
      });
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

export const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <section
        id="home"
        className="bg-black relative z-10 min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      >
        <ParticleAnimation />
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="mb-8 relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3,
            }}
          >
            <div className="absolute inset-0 bg-purple-500 rounded-full filter blur-md animate-pulse"></div>
            <Image
              src="/img/icon.jpg"
              alt="shigure"
              width={150}
              height={150}
              className="rounded-full border-4 border-purple-500 mx-auto relative z-10"
            />
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 text-white"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Welcome!
          </motion.h1>
          <motion.div
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.5,
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            ></motion.span>
          </motion.div>
          <motion.div
            className="flex justify-center space-x-4 mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <motion.a
              href="https://x.com/shigure_FUN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTwitter size={24} />
            </motion.a>
            <motion.a
              href="https://github.com/shigureeeeeeeeee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub size={24} />
            </motion.a>
          </motion.div>
          <motion.button
            onClick={scrollToProjects}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-purple-700 transition duration-300"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            View My Work
          </motion.button>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
