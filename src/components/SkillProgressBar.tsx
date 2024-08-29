// Reactをインポート（コンポーネントを作成するために必要）
import React from "react";
// framer-motionライブラリからmotionをインポート（アニメーション用）
import { motion } from "framer-motion";

// SkillProgressBarコンポーネントのプロパティの型定義
interface SkillProgressBarProps {
  name: string;     // スキル名
  level: number;    // スキルレベル（0-100の数値）
  color: string;    // プログレスバーの色
}

// SkillProgressBarコンポーネントの定義
// React.FC<SkillProgressBarProps>は、このコンポーネントがReactの関数コンポーネントであり、
// SkillProgressBarPropsの型を持つpropsを受け取ることを示しています
const SkillProgressBar: React.FC<SkillProgressBarProps> = ({
  name,
  level,
  color,
}) => {
  return (
    // スキルバー全体のコンテナ
    <div className="mb-4">
      {/* スキル名とレベルを表示する部分 */}
      <div className="flex justify-between items-center mb-1">
        {/* スキル名 */}
        <span className="text-base font-medium text-white">{name}</span>
        {/* スキルレベル（パーセンテージ） */}
        <span className="text-sm font-medium text-white">{level}%</span>
      </div>
      {/* プログレスバーの背景 */}
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        {/* アニメーション付きのプログレスバー */}
        <motion.div
          className="h-2.5 rounded-full"
          style={{ backgroundColor: color }}  // プログレスバーの色を設定
          initial={{ width: 0 }}  // アニメーションの初期状態（幅0%）
          animate={{ width: `${level}%` }}  // アニメーションの最終状態（指定されたレベルの幅）
          transition={{ duration: 1, ease: "easeOut" }}  // アニメーションの設定（1秒間、イーズアウト）
        />
      </div>
    </div>
  );
};

export default SkillProgressBar;
