import Link from "next/link";
import { ArrowIcon, SparkIcon } from "./icons";
export function PageLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="page-label mono"><span><span className="orange">{number}</span> / {children}</span><span>Abu Dhabi, UAE</span></div>;
}
export function EditorialLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <Link href={href} className={`editorial-link ${light ? "link-light" : ""}`}><span>{children}</span><ArrowIcon diagonal /></Link>;
}
export function NextChapter({ href, label, number }: { href: string; label: string; number: string }) {
  return <section className="next-chapter page-gutter"><p className="mono">Keep the good energy going / {number}</p><Link href={href}><span>{label}</span><ArrowIcon diagonal /></Link><SparkIcon className="next-spark" /></section>;
}
export function Ribbon({ first = "Less sleep.", second = "More stories." }: { first?: string; second?: string }) {
  return <div className="story-ribbon"><p className="sr-only">{first} {second}</p><div className="ribbon-track" aria-hidden="true">{[0, 1, 2].map(n => <span key={n}>{first} <span className="ribbon-outline">{second}</span><SparkIcon /></span>)}</div></div>;
}
