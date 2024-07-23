import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["home", "about", "skills", "projects", "contact"];
      let current = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          current = section;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      } text-white`}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500"
        style={{ scaleX }}
      />
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-center items-center">
          <motion.h1
            className="text-2xl font-bold text-purple-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            
          </motion.h1>
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-lg hover:text-purple-400 transition-colors ${
                  activeSection === item.id ? "text-purple-400 font-bold" : ""
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
          {/* <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800 text-purple-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </motion.button>
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-2xl text-purple-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </motion.button>
            </div>
          </div> */}
        </div>
      </nav>
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-gray-900 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block w-full py-2 px-4 text-left text-lg hover:bg-gray-800 transition-colors ${
                activeSection === item.id ? "bg-gray-800 text-purple-400 font-bold" : ""
              }`}
              whileHover={{ x: 10 }}
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </header>
  );
};

export default Header;