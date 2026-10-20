import type { Metadata, Viewport } from "next";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
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
      <body>{children}</body>
    </html>
  );
}
