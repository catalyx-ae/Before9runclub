import { PageLabel, NextChapter } from "@/components/editorial";
import { ArchiveExplorer } from "@/components/archive-explorer";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("/archive");
export default function ArchivePage() {
  return <><section className="archive-page-hero page-gutter"><PageLabel number="07">The archive / An evolving collection</PageLabel><h1 className="display-heading" data-title><span className="title-line"><span className="line-inner">Less sleep.</span></span><span className="title-line"><span className="line-inner orange">More stories.</span></span></h1><div className="archive-intro"><p>The mornings end.<br />The memories find a home here.</p><p className="mono">Recorded runs. Shared moments.<br />One chapter at a time.</p></div></section><ArchiveExplorer /><NextChapter href="/connect" label="Stay in motion." number="08" /></>;
}
