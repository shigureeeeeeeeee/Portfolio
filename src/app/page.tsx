"use client";

import { Skills } from "@/components/Skills"; // Skillsコンポーネントをインポート
import { Hero } from "@/components/Hero"; // Heroコンポーネントをインポート
import Projects from "@/components/Projects"; // Projectsコンポーネントをインポート
import Footer from "@/components/Footer"; // Footerコンポーネントをインポート
import AboutMe from "@/components/AboutMe"; // AboutMeコンポーネントをインポート
import { motion } from "framer-motion"; // アニメーションを作成するためのライブラリをインポート

// Homeコンポーネントの定義
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* メインコンテンツのスタイルを設定 */}
      <div className="absolute inset-0 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5"></div>
      {/* 背景のマスクを設定して透明度を調整 */}
      <motion.div
        className="relative z-10" // z-indexを設定して重なり順を調整
        initial={{ opacity: 0 }} // 初期状態のアニメーション（透明）
        animate={{ opacity: 1 }} // アニメーションの最終状態（不透明）
        transition={{ duration: 0.5 }} // アニメーションの持続時間
      >
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/5 via-purple-900/5 to-transparent pointer-events-none"></div>
        {/* ラジアルグラデーションの背景を設定 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }} // 初期状態のアニメーション（下から上に移動）
          whileInView={{ y: 0, opacity: 1 }} // ビュー内に入ったときのアニメーション
          transition={{ duration: 0.8 }} // アニメーションの持続時間
          viewport={{ once: true }} // ビュー内に入ったら一度だけアニメーションを実行
        >
          <Hero /> {/* Heroコンポーネントを表示 */}
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }} // 初期状態のアニメーション
          whileInView={{ y: 0, opacity: 1 }} // ビュー内に入ったときのアニメーション
          transition={{ duration: 0.8, delay: 0.2 }} // アニメーションの持続時間と遅延
          viewport={{ once: true }} // ビュー内に入ったら一度だけアニメーションを実行
        >
          <AboutMe /> {/* AboutMeコンポーネントを表示 */}
        </motion.div>
        <Skills /> {/* Skillsコンポーネントを表示 */}
        <Projects /> {/* Projectsコンポーネントを表示 */}
        <Footer /> {/* Footerコンポーネントを表示 */}
      </motion.div>
    </main>
  );
}
