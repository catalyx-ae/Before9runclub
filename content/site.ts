import type { MediaAsset } from "./brand";

export const pages = [
  { href: "/", label: "Home", number: "01", note: "The wake-up call", title: "Wake up. Show up. Feel alive.", description: "Movement, friendship, and mornings worth getting up for. Meet Before 9 Run Club, Abu Dhabi." },
  { href: "/story", label: "Our story", number: "02", note: "Two friends. One movement.", title: "It started with two friends.", description: "The idea behind Before 9: more movement, more connection, and a whole lot of good energy." },
  { href: "/founders", label: "The founders", number: "03", note: "Meet the duo", title: "Selim & Enes.", description: "Meet Selim and Enes, the two friends and co-founders behind Before 9 Run Club in Abu Dhabi." },
  { href: "/mind-and-motion", label: "Mind & motion", number: "04", note: "More than the miles", title: "Move. Breathe. Laugh.", description: "Running is a starting point. Discover the positivity, friendship, and connection behind Before 9." },
  { href: "/collective", label: "The collective", number: "05", note: "Good runs. Better people.", title: "The morning collective.", description: "An evolving collection of the faces, friendships, and shared moments behind Before 9." },
  { href: "/city", label: "Our city", number: "06", note: "The city is our playground", title: "Abu Dhabi. Our starting line.", description: "Explore the Before 9 Run Atlas: a geographic memory of the community, beginning with Run 001 at Reem Central Park." },
  { href: "/archive", label: "The archive", number: "07", note: "Every run has a story", title: "Less sleep. More stories.", description: "Explore the confirmed chapters of Before 9 Run Club, beginning with 001 — Reem Central Park." },
  { href: "/connect", label: "Stay in motion", number: "08", note: "See you before 9", title: "The run ends. The stories don’t.", description: "Follow Before 9 Run Club on Instagram for the people, places, and mornings behind the movement." },
] as const;

export type Founder = {
  id: string; name: string; role: string; image: MediaAsset;
  biography: string | null; motivation: string | null; vision: string | null;
  quote: string | null; expectedFile: string;
};

export const founders: Founder[] = [
  { id: "selim", name: "Selim", role: "Co-founder", image: { kind: "image", src: null, alt: "Selim, co-founder of Before 9, running outdoors among palm trees" }, biography: null, motivation: null, vision: null, quote: null, expectedFile: "public/media/founders/selim.jpg" },
  { id: "enes", name: "Enes", role: "Co-founder", image: { kind: "image", src: null, alt: "Enes, co-founder of Before 9, photographed outdoors among palm trees" }, biography: null, motivation: null, vision: null, quote: null, expectedFile: "public/media/founders/enes.jpg" },
];

export type GalleryItem = {
  id: string; title: string; description: string; asset: MediaAsset;
  status: "approved" | "placeholder"; color: "orange" | "paper" | "black";
  /** Only set for confirmed media from this exact run. */
  runId: string | null;
};

// Visual studies are labeled as such, never represented as club photographs.
export const communityMedia: GalleryItem[] = [
  { id: "arriving", title: "The first hello.", description: "That moment when a stranger becomes a familiar face.", asset: { kind: "image", src: null, alt: "Awaiting an approved photograph of the community arriving" }, status: "placeholder", color: "orange", runId: null },
  { id: "together", title: "A little further, together.", description: "The conversations matter as much as the kilometres.", asset: { kind: "image", src: null, alt: "Awaiting an approved photograph of friends running together" }, status: "placeholder", color: "paper", runId: null },
  { id: "after", title: "The run after the run.", description: "The laughter, the conversations, the reason to stay a little longer.", asset: { kind: "image", src: null, alt: "Awaiting an approved candid photograph after a run" }, status: "placeholder", color: "black", runId: null },
  { id: "again", title: "Same feeling. New morning.", description: "Showing up is already a win.", asset: { kind: "image", src: null, alt: "Awaiting an approved photograph of the Before 9 community" }, status: "placeholder", color: "orange", runId: null },
];

export const storyChapters = [
  { number: "01", title: "The idea.", heading: "Mornings could mean more.", body: "Before 9 started with Selim and Enes and a belief that mornings could be about more than simply starting another day.", aside: "More reasons to get out of bed." },
  { number: "02", title: "The beginning.", heading: "Two friends. One shared feeling.", body: "More movement. More connection. More laughter. A simple idea, with room for other people to make it their own.", aside: "A whole lot of good energy." },
  { number: "03", title: "The connection.", heading: "The good part is the people.", body: "Running brings people together. The conversations, the shared moments, and that feeling of being part of something are what make people stay.", aside: "Familiar faces. New friendships." },
  { number: "04", title: "The movement.", heading: "Something bigger than two.", body: "The story belongs to everyone who shows up. Different people, moving together, making an ordinary morning feel like something worth remembering.", aside: "We came for the run. We stayed for the people." },
] as const;

export const motionThemes = [
  { word: "Move.", title: "Get out of your head. Into your morning.", body: "A little movement. A change of scenery. Some time outside, at your own pace.", color: "orange" },
  { word: "Breathe.", title: "Leave a little room for yourself.", body: "There is something good about stepping away from the everyday and being here, in the moment.", color: "paper" },
  { word: "Laugh.", title: "Good energy is contagious.", body: "The unexpected conversation. The shared joke. The small moments that become the whole reason you came.", color: "orange" },
  { word: "Connect.", title: "Come as you are.", body: "You don’t need an impressive pace or a perfect morning. There is room for you here.", color: "paper" },
  { word: "Repeat.", title: "Make room for more good mornings.", body: "Not every morning is extraordinary. Sometimes all it takes is showing up, together.", color: "orange" },
] as const;
