"use client";
import Image from "next/image";
import { useState } from "react";
import type { Founder } from "@/content/site";
export function FounderVisual({ founder, priority = false, sizes = "50vw" }: { founder: Founder; priority?: boolean; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  return <div className={`founder-visual founder-${founder.id}`}>
    {founder.image.src && !failed ? <Image src={founder.image.src} alt={founder.image.alt} fill sizes={sizes} loading={priority ? "eager" : "lazy"} onError={() => setFailed(true)} /> : <div className="founder-photo-pending" role="img" aria-label={`${founder.name} — portrait ${failed ? "unavailable" : "file pending"}`}><p className="mono">{founder.name}<br />Photograph {failed ? "unavailable" : "to come"}</p></div>}
  </div>;
}
