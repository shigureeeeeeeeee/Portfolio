import type { Metadata } from "next"; // Next.jsのメタデータ型をインポート
import { Inter } from "next/font/google"; // Google FontsからInterフォントをインポート
import "./globals.css"; // グローバルCSSスタイルをインポート
import { LanguageProvider } from "../contexts/LanguageContext";

// Interフォントを設定
const inter = Inter({ subsets: ["latin"] });

// メタデータの定義
export const metadata: Metadata = {
  title: "Portfolio",
  description: "My portfolio website",
};

// RootLayoutコンポーネントの定義
export default function RootLayout({
  children, // 子コンポーネントを受け取るプロパティ
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {" "}
      {/* HTMLの言語属性を設定 */}
      <body className={inter.className}>
        {" "}
        {/* フォントを適用 */}
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
