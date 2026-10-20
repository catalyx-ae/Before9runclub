import type { Metadata, Viewport } from "next";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ExperienceMotion } from "@/components/experience";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Before 9 Run Club — Before the city wakes",
  description:
    "Two friends. One movement. Meet Before 9, a running community in Abu Dhabi built on friendship, good energy, and mornings worth getting up for.",
  robots: { index: false, follow: false },
  // Keep the creative-review build out of search until the brand approves it.
};

export const viewport: Viewport = {
  themeColor: "#0a0a09",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Navigation />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <ExperienceMotion />
      </body>
    </html>
  );
}
