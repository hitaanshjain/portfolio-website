import type { Metadata } from "next";
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://hitaanshjain.vercel.app"),
  title: {
    default: "Hitaansh Jain · CS @ NYU",
    template: "%s",
  },
  description: "CS @ NYU. Full-stack and AI engineer. Case studies on verified LLM pipelines, air-gapped RAG, and a shipped Unity game.",
  openGraph: {
    title: "Hitaansh Jain · CS @ NYU",
    description: "CS @ NYU. Full-stack and AI engineer. Case studies on verified LLM pipelines, air-gapped RAG, and a shipped Unity game.",
    url: "/",
    siteName: "Hitaansh Jain",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body className="bg-paper text-ink font-body antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
