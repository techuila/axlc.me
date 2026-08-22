// Records a smooth top-to-bottom scroll of a live page as a webm.
// Usage:
//   node record-site-scroll.mjs <url> <outDir> [width] [height] [scrollMs] [stopsJson] [readyText]
//   stopsJson: JSON array of {y, hold, dur}: scroll to y over dur ms, hold for hold ms, then
//              continue. The final leg to the bottom uses scrollMs.
//   readyText: text that must be visible before the clock starts (e.g. the hero title);
//              the script prints `trim=<seconds>` so you can cut the load time with ffmpeg -ss.
// Then: ffmpeg -ss <trim> -i out.webm -an -vf scale=1280:-2 -c:v libx264 -crf 28 -pix_fmt yuv420p -movflags +faststart site-scroll.mp4
import { chromium } from 'playwright';
const [,, url, outDir, wArg = '1440', hArg = '900', durArg = '16000', stopsArg = '[]', readyText = ''] = process.argv;
const width = +wArg, height = +hArg, dur = +durArg;
const stops = JSON.parse(stopsArg);
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM || undefined,
  headless: true,
});
const ctx = await browser.newContext({
  viewport: { width, height }, deviceScaleFactor: 1,
  recordVideo: { dir: outDir, size: { width, height } },
  colorScheme: 'dark',
});
const t0 = Date.now(); // the video clock starts with the page
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 }).catch(e => console.error('goto', e.message));
let readyAt = Date.now();
if (readyText) {
  await page.waitForFunction((txt) => document.body.innerText.includes(txt), readyText, { timeout: 30000, polling: 100 }).catch(() => {});
  readyAt = Date.now();
}
await page.waitForTimeout(2600);
// Dismiss cookie banners: click an accept button if there is one, then hide
// anything that still looks like a consent bar.
await page.locator('button', { hasText: /accept/i }).first().click({ timeout: 300 }).catch(() => {});
await page.addStyleTag({ content: 'html,body{scroll-behavior:auto !important} [class*="cookie" i],[id*="cookie" i],[class*="consent" i],[id*="consent" i]{display:none !important}' });
await page.waitForTimeout(300);

const scrollTo = (from, to, d) => page.evaluate(([from, to, d]) => new Promise((res) => {
  const t0 = performance.now();
  const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
  const f = () => {
    const p = Math.min(1, (performance.now() - t0) / d);
    window.scrollTo(0, from + (to - from) * ease(p));
    if (p < 1) requestAnimationFrame(f); else res();
  };
  requestAnimationFrame(f);
}), [from, to, d]);

let y = 0;
for (const s of stops) {
  await scrollTo(y, s.y, s.dur ?? 4000);
  y = s.y;
  await page.waitForTimeout(s.hold ?? 3000);
}
const bottom = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
await scrollTo(y, bottom, dur);
await page.waitForTimeout(2500);
const video = page.video();
await ctx.close();
console.log('trim=' + Math.max(0, (readyAt - t0) / 1000 - 0.6).toFixed(2));
console.log(await video.path());
await browser.close();
