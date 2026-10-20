# Approved Before 9 assets

No official logo, photography, or footage was supplied with milestone one.
The site currently renders original, explicitly labeled graphic placeholders.
The text wordmark is provisional and is not represented as the official logo.

Add the following approved assets here when available:

| Suggested filename | Purpose |
| --- | --- |
| `before9-logo.svg` | Approved logo/wordmark with a transparent background |
| `before9-dawn.webp` | Hero still, or a high-quality video poster |
| `before9-dawn.mp4` | Optional cinematic running footage; muted, decorative |
| `selim-enes.webp` | Approved photograph of the two founders together |

Set the corresponding local `/media/...` references in `content/brand.ts`.
For example, set `brand.hero.media.src` to `/media/before9-dawn.webp` and
leave `kind: "image"`. For footage, set `kind: "video"`, the MP4 `src`, and
the static `poster`. Supply a real poster for a high-quality still fallback.
Videos start paused, with a visitor-controlled play/pause button. They pause
when reduced motion is enabled. For a video with meaningful audio or speech,
provide captions and a transcript before using it; this component is intended
for silent decorative footage.

Set `brand.hero.mediaLayout` to `"fullscreen"` for edge-to-edge media behind
the cover. It uses a dark scrim for readable type. The default `"panel"`
treatment keeps photography beside the headline. Images with baked-in text
always use the panel layout to avoid superimposing duplicate headlines.

When a supplied campaign photograph already contains typography, set
`containsText: true` to omit the component's decorative caption. The main
headline sits beside the media, not over campaign imagery. The media component
falls back to the labeled visual study if an image or video fails to load.

Use genuine club/Abu Dhabi photography and founder-approved content. Do not
replace placeholders with unidentified stock portraits or invented biographies.
The remaining chapters await creative review.
