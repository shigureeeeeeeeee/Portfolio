import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowUp, FaMapMarkerAlt, FaPhone, FaHeart } from "react-icons/fa";
import Link from "next/link";

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();
  const contactEmail = "b1022150@gmail.com";

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
      alert("メールアドレスのコピーに失敗しました。もう一度お試しください。");
    }
  }, [contactEmail]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/shigureeeeeeeeee", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: <FaTwitter />, url: "https://twitter.com/shigure_FUN", label: "Twitter" },
  ];

  const contactInfo = [
    { icon: <FaEnvelope />, text: contactEmail, action: copyEmail, label: "Email" },
  ];

  const navItems = ["Home", "About", "Skills", "Projects"];

  return (
    <footer ref={ref} className="relative py-16 bg-gradient-to-b from-gray-900 to-black text-white" id="contact">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-blue-900/5 to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
            hidden: { opacity: 0, y: 50 }
          }}
        >
          <motion.div variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}>
            <h2 className="text-3xl font-bold text-purple-400 mb-6">Contact</h2>
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="flex items-center mb-4 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={info.action}
              >
                <span className="text-purple-400 mr-2">{info.icon}</span>
                <span className="text-lg hover:text-purple-400 transition-colors">
                  {info.text}
                </span>
              </motion.div>
            ))}
            <AnimatePresence>
              {copied && (
                <motion.p
                  className="text-green-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  メールアドレスをコピーしました！
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}>
            <h2 className="text-3xl font-bold text-purple-400 mb-6">Follow</h2>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-purple-400 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
            hidden: { opacity: 0 }
          }}
        >
          <nav className="mb-4">
            <ul className="flex flex-wrap justify-center space-x-4">
              {navItems.map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="hover:text-purple-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} shigure. All rights reserved.
          </p>
          <motion.p
            className="text-sm text-gray-400 mt-2"
            whileHover={{ scale: 1.1 }}
          >
          </motion.p>
        </motion.div>
      </div>
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
};

export default Footer;