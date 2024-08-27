//実装するか悩み中
import { motion } from "framer-motion";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    date: "2023年 - 現在",
    title: "シニアフロントエンド開発者",
    description: "大規模なWebアプリケーションの開発とチームリーディング"
  },
  {
    date: "2020年 - 2023年",
    title: "フルスタック開発者",
    description: "スタートアップでのフルスタック開発経験"
  },
  // 他の経歴項目を追加
];

export function Timeline() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">経歴</h2>
      <div className="max-w-4xl mx-auto">
        {timelineItems.map((item, index) => (
          <motion.div
            key={index}
            className="flex mb-8"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="w-1/4 text-right pr-6">
              <span className="text-purple-400 font-semibold">{item.date}</span>
            </div>
            <div className="w-3/4 border-l-2 border-purple-400 pl-6 pb-8 relative">
              <div className="absolute w-4 h-4 bg-purple-400 rounded-full -left-2 top-0"></div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
