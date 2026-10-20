import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { publishedRuns, getRun } from "@/content/runs";
import { PageLabel, EditorialLink } from "@/components/editorial";
import { RunMedia } from "@/components/run-media";
export function generateStaticParams() { return publishedRuns.map(run => ({ id: run.id })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const run = getRun((await params).id);
  if (!run) return { title: "Chapter not found — Before 9" };
  return { title: `${run.id} / ${run.location} — Before 9 Run Club`, description: run.description, openGraph: { title: `${run.id} — ${run.title}`, description: run.description, type: "article", images: ["/opengraph-image"] } };
}
export default async function RunPage({ params }: { params: Promise<{ id: string }> }) {
  const run = getRun((await params).id);
  if (!run) notFound();
  const index = publishedRuns.indexOf(run), previous = publishedRuns[index - 1], next = publishedRuns[index + 1];
  return <><section className="run-chapter-hero page-gutter"><PageLabel number={run.id}>The archive / {run.location}</PageLabel><div className="run-hero-orbits" aria-hidden="true"><span /><span /><span /></div><p className="mono run-location">{run.location} / {run.city}</p><h1 data-title className="display-heading"><span className="title-line"><span className="line-inner">{run.title}</span></span></h1><p className="run-hero-description">{run.description}</p></section><section className="run-chapter-body page-gutter"><div className="run-chapter-editorial"><div><p className="mono orange">Chapter {run.id}</p><h2>Every story<br />starts somewhere.</h2></div><div><p>{run.story}</p>{run.date && <time dateTime={run.date}>{new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "Asia/Dubai" }).format(new Date(run.date))}</time>}<p className="mono pending-note">{run.editorialStatus === "proposed" ? "Proposed editorial copy / For founder review" : "From the Before 9 archive"}</p><EditorialLink href="/city#run-atlas">Find this chapter on the Atlas</EditorialLink></div></div><RunMedia run={run} /></section><nav className="chapter-pagination page-gutter" aria-label="Run chapters"><Link href="/archive">← All chapters</Link>{previous && <Link href={`/archive/${previous.id}`}>← {previous.id} / {previous.location}</Link>}{next && <Link href={`/archive/${next.id}`}>{next.id} / {next.location} →</Link>}</nav></>;
}
