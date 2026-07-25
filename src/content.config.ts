import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

/**
 * Publishing model: no CMS. Articles and work entries live as MDX files in
 * the repo (content/writing/*.mdx, content/work/*.mdx) — write Markdown with
 * frontmatter, push to git, and the site rebuilds.
 */

const writing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Publish date. Omit while draft: true.
    date: z.coerce.date().optional(),
    category: z.string().default('systems'),
    draft: z.boolean().default(false),
    // id of the related work entry (content/work/<id>.mdx); the company
    // page lists all writings tagged with its id.
    work: z.string().optional(),
    // Year a draft is planned for, used to group the writing index.
    plannedYear: z.number().optional(),
    // Sort order among drafts of the same year (lower = earlier).
    order: z.number().default(99),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './content/work' }),
  schema: z.object({
    title: z.string(),
    company: z.string().optional(),
    role: z.string().optional(),
    // Human-readable range, e.g. "2022 – 2026" or "2026 — present".
    period: z.string(),
    location: z.string().optional(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    current: z.boolean().default(false),
    // Sort position (home carousel and /work page; current entries first).
    order: z.number().default(99),
    // External link (e.g. a live product) used when there is no case study.
    externalUrl: z.string().url().optional(),
    // Extra links shown in the company facts panel ("Cool links").
    coolLinks: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
    // Square-ish company logo/visual for the facts panel, under public/.
    logo: z.string().optional(),
    // Internal link override for cards (e.g. point a card at a case study).
    href: z.string().optional(),
    // Screenshot under public/, e.g. /images/work/trials.png
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    // Used for SEO metadata on case-study pages.
    date: z.coerce.date().optional(),
  }),
});

export const collections = { writing, work };
