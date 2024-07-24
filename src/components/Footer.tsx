import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

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

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/yourusername", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: <FaTwitter />, url: "https://twitter.com/yourusername", label: "Twitter" },
  ];

  return (
    <footer ref={ref} className="py-16 bg-gray-900 text-white" id="contact">
      <div className="container mx-auto px-4">
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
                className="text-lg hover:text-purple-400 transition-colors"
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
            <h2 className="text-3xl font-bold text-purple-400 mb-6">Massage</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="メッセージを送る"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-purple-400 focus:outline-none"
                rows={4}
                required
              />
              <motion.button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
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
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} shigure. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;