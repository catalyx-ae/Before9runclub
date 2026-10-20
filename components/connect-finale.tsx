"use client";
import { useState } from "react";
import { brand } from "@/content/brand";
import { ArrowIcon, SparkIcon } from "./icons";
import { useInteractive } from "./use-interactive";
export function ConnectFinale() {
  const ready = useInteractive();
  const [alive, setAlive] = useState(false);
  return <section className={`connect-finale ${alive ? "is-alive" : ""}`}><div className="connect-orbits" aria-hidden="true"><span /><span /><span /></div><div className="connect-finale-top page-gutter"><p className="mono">Same city. Good energy. New stories.</p><button disabled={!ready} className="energy-switch mono" onClick={() => setAlive(value => !value)} aria-pressed={alive}>Morning energy <span aria-hidden="true">{alive ? "↗" : "+"}</span></button></div><div className="connect-finale-type page-gutter"><h2>See you<br /><span>before 9.</span></h2><SparkIcon /></div><a className="instagram-finale page-gutter" href={brand.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow Before 9 on Instagram (opens in a new tab)"><span><span className="mono">Keep the stories going</span>@before9runclub</span><ArrowIcon diagonal /></a></section>;
}
