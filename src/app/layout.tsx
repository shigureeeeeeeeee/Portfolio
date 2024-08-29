import type { Metadata } from "next"; // Next.jsのメタデータ型をインポート
import { Roboto } from "next/font/google"; // Google FontsからRobotoフォントをインポート
import "./globals.css"; // グローバルCSSスタイルをインポート

// Robotoフォントを設定
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

// メタデータの定義
export const metadata: Metadata = {
  title: "Your Portfolio", // ページのタイトル
  description: "A showcase of my projects and skills", // ページの説明
};

// RootLayoutコンポーネントの定義
export default function RootLayout({
  children, // 子コンポーネントを受け取るプロパティ
}: Readonly<{
  children: React.ReactNode; // childrenの型を定義
}>) {
  return (
    <html lang="en"> {/* HTMLの言語属性を設定 */}
      <body className={`${roboto.className} transition-colors duration-300`}> {/* フォントとトランジション効果を適用 */}
        {children} {/* 子コンポーネントを表示 */}
      </body>
    </html>
  );
}