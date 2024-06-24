import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
}

const skills: Skill[] = [
  { name: 'JavaScript', icon: '󰌞' },
  { name: 'TypeScript', icon: '󰛦' },
  { name: 'React', icon: '󰜈' },
  { name: 'Next.js', icon: '󰠩' },
  { name: 'Node.js', icon: '󰎙' },
  { name: 'Express', icon: '󰀫' },
  { name: 'MongoDB', icon: '󰳱' },
  { name: 'SQL', icon: '󰆼' },
  { name: 'HTML', icon: '󰌝' },
  { name: 'CSS', icon: '󰌛' },
  { name: 'Tailwind CSS', icon: '󰛦' },
  { name: 'Git', icon: '󰊢' },
];


const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
    <motion.div
      className="bg-gray-800 p-4 rounded-lg shadow-lg text-center"
      whileHover={{ scale: 1.05, backgroundColor: '#3730a3' }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-4xl mb-2">{skill.icon}</div>
      <h3 className="text-lg font-semibold text-purple-400">{skill.name}</h3>
    </motion.div>
  );
  
  export const Skills: React.FC = () => {
    return (
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SkillCard skill={skill} />
          </motion.div>
        ))}
      </motion.div>
    );
  };