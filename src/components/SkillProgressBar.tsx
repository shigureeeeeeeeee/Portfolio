import React from "react";
import { motion } from "framer-motion";

interface SkillProgressBarProps {
  name: string;
  level: number;
  color: string;
}

const SkillProgressBar: React.FC<SkillProgressBarProps> = ({
  name,
  level,
  color,
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-base font-medium text-white">{name}</span>
        <span className="text-sm font-medium text-white">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div
          className="h-2.5 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default SkillProgressBar;
