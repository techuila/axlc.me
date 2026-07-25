import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

import { AppConfig } from '@/utils/AppConfig';
import { byDateDesc, isPublished } from '@/utils/content';

export async function GET(context: APIContext) {
  const posts = (await getCollection('writing'))
    .filter(isPublished)
    .sort(byDateDesc);

  return rss({
    title: `${AppConfig.site_name} — Writing`,
    description:
      'Notes from production: distributed systems, event-driven architecture, refactoring, and cloud cost engineering.',
    site: context.site ?? AppConfig.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/writing/${post.id}/`,
      pubDate: post.data.date as Date,
      categories: [post.data.category],
    })),
    customData: '<language>en-us</language>',
  });
}
