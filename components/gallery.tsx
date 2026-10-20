"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { communityMedia, type GalleryItem } from "@/content/site";
import { Modal } from "./modal";
import { ArrowIcon } from "./icons";
import { useInteractive } from "./use-interactive";

export function GalleryArt({ item }: { item: GalleryItem }) {
  return <svg viewBox="0 0 680 650" className={`gallery-art art-${item.color}`} role="img" aria-label={`${item.title} — editorial placeholder awaiting club photography`}><rect width="680" height="650" fill="currentColor" /><g className="gallery-art-lines" fill="none" strokeWidth="2"><ellipse cx="340" cy="325" rx="270" ry="210" /><ellipse cx="340" cy="325" rx="210" ry="270" /><path d="M-40 530Q340 30 720 530M-40 570Q340 70 720 570M-40 610Q340 110 720 610" /></g><g className="gallery-art-type" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fontSize="122" letterSpacing="-2"><text x="40" y="310">{item.id === "arriving" ? "HELLO." : item.id === "together" ? "TOGETHER." : item.id === "after" ? "AFTER." : "AGAIN."}</text><text x="40" y="425" fill="none" stroke="currentColor" strokeWidth="1">MORNINGS.</text></g><g className="gallery-art-type" fontFamily="'IBM Plex Mono',monospace" fontSize="12" letterSpacing="2"><text x="40" y="55">BEFORE 9 / VISUAL STUDY</text><text x="40" y="610">CLUB PHOTOGRAPHY TO COME</text></g></svg>;
}

export function GalleryImage({ item, priority = false }: { item: GalleryItem; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  return item.asset.src && item.asset.kind === "image" && !failed ? <Image src={item.asset.src} alt={item.asset.alt} fill sizes="(max-width: 700px) 100vw, 55vw" priority={priority} onError={() => setFailed(true)} /> : item.asset.kind === "video" && item.asset.poster && !failed ? <Image src={item.asset.poster} alt={item.asset.alt} fill sizes="(max-width: 700px) 100vw, 55vw" onError={() => setFailed(true)} /> : <GalleryArt item={item} />;
}

export function Gallery({ items = communityMedia, compact = false }: { items?: GalleryItem[]; compact?: boolean }) {
  const ready = useInteractive();
  const [index, setIndex] = useState<number | null>(null);
  const [failedVideo, setFailedVideo] = useState<string | null>(null);
  const touch = useRef<number | null>(null);
  const visibleItems = compact ? items.slice(0, 2) : items;
  const item = index === null ? null : visibleItems[index];
  function step(direction: number) { setIndex(value => value === null ? 0 : (value + direction + visibleItems.length) % visibleItems.length); }
  return <>
    <div className={`photo-field ${compact ? "photo-field-compact" : ""}`}>{visibleItems.map((photo, i) => <button disabled={!ready} key={photo.id} className={`photo-float photo-${i + 1}`} onClick={() => setIndex(i)} aria-label={`Open ${photo.title}`} onPointerMove={event => {
      if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--tilt-x", `${(event.clientX - bounds.left - bounds.width / 2) / bounds.width * 5}deg`);
      event.currentTarget.style.setProperty("--tilt-y", `${-(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 5}deg`);
    }} onPointerLeave={event => { event.currentTarget.style.setProperty("--tilt-x", "0deg"); event.currentTarget.style.setProperty("--tilt-y", "0deg"); }}><div className="photo-frame"><GalleryImage item={photo} /><span className="photo-expand" aria-hidden="true"><ArrowIcon diagonal /></span></div><span className="photo-caption"><span>{photo.title}</span><span className="mono">{photo.status === "placeholder" || !photo.asset.src ? "Visual study / Photo pending" : "View moment ↗"}</span></span></button>)}</div>
    <Modal open={index !== null} onClose={() => setIndex(null)} label="Morning collective media viewer" className="media-viewer" onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); step(1); } if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); } }}>
      <div className="viewer-top mono"><span>The morning collective</span><button className="menu-button mono" onClick={() => setIndex(null)} aria-label="Close media viewer">Close ×</button></div>
      {item && <><div className="viewer-image" onTouchStart={event => { touch.current = event.touches[0].clientX; }} onTouchEnd={event => { if (touch.current !== null) { const delta = event.changedTouches[0].clientX - touch.current; if (Math.abs(delta) > 60) step(delta > 0 ? -1 : 1); } touch.current = null; }}>
        {item.asset.kind === "video" && item.asset.src && failedVideo !== item.id ? <video key={item.id} src={item.asset.src} poster={item.asset.poster ?? undefined} controls playsInline preload="metadata" aria-label={item.asset.alt} onError={() => setFailedVideo(item.id)} /> : <GalleryImage key={item.id} item={item} />}
      </div><div className="viewer-bottom"><button className="viewer-arrow" onClick={() => step(-1)} aria-label="Previous image">←</button><div aria-live="polite"><p className="mono">{String((index ?? 0) + 1).padStart(2, "0")} / {String(visibleItems.length).padStart(2, "0")} {item.status === "placeholder" || !item.asset.src ? "— Visual study; photograph pending" : ""}</p><h2>{item.title}</h2><p>{item.description}</p></div><button className="viewer-arrow" onClick={() => step(1)} aria-label="Next image">→</button></div></>}
    </Modal>
  </>;
}
