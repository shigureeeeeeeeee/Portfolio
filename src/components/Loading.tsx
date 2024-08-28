"use client"; // Next.jsのクライアントコンポーネントであることを示す

// 必要なモジュールとコンポーネントをインポート
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Loadingコンポーネントの定義
const Loading: React.FC = () => {
  // プログレスバーの進捗状態を管理するstate
  const [progress, setProgress] = useState(0);
  // 表示する引用文を管理するstate
  const [quote, setQuote] = useState('');

  // 表示する引用文のリスト
  const quotes = [
    "Innovation is the ability to see change as an opportunity - not a threat",
    "The best way to predict the future is to create it",
    "Creativity is intelligence having fun",
    "Technology is best when it brings people together"
  ];

  // コンポーネントがマウントされた時に一度だけ実行される副作用
  useEffect(() => {
    // プログレスバーを更新するタイマーを設定
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

    // ランダムに引用文を選択して設定
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // コンポーネントがアンマウントされる時にタイマーをクリアする
    return () => {
      clearInterval(timer);
    };
  }, []); // 空の依存配列で、この副作用は初回レンダリング時にのみ実行される

  return (
    // ローディング画面全体のコンテナ
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center z-50">
      {/* アニメーション付きのローディングスピナー */}
      <motion.div
        className="w-40 h-40 relative"
        animate={{ rotate: 360 }} // 360度回転するアニメーション
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }} // 2秒間で回転、無限に繰り返し、線形の動き
      >
        {/* 外側の円 */}
        <motion.span
          className="absolute inset-0 rounded-full border-t-4 border-purple-500 opacity-75"
          animate={{ scale: [1, 1.2, 1], rotate: 360 }} // スケールと回転のアニメーション
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} // 1.5秒間で動作、無限に繰り返し、往復動作
        />
        {/* 内側の円 */}
        <motion.span
          className="absolute inset-0 rounded-full border-r-4 border-blue-500 opacity-75"
          animate={{ scale: [1.2, 1, 1.2], rotate: -360 }} // スケールと逆回転のアニメーション
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} // 1.5秒間で動作、無限に繰り返し、往復動作
        />
        {/* 進捗率の表示 */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-purple-400"
          initial={{ opacity: 0, scale: 0.5 }} // 初期状態
          animate={{ opacity: 1, scale: 1 }} // アニメーション後の状態
          transition={{ delay: 0.5 }} // 0.5秒遅延してアニメーション開始
        >
          {progress}%
        </motion.div>
      </motion.div>
      {/* "Loading..."テキスト */}
      <motion.h2
        className="mt-8 text-3xl font-bold text-purple-400"
        initial={{ opacity: 0, y: 20 }} // 初期状態（透明で下に20px）
        animate={{ opacity: 1, y: 0 }} // アニメーション後の状態（不透明で元の位置）
        transition={{ delay: 0.5 }} // 0.5秒遅延してアニメーション開始
      >
        Loading...
      </motion.h2>
      {/* 引用文の表示 */}
      <AnimatePresence mode="wait">
        <motion.p
          key={quote} // quoteが変更されるたびに新しいアニメーションを開始
          className="mt-4 text-gray-400 text-center max-w-md px-4"
          initial={{ opacity: 0 }} // 初期状態（透明）
          animate={{ opacity: 1 }} // アニメーション後の状態（不透明）
          exit={{ opacity: 0 }} // 要素が削除される時の状態（透明に戻る）
          transition={{ duration: 0.5 }} // 0.5秒間でアニメーション
        >
          {quote}
        </motion.p>
      </AnimatePresence>
      {/* プログレスバー */}
      <motion.div
        className="mt-8 w-64 h-2 bg-gray-700 rounded-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }} // 初期状態（透明で下に20px）
        animate={{ opacity: 1, y: 0 }} // アニメーション後の状態（不透明で元の位置）
        transition={{ delay: 0.7 }} // 0.7秒遅延してアニメーション開始
      >
        <motion.div
          className="h-full bg-purple-500"
          initial={{ width: 0 }} // 初期状態（幅0）
          animate={{ width: `${progress}%` }} // プログレスに応じて幅を変更
          transition={{ duration: 0.5 }} // 0.5秒間でアニメーション
        />
      </motion.div>
    </div>
  );
};

export default Loading;