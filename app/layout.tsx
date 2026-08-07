import type { Metadata } from "next";
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

// Single source for the tagline so <meta name="description">, og:description,
// and the twitter:description Next derives from it can't drift apart. Keep it
// in step with hero.typedLine in lib/data.ts and the OG image.
const TITLE = "Hitaansh Jain · CS @ NYU '27";
const DESCRIPTION =
  "CS @ NYU '27, 3.93 GPA. Full-stack and AI engineer. Case studies on verified LLM pipelines, air-gapped RAG, and a shipped Unity game.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hitaansh.dev"),
  title: {
    default: TITLE,
    template: "%s",
  },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
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
