import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiX, FiExternalLink, FiGithub } from "react-icons/fi";

interface Project {
  title: string;
  longDescription: string;
  image: string;
  technologies: string[];
  link: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-purple-300">{project.title}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <FiX size={24} />
              </button>
            </div>
            <div className="mb-6 relative h-64">
              <Image
                src={project.image}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <p className="text-gray-300 mb-4">{project.longDescription}</p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Technologies:</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <FiExternalLink className="mr-2" />
                View Project
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <FiGithub className="mr-2" />
                GitHub
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;