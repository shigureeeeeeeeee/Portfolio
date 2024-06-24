import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <ul className="flex justify-center space-x-8">
          <li>
            <Link href="#home" className="text-white hover:text-purple-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="#skills" className="text-white hover:text-purple-400 transition-colors">
              Skills
            </Link>
          </li>
          <li>
            <Link href="#projects" className="text-white hover:text-purple-400 transition-colors">
              Projects
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-white hover:text-purple-400 transition-colors">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;