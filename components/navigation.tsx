"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { brand } from "@/content/brand";
import { pages } from "@/content/site";
import { ArrowIcon } from "./icons";
import { Modal } from "./modal";
import { Wordmark } from "./wordmark";
import { useInteractive } from "./use-interactive";

export function Navigation() {
  const pathname = usePathname();
  const ready = useInteractive();
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.from(".menu-chapter", { yPercent: 45, opacity: 0, stagger: .035, duration: .45, ease: "power3.out" });
      gsap.from(".menu-trail", { scaleX: 0, transformOrigin: "left", duration: .6, ease: "power3.out" });
    }, menu);
    return () => context.revert();
  }, [open]);
  return <>
    <header className="site-header page-gutter">
      <Link href="/" className="logo-link" aria-label="Before 9 Run Club — home"><Wordmark /></Link>
      <p className="header-location mono"><span className="location-dot" />{brand.location}</p>
      <nav className="desktop-nav" aria-label="Main navigation"><Link href="/story" className="text-link">Our story</Link><Link href="/archive" className="text-link">Explore the archive <ArrowIcon diagonal /></Link></nav>
      <button disabled={!ready} className="menu-button mono" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>Menu <span className="menu-plus" aria-hidden="true">+</span></button>
    </header>
    <Modal open={open} onClose={() => setOpen(false)} label="Explore Before 9" className="chapter-menu">
      <div ref={menu}>
        <div className="menu-top page-gutter"><Wordmark /><button className="menu-button mono" onClick={() => setOpen(false)} aria-label="Close menu">Close <span className="menu-plus" aria-hidden="true">×</span></button></div>
        <div className="menu-content page-gutter"><div className="menu-title-row"><p className="mono">Eight ways into the morning.</p><span className="menu-trail" aria-hidden="true" /></div>
          <nav aria-label="All pages">{pages.map(page => <Link key={page.href} href={page.href} onClick={() => setOpen(false)} className="menu-chapter" aria-current={pathname === page.href ? "page" : undefined}><span className="mono">{page.number}</span><span>{page.label}</span><span className="menu-note mono">{page.note}</span><ArrowIcon diagonal /></Link>)}</nav>
          <a href={brand.instagram} className="menu-instagram" target="_blank" rel="noopener noreferrer" aria-label="Find us on Instagram (opens in a new tab)">Find us on Instagram <ArrowIcon diagonal /></a>
        </div>
      </div>
    </Modal>
  </>;
}
