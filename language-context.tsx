import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pazzi Auto Detail | Mobile Car Detailing Florida",
  description:
    "Mobile Auto Detailing in Florida — Ceramic Coating, Interior Restoration, Paint Correction, and Exterior Detailing. We come to you. Car Detailing Near Me.",
  keywords: [
    "Mobile Car Detailing Florida",
    "Car Detailing Near Me",
    "Luxury Car Detailing",
    "Interior Car Cleaning",
    "Exterior Car Wash",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
