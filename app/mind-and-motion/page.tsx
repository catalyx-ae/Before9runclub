import { PageLabel, NextChapter } from "@/components/editorial";
import { MotionPlayground } from "@/components/motion-playground";
import { SparkIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("/mind-and-motion");
export default function MindPage() {
  return <><section className="mind-page-hero page-gutter"><PageLabel number="04">Mind & motion / More than the miles</PageLabel><div><h1 className="display-heading" data-title><span className="title-line"><span className="line-inner">A good run.</span></span><span className="title-line"><span className="line-inner">A <span className="orange">better feeling.</span></span></span></h1><p>Running is the starting point.<br />What happens around it is the good part.</p></div><SparkIcon className="mind-hero-spark" /></section><MotionPlayground /><section className="mind-manifesto page-gutter"><span className="mono">No perfect pace required.</span><h2>A little movement.<br />A little headspace.<br /><span>A lot of good people.</span></h2><p>Before 9 is a place to show up as yourself. To move your body, spend time outside, and share a morning with people who are glad you came.</p></section><NextChapter href="/collective" label="Find your people." number="05" /></>;
}
