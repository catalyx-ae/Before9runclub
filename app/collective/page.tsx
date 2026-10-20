import { PageLabel, NextChapter } from "@/components/editorial";
import { Gallery } from "@/components/gallery";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("/collective");
export default function CollectivePage() {
  return <><section className="collective-page-hero page-gutter"><PageLabel number="05">The morning collective</PageLabel><h1 className="display-heading" data-title><span className="title-line"><span className="line-inner">Good runs.</span></span><span className="title-line"><span className="line-inner orange">Better people.</span></span></h1><div className="collective-intro"><p>The first hello. The shared joke.<br />The familiar face you didn’t know last week.</p><p className="mono">Explore a moment ↗<br />Visual studies / Club photography pending</p></div></section><section className="collective-gallery page-gutter" aria-label="Explore the collective"><Gallery /></section><section className="collective-statement page-gutter"><p className="mono">Room for you. Just as you are.</p><h2>Somewhere between<br />“hello” and “same time?”<br /><span>you find your people.</span></h2></section><NextChapter href="/city" label="Our city. Our playground." number="06" /></>;
}
