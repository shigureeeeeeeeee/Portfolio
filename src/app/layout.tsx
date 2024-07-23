import type { Metadata } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeContext";

const playfair = Playfair_Display({ subsets: ["latin"] });
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
      <ThemeProvider>
        <body
          className={`${playfair.className} ${roboto.className} transition-colors duration-300`}
        >
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
