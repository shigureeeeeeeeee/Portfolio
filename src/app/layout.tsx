import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://aboutme-shigure.vercel.app"),
  title: {
    default: "Shigure | Software Engineer Portfolio",
    template: "%s | Shigure",
  },
  description:
    "Web、AI、Windowsネイティブ開発に取り組むShigureのポートフォリオ。卒業研究、Minecraft Mod、C++製Windowsツールの実装と技術的な工夫を紹介します。",
  keywords: [
    "Shigure",
    "Software Engineer",
    "Web Developer",
    "AI",
    "Next.js",
    "TypeScript",
    "FastAPI",
    "C++",
    "Portfolio",
  ],
  authors: [{ name: "Shigure", url: "https://github.com/shigureeeeeeeeee" }],
  creator: "Shigure",
  alternates: { canonical: "/" },
  icons: { icon: "/img/icon.jpg", apple: "/img/icon.jpg" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    alternateLocale: "en_US",
    url: "/",
    siteName: "Shigure Portfolio",
    title: "Shigure | Software Engineer Portfolio",
    description:
      "From an idea to software people can use — selected work across Web, AI, and native development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shigure | Software Engineer Portfolio",
    description: "Selected work across Web, AI, and native development.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-zinc-950 font-sans text-zinc-100 antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
