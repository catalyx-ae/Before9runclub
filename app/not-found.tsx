import Link from "next/link";
export default function NotFound() { return <section className="not-found page-gutter"><p className="mono orange">404 / A little off track</p><h1>New route.<br />Same good energy.</h1><p>This page isn’t part of the collection.</p><Link href="/" className="editorial-link"><span>Back to the beginning</span><span aria-hidden="true">↗</span></Link></section>; }
