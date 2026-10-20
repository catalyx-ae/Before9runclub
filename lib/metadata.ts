import type { Metadata } from "next";
import { pages } from "@/content/site";
export function pageMetadata(href: string): Metadata {
  const page = pages.find(page => page.href === href)!;
  return {
    title: `${page.label} — Before 9 Run Club`, description: page.description,
    openGraph: { title: `${page.title} | Before 9 Run Club`, description: page.description, type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: `${page.title} | Before 9 Run Club`, description: page.description, images: ["/opengraph-image"] },
  };
}
