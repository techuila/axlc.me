import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

import { AppConfig } from '@/utils/AppConfig';
import { byDateDesc, formatDate, isPublished } from '@/utils/content';

/**
 * /llms-full.txt: the long version of /llms.txt (src/pages/llms.txt.ts): the
 * same header, then the frontmatter facts and the full body text of every
 * work entry and every published article, as plain markdown.
 *
 * Bodies are the raw MDX from content/**, so they are run through
 * `toMarkdown` below to drop the MDX-only syntax (component imports, JSX and
 * HTML blocks) that an agent reading plain text has no use for. Images and
 * videos are reduced to a one-line note so the reader knows a visual is
 * there. Drafts are left out.
 */

const abs = (path: string): string => new URL(path, AppConfig.url).href;

/** Same order the pages use (`order`, current first), then title so the
 *  generated file is byte-stable when entries tie. */
const byOrder = (a: CollectionEntry<'work'>, b: CollectionEntry<'work'>) =>
  a.data.order - b.data.order ||
  Number(b.data.current) - Number(a.data.current) ||
  a.data.title.localeCompare(b.data.title);

/** Elements that never open a block, so they do not change nesting depth. */
const VOID_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
]);

type TagState = { inTag: boolean; closing: boolean; name: string };

/**
 * Net change in HTML nesting depth across one line. `state` carries a tag
 * that is still open at the end of the line (attributes spread over several
 * lines) into the next call.
 */
const scanTags = (line: string, state: TagState): number => {
  let delta = 0;
  let i = 0;

  while (i < line.length) {
    if (state.inTag) {
      const gt = line.indexOf('>', i);
      if (gt === -1) return delta;
      const selfClosing = gt > 0 && line[gt - 1] === '/';
      if (!selfClosing && !VOID_TAGS.has(state.name)) {
        delta += state.closing ? -1 : 1;
      }
      state.inTag = false;
      state.closing = false;
      state.name = '';
      i = gt + 1;
    } else {
      const lt = line.indexOf('<', i);
      if (lt === -1) return delta;
      const tag = /^<(\/?)([A-Za-z][\w.:-]*)/.exec(line.slice(lt));
      if (tag) {
        state.inTag = true;
        state.closing = tag[1] === '/';
        state.name = (tag[2] ?? '').toLowerCase();
        i = lt + tag[0].length;
      } else {
        i = lt + 1;
      }
    }
  }

  return delta;
};

/** MDX whitespace expressions and comments, which are not markdown. */
const stripExpressions = (text: string): string =>
  text
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/\{\s*(['"])\s*\1\s*\}/g, ' ');

/** Inline tags (a footnote `<sup><a>`, a `<br />`) dropped from a text line. */
const stripInlineTags = (line: string): string =>
  line
    // Keep inline code spans verbatim: `<Component />` is prose, not markup.
    .split(/(`[^`]*`)/)
    .map((part, i) =>
      i % 2 === 1
        ? part
        : part.replace(/<\/?[A-Za-z][\w.:-]*(?:\s[^<>]*)?\/?>/g, '')
    )
    .join('');

/**
 * One JSX/HTML block reduced to plain lines: a labelled visual becomes a note,
 * an image gallery becomes one note per image, and anything else keeps its
 * text (callouts and footnotes carry real prose) with the tags removed.
 */
const blockToText = (block: string): string[] => {
  const root = /^<([A-Za-z][\w.:-]*)([\s\S]*?)>/.exec(block);
  const name = (root?.[1] ?? '').toLowerCase();
  const attrs = root?.[2] ?? '';
  const label = /aria-label="([^"]*)"/.exec(attrs)?.[1];

  if (label && name === 'video') return [`[video: ${label}]`];
  // <SiteFrame url=... /> is the live site framed as a browser window.
  if (name === 'siteframe') {
    const url = /\surl="([^"]+)"/.exec(attrs)?.[1];
    const alt = /\salt="([^"]+)"/.exec(attrs)?.[1];
    return [`[live site: ${alt ?? 'landing page'}${url ? `, ${url}` : ''}]`];
  }
  if (label && /role="img"/.test(attrs)) {
    return [`[diagram: ${label.replace(/^diagram:\s*/i, '')}]`];
  }

  const shots = [...block.matchAll(/\salt="([^"]+)"/g)].map(
    (m) => `[screenshot: ${m[1]}]`
  );
  if (shots.length) return shots;

  const text = stripExpressions(block)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return text ? [text] : [];
};

/** Raw MDX body to plain markdown. Fenced code blocks are left untouched. */
const toMarkdown = (body: string): string => {
  const out: string[] = [];
  let fence: string | null = null;
  let depth = 0;
  let block: string[] = [];
  const state: TagState = { inTag: false, closing: false, name: '' };

  body.split('\n').forEach((line) => {
    const fenceStart = /^\s*(```|~~~)/.exec(line);

    if (fence) {
      out.push(line);
      if (fenceStart && line.trim().startsWith(fence)) fence = null;
      return;
    }

    const inBlock = depth > 0 || state.inTag;

    if (!inBlock) {
      if (fenceStart) {
        fence = fenceStart[1] as string;
        out.push(line);
        return;
      }
      // Component imports (and any stray export) are MDX-only.
      if (/^\s*import\s/.test(line) || /^\s*export\s/.test(line)) return;
      if (!/^<[A-Za-z]/.test(line)) {
        out.push(stripInlineTags(stripExpressions(line)));
        return;
      }
    }

    block.push(line);
    depth += scanTags(line, state);

    if (depth <= 0 && !state.inTag) {
      depth = 0;
      out.push(...blockToText(block.join('\n')));
      block = [];
    }
  });

  if (block.length) out.push(...blockToText(block.join('\n')));

  return out
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const fact = (label: string, value?: string | null): string[] =>
  value ? [`- ${label}: ${value}`] : [];

const workSection = (entry: CollectionEntry<'work'>): string[] => {
  const kind =
    entry.data.kind === 'project' ? 'side project' : 'work experience';

  return [
    '---',
    '',
    `## ${entry.data.title}`,
    '',
    abs(`/work/${entry.id}/`),
    '',
    ...fact('Type', kind + (entry.data.current ? ', current' : '')),
    ...fact('Company', entry.data.company),
    ...fact('Role', entry.data.role),
    ...fact('Period', entry.data.period),
    ...fact('Location', entry.data.location),
    ...fact('Summary', entry.data.summary),
    ...fact('Stack', entry.data.stack.join(', ')),
    ...fact('Website', entry.data.externalUrl),
    ...fact(
      'Source',
      entry.data.repo ? `https://github.com/${entry.data.repo}` : null
    ),
    ...entry.data.coolLinks.map((l) => `- Link: ${l.label}, ${l.url}`),
    '',
    toMarkdown(entry.body ?? ''),
    '',
  ];
};

const postSection = (entry: CollectionEntry<'writing'>): string[] => [
  '---',
  '',
  `## ${entry.data.title}`,
  '',
  abs(`/writing/${entry.id}/`),
  '',
  '- Type: article',
  ...fact('Published', entry.data.date ? formatDate(entry.data.date) : null),
  ...fact('Category', entry.data.category),
  ...fact('Summary', entry.data.description),
  ...fact(
    'Related work',
    entry.data.work ? abs(`/work/${entry.data.work}/`) : null
  ),
  '',
  toMarkdown(entry.body ?? ''),
  '',
];

export async function GET() {
  const work = await getCollection('work');
  const jobs = work.filter((e) => e.data.kind === 'work').sort(byOrder);
  const projects = work.filter((e) => e.data.kind === 'project').sort(byOrder);
  const posts = (await getCollection('writing'))
    .filter(isPublished)
    .sort(byDateDesc);

  const lines: string[] = [
    `# ${AppConfig.author}`,
    '',
    '> Senior software engineer from Zamboanga City, Philippines, with 7+ years designing, building, and operating production backend and cloud systems: distributed systems, AWS, event-driven architecture, and the testing, delivery, and cost work that keeps them running. Open to work.',
    '',
    `This is the full text of ${
      AppConfig.url
    }: every work entry, every side project, and every published article, with the page text included. The short index is at ${abs(
      '/llms.txt'
    )}.`,
    '',
    'Key facts:',
    '',
    '- Role: Senior Software Engineer, backend and cloud systems.',
    '- Location: Zamboanga City, Philippines. Remote and async for 5+ years.',
    '- Experience: 7+ years across 7 roles, most of them small teams where he owned architecture, delivery, and what happened after launch.',
    '- Main stack: TypeScript, Node.js, Go, AWS (Lambda, SQS, DynamoDB, API Gateway), PostgreSQL, Terraform, Docker, React. Also ships Flutter, Rust, and Swift on his own projects.',
    '- Status: open to work, for senior backend, platform, and cloud engineering roles.',
    `- CV (PDF): ${abs(AppConfig.cv)}`,
    `- GitHub: ${AppConfig.github}`,
    `- LinkedIn: ${AppConfig.linkedin}`,
    `- Email: ${AppConfig.email}`,
    '',
    '# Work experience',
    '',
    ...jobs.flatMap(workSection),
    '# Side projects',
    '',
    ...projects.flatMap(workSection),
    '# Writing',
    '',
    ...posts.flatMap(postSection),
  ];

  return new Response(`${lines.join('\n').replace(/\n{3,}/g, '\n\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
