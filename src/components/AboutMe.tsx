import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import Image from "next/image";
import { FaCode, FaLaptopCode, FaBookReader } from "react-icons/fa";

const AboutMe: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-20 bg-black" id="about">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 via-purple-900/5 to-gray-900/5 pointer-events-none"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center text-purple-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            className="lg:w-2/5 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full opacity-75 blur-2xl"></div>
              <Image
                src="/img/icon.jpg"
                alt="shigure"
                layout="fill"
                objectFit="cover"
                className="rounded-full border-4 border-purple-500/50 relative z-10"
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:w-3/5 lg:pl-12"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-gray-300 mb-4 text-lg">
              Hello! I'm shigure, a passionate developer based in [Your
              Location]. With [X] years of experience in web development, I
              specialize in creating robust and scalable solutions using modern
              technologies.
            </p>
            <p className="text-gray-300 mb-6 text-lg">
              My journey in tech began [Brief background]. I'm driven by the
              desire to build innovative solutions that make a real impact on
              people's lives and businesses.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <FaCode className="text-purple-400 text-2xl mr-2" />
                <span className="text-gray-300">Clean Code</span>
              </div>
              <div className="flex items-center">
                <FaLaptopCode className="text-blue-400 text-2xl mr-2" />
                <span className="text-gray-300">Problem Solver</span>
              </div>
              <div className="flex items-center">
                <FaBookReader className="text-green-400 text-2xl mr-2" />
                <span className="text-gray-300">Continuous Learner</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
