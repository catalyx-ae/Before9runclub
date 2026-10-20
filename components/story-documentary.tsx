"use client";
import { useEffect, useRef, useState } from "react";
import { founders, storyChapters, communityMedia } from "@/content/site";
import { FounderVisual } from "./founder-visual";
import { GalleryArt } from "./gallery";

export function StoryDocumentary() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.chapter)); }, { rootMargin: "-25% 0px -45% 0px" });
    root.current?.querySelectorAll("[data-chapter]").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <div className="documentary page-gutter" ref={root}>
    <div className="documentary-visual"><div className={`documentary-portraits ${active > 1 ? "is-collective" : ""}`}><div className="documentary-duo">{founders.map(founder => <FounderVisual key={founder.id} founder={founder} />)}</div><div className="documentary-collective"><GalleryArt item={communityMedia[1]} /></div></div><div className="documentary-progress mono"><span>0{active + 1} / 04</span><span>{storyChapters[active].title}</span></div><div className="documentary-line" aria-hidden="true"><span style={{ width: `${(active + 1) * 25}%` }} /></div><nav className="documentary-nav mono" aria-label="Story scenes">{storyChapters.map((chapter, i) => <a href={`#scene-${i + 1}`} key={chapter.number} aria-current={active === i ? "step" : undefined}>{chapter.number}</a>)}</nav></div>
    <div className="documentary-scenes">{storyChapters.map((chapter, i) => <article key={chapter.number} id={`scene-${i + 1}`} data-chapter={i}><p className="mono orange">{chapter.number} / {chapter.title}</p><h2 data-reveal>{chapter.heading}</h2><p>{chapter.body}</p><p className="scene-aside mono">{chapter.aside}</p></article>)}</div>
  </div>;
}
