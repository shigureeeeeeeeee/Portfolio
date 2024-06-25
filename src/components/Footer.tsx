import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "b1022150@gmail.com";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
      alert("Failed to copy email. Please try again.");
    }
  };

  return (
    <footer ref={ref} className="py-12 bg-glay" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-purple-300 mb-4">
            Contact Me
          </h2>
          <div className="relative inline-block">
            <motion.button
              onClick={copyEmail}
              className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ${
                copied ? "bg-green-600 hover:bg-green-700" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? "Copied!" : "Copy Email"}
            </motion.button>
            {copied && (
              <motion.span
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                Email copied!
              </motion.span>
            )}
          </div>
          <p className="text-gray-400 mt-8">
            &copy; 2024 shigure. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
