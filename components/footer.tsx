import Link from "next/link";
import { brand } from "@/content/brand";
import { pages } from "@/content/site";
import { ArrowIcon } from "./icons";
import { Wordmark } from "./wordmark";
export function Footer() {
  return <footer className="site-footer page-gutter"><div className="footer-upper"><Link href="/" className="logo-link" aria-label="Before 9 Run Club — home"><Wordmark /></Link><p className="mono">Abu Dhabi, UAE<br />A little earlier. A little more alive.</p><a className="footer-social" href={brand.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow the mornings on Instagram (opens in a new tab)"><span>Follow the mornings<span className="mono">@before9runclub</span></span><ArrowIcon diagonal /></a></div><nav className="footer-pages mono" aria-label="Footer navigation">{pages.map(page => <Link href={page.href} key={page.href}>{page.label}</Link>)}</nav></footer>;
}
