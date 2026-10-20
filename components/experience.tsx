"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Modal } from "./modal";
import { Wordmark } from "./wordmark";

export function Intro() {
  const [open, setOpen] = useState(false);
  const scope = useRef<HTMLDivElement>(null);
  const finish = useCallback(() => { setOpen(false); try { sessionStorage.setItem("b9-intro-seen", "true"); } catch {} }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try { if (sessionStorage.getItem("b9-intro-seen")) return; } catch {}
    setOpen(true);
  }, []);
  useEffect(() => {
    if (!open) return;
    const context = gsap.context(() => {
      gsap.from(".intro-words span", { yPercent: 115, stagger: .12, duration: .55, ease: "power3.out" });
      gsap.from(".intro-motion-line", { scaleX: 0, transformOrigin: "left", duration: 1.45, ease: "power2.inOut" });
    }, scope);
    const timeout = window.setTimeout(finish, 1900);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => { if (preference.matches) finish(); };
    preference.addEventListener("change", change);
    return () => { context.revert(); clearTimeout(timeout); preference.removeEventListener("change", change); };
  }, [open, finish]);
  return <Modal open={open} onClose={finish} label="Welcome to Before 9" className="intro-dialog"><div ref={scope} className="intro-stage page-gutter"><div className="intro-top"><Wordmark /><button onClick={finish} className="menu-button mono">Skip intro ↗</button></div><p className="sr-only">Before 9 Run Club. Wake up. Show up. Feel alive.</p><div className="intro-words" aria-hidden="true"><div><span>Wake up.</span></div><div><span>Show up.</span></div><div><span>Feel alive.</span></div></div><span className="intro-motion-line" /><p className="mono">Abu Dhabi / The morning starts here.</p></div></Modal>;
}

export function ExperienceMotion() {
  const path = usePathname();
  const previous = useRef(path);
  useEffect(() => {
    const match = gsap.matchMedia();
    match.add("(prefers-reduced-motion: no-preference)", () => {
      // Page-wide title/reveal effects use CSS, leaving streamed page markup
      // untouched until its own client components have hydrated.
      if (previous.current !== path) gsap.fromTo(".scene-wipe", { x: 0, xPercent: -105 }, { x: 0, xPercent: 105, duration: .55, ease: "power3.inOut" });
    });
    previous.current = path;
    return () => match.revert();
  }, [path]);
  return <div className="scene-wipe" aria-hidden="true"><span>BEFORE 9</span><i /></div>;
}
