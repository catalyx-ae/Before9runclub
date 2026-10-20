# Before 9 original media

## Available now

No official image or logo files are currently present in this repository.
The founder photos are visible in chat, but their original binaries are not
accessible in the cloud workspace. Identity was explicitly confirmed by the
owner: **first/left photo = Selim; second/right photo = Enes**.

All current artwork is an original, labeled graphic study. It is not real
club photography, a recreation of the founder portraits, or the official logo.

## Files needed

| Path | Needed original |
| --- | --- |
| public/media/before9-logo.svg | Official approved logo, intact |
| public/media/before9-dawn.webp | Authentic community hero/campaign image |
| public/media/founders/selim.jpg | First/left chat photo: Selim running in black among palms |
| public/media/founders/enes.jpg | Second/right chat photo: Enes's close portrait in a white top |
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

In `content/site.ts`, set each founder's image.src to its /media/founders/...
path. The founder order remains Selim left, Enes right. Set the biography,
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
