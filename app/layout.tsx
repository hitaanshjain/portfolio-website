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
        {/* Six focusable elements sit in the nav ahead of the content on
            every page. Hidden by transform rather than display so it stays
            in the tab order and in the accessibility tree, and offset far
            enough up that it cannot intercept anything while unfocused.
            z-50 keeps it above the sticky header's z-40. */}
        <a
          href="#main"
          className="skip-link fixed left-4 top-4 z-50 -translate-y-20 rounded-md bg-night px-4 py-2 text-sm text-paper transition-transform focus:translate-y-0 motion-reduce:transition-none"
        >
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
