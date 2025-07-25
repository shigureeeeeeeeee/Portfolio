import type { Metadata } from "next"; // Next.jsのメタデータ型をインポート
import { Inter, Outfit } from "next/font/google"; // Google FontsからInterとOutfitフォントをインポート
import "./globals.css"; // グローバルCSSスタイルをインポート
import { LanguageProvider } from "../contexts/LanguageContext";

// フォントを設定
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
});

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
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
