# Before 9 Run Club

Milestone one of a cinematic brand story for the Abu Dhabi running community.
Next.js App Router, TypeScript, Tailwind CSS 4, and GSAP / ScrollTrigger.

## Run the creative preview

Use Node.js 24 (`nvm use` if nvm is installed) and npm.

```bash
cd /workspace/Before9runclub
npm ci --cache /workspace/.cache/npm
npm run dev
```

The server listens on port **3000** on all interfaces. Open port 3000 through
your development platform's forwarded-port preview, if supported. On your own
machine, open port 3000 in the browser. A platform preview URL is not generated
by this project.

The development-origin allowlist includes `127.0.0.1` for this cloud machine's
browser checks. If a forwarded preview uses another hostname, add that exact
hostname to `allowedDevOrigins` in `next.config.ts` and restart the dev server.

For a production preview:

```bash
npm run build
npm run start
```

Stop a server with Ctrl-C before starting another server on the same port.

## Included in this milestone

- A provisional typographic identity, colors, self-hosted fonts, and responsive design system.
- Responsive navigation with a native modal chapter menu, keyboard focus handling, and skip link.
- Chapter 01: oversized kinetic typography, a dawn visual study, and the story introduction.
- Chapter 02: opening founding-story sequence with editable, proposed editorial copy.
- Optional image/video media support and labeled fallbacks. No stock people or invented founder biographies.
- GSAP entrance/reveal sequencing and scroll-based type/image movement, with reduced-motion support.
- Official Instagram links; no registration, payment, reservation, or membership flows.

Chapters 03–07 are intentionally deferred until creative review of this milestone.

## Edit the brand

`content/brand.ts` holds the brand text, proposed founding story, location,
Instagram URL, logo path, and image/video references. The founding story is
not a verified historical account; Selim and Enes should approve it.

The official logo, hero photograph/footage, and founders' photograph are
still needed. See `public/media/README.md` for exact asset integration steps.
Placeholders are labeled on the page. No credentials or external services are
required. Fonts are bundled locally, with no Google Fonts request at runtime.

## Validate

```bash
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

In this cloud environment, Chromium is already installed. Use it without an
extra browser download:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Playwright starts a production server automatically and tests desktop/mobile
rendering, menu navigation and keyboard behavior, responsive headline fit,
reduced-motion changes, and automated WCAG AA checks. Build before running it.
Tests do not validate future videos or photographs that have not been supplied.

## Creative review

Review the type scale, black/orange/paper contrast, hero composition, transition
into the story, and mobile layout. Then supply the approved logo/media and
feedback before extending the remaining chapters. This review build is marked
`noindex`; remove that metadata only when the approved site is ready to launch.
