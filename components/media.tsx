"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MediaAsset } from "@/content/brand";
import { useInteractive } from "./use-interactive";

/** Art-directed placeholders are deliberately labeled; they are not club assets. */
export function CinematicMedia({ asset, variant, priority = false }: { asset: MediaAsset; variant: "dawn" | "friends"; priority?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const ready = useInteractive();
  const [playing, setPlaying] = useState(false);
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const videoSource = asset.kind === "video" ? asset.src : null;
  const imageSource = asset.kind === "image" ? asset.src : asset.poster ?? null;
  const showVideo = Boolean(videoSource && !failedSources.includes(videoSource));
  const showImage = Boolean(imageSource && !failedSources.includes(imageSource));
  const available = showVideo || showImage;
  function fail(source: string) { setFailedSources(previous => previous.includes(source) ? previous : [...previous, source]); }

  useEffect(() => {
    if (!showVideo) return;
    const element = video.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (preference.matches) element?.pause();
      // Videos start with their poster. Playback is always a visitor choice.
    };
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, [showVideo]);

  async function toggleVideo() {
    const element = video.current;
    if (!element) return;
    if (!element.paused) element.pause();
    else {
      try { await element.play(); }
      catch { setPlaying(false); }
    }
  }

  return (
    <figure className={`cinematic-media media-${variant} ${available ? "has-media" : "is-placeholder"}`}>
      <div className="media-canvas" data-parallax>
        {available ? (
          showVideo && videoSource ? (
            <>
              <video ref={video} src={videoSource} poster={asset.poster ?? undefined} muted loop playsInline preload="metadata" aria-label={asset.alt} onError={() => fail(videoSource)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
                Your browser does not support this video.
              </video>
              <button disabled={!ready} className="video-control mono" onClick={toggleVideo} aria-label={playing ? "Pause background footage" : "Play background footage"}>{playing ? "Pause footage Ⅱ" : "Play footage ▷"}</button>
            </>
          ) : imageSource ? (
            <Image src={imageSource} alt={asset.alt} fill sizes={variant === "dawn" ? "(max-width: 700px) 100vw, 46vw" : "(max-width: 700px) 100vw, 50vw"} priority={priority} className="brand-image" onError={() => fail(imageSource)} />
          ) : null
        ) : variant === "dawn" ? <DawnStudy /> : <FriendshipStudy />}
      </div>
      {!available && (
        <figcaption className="media-placeholder-caption mono">
          <span>{variant === "dawn" ? "Dawn / Visual study" : "Selim & Enes / Visual study"}</span>
          <span>{variant === "dawn" ? "Club imagery to come" : "Founders’ photograph to come"}</span>
        </figcaption>
      )}
      {available && !asset.containsText && <figcaption className="media-caption mono">{variant === "dawn" ? "Before the city wakes / Abu Dhabi" : "Selim & Enes / Co-founders"}</figcaption>}
    </figure>
  );
}

function DawnStudy() {
  return (
    <svg className="dawn-art" viewBox="0 0 640 760" role="img" aria-labelledby="dawn-title dawn-desc" preserveAspectRatio="xMidYMid slice">
      <title id="dawn-title">Dawn — an original graphic placeholder</title>
      <desc id="dawn-desc">An ivory sun rises over sweeping track lines on an orange field. Awaiting authentic club photography.</desc>
      <defs>
        <filter id="dawn-grain"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncA type="linear" slope=".13" /></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply" /></filter>
        <clipPath id="dawn-clip"><path d="M0 0h640v760H0z" /></clipPath>
      </defs>
      <g clipPath="url(#dawn-clip)">
        <path fill="#fc580e" d="M0 0h640v760H0z" />
        <circle cx="330" cy="288" r="157" fill="#f4f1e9" />
        <path d="M-110 760v-21c0-260 860-159 860-430v451Z" fill="#171813" />
        <g stroke="#f4f1e9" fill="none" strokeWidth="2.2">
          <path d="M-24 770c-18-272 734-196 722-419" />
          <path d="M112 790c-43-247 573-263 561-435" />
          <path d="M262 802c-67-251 400-332 390-447" />
          <path d="M430 803c-41-218 213-342 199-447" />
          <path d="M607 801c-10-171 30-350 0-445" />
        </g>
        <path d="M0 0h640v760H0z" fill="transparent" filter="url(#dawn-grain)" />
        <g fill="#171813" fontFamily="'IBM Plex Mono', monospace" fontSize="11" letterSpacing="1.4">
          <text x="28" y="40">BEFORE THE EVERYDAY.</text>
          <text x="612" y="40" textAnchor="end">B9 / 01</text>
        </g>
        <g stroke="#f4f1e9" strokeWidth="1"><path d="M28 690v26m-13-13h26M612 690v26m-13-13h26" /></g>
        <text x="320" y="710" textAnchor="middle" fill="#f4f1e9" fontFamily="'IBM Plex Mono', monospace" fontSize="11" letterSpacing="3">A NEW WAY TO BEGIN.</text>
      </g>
    </svg>
  );
}

function FriendshipStudy() {
  return (
    <svg className="friends-art" viewBox="0 0 700 640" role="img" aria-labelledby="friends-title friends-desc" preserveAspectRatio="xMidYMid slice">
      <title id="friends-title">Two friends — an original typographic placeholder</title>
      <desc id="friends-desc">Selim and Enes's names in oversized orange type, with two parallel running lines. Awaiting an approved founders' photograph.</desc>
      <path fill="#151612" d="M0 0h700v640H0z" />
      <g stroke="#41423b" fill="none" strokeWidth="1">
        <path d="M480-100v330c0 130-340 150-340 300v170M525-100v330c0 170-340 170-340 300v170" />
        <circle cx="502" cy="200" r="130" /><circle cx="502" cy="200" r="180" />
      </g>
      <g fill="#fc580e" fontFamily="'Barlow Condensed', sans-serif" fontSize="190" fontWeight="700" letterSpacing="-4">
        <text x="45" y="280">SELIM</text>
        <text x="45" y="445">&amp; ENES.</text>
      </g>
      <text x="48" y="51" fill="#f4f1e9" fontFamily="'IBM Plex Mono', monospace" fontSize="11" letterSpacing="2">TWO FRIENDS. SOMETHING SHARED.</text>
      <g fill="#f4f1e9"><circle cx="53" cy="557" r="5" /><circle cx="78" cy="557" r="5" /></g>
      <path d="M48 587h604" stroke="#41423b" />
      <text x="48" y="617" fill="#aaa99e" fontFamily="'IBM Plex Mono', monospace" fontSize="10" letterSpacing="1.5">S + E / BEFORE 9 RUN CLUB</text>
    </svg>
  );
}
