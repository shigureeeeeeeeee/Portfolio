"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorPosition {
  x: number;
  y: number;
}

// カスタムカーソルのメインコンポーネント
export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX - 16);
    cursorY.set(e.clientY - 16);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      moveCursor(e);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // インタラクティブ要素の検出
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElements = [
        'a', 'button', 'input', 'textarea', 'select',
        '[role="button"]', '[tabindex]', '.cursor-pointer'
      ];
      
      const isInteractive = interactiveElements.some(selector => 
        target.matches?.(selector) || target.closest?.(selector)
      );

      if (isInteractive) {
        setIsHoveringInteractive(true);
        setCursorVariant("interactive");
      } else {
        setIsHoveringInteractive(false);
        setCursorVariant("default");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [moveCursor]);

  const variants = {
    default: {
      scale: 1,
      backgroundColor: "rgba(147, 51, 234, 0.6)",
      border: "2px solid rgba(147, 51, 234, 0.8)",
    },
    interactive: {
      scale: 1.5,
      backgroundColor: "rgba(147, 51, 234, 0.2)",
      border: "2px solid rgba(147, 51, 234, 1)",
    },
  };

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        variants={variants}
        animate={cursorVariant}
        initial={false}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Cursor trail */}
      <CursorTrail cursorX={cursorX} cursorY={cursorY} isVisible={isVisible} />
    </>
  );
};

// カーソルトレイルエフェクト
const CursorTrail: React.FC<{
  cursorX: any;
  cursorY: any;
  isVisible: boolean;
}> = ({ cursorX, cursorY, isVisible }) => {
  const [trail, setTrail] = useState<CursorPosition[]>([]);

  useEffect(() => {
    const updateTrail = () => {
      const newPosition = { x: cursorX.get(), y: cursorY.get() };
      
      setTrail(prevTrail => {
        const newTrail = [newPosition, ...prevTrail].slice(0, 8);
        return newTrail;
      });
    };

    const unsubscribeX = cursorX.onChange(updateTrail);
    const unsubscribeY = cursorY.onChange(updateTrail);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {trail.map((position, index) => (
        <motion.div
          key={index}
          className="fixed rounded-full pointer-events-none z-[9998]"
          style={{
            left: position.x + 8,
            top: position.y + 8,
            width: 6 - index * 0.5,
            height: 6 - index * 0.5,
            backgroundColor: `rgba(147, 51, 234, ${0.6 - index * 0.1})`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </>
  );
};

// マウス追従グラデーション
export const MouseGradient: React.FC<{
  className?: string;
  intensity?: number;
}> = ({ className = "", intensity = 0.3 }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${className}`}
      style={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, ${intensity}), transparent 80%)`,
      }}
    />
  );
};

// マウス追従パーティクル
export const MouseParticles: React.FC = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    life: number;
    size: number;
    vx: number;
    vy: number;
  }>>([]);

  useEffect(() => {
    let animationFrame: number;
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newParticle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        life: 1,
        size: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      };

      setParticles(prev => [...prev, newParticle].slice(-15));
    };

    const updateParticles = () => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 0.02,
            size: particle.size * 0.98,
          }))
          .filter(particle => particle.life > 0)
      );

      animationFrame = requestAnimationFrame(updateParticles);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animationFrame = requestAnimationFrame(updateParticles);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-purple-400"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            opacity: particle.life,
            transform: `scale(${particle.life})`,
          }}
        />
      ))}
    </div>
  );
};

// マグネティック要素
export const MagneticArea: React.FC<{
  children: React.ReactNode;
  strength?: number;
  className?: string;
}> = ({ children, strength = 0.2, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setMousePosition({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
};

export default CustomCursor;