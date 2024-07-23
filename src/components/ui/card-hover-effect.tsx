"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "../../utils/cn";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

interface HoverEffectProps {
  items: Project[];
  className?: string;
  onProjectClick: (project: Project) => void;
}

export const HoverEffect: React.FC<HoverEffectProps> = ({
  items,
  className,
  onProjectClick,
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group block p-2 h-full w-full cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => onProjectClick(item)}
        >
          <AnimatedCard isHovered={hoveredIndex === idx} />
          <div className="relative z-20 flex flex-col h-full">
            <div className="relative w-full h-48 mb-4">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h3 className="font-bold text-xl text-purple-300 mb-2">{item.title}</h3>
            <p className="text-gray-300 mb-4">{item.description}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {item.technologies.slice(0, 3).map((tech, index) => (
                <span key={index} className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                  {tech}
                </span>
              ))}
              {item.technologies.length > 3 && (
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                  +{item.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AnimatedCard = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <motion.div
      className="absolute inset-0 bg-gray-800 rounded-lg"
      initial={false}
      animate={{
        scale: isHovered ? 1.05 : 1,
        boxShadow: isHovered
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          : "0 0 0 0 rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.2 }}
    />
  );
};