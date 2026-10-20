"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { founders } from "@/content/site";
import { FounderVisual } from "./founder-visual";
import { useInteractive } from "./use-interactive";
import { ArrowIcon, SparkIcon } from "./icons";

export function FoundersExperience() {
  const ready = useInteractive();
  const root = useRef<HTMLElement>(null);
  const profile = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const active = founders.find(founder => founder.id === selected);
  const reset = () => { setSelected(null); setPreview(null); };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const entrance = gsap.timeline({ scrollTrigger: { trigger: ".founder-split", start: "top 90%", once: true } });
      entrance.fromTo(".founder-portrait-reveal", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, stagger: .14, ease: "power3.inOut" })
        .fromTo(".founder-portrait-zoom", { scale: 1.16 }, { scale: 1, duration: 1.5, stagger: .14, ease: "power2.out" }, .15)
        .fromTo(".founder-letter", { yPercent: 110, rotate: 5 }, { yPercent: 0, rotate: 0, duration: .85, stagger: .045, ease: "power3.out" }, .65)
        .fromTo(".founder-panel-label", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .5, stagger: .12 }, .9);
    }, root);
    motion.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanups: (() => void)[] = [];
      root.current?.querySelectorAll<HTMLElement>(".founder-panel").forEach(panel => {
        const depth = panel.querySelector(".founder-portrait-depth");
        const name = panel.querySelector(".founder-name");
        const x = gsap.quickTo(depth, "x", { duration: .8, ease: "power3.out" });
        const y = gsap.quickTo(depth, "y", { duration: .8, ease: "power3.out" });
        const rotateX = gsap.quickTo(depth, "rotationX", { duration: .9, ease: "power3.out" });
        const rotateY = gsap.quickTo(depth, "rotationY", { duration: .9, ease: "power3.out" });
        const titleX = gsap.quickTo(name, "x", { duration: .65, ease: "power3.out" });
        const move = (event: PointerEvent) => {
          const rect = panel.getBoundingClientRect();
          const dx = (event.clientX - rect.left) / rect.width - .5;
          const dy = (event.clientY - rect.top) / rect.height - .5;
          x(dx * 20); y(dy * 16); rotateX(-dy * 3); rotateY(dx * 4); titleX(-dx * 12);
        };
        const leave = () => { x(0); y(0); rotateX(0); rotateY(0); titleX(0); };
        panel.addEventListener("pointermove", move);
        panel.addEventListener("pointerleave", leave);
        cleanups.push(() => { panel.removeEventListener("pointermove", move); panel.removeEventListener("pointerleave", leave); });
      });
      return () => cleanups.forEach(cleanup => cleanup());
    }, root);
    return () => motion.revert();
  }, []);

  useEffect(() => {
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(profile.current?.children ?? [], { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .55, stagger: .06, ease: "power2.out" });
    });
    return () => motion.revert();
  }, [selected]);

  return <section ref={root} className="founders-experience" aria-label="Meet Selim and Enes" onKeyDown={event => { if (event.key === "Escape") reset(); }}>
    <div className="founder-film-rail page-gutter mono"><span>Two friends. One movement.</span><span>Choose a portrait to meet the person ↓</span></div>
    <div className="founder-split" data-selected={selected ?? "both"} data-focus={selected ?? preview ?? "both"}>{founders.map((founder, index) => <div className={`founder-panel panel-${founder.id}`} key={founder.id} onPointerEnter={event => { if (event.pointerType === "mouse") setPreview(founder.id); }} onPointerLeave={() => setPreview(null)}>
      <div className="founder-portrait-reveal"><div className="founder-portrait-zoom"><div className="founder-portrait-depth"><FounderVisual founder={founder} priority sizes="(max-width: 700px) 50vw, 65vw" /></div></div></div>
      <div className="founder-shade" aria-hidden="true" />
      <div className="founder-panel-label mono"><span>0{index + 1} / Co-founder</span><span>Abu Dhabi, UAE</span></div>
      <button disabled={!ready} className="founder-select" onFocus={() => setPreview(founder.id)} onBlur={() => setPreview(null)} onClick={() => { setSelected(selected === founder.id ? null : founder.id); setPreview(null); }} aria-label={`Meet ${founder.name}`} aria-expanded={selected === founder.id} aria-controls="founder-profile">
        <span className="founder-name" aria-hidden="true">{[...founder.name].map((letter, i) => <span className="founder-letter-mask" key={i}><span className="founder-letter">{letter}</span></span>)}<span className="founder-letter-mask"><span className="founder-letter founder-name-dot">.</span></span></span>
        <span className="founder-select-footer" aria-hidden="true"><span className="mono">{selected === founder.id ? "His space / Scroll ↓" : "Meet the person"}</span><span className="founder-button-arrow"><ArrowIcon diagonal /></span></span>
      </button>
    </div>)}</div>
    <div className="founder-film-caption page-gutter mono"><span>Selim <span className="orange">+</span> Enes</span><span>Friendship in motion.</span><SparkIcon /></div>
    <div id="founder-profile" className="founder-profile page-gutter" aria-live="polite" aria-atomic="true" ref={profile}>
      {active ? <><div><p className="mono">The person behind the morning</p><h2>{active.name}<span className="orange">.</span></h2><p className="founder-role">{active.role} / Before 9 Run Club</p><button className="plain-button mono" onClick={reset}>Back to the duo ↑</button></div><div className="founder-story-panel"><SparkIcon /><h3>In {active.name}’s words.</h3><p>{active.biography ?? `${active.name}’s personal story is waiting for his words. We’ll share it here when he’s ready.`}</p><dl><dt>Why Before 9?</dt><dd>{active.motivation ?? `To be added by ${active.name}.`}</dd><dt>What comes next?</dt><dd>{active.vision ?? "Founder’s vision to come."}</dd></dl>{active.quote && <blockquote>{active.quote}</blockquote>}<p className="mono pending-note">Personal details pending founder approval.</p></div></> : <><div><p className="mono">Two friends / One shared idea</p><h2>Different people.<br /><span className="orange">Same good energy.</span></h2></div><div className="founder-story-panel"><p>Before 9 was founded by Selim and Enes. Two friends who wanted to bring people together through movement, positivity, and shared experiences.</p><p>Choose a portrait above to explore each founder’s space.</p><p className="mono pending-note">Individual stories to come, in the founders’ own words.</p></div></>}
    </div>
  </section>;
}
