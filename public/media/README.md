# Before 9 original media

## Available now

Both founder photographs were supplied through GitHub: Selim in commit
`8edbbbc`, Enes in `2792c7e`. They are connected at `founders/selim.jpg` and
`founders/enes.jpg`, with the original bytes preserved.
A square Before 9 logo was included in the first upload and is
retained under its upload filename; it is not a founder portrait.
Identity was explicitly confirmed by the owner:
**running photo / left = Selim; white-top portrait / right = Enes**.

Remaining community/hero artwork is an original, labeled graphic study.
It is not real club photography or a recreation of the founder portraits.

## Files needed

| Path | Needed original |
| --- | --- |
| public/media/before9-logo.svg | Official approved logo, intact |
| public/media/before9-dawn.webp | Authentic community hero/campaign image |
| public/media/founders/selim.jpg | Integrated: Selim running in black among palms |
| public/media/founders/enes.jpg | Integrated: Enes's close portrait in a white top |
| public/media/community/*.webp | Approved community moments with descriptive alt text |
| public/media/runs/001/*.webp | Identified photographs actually from Run 001, Reem Central Park |
| public/media/runs/001/*.mp4 | Optional actual Run 001 footage with a static poster |

Keep original photographs intact. Serve optimized derivatives or use Next.js
image optimization. Do not generate fictional portraits, identify unlabeled
people by guesswork, or attribute unrelated pictures to Run 001.

## Integration

Set `brand.logo` in `content/brand.ts` to the approved local logo path. No
redesign is required. Set hero src/poster/kind there as well. The default media
layout is a panel; `mediaLayout: "fullscreen"` enables a full-bleed treatment
once real media is supplied. Images with embedded text stay in the panel layout.

In `content/site.ts`, each founder's image.src points to its /media/founders/...
path once the original is available. The founder order remains Selim left,
Enes right. The shared image component serves responsive Next.js optimized
images on Founders, Our Story, and the home preview. Set the biography,
motivation, vision and quote fields only from approved information.

Replace community visual studies with approved `GalleryItem` records:
local src, descriptive alt, title, editorial description, status "approved",
and runId only when the image's specific run is confirmed. Captions stay
outside photographs, avoiding duplicate text on campaign imagery.
Do not leave status "placeholder" after approving an actual image.

Add confirmed Run 001 media to the record's media array in `content/runs.ts`.
Do not automatically recycle the general community collection into a run.
The Atlas, archive, and chapter share that one record.

Videos support local src, poster, descriptive alt text, and visitor-controlled
playback. No audible autoplay. For meaningful speech/audio, supply captions
and a transcript before publication; current background-footage support is
for silent decorative clips. Missing/broken media show a labeled fallback.
