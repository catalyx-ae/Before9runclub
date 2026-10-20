import { PageLabel, NextChapter } from "@/components/editorial";
import { FoundersExperience } from "@/components/founders-experience";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("/founders");
export default function FoundersPage() {
  return <><section className="founders-page-hero page-gutter"><PageLabel number="03">The founders / Meet the duo</PageLabel><div><h1 className="display-heading" data-title><span className="title-line"><span className="line-inner">Selim <span className="orange">&</span> Enes.</span></span></h1><p>Before the movement,<br />there was a friendship.</p></div></section><FoundersExperience /><NextChapter href="/mind-and-motion" label="More than the miles." number="04" /></>;
}
