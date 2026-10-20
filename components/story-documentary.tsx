"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { founders, storyChapters } from "@/content/site";
import { FounderVisual } from "./founder-visual";

export function StoryDocumentary() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      // IntersectionObserver percentage margins use viewport width, including
      // vertical margins. Pixel margins keep this reading band inside the
      // viewport on wide desktop screens as well as narrow phones.
      const height = window.innerHeight;
      observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.chapter)); }, { rootMargin: `${-height * .4}px 0px ${-height * .59}px 0px` });
      root.current?.querySelectorAll("[data-chapter]").forEach(element => observer.observe(element));
    };
    observe();
    window.addEventListener("resize", observe);
    return () => { observer.disconnect(); window.removeEventListener("resize", observe); };
  }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".documentary-image", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, stagger: .16, ease: "power3.inOut", scrollTrigger: { trigger: ".documentary-portraits", start: "top 90%", once: true } });
    }, root);
    return () => motion.revert();
  }, []);
  return <div className="documentary page-gutter" ref={root}>
    <div className="documentary-visual"><div className="documentary-portraits" data-scene={active}>
      <div className="documentary-duo">{founders.map(founder => <figure className={`documentary-portrait-card story-portrait-${founder.id}`} key={founder.id}><div className="documentary-image"><FounderVisual founder={founder} sizes="(max-width: 700px) 45vw, 22vw" /></div><figcaption className="mono"><span>{founder.name}</span><span>Co-founder</span></figcaption></figure>)}</div>
      <span className="documentary-frame-corner" aria-hidden="true" />
    </div><div className="documentary-progress mono"><span>0{active + 1} / 04</span><span>{storyChapters[active].title}</span></div><div className="documentary-line" aria-hidden="true"><span style={{ width: `${(active + 1) * 25}%` }} /></div><nav className="documentary-nav mono" aria-label="Story scenes">{storyChapters.map((chapter, i) => <a href={`#scene-${i + 1}`} key={chapter.number} onClick={() => setActive(i)} aria-current={active === i ? "step" : undefined}>{chapter.number}</a>)}</nav></div>
    <div className="documentary-scenes">{storyChapters.map((chapter, i) => <article key={chapter.number} id={`scene-${i + 1}`} data-chapter={i}><p className="mono orange">{chapter.number} / {chapter.title}</p><h2 data-reveal>{chapter.heading}</h2><p>{chapter.body}</p><p className="scene-aside mono">{chapter.aside}</p></article>)}</div>
  </div>;
}
