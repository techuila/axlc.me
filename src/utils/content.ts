import type { CollectionEntry } from 'astro:content';

export const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

/** Estimated minutes at ~200 wpm, minimum 1. */
export const readingTime = (body: string): number =>
  Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));

export const isPublished = (post: CollectionEntry<'writing'>): boolean =>
  !post.data.draft && Boolean(post.data.date);

export const byDateDesc = (
  a: CollectionEntry<'writing'>,
  b: CollectionEntry<'writing'>
): number => (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0);

/** Drafts sorted by planned year desc, then explicit order, then title. */
export const draftSort = (
  a: CollectionEntry<'writing'>,
  b: CollectionEntry<'writing'>
): number =>
  (b.data.plannedYear ?? 0) - (a.data.plannedYear ?? 0) ||
  a.data.order - b.data.order ||
  a.data.title.localeCompare(b.data.title);

/** Year used to group the writing index. */
export const groupYear = (post: CollectionEntry<'writing'>): number =>
  post.data.date?.getUTCFullYear() ??
  post.data.plannedYear ??
  new Date().getFullYear();
