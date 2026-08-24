# Decisions

Locked decisions for axlc.dev. Read before proposing or building anything. Append when something is decided.

## 2026-08-24

- **Analytics is Microsoft Clarity (project `y77u56xi2v`) alongside the existing GA4 tag (`G-3C9XD04XBZ`).** Clarity covers heatmaps, click behavior, session recordings, countries, and time on site for free with no traffic cap; GA4 stays for trend data. Both snippets live in `src/layouts/Base.astro`. Rejected: self-hosted Umami (extra service to run on the Linode box for data Clarity already gives) and PostHog (overkill for a portfolio).

## 2026-08-22

- **CV, not resume.** The downloadable document is `public/documents/axl-cuyugan-SWE-CV.pdf` and every label on the site says "CV" (nav, footer, command palette, shortcut help, about page). The old `resume.pdf` is gone.
- **Side projects are separate from work experience.** `content/work/*.mdx` entries carry `kind: work | project`. Projects (Conose PH, Finova, Top.Notch) get their own "Side projects" section on `/work/` below past experience, show a real screenshot on their cards instead of the brand cover, and are excluded from the about-page changelog. Rejected: listing projects as "Current" work, since there is no current employer.
- **About page has a "Changelog".** A vertical rail of employers (newest first, by `order`), each row hoverable and linking to `/work/<slug>/`, with `Role · MM/YYYY - MM/YYYY` on the right. Dates come from `start`/`end` (`YYYY-MM`) frontmatter. The old plain "Timeline" list was replaced by it.
- **Work pages for every employer**, including the short ones (Bunbuy Marketplace, RightJob Solutions, Zamboanga Amusement & Recreational Inc.), written in the same first-person "About the company / My journey there / Closing thoughts" shape as the existing ones. ZARI has no website and no logo; its brand cover is text only on the same royal blue as PH Live Music (their actual brand color).
- **"Hire me" panel on `/work/`** takes the place of the "Current" section while no work entry is `current: true` (Spotify-style "Open to work" pill: the portrait pops in, then the text types out with a blinking caret and the pill grows with it, on every visit, four short reasons, email/CV/LinkedIn links). It disappears automatically once a current employer exists.
- **Project websites are shown as scrolling videos, not screenshots.** `public/images/work/<project>/site-scroll.mp4` (muted, looping, autoplay, with a poster) recorded headlessly from the live site with `scripts/record-site-scroll.mjs` (supports timed holds; Conose holds ~4s on the hero once "Conose your city." fades in at the end of the map sequence (scroll 1800px), then continues). Re-record when a landing page changes.
- **Top.Notch page embeds an interactive replica of the notch** (`src/components/NotchReplica.astro`, ported from the app's own marketing site) instead of a static screenshot: hover to open, pills/arrow keys switch panes, pomodoro parks a chip in the idle bar. No YouTube player and no visitor counter on this copy.
- **Project facts-panel covers are brand treatments, cards are screenshots.** Finova: white mark-only SVG on the app's blue-to-violet gradient. Top.Notch: the idle notch silhouette pinned to the top edge, "top.notch" wordmark in ink below it on a creamy white gradient, orange accent dot. Conose keeps its coral wordmark cover.
- **PH Live Music links to https://www.phlivemusic.com** (was the LinkedIn page).
- **Existing work pages are not rewritten** when the CV changes; only frontmatter (sort order, dates, links) is touched.
- **Home carousel order:** employment first, then a vertical "Side projects" divider (rule + rotated mono label, like a book spine), then the project cards. Rejected: mixing projects in with jobs or a separate carousel.
- **Clicking the "Open to work" pill pops confetti** (canvas-confetti, burst from the pill in the site blues plus white, skipped under reduced motion), YouTube-subscribe style, before the mailto opens.
- **Home hero shows the status as a badge on the portrait**, not a second pill: `OpenToWorkPill variant="badge"` (👋 + "Open to work", 13.5px, blue gradient, accent ring on the portrait) hangs off the bottom-right of the photo, same typing and confetti. Rejected: a standalone pill under the tagline (portrait shown twice) and turning the portrait itself into the pill. The hero tagline says Conose PH and Top.Notch are personal side projects, linking to their project pages.
