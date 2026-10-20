import { ImageResponse } from "next/og";
export const alt = "Before 9 Run Club — Abu Dhabi. Less sleep. More stories.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#000000", color: "#ffffff", padding: 60, fontFamily: "sans-serif" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}><span>BEFORE 9 RUN CLUB</span><span>ABU DHABI, UAE</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 100, fontWeight: 800, letterSpacing: -6, lineHeight: 1 }}><span>LESS SLEEP.</span><span style={{ color: "#fc580e" }}>MORE STORIES.</span></div><div style={{ height: 8, width: "100%", background: "#fc580e", display: "flex" }} /></div>, size);
}
