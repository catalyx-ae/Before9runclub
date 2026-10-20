"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type PointerEvent, type KeyboardEvent } from "react";
import gsap from "gsap";
import geography from "@/content/geo/uae-region.json";
import { publishedRuns, type RecordedRun } from "@/content/runs";
import { abuDhabi, cameraString, CITY_VIEW, project, REGION_VIEW, type Camera } from "@/lib/geo";
import { ArrowIcon } from "./icons";
import { GalleryImage } from "./gallery";
import { useInteractive } from "./use-interactive";

export function RunAtlas({ compact = false }: { compact?: boolean }) {
  const ready = useInteractive();
  const [camera, setCamera] = useState<Camera>(REGION_VIEW);
  const [selected, setSelected] = useState<string | null>(null);
  const [viewName, setViewName] = useState("United Arab Emirates");
  const pane = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<Camera>({ ...REGION_VIEW });
  const tween = useRef<gsap.core.Tween | null>(null);
  const drag = useRef<{ x: number; y: number; camera: Camera } | null>(null);
  const run = publishedRuns.find(run => run.id === selected);
  const locations = useMemo(() => {
    const groups = new Map<string, RecordedRun[]>();
    for (const run of publishedRuns) {
      if (!run.coordinates?.verified || !run.coordinates.source) continue;
      const key = `${run.coordinates.latitude},${run.coordinates.longitude}`;
      groups.set(key, [...(groups.get(key) ?? []), run]);
    }
    return [...groups.values()];
  }, []);
  useEffect(() => () => { tween.current?.kill(); }, []);

  function flyTo(next: Camera, label: string) {
    tween.current?.kill(); setViewName(label);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { cameraRef.current = { ...next }; setCamera({ ...next }); return; }
    tween.current = gsap.to(cameraRef.current, { ...next, duration: 1.2, ease: "power3.inOut", onUpdate: () => setCamera({ ...cameraRef.current }) });
  }
  function openRun(record: RecordedRun) {
    setSelected(record.id);
    if (record.coordinates) {
      const p = project(record.coordinates.longitude, record.coordinates.latitude);
      flyTo({ x: p.x - 70, y: p.y - 50.4, width: 140, height: 100.8 }, record.location);
    }
  }
  function zoom(factor: number) {
    const current = cameraRef.current;
    const width = Math.max(100, Math.min(1000, current.width * factor));
    const height = width * .72;
    flyTo({ x: current.x + (current.width - width) / 2, y: current.y + (current.height - height) / 2, width, height }, width > 700 ? "United Arab Emirates" : "Explore Abu Dhabi");
  }
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if ((event.target as Element).closest("button, a")) return;
    tween.current?.kill(); pane.current?.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, camera: { ...cameraRef.current } };
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || !pane.current) return;
    const bounds = pane.current.getBoundingClientRect();
    const current = drag.current.camera;
    const next = { ...current, x: Math.max(-150, Math.min(1000, current.x - (event.clientX - drag.current.x) / bounds.width * current.width)), y: Math.max(-150, Math.min(720, current.y - (event.clientY - drag.current.y) / bounds.height * current.height)) };
    cameraRef.current = next; setCamera(next);
  }
  function keyboardPan(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault(); tween.current?.kill();
    const current = cameraRef.current, amount = current.width * .12;
    const next = { ...current, x: current.x + (event.key === "ArrowLeft" ? -amount : event.key === "ArrowRight" ? amount : 0), y: current.y + (event.key === "ArrowUp" ? -amount : event.key === "ArrowDown" ? amount : 0) };
    cameraRef.current = next; setCamera(next);
  }
  return <section className={`run-atlas ${compact ? "atlas-compact" : ""}`} aria-label="Before 9 Run Atlas">
    <div className="atlas-top mono"><span><span className="location-dot" />B9 / Run Atlas</span><span aria-live="polite">{viewName}</span></div>
    <div className="atlas-layout"><div className="atlas-map-column">
      <div className="atlas-canvas" ref={pane} tabIndex={0} role="group" aria-label="Interactive geographic map. Drag to pan, or use arrow keys when focused. Use the run list below for an alternative." onKeyDown={keyboardPan} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
        <svg viewBox={cameraString(camera)} preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="atlas-svg"><defs><pattern id={compact ? "atlas-grid-small" : "atlas-grid-full"} width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0v50" fill="none" stroke="#292b25" strokeWidth=".5" /></pattern></defs><rect x="-500" y="-500" width="2500" height="2000" fill={`url(#${compact ? "atlas-grid-small" : "atlas-grid-full"})`} />{geography.features.map(feature => <path d={feature.path} key={feature.name} className={feature.name === "United Arab Emirates" ? "atlas-country-uae" : "atlas-country"} vectorEffect="non-scaling-stroke" fillRule="evenodd" />)}<g className="atlas-geographic-labels"><text x="730" y="420">OMAN</text><text x="120" y="640">SAUDI ARABIA</text><text x="340" y="150">ARABIAN GULF</text>{camera.width > 450 && <text x="490" y="500" className="atlas-uae-label">UNITED ARAB EMIRATES</text>}</g></svg>
        <div className="atlas-city-label mono" style={{ left: `${(abuDhabi.x - camera.x) / camera.width * 100}%`, top: `${(abuDhabi.y - camera.y) / camera.height * 100}%` }}><span>+</span> Abu Dhabi</div>
        {locations.map(group => {
          const first = group[0], coordinates = first.coordinates!, p = project(coordinates.longitude, coordinates.latitude);
          const left = (p.x - camera.x) / camera.width * 100, top = (p.y - camera.y) / camera.height * 100;
          if (left < -3 || left > 103 || top < -3 || top > 103) return null;
          return <button disabled={!ready} key={`${coordinates.latitude},${coordinates.longitude}`} className={`atlas-marker ${selected && group.some(run => run.id === selected) ? "is-selected" : ""}`} style={{ left: `${left}%`, top: `${top}%` }} onClick={() => openRun(first)} aria-label={group.length === 1 ? `${first.id} — ${first.location.toUpperCase()}` : `${first.location} — ${group.length} chapters`} aria-pressed={group.some(run => run.id === selected)}><span className="marker-halo" /><span className="marker-dot" /><span className="marker-number mono">{first.id}</span><span className="marker-tooltip mono">{first.location}<br />{group.length > 1 ? `${group.length} chapters` : first.title}</span></button>;
        })}
        <div className="map-compass mono" aria-hidden="true">N<br />↑</div>
      </div>
      <div className="atlas-controls"><div className="atlas-views"><button disabled={!ready} onClick={() => { setSelected(null); flyTo(REGION_VIEW, "United Arab Emirates"); }} className="mono">UAE overview</button><button disabled={!ready} onClick={() => flyTo(CITY_VIEW, "Abu Dhabi")} className="mono">Fly to Abu Dhabi ↗</button></div><div><button disabled={!ready} onClick={() => zoom(.65)} aria-label="Zoom in">+</button><button disabled={!ready} onClick={() => zoom(1.5)} aria-label="Zoom out">−</button></div></div>
      <p className="atlas-attribution mono">Geography: <a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener noreferrer">Natural Earth / Public domain ↗</a><br />Regional geography · Park pin from owner-confirmed Google Maps coordinates.</p>
    </div><aside className="atlas-story-panel" aria-label="Run story panel">
      {run ? <div key={run.id} className="atlas-selected-story"><p className="mono orange">{run.id} / {run.location}</p><h3>{run.title}</h3><p>{run.description}</p>{run.date && <time dateTime={run.date}>{new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "Asia/Dubai" }).format(new Date(run.date))}</time>}{run.media[0] && <div className="atlas-panel-media"><GalleryImage item={run.media[0]} /></div>}<div className="atlas-media-slot"><span className="mono">Run {run.id} / Photography & film</span><span>{run.media.length ? `${run.media.length} confirmed moments` : "First memories to come."}</span></div><Link className="editorial-link link-light" href={`/archive/${run.id}`}><span>Explore the full chapter</span><ArrowIcon diagonal /></Link><p className="mono pending-note">{run.media.length ? "Explore the chapter for the full media collection." : "Media from this run has not yet been supplied."}</p></div> : <div><p className="mono orange">Every orange light is a real chapter.</p><h3>Every run.<br />A story.</h3><p>A growing memory map of the places we’ve moved, and the moments we’ve shared.</p><p className="atlas-instruction mono">Select a glowing marker or choose a chapter below.</p></div>}
      <div className="atlas-run-list"><h4 className="mono">Recorded chapters / List alternative</h4>{publishedRuns.map(record => <button disabled={!ready} key={record.id} onClick={() => openRun(record)} aria-pressed={selected === record.id}><span className="orange mono">{record.id}</span><span>{record.location}<span className="mono">{record.city}{record.coordinates ? "" : " / Location pending verification"}</span></span><ArrowIcon diagonal /></button>)}</div>
    </aside></div>
  </section>;
}
