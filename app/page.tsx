import { brand } from "@/content/brand";
import { ArrowIcon, SparkIcon } from "@/components/icons";
import { CinematicMedia } from "@/components/media";
import { StoryMotion } from "@/components/motion";
import { Navigation } from "@/components/navigation";
import { Wordmark } from "@/components/wordmark";

export default function Home() {
  const fullScreenMedia = brand.hero.mediaLayout === "fullscreen" && Boolean(brand.hero.media.src) && !brand.hero.media.containsText;
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <section id="beginning" className={`hero page-gutter${fullScreenMedia ? " hero-fullscreen" : ""}`} aria-labelledby="hero-heading">
          <div className="hero-eyebrow mono">
            <p><span className="tiny-spark" aria-hidden="true">✳</span>{brand.hero.eyebrow}</p>
            <span className="chapter-index">01 / Before the city wakes</span>
          </div>

          <div className="hero-composition">
            <div className="hero-type">
              <h1 id="hero-heading" className="hero-title" aria-label={brand.hero.title.join(" ")}>
                {brand.hero.title.map((line, index) => (
                  <span className={`title-line title-line-${index + 1}`} key={line} aria-hidden="true"><span className="line-inner">{line}</span></span>
                ))}
              </h1>
              <div className="hero-copy">
                <p className="hero-intro">{brand.hero.intro}</p>
                <p className="hero-description">{brand.hero.description}</p>
                <a className="story-link" href="#our-story"><span>Meet Before 9</span><span className="round-arrow"><ArrowIcon /></span></a>
              </div>
            </div>
            <div className="hero-visual">
              <CinematicMedia asset={brand.hero.media} variant="dawn" priority />
              <div className="hero-visual-note mono"><span className="location-dot" />Made of mornings.<br />Made of people.</div>
            </div>
            <SparkIcon className="hero-spark" />
          </div>

          <div className="hero-bottom mono">
            <a href="#our-story" className="scroll-cue"><span className="scroll-cue-line" aria-hidden="true" />Scroll for the good part <span aria-hidden="true">↓</span></a>
            <p>Running. Friendship. Everything in between.</p>
          </div>
        </section>

        <div className="story-ribbon">
          <p className="sr-only">Less sleep. More stories.</p>
          <div className="ribbon-track" aria-hidden="true">
            {[0, 1, 2].map(n => <span key={n}>Less sleep. <span className="ribbon-outline">More stories.</span><SparkIcon /></span>)}
          </div>
        </div>

        <section id="our-story" className="story page-gutter" aria-labelledby="story-heading">
          <div className="section-label mono" data-story-reveal><span>02 / The beginning of something</span><span>( Our story )</span></div>
          <div className="story-opening">
            <h2 id="story-heading" className="story-heading" data-story-reveal>{brand.story.heading[0]}<br /><span>{brand.story.heading[1]}</span></h2>
            <div className="story-introduction" data-story-reveal>
              <SparkIcon className="story-spark" />
              <p>{brand.story.introduction}</p>
              <span className="mono story-origin">A simple idea. A shared feeling.</span>
            </div>
          </div>

          <div className="story-sequence">
            <div className="story-media-wrap" data-story-reveal><CinematicMedia asset={brand.story.media} variant="friends" /></div>
            <div className="story-copy">
              <p className="mono story-note" data-story-reveal>It was never just about running.</p>
              <div className="story-beats" data-story-reveal>{brand.story.beats.map((beat, i) => <p key={beat}><span className="mono beat-index">0{i + 1}</span>{beat}</p>)}</div>
              <p className="story-body" data-story-reveal>{brand.story.body}</p>
              <p className="story-closing" data-story-reveal>{brand.story.closing}</p>
              <p className="editorial-status mono" data-story-reveal>{brand.story.editorialStatus}</p>
            </div>
          </div>
          <div className="story-footnote mono"><span>Friendship first. Kilometres second.</span><span>From Abu Dhabi, with good energy. <SparkIcon /></span></div>
        </section>
      </main>
      <footer className="site-footer page-gutter">
        <a href="#beginning" className="logo-link" aria-label="Before 9 Run Club — back to top"><Wordmark /></a>
        <p className="mono">{brand.location}<br /><span>See you before 9.</span></p>
        <a className="footer-social" href={brand.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow the mornings on Instagram (opens in a new tab)"><span>Follow the mornings<span className="mono">@before9runclub</span></span><ArrowIcon diagonal /></a>
      </footer>
      <StoryMotion />
    </>
  );
}
