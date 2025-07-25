"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  speed = 0.5,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, opacity }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
};

// 浮遊パーティクルコンポーネント
export const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  const { scrollYProgress } = useScroll();
  const particleY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const particleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.6, 0.6, 0.3]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 backdrop-blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            y: particleY,
            opacity: particleOpacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// 波のような背景エフェクト
export const WaveBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  const wave1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const wave2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const wave3Y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const wave1Rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const wave2Rotate = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Wave 1 */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)",
          y: wave1Y,
          rotate: wave1Rotate,
        }}
      />
      
      {/* Wave 2 */}
      <motion.div
        className="absolute top-1/3 -right-20 w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          y: wave2Y,
          rotate: wave2Rotate,
        }}
      />
      
      {/* Wave 3 */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
          y: wave3Y,
        }}
      />
    </div>
  );
};

// グリッドパターン背景
export const GridBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.3, 0.3, 0.1]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        y: gridY,
        opacity: gridOpacity,
        backgroundImage: `
          linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  );
};

// スクロール連動3Dカード
export const Parallax3DCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}> = ({ children, className = "", intensity = 0.1 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotateX = useSpring(isHovered ? mousePosition.y * intensity : 0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(isHovered ? mousePosition.x * intensity : 0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    setMousePosition({
      x: (mouseX / rect.width) * 100,
      y: (mouseY / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={`transform-gpu ${className}`}
      style={{
        y,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// テキストの段階的表示エフェクト
export const StaggeredText: React.FC<{
  text: string;
  className?: string;
  delay?: number;
}> = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");

  return (
    <div className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.1,
            ease: [0.215, 0.610, 0.355, 1.000],
          }}
          viewport={{ once: true }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default ParallaxBackground;