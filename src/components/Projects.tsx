import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Project 1",
    description: "A brief description of Project 1",
    link: "#",
  },
  {
    title: "Project 2",
    description: "A brief description of Project 2",
    link: "#",
  },
  {
    title: "Project 3",
    description: "A brief description of Project 3",
    link: "#",
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <motion.a
    href={project.link}
    className="block bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.05, backgroundColor: '#3730a3' }}
    whileTap={{ scale: 0.95 }}
  >
    <h3 className="text-2xl font-bold text-purple-400 mb-2">{project.title}</h3>
    <p className="text-gray-300">{project.description}</p>
  </motion.a>
);

export const Projects: React.FC = () => {
  return (
    <section className="py-20 bg-black bg-opacity-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-purple-400 mb-12">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};;