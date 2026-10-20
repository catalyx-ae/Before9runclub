"use client";
import Image from "next/image";
import { useState } from "react";
import type { Founder } from "@/content/site";
export function FounderVisual({ founder, priority = false }: { founder: Founder; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  return <div className={`founder-visual founder-${founder.id}`}>
    {founder.image.src && !failed ? <Image src={founder.image.src} alt={founder.image.alt} fill sizes="(max-width: 700px) 100vw, 50vw" priority={priority} onError={() => setFailed(true)} /> : <div className="founder-photo-pending" role="img" aria-label={`${founder.name} — portrait file pending`}><span className="founder-initial" aria-hidden="true">{founder.name.charAt(0)}</span><span className="portrait-lines" aria-hidden="true" /><p className="mono">{founder.name} / Portrait to come</p></div>}
  </div>;
}
