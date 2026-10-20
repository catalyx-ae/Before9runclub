import Link from "next/link";
import { brand } from "@/content/brand";
import { founders } from "@/content/site";
import { publishedRuns } from "@/content/runs";
import { ArrowIcon, SparkIcon } from "@/components/icons";
import { CinematicMedia } from "@/components/media";
import { FounderVisual } from "@/components/founder-visual";
import { Intro } from "@/components/experience";
import { EditorialLink, Ribbon, NextChapter } from "@/components/editorial";
import { Gallery } from "@/components/gallery";
import { RunAtlas } from "@/components/run-atlas";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("/");

export default function Home() {
  const fullScreenMedia = brand.hero.mediaLayout === "fullscreen" && Boolean(brand.hero.media.src) && !brand.hero.media.containsText;
  const run = publishedRuns[0];
  return <>
    <Intro />
    <section id="beginning" className={`hero page-gutter${fullScreenMedia ? " hero-fullscreen" : ""}`} aria-labelledby="hero-heading">
      <div className="hero-eyebrow mono"><p><span className="tiny-spark" aria-hidden="true">✳</span>{brand.hero.eyebrow}</p><span className="chapter-index">01 / The wake-up call</span></div>
      <div className="hero-composition"><div className="hero-type"><h1 id="hero-heading" className="hero-title" data-title aria-label={brand.hero.title.join(" ")}>{brand.hero.title.map((line, index) => <span className={`title-line title-line-${index + 1}`} key={line} aria-hidden="true"><span className="line-inner">{line}</span></span>)}</h1><div className="hero-copy" data-reveal><p className="hero-intro">{brand.hero.intro}</p><p className="hero-description">{brand.hero.description}</p><Link className="story-link" href="/story"><span>Step into our story</span><span className="round-arrow"><ArrowIcon /></span></Link></div></div><div className="hero-visual" data-reveal><CinematicMedia asset={brand.hero.media} variant="dawn" priority /><div className="hero-visual-note mono"><span className="location-dot" />Made of mornings.<br />Made of people.</div></div><SparkIcon className="hero-spark" /></div>
      <div className="hero-bottom mono"><a href="#the-movement" className="scroll-cue"><span className="scroll-cue-line" aria-hidden="true" />The good part is just below <span aria-hidden="true">↓</span></a><p>Running. Friendship. Everything in between.</p></div>
    </section>
    <Ribbon />
    <section id="the-movement" className="home-movement page-gutter"><div className="page-label mono"><span>The movement / A shared feeling</span><span>Abu Dhabi, UAE</span></div><div className="home-movement-grid"><h2 data-reveal>Move your body.<br />Clear your mind.<br /><span>Find your people.</span></h2><div><SparkIcon /><p>We’re Before 9. A running community built around the simple joy of showing up, moving together, and making something good out of a morning.</p><EditorialLink href="/mind-and-motion">More than the miles</EditorialLink></div></div></section>
    <section className="home-founders page-gutter"><div className="home-section-top"><p className="mono">Two friends. One movement.</p><EditorialLink href="/founders">Meet Selim & Enes</EditorialLink></div><div className="home-founders-grid">{founders.map(founder => <Link href="/founders" className={`home-founder home-founder-${founder.id}`} key={founder.id}><FounderVisual founder={founder} /><span className="home-founder-name">{founder.name}<ArrowIcon diagonal /></span><span className="mono home-founder-role">Co-founder / Before 9</span></Link>)}</div><div className="home-founders-note"><h2>Before the club,<br />there was a friendship.</h2><p>Selim and Enes. Two friends with a simple idea: more movement, more connection, and more reasons to get out of bed.</p></div></section>
    <section className="home-collective page-gutter"><div className="home-section-top"><div><p className="mono">The morning collective</p><h2>Good runs.<br /><span>Better people.</span></h2></div><EditorialLink href="/collective">Get to know the feeling</EditorialLink></div><Gallery compact /><p className="mono collection-status">Editorial visual studies / Awaiting real community photography.</p></section>
    <section className="home-atlas page-gutter"><div className="home-section-top"><div><p className="mono orange">Our city / The Run Atlas</p><h2>Every orange light.<br /><span>A real chapter.</span></h2></div><EditorialLink href="/city" light>Explore our city</EditorialLink></div><RunAtlas compact /></section>
    {run && <section className="home-archive page-gutter"><p className="mono">From the archive / The collection begins</p><Link href={`/archive/${run.id}`}><span className="home-archive-number">{run.id}</span><div><span className="mono">{run.location} / {run.city}</span><h2>{run.title}</h2><p>{run.description}</p></div><ArrowIcon diagonal /></Link><EditorialLink href="/archive">Open the full archive</EditorialLink></section>}
    <NextChapter href="/connect" label="See you before 9." number="08" />
  </>;
}
