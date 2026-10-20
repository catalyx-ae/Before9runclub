# Before 9 Run Club

A cinematic, eight-page brand experience for the Abu Dhabi running community.
Next.js App Router, React, TypeScript, Tailwind CSS, GSAP / ScrollTrigger.
No registration, payment, reservations, fitness tracking, or membership systems.

## Run locally (Windows / VS Code)

Clone https://github.com/catalyx-ae/Before9runclub.git and open the cloned folder.
Install Node.js 24, then use Terminal → New Terminal:

```powershell
npm.cmd ci
npm.cmd run dev
```

Keep the terminal running and open port 3000 in your browser on that computer.
On macOS/Linux, use `npm ci` and `npm run dev`.

## Cloud and production workflow

The existing checkout is /workspace/Before9runclub. Each task is isolated;
do not create another Git worktree unless explicitly requested.

```bash
cd /workspace/Before9runclub
npm ci --cache /workspace/.cache/npm --no-audit --no-fund
npm run build
npm run typecheck
npm run start -- --port 3000
```

For coding, use `npm run dev -- --port 3000`. Stop only your own server before
switching modes or reinstalling. A production server must restart after a new
build. The server binds to 0.0.0.0. Next.js allows 127.0.0.1 for internal browser
checks; add an actual forwarded preview hostname to `allowedDevOrigins` when
needed. This onboarding screen does not provide a public website URL.

## Pages and signature interactions

| Route | Experience |
| --- | --- |
| / | Skippable, session-once intro; kinetic cover; founder/collective/Atlas/archive previews |
| /story | Four scroll-synced scenes; masked portrait reveals; a moving, captioned founder diptych |
| /founders | Expanding portrait split-screen; letter reveals, pointer depth, keyboard selection, individual story panels |
| /mind-and-motion | Visitor-controlled five-theme typography playground with pointer depth |
| /collective | Asymmetric media field, pointer perspective, fullscreen keyboard/touch viewer |
| /city | Geographic UAE/Abu Dhabi Run Atlas, camera controls, markers, chapter panels |
| /archive | Searchable chapter collection, accessible tabs, shared Run Atlas |
| /archive/001 | Reem Central Park chapter, genuine run-media slots, link back to Atlas |
| /connect | Interactive finale, motion graphics, official Instagram link |

The global menu exposes all eight pages. Native dialogs retain keyboard focus,
close with Escape, and restore focus. The media viewer supports left/right
keys, previous/next buttons, swipe gestures, and future visitor-controlled
video. Videos do not autoplay audible sound. The intro runs for under two
seconds, can be skipped, and is omitted for reduced motion. Scroll sequences
use native scrolling, with GSAP cleanup on route changes and preference changes.

## Content and founder identities

- `content/brand.ts`: brand identity, logo, hero copy and image/video settings.
- `content/site.ts`: navigation/SEO text, founders, documentary copy, philosophy,
  and the community media collection.
- `content/runs.ts`: the single source of truth for the Atlas, archive, and chapters.
- `lib/geo.ts`: common projection and camera framing.
- `content/geo/README.md`: geographic provenance, license, and coordinate verification.

The owner identified the running photo as **Selim**, and the close portrait in
a white top as **Enes**. Selim remains on the left, Enes on the right.
The originals were uploaded in commits `8edbbbc` (Selim) and `2792c7e` (Enes),
then renamed to `public/media/founders/selim.jpg` and `enes.jpg`. Both images
retain their original bytes and are served through responsive Next.js image
optimization. A logo included in the first upload is retained separately
under its upload filename and is not used as a portrait.
No fictional portraits or stock replacements have been introduced. Both pages
and the home preview share the founder registry in `content/site.ts`.
See `public/media/README.md` for expected paths and remaining assets.

Portrait entrance and pointer motion use separate layers to avoid competing
transforms. Hover or keyboard focus previews a panel; selection keeps it open;
Escape or “Back to the duo” resets it. Phones retain equal portrait widths and
support tap selection. Reduced motion disables entrance, pointer, and layout
animation, including when the preference changes during a visit.

Founder biographies, motivations, visions, and optional quotes remain null
until supplied. The UI explicitly marks these as pending. The founding-story
copy and Run 001 editorial introduction are proposed copy for founder review,
not invented historical dates or attributed quotes.

## Atlas and future runs

The UAE silhouette and neighboring geography come from licensed public-domain
Natural Earth 1:10m geographic data, not an invented outline. Local vector
paths avoid a heavy map engine, external tile requests, or API credentials.
This is a regional memory map, not a street-navigation map.

Run 001 is **Reem Central Park, Al Reem Island, Abu Dhabi**, with owner-confirmed
Google Maps place coordinates **24.5042039, 54.407309**. Its original source URL
is retained in the run record. No date, route, mileage, or attendance was supplied.
No additional runs have been invented.

To add a real run, add a typed entry to `runs` in `content/runs.ts`:
a unique id/number, confirmed location, approved/proposed copy, date if known,
a coordinate with `verified: true` and a source, media, and publication status.
Use null for unknown fields. Published entries appear in the list/archive;
only verified coordinates produce a marker. Chapters at identical coordinates
are grouped at one location and remain individually selectable in the run list.
Each published id receives an /archive/[id] route on the next build.

The Atlas supports UAE reset, Abu Dhabi fly-to, run-location focus, zoom
buttons, pointer/touch panning, keyboard arrow panning, and an equivalent
list of chapters. Run 001's pin links to its chapter. No fake route trace is drawn.
Map motion respects reduced motion, and decorative marker pulses stop after
4.2 seconds.

## Missing assets

Official logo integration, community photographs, and
identified Run 001 photographs/footage remain outstanding. All media studies
are explicitly labeled; unrelated photographs are not attributed to Run 001.
Future video and audio are optional. See `public/media/README.md`.

## Validation

```bash
npm run build
npm run typecheck
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Tests start a production server automatically when port 3000 is unused.
Use `CI=1` to insist on a fresh production server. On machines without system
Chromium, run `npx playwright install chromium` first and omit the executable-path
override. Checks cover all routes, desktop/mobile layout, navigation and focus,
intro skipping, founder selection, the playground, media viewer, archive search
and tabs, Atlas camera/marker/list behavior, reduced motion, metadata, and
automated WCAG AA scans. No separate linter is configured.

## Deployment

No website has been deployed. Deploy only after owner approval. The site is
compatible with Vercel or another Next.js host. Set `NEXT_PUBLIC_SITE_URL` to
the actual approved origin for absolute social metadata. The creative-review
site remains noindex until launch approval; update root metadata then.
