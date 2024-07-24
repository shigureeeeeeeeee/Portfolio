import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowUp } from "react-icons/fa";
import Link from "next/link";

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const email = "b1022150@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
      alert("メールアドレスのコピーに失敗しました。もう一度お試しください。");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // メッセージ送信のロジックを実装する。
    console.log("Sent message:", message);
    setMessage("");
    alert("現在作成中のため、メッセージ送信はできません。");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/shigureeeeeeeeee", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: <FaTwitter />, url: "https://twitter.com/shigure_FUN", label: "Twitter" },
  ];

  return (
    <footer ref={ref} className="relative py-16 bg-gradient-to-b from-gray-900 to-black text-white" id="contact">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-blue-900/5 to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <div>
            <h2 className="text-3xl font-bold text-purple-400 mb-6">Contact</h2>
            <motion.div
              className="flex items-center mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope className="text-purple-400 mr-2" />
              <button
                onClick={copyEmail}
                className="text-lg hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 rounded"
                aria-label="Copy email address"
              >
                {email}
              </button>
            </motion.div>
            {copied && (
              <motion.p
                className="text-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                メールアドレスをコピーしました！
              </motion.p>
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-purple-400 mb-6">Follow</h2>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-purple-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-purple-400 mb-6">Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="メッセージを送る"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-purple-400 focus:outline-none resize-none"
                rows={4}
                required
                aria-label="Message"
              />
              <motion.button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                送信
              </motion.button>
            </form>
          </div>
        </motion.div>
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <nav className="mb-4">
            <ul className="flex justify-center space-x-4">
              <li><Link href="#home" className="hover:text-purple-400 transition-colors">Home</Link></li>
              <li><Link href="#about" className="hover:text-purple-400 transition-colors">About</Link></li>
              <li><Link href="#skills" className="hover:text-purple-400 transition-colors">Skills</Link></li>
              <li><Link href="#projects" className="hover:text-purple-400 transition-colors">Projects</Link></li>
            </ul>
          </nav>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} shigure. All rights reserved.
          </p>
        </motion.div>
      </div>
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
};

export default Footer;