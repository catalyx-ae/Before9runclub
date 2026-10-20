"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { brand } from "@/content/brand";
import { ArrowIcon } from "./icons";
import { Wordmark } from "./wordmark";

const links = [
  { href: "#beginning", label: "The beginning", number: "01" },
  { href: "#our-story", label: "Our story", number: "02" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  function openMenu() {
    dialog.current?.showModal();
    setOpen(true);
  }

  function closeMenu() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }

  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const focusable = dialog.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <header className="site-header page-gutter">
        <a href="#beginning" className="logo-link" aria-label="Before 9 Run Club — the beginning"><Wordmark /></a>
        <p className="header-location mono"><span className="location-dot" />{brand.location}</p>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#our-story" className="text-link">Our story</a>
          <a href={brand.instagram} className="text-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)">Instagram <ArrowIcon diagonal /></a>
        </nav>
        <button ref={trigger} className="menu-button mono" onClick={openMenu} aria-haspopup="dialog" aria-expanded={open} aria-controls="chapter-menu">
          Menu <span className="menu-plus" aria-hidden="true">+</span>
        </button>
      </header>

      <dialog ref={dialog} id="chapter-menu" className="chapter-menu" aria-labelledby="menu-title" onKeyDown={containFocus} onCancel={event => { event.preventDefault(); closeMenu(); }} onClose={() => setOpen(false)}>
        <div className="menu-top page-gutter">
          <Wordmark />
          <button className="menu-button mono" onClick={closeMenu} aria-label="Close menu">Close <span className="menu-plus" aria-hidden="true">×</span></button>
        </div>
        <div className="menu-content page-gutter">
          <p id="menu-title" className="mono eyebrow">Early mornings. Open minds.</p>
          <nav aria-label="Chapters">
            {links.map(link => (
              <a key={link.href} href={link.href} onClick={closeMenu} className="menu-chapter">
                <span className="mono">{link.number}</span><span>{link.label}</span><ArrowIcon diagonal />
              </a>
            ))}
          </nav>
          <a href={brand.instagram} className="menu-instagram" target="_blank" rel="noopener noreferrer" aria-label="Find us on Instagram (opens in a new tab)">Find us on Instagram <ArrowIcon diagonal /></a>
          <p className="mono menu-location">{brand.location} / See you before 9.</p>
        </div>
      </dialog>
    </>
  );
}
