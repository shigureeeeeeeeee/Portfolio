import React from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import Header from "./Header";

export const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: <FaTwitter size={24} />, url: "https://x.com/shigure_FUN", label: "Twitter" },
    { icon: <FaGithub size={24} />, url: "https://github.com/shigureeeeeeeeee", label: "GitHub" },
    { icon: <FaLinkedin size={24} />, url: "https://www.linkedin.com/in/%E9%81%94%E4%BA%BA-%E7%AB%8B%E7%9F%B3-aaa63131b/", label: "LinkedIn" },
  ];

  return (
    <>
      <Header />
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-purple-900/10 to-transparent"></div>
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="mb-8 relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-purple-500 rounded-full filter blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                top: '0%',
                left: '25%',
                width: '50%',
                height: '100%',
              }}
            />
            <motion.img
              src="/img/icon.jpg"
              alt="shigure"
              className="w-32 h-32 rounded-full border-4 border-purple-500 mx-auto relative z-10"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
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
            >
              Web Developer | AI Enthusiast | Student
            </motion.span>
          </motion.div>
          <motion.div
            className="flex justify-center space-x-4 mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
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