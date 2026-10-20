"use client";
import { useState } from "react";
import { founders } from "@/content/site";
import { FounderVisual } from "./founder-visual";
import { useInteractive } from "./use-interactive";
import { ArrowIcon, SparkIcon } from "./icons";

export function FoundersExperience() {
  const ready = useInteractive();
  const [selected, setSelected] = useState<string | null>(null);
  const active = founders.find(founder => founder.id === selected);
  return <section className="founders-experience" aria-label="Meet Selim and Enes">
    <div className="founder-split" data-selected={selected ?? "both"}>{founders.map((founder, index) => <div className={`founder-panel panel-${founder.id}`} key={founder.id}>
      <FounderVisual founder={founder} priority />
      <div className="founder-panel-label mono"><span>0{index + 1} / Co-founder</span><span>Abu Dhabi, UAE</span></div>
      <button disabled={!ready} className="founder-select" onClick={() => setSelected(selected === founder.id ? null : founder.id)} aria-label={`Meet ${founder.name}`} aria-expanded={selected === founder.id} aria-controls="founder-profile"><span>{founder.name}</span><span className="founder-button-arrow"><ArrowIcon diagonal /></span></button>
    </div>)}</div>
    <div id="founder-profile" className="founder-profile page-gutter" aria-live="polite">
      {active ? <><div><p className="mono">The person behind the morning</p><h2>{active.name}<span className="orange">.</span></h2><p className="founder-role">{active.role} / Before 9 Run Club</p><button className="plain-button mono" onClick={() => setSelected(null)}>Back to the duo ↑</button></div><div className="founder-story-panel"><SparkIcon /><h3>In {active.name}’s words.</h3><p>{active.biography ?? `${active.name}’s personal story is waiting for his words. We’ll share it here when he’s ready.`}</p><dl><dt>Why Before 9?</dt><dd>{active.motivation ?? `To be added by ${active.name}.`}</dd><dt>What comes next?</dt><dd>{active.vision ?? "Founder’s vision to come."}</dd></dl>{active.quote && <blockquote>{active.quote}</blockquote>}<p className="mono pending-note">Personal details pending founder approval.</p></div></> : <><div><p className="mono">Two friends / One shared idea</p><h2>Different people.<br /><span className="orange">Same good energy.</span></h2></div><div className="founder-story-panel"><p>Before 9 was founded by Selim and Enes. Two friends who wanted to bring people together through movement, positivity, and shared experiences.</p><p>Choose a name above to explore each founder’s space.</p><p className="mono pending-note">Portrait originals and individual stories are still to be added.</p></div></>}
    </div>
  </section>;
}
