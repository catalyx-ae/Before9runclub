/**
 * Editorial source of truth. The founding story is proposed copy, pending
 * Selim and Enes's approval. No biographies or attributed quotes are assumed.
 */
export type MediaAsset = {
  kind: "image" | "video";
  src: string | null;
  poster?: string | null;
  alt: string;
  /** Hide decorative captions over campaign images with baked-in typography. */
  containsText?: boolean;
};

export const brand = {
  name: "Before 9 Run Club",
  location: "Abu Dhabi, UAE",
  instagram: "https://www.instagram.com/before9runclub/",
  // Add the approved wordmark to public/media, then set its path here.
  logo: null as string | null,
  hero: {
    // "fullscreen" places footage/stills behind the cover once real media is supplied.
    mediaLayout: "panel" as "panel" | "fullscreen",
    eyebrow: "A little earlier. A little more alive.",
    title: ["Before", "the city", "wakes."],
    intro: "Some mornings are worth getting up for.",
    description: "For the movement. For the laughter. For the people you find along the way.",
    media: {
      kind: "image",
      src: null,
      poster: null,
      alt: "Before 9 runners sharing an early morning in Abu Dhabi",
      containsText: false,
    } satisfies MediaAsset,
  },
  story: {
    heading: ["Two friends.", "One movement."],
    introduction: "Before 9 started with Selim and Enes, two friends with a simple idea: mornings could be about more than just waking up.",
    beats: ["More movement.", "More connection.", "More laughter."],
    body: "What began with two friends became something shared. A space where strangers become familiar faces, where the conversations matter as much as the kilometres, and where showing up is already a win.",
    closing: "More moments that make getting out of bed worth it.",
    editorialStatus: "Proposed founding story · For founder review",
    media: {
      kind: "image",
      src: null,
      alt: "Selim and Enes, co-founders of Before 9 Run Club",
      containsText: false,
    } satisfies MediaAsset,
  },
} as const;
