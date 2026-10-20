"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function StoryMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.65 })
        .from(".hero-title .line-inner", { yPercent: 110, stagger: 0.12, duration: 1.1 }, 0.12)
        .from(".hero-visual", { opacity: 0, y: 26, duration: 1.2 }, 0.25)
        .from(".hero-copy, .hero-bottom", { opacity: 0, y: 15, stagger: 0.1, duration: 0.8 }, 0.65);

      gsap.utils.toArray<HTMLElement>("[data-story-reveal]").forEach(element => {
        gsap.from(element, {
          y: 35, opacity: 0, duration: 0.85, ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
        });
      });

      gsap.to(".ribbon-track", {
        xPercent: -15, ease: "none",
        scrollTrigger: { trigger: ".story-ribbon", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(".story-media-wrap [data-parallax]", {
        yPercent: -4, ease: "none",
        scrollTrigger: { trigger: ".story-media-wrap", start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });
    return () => media.revert();
  }, []);

  return null;
}
