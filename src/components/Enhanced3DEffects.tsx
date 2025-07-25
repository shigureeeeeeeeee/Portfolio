"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

// 3D Tilt Effect Hook
export const useTiltEffect = (intensity: number = 15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });
  
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return {
    ref,
    style: { rotateX, rotateY },
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    isHovered,
  };
};

// Enhanced 3D Card Component
export const Enhanced3DCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowEffect?: boolean;
}> = ({ children, className = "", intensity = 12, glowEffect = true }) => {
  const { ref, style, handlers, isHovered } = useTiltEffect(intensity);

  return (
    <motion.div
      ref={ref}
      className={`relative transform-gpu transition-all duration-300 ${className}`}
      style={{
        ...style,
        transformStyle: "preserve-3d",
      }}
      {...handlers}
      whileHover={glowEffect ? { 
        boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3), 0 0 0 1px rgba(147, 51, 234, 0.1)",
        scale: 1.02,
      } : { scale: 1.02 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Glow Effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-inherit opacity-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 0.6 : 0,
          }}
          style={{
            background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(147, 51, 234, 0.15), transparent 40%)",
            transform: "translateZ(-1px)",
          }}
        />
      )}
      
      {/* Content */}
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

// Floating Element with 3D Effect
export const FloatingElement: React.FC<{
  children: React.ReactNode;
  delay?: number;
  amplitude?: number;
  duration?: number;
  className?: string;
}> = ({ children, delay = 0, amplitude = 20, duration = 4, className = "" }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        y: [0, -amplitude, 0],
        rotateY: [0, 5, 0, -5, 0],
        rotateX: [0, 2, 0, -2, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Magnetic Button Effect
export const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}> = ({ children, className = "", intensity = 0.3, onClick, href, target, rel }) => {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    setPosition({
      x: deltaX * intensity,
      y: deltaY * intensity,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href, target, rel } : { onClick };

  return (
    <Component
      ref={ref as any}
      className={`relative inline-block transform-gpu transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </Component>
  );
};

// 3D Text Effect
export const Text3D: React.FC<{
  text: string;
  className?: string;
  depth?: number;
  color?: string;
}> = ({ text, className = "", depth = 4, color = "rgba(147, 51, 234, 0.5)" }) => {
  const textShadows = Array.from({ length: depth }, (_, i) => 
    `${i + 1}px ${i + 1}px 0 ${color}`
  ).join(", ");

  return (
    <span
      className={`inline-block transform transition-all duration-300 hover:scale-105 ${className}`}
      style={{
        textShadow: textShadows,
        transform: "translateZ(0)",
      }}
    >
      {text}
    </span>
  );
};

// Ripple Effect Component
export const RippleEffect: React.FC<{
  children: React.ReactNode;
  className?: string;
  color?: string;
}> = ({ children, className = "", color = "rgba(147, 51, 234, 0.3)" }) => {
  const [ripples, setRipples] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
  }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
      
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: color,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

// Morphing Shape Background
export const MorphingShape: React.FC<{
  className?: string;
  duration?: number;
}> = ({ className = "", duration = 10 }) => {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      animate={{
        borderRadius: [
          "30% 70% 70% 30% / 30% 30% 70% 70%",
          "70% 30% 30% 70% / 70% 70% 30% 30%",
          "50% 50% 50% 50% / 50% 50% 50% 50%",
          "30% 70% 70% 30% / 30% 30% 70% 70%",
        ],
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.1, 0.9, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background: "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(139, 92, 246, 0.1))",
      }}
    />
  );
};

export default Enhanced3DCard;