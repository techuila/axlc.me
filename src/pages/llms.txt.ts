import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

import { AppConfig } from '@/utils/AppConfig';
import { byDateDesc, formatDate, isPublished } from '@/utils/content';

/**
 * /llms.txt: a compact index of the site for AI agents and LLM-powered
 * search (llmstxt.org). Built at build time from the same content
 * collections the pages use, so it cannot go stale: add a work entry or
 * publish an article and it shows up here on the next build.
 *
 * The long version, with the full text of every page, is /llms-full.txt
 * (src/pages/llms-full.txt.ts).
 */

const abs = (path: string): string => new URL(path, AppConfig.url).href;

/** Same order the pages use (`order`, current first), then title so the
 *  generated file is byte-stable when entries tie. */
const byOrder = (a: CollectionEntry<'work'>, b: CollectionEntry<'work'>) =>
  a.data.order - b.data.order ||
  Number(b.data.current) - Number(a.data.current) ||
  a.data.title.localeCompare(b.data.title);

export async function GET() {
  const work = await getCollection('work');
  const jobs = work.filter((e) => e.data.kind === 'work').sort(byOrder);
  const projects = work.filter((e) => e.data.kind === 'project').sort(byOrder);
  // Mirrors the /work/ page: the hire panel (and this line) disappear the
  // moment a work entry is marked current.
  const openToWork = !jobs.some((e) => e.data.current);
  const posts = (await getCollection('writing'))
    .filter(isPublished)
    .sort(byDateDesc);

  const lines: string[] = [
    `# ${AppConfig.author}`,
    '',
    `> Senior software engineer from Zamboanga City, Philippines, with 7+ years designing, building, and operating production backend and cloud systems: distributed systems, AWS, event-driven architecture, and the testing, delivery, and cost work that keeps them running.${
      openToWork ? ' Open to work.' : ''
    }`,
    '',
    'Key facts:',
    '',
    '- Role: Senior Software Engineer, backend and cloud systems.',
    '- Location: Zamboanga City, Philippines. Remote and async for 5+ years.',
    '- Experience: 7+ years across 7 roles, most of them small teams where he owned architecture, delivery, and what happened after launch.',
    '- Main stack: TypeScript, Node.js, Go, AWS (Lambda, SQS, DynamoDB, API Gateway), PostgreSQL, Terraform, Docker, React. Also ships Flutter, Rust, and Swift on his own projects.',
    '- Track record: 99.9% availability on trials.gg, ~40% off an AWS bill, a deploy pipeline cut from 20 minutes to 6.',
    openToWork
      ? '- Status: open to work, for senior backend, platform, and cloud engineering roles.'
      : `- Status: currently at ${
          jobs.find((e) => e.data.current)?.data.title
        }.`,
    `- CV (PDF): ${abs(AppConfig.cv)}`,
    `- GitHub: ${AppConfig.github}`,
    `- LinkedIn: ${AppConfig.linkedin}`,
    `- Email: ${AppConfig.email}`,
    '',
    '## Pages',
    '',
    `- [Home](${abs(
      '/'
    )}): who he is, the work carousel, and the latest writing.`,
    `- [Work](${abs(
      '/work/'
    )}): every role and side project, plus why to hire him.`,
    `- [Writing](${abs(
      '/writing/'
    )}): articles and case studies on production systems.`,
    `- [About](${abs(
      '/about/'
    )}): background, how he works, changelog of roles, certifications.`,
    `- [RSS feed](${abs('/rss.xml')}): new writing.`,
    '',
    '## Work experience',
    '',
  ];

  lines.push(
    ...jobs.map((job) => {
      const facts = [job.data.role, job.data.period, job.data.location]
        .filter(Boolean)
        .join(', ');
      return `- [${job.data.title}](${abs(`/work/${job.id}/`)}): ${facts}. ${
        job.data.summary
      }`;
    })
  );

  lines.push('', '## Side projects', '');

  lines.push(
    ...projects.map((project) => {
      const live = project.data.externalUrl
        ? ` Live at ${project.data.externalUrl}.`
        : '';
      const repo = project.data.repo
        ? ` Source: https://github.com/${project.data.repo}.`
        : '';
      return `- [${project.data.title}](${abs(`/work/${project.id}/`)}) (${
        project.data.period
      }): ${project.data.summary}${live}${repo}`;
    })
  );

  lines.push('', '## Writing', '');

  lines.push(
    ...posts.map((post) => {
      const date = post.data.date ? formatDate(post.data.date) : '';
      const description = post.data.description
        ? ` ${post.data.description}`
        : '';
      return `- [${post.data.title}](${abs(
        `/writing/${post.id}/`
      )}): ${date}.${description}`;
    })
  );

  lines.push(
    '',
    '## Full text',
    '',
    `- [${AppConfig.author}, full text](${abs(
      '/llms-full.txt'
    )}): every work page and published article as plain markdown, in one file.`,
    '',
    '## Contact',
    '',
    `- Email: ${AppConfig.email}`,
    `- LinkedIn: ${AppConfig.linkedin}`
  );

  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
