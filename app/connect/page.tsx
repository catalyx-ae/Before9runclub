import Link from "next/link";
import { PageLabel } from "@/components/editorial";
import { ConnectFinale } from "@/components/connect-finale";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("/connect");
export default function ConnectPage() {
  return <><section className="connect-page-hero page-gutter"><PageLabel number="08">Stay in motion</PageLabel><h1 className="display-heading" data-title><span className="title-line"><span className="line-inner">The run ends.</span></span><span className="title-line"><span className="line-inner orange">The stories don’t.</span></span></h1><p>For the mornings. For the people.<br />For whatever good thing comes next.</p></section><ConnectFinale /><div className="connect-again page-gutter mono"><span>Stay curious. Keep moving.</span><Link href="/">Start the morning again ↑</Link></div></>;
}
