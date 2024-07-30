"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loading: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [quote, setQuote] = useState('');

  const quotes = [
    "Innovation is the ability to see change as an opportunity - not a threat",
    "The best way to predict the future is to create it",
    "Creativity is intelligence having fun",
    "Technology is best when it brings people together"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const newProgress = oldProgress + 2;
        return Math.min(newProgress, 100);
      });
    }, 20);

    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center z-50">
      <motion.div
        className="w-40 h-40 relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <motion.span
          className="absolute inset-0 rounded-full border-t-4 border-purple-500 opacity-75"
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border-r-4 border-blue-500 opacity-75"
          animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-purple-400"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.div>
      </motion.div>
      <motion.h2
        className="mt-8 text-3xl font-bold text-purple-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Loading...
      </motion.h2>
      <AnimatePresence mode="wait">
        <motion.p
          key={quote}
          className="mt-4 text-gray-400 text-center max-w-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {quote}
        </motion.p>
      </AnimatePresence>
      <motion.div
        className="mt-8 w-64 h-2 bg-gray-700 rounded-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <motion.div
          className="h-full bg-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

export default Loading;