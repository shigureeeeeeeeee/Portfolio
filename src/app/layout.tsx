import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Portfolio",
  description: "A showcase of my projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body
          className={`${roboto.className} transition-colors duration-300`}
        >
          {children}
        </body>
    </html>
  );
}