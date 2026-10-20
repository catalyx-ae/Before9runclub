"use client";
import { useState } from "react";
import { motionThemes } from "@/content/site";
import { SparkIcon } from "./icons";
import { useInteractive } from "./use-interactive";

export function MotionPlayground() {
  const ready = useInteractive();
  const [active, setActive] = useState(0);
  const theme = motionThemes[active];
  return <section className={`motion-playground playground-${theme.color}`} aria-label="Explore mind and motion" onPointerMove={event => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${(event.clientX - box.left - box.width / 2) / box.width * 16}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${(event.clientY - box.top - box.height / 2) / box.height * 12}px`);
  }}><div className="playground-controls page-gutter" role="group" aria-label="Choose a feeling">{motionThemes.map((item, i) => <button disabled={!ready} key={item.word} onClick={() => setActive(i)} aria-pressed={active === i}><span className="mono">0{i + 1}</span>{item.word}</button>)}</div><div className="playground-stage"><span className="playground-echo" aria-hidden="true">{theme.word}</span><h2 key={theme.word}>{theme.word}</h2><SparkIcon className="playground-spark" /><div className="playground-track" aria-hidden="true"><span /><span /><span /></div></div><div className="playground-copy page-gutter" aria-live="polite"><p className="mono">A feeling, not a finish line.</p><div><h3>{theme.title}</h3><p>{theme.body}</p></div></div></section>;
}
