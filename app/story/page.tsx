import { PageLabel, NextChapter, Ribbon } from "@/components/editorial";
import { StoryDocumentary } from "@/components/story-documentary";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("/story");
export default function StoryPage() {
  return <><section className="story-page-hero page-gutter"><PageLabel number="02">The story / A shared beginning</PageLabel><h1 className="display-heading" data-title><span className="title-line"><span className="line-inner">It started with</span></span><span className="title-line"><span className="line-inner orange">two friends.</span></span></h1><div className="story-page-intro"><p>Two friends. One idea.<br />A whole lot of good energy.</p><p className="mono">Scroll through the beginning ↓<br />Proposed editorial story / For founder review</p></div></section><StoryDocumentary /><Ribbon first="More movement." second="More connection." /><section className="story-conclusion page-gutter"><p className="mono">The feeling behind it all.</p><h2>We came for the run.<br /><span>We stayed for the people.</span></h2><p>The story is still being written. By everyone who shows up.</p></section><NextChapter href="/founders" label="Meet the duo." number="03" /></>;
}
