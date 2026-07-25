#!/usr/bin/env node
/**
 * Tiny zero-dependency likes API for axlc.dev.
 *
 *   GET  /api/likes/:slug            -> { count }
 *   POST /api/likes/:slug            -> { count }   body: { "action": "like" | "unlike" }
 *
 * Counts persist to a JSON file. See docs/likes-backend.md for setup.
 *
 * Env:
 *   LIKES_PORT        default 8787 (listens on 127.0.0.1 — proxy via nginx)
 *   LIKES_DB          default ./likes.json
 */
import { createServer } from 'node:http';
import { readFileSync, writeFileSync } from 'node:fs';

const PORT = Number(process.env.LIKES_PORT ?? 8787);
const DB = process.env.LIKES_DB ?? new URL('./likes.json', import.meta.url).pathname;

let counts = {};
try {
  counts = JSON.parse(readFileSync(DB, 'utf8'));
} catch {
  counts = {};
}

let saveTimer;
const save = () => {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      writeFileSync(DB, JSON.stringify(counts, null, 2));
    } catch (err) {
      console.error('likes: failed to persist db:', err.message);
    }
  }, 250);
};

// Naive per-IP rate limit: 30 writes/minute.
const hits = new Map();
const limited = (ip) => {
  const now = Date.now();
  const windowStart = now - 60_000;
  const list = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  list.push(now);
  hits.set(ip, list);
  return list.length > 30;
};

const json = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
};

createServer((req, res) => {
  const match = /^\/api\/likes\/([a-z0-9-]{1,120})\/?$/.exec(req.url ?? '');
  if (!match) return json(res, 404, { error: 'not found' });
  const slug = match[1];

  if (req.method === 'GET') return json(res, 200, { count: counts[slug] ?? 0 });

  if (req.method === 'POST') {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ?? req.socket.remoteAddress;
    if (limited(ip)) return json(res, 429, { error: 'slow down' });

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1024) req.destroy();
    });
    req.on('end', () => {
      let action = 'like';
      try {
        action = JSON.parse(body).action;
      } catch {
        /* default to like */
      }
      if (action === 'unlike') {
        counts[slug] = Math.max(0, (counts[slug] ?? 0) - 1);
      } else {
        counts[slug] = (counts[slug] ?? 0) + 1;
      }
      save();
      json(res, 200, { count: counts[slug] });
    });
    return undefined;
  }

  return json(res, 405, { error: 'method not allowed' });
}).listen(PORT, '127.0.0.1', () => {
  console.log(`likes api listening on 127.0.0.1:${PORT} (db: ${DB})`);
});
