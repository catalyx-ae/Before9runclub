"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { publishedRuns } from "@/content/runs";
import { RunAtlas } from "./run-atlas";
import { ArrowIcon } from "./icons";
import { useInteractive } from "./use-interactive";

export function ArchiveExplorer() {
  const ready = useInteractive();
  const [view, setView] = useState<"chapters" | "atlas">("chapters");
  const [search, setSearch] = useState("");
  useEffect(() => { if (window.location.hash === "run-atlas") setView("atlas"); }, []);
  const filtered = publishedRuns.filter(run => `${run.id} ${run.location} ${run.title} ${run.city}`.toLowerCase().includes(search.toLowerCase().trim()));
  return <section className="archive-explorer page-gutter" aria-label="Browse the archive"><div className="archive-toolbar"><div role="tablist" aria-label="Archive views" onKeyDown={event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "chapters" : event.key === "End" ? "atlas" : view === "chapters" ? "atlas" : "chapters";
    setView(next);
    event.currentTarget.querySelectorAll<HTMLButtonElement>("button")[next === "chapters" ? 0 : 1]?.focus();
  }}><button disabled={!ready} id="chapter-tab" role="tab" tabIndex={view === "chapters" ? 0 : -1} aria-selected={view === "chapters"} aria-controls="chapter-panel" onClick={() => setView("chapters")}>The chapters <span className="mono">{String(publishedRuns.length).padStart(2, "0")}</span></button><button disabled={!ready} id="atlas-tab" role="tab" tabIndex={view === "atlas" ? 0 : -1} aria-selected={view === "atlas"} aria-controls="run-atlas" onClick={() => setView("atlas")}>The Run Atlas ↗</button></div><p className="mono">A growing collection. Real mornings only.</p></div>
    <div id="chapter-panel" role="tabpanel" aria-labelledby="chapter-tab" hidden={view !== "chapters"}><div className="archive-search"><label htmlFor="chapter-search" className="mono">Find a chapter</label><input disabled={!ready} id="chapter-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Location or chapter number" /></div><div className="chapter-collection">{filtered.map(run => <Link href={`/archive/${run.id}`} key={run.id} className="chapter-cover"><div className="chapter-cover-top mono"><span>{run.id} / {run.city}</span><span>{run.date ? run.date : "The collection begins"}</span></div><div className="chapter-cover-art" aria-hidden="true"><span>{run.id}</span><div className="chapter-orbits"><i /><i /><i /></div></div><div className="chapter-cover-bottom"><p className="mono">{run.location}</p><h2>{run.title}</h2><span className="chapter-cover-arrow"><ArrowIcon diagonal /></span></div><p className="chapter-media-note mono">{run.media.length ? "Explore the moments" : "Run photography & film to come"}</p></Link>)}</div>{!filtered.length && <div className="archive-empty" role="status"><h2>No chapter found.</h2><p>Try a location name or a chapter number.</p><button className="plain-button" onClick={() => setSearch("")}>Show all chapters ↗</button></div>}</div>
    <div id="run-atlas" role="tabpanel" aria-labelledby="atlas-tab" hidden={view !== "atlas"}>{view === "atlas" && <RunAtlas />}</div>
  </section>;
}
