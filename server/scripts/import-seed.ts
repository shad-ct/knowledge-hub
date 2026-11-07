import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type ArticlePayload = {
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  status: 'published';
  publishedAt: string;
  sourceUrl?: string;
};

type PublishedArticle = { title: string };

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const seedDirectory = path.join(root, 'seed');
const apiUrl = process.env.SEED_API_URL || 'https://knowledge-hub-production-b1d6.up.railway.app/api/v1';
const apiKey = process.env.SEED_API_KEY || process.env.API_WRITE_KEY;

if (!apiKey) {
  throw new Error('SEED_API_KEY or API_WRITE_KEY must be set');
}

const clean = (value: string): string =>
  value
    .replace(/\*\*/g, '')
    .replace(/\\([.*+?()[\]{}|])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

const slug = (value: string): string =>
  clean(value)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const parseDate = (value: string): string => {
  const normalized = clean(value).replace(/\s+[—-]\s+.*$/, '');
  const isoMatch = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const namedMatch = normalized.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (isoMatch) {
    return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}T00:00:00.000Z`;
  }
  if (namedMatch) {
    const month = new Map([
      ['January', '01'], ['February', '02'], ['March', '03'], ['April', '04'],
      ['May', '05'], ['June', '06'], ['July', '07'], ['August', '08'],
      ['September', '09'], ['October', '10'], ['November', '11'], ['December', '12'],
    ]).get(namedMatch[1]);
    if (month) return `${namedMatch[3]}-${month}-${namedMatch[2].padStart(2, '0')}T00:00:00.000Z`;
  }
  throw new Error(`Unable to parse seed date: ${value}`);
};

const dateFromHeading = (heading: string): string | undefined => {
  const match = clean(heading).match(
    /(?:September|October|November)\s+\d{1,2},\s+2026|2026-\d{2}-\d{2}/,
  );
  return match ? parseDate(match[0]) : undefined;
};

const blocks = (text: string): Array<{ heading: string; body: string }> => {
  const matches = [...text.matchAll(/^#\s+(.+)$/gm)];
  return matches.map((match, index) => ({
    heading: clean(match[1]),
    body: text.slice(match.index! + match[0].length, matches[index + 1]?.index ?? text.length).trim(),
  }));
};

const firstDescription = (content: string, fallback: string): string => {
  const headline = content.match(/\*\*Headline:\*\*\s*(.+)/i)?.[1];
  const source = headline || content
    .split(/\n\s*\n/)
    .map((paragraph) => clean(paragraph))
    .find((paragraph) => paragraph && !paragraph.startsWith('#') && !paragraph.startsWith('* **'));
  return (source || fallback).slice(0, 997);
};

const sourceUrl = (content: string): string | undefined =>
  content.match(/\]\((https?:\/\/[^)]+)\)/)?.[1] ||
  content.match(/https?:\/\/\S+/)?.[0]?.replace(/[),.]+$/, '');

const titleKeywords = (title: string): string[] =>
  clean(title)
    .split(/[^A-Za-z0-9]+/)
    .filter((word) => word.length > 3)
    .filter((word) => !['this', 'that', 'with', 'from', 'into', 'what', 'when', 'around'].includes(word.toLowerCase()))
    .slice(0, 5)
    .map(slug)
    .filter(Boolean);

const makeArticle = (
  title: string,
  content: string,
  category: string,
  collection: string,
  publishedAt: string,
): ArticlePayload => ({
  title: clean(title).slice(0, 500),
  description: firstDescription(content, clean(title)).slice(0, 1000),
  content: content.trim(),
  category,
  tags: [...new Set([collection, slug(category), ...titleKeywords(title)])],
  author: 'Seed Library',
  status: 'published',
  publishedAt,
  ...(sourceUrl(content) ? { sourceUrl: sourceUrl(content) } : {}),
});

const parseSeedFile = async (fileName: string): Promise<ArticlePayload[]> => {
  const text = await readFile(path.join(seedDirectory, fileName), 'utf8');
  const entries = blocks(text);
  const articles: ArticlePayload[] = [];

  if (fileName === 'Concept of the Day.md' || fileName === 'Mind Signal.md') {
    for (const entry of entries) {
      const date = dateFromHeading(entry.heading);
      if (!date) continue;
      const [collection, ...subjectParts] = fileName === 'Concept of the Day.md'
        ? ['Concept of the Day', entry.heading.split('—').at(-1) || 'General']
        : ['Mind Signal', entry.heading.split('—').at(-1) || 'General'];
      articles.push(makeArticle(`${collection} — ${entry.heading}`, entry.body, subjectParts.join('—').trim(), slug(collection), date));
    }
    return articles;
  }

  if (fileName === 'FACTS & QUOTE.md') {
    let currentDate: string | undefined;
    let currentContent = '';
    const dateOccurrences = new Map<string, number>();
    for (const entry of entries) {
      const date = dateFromHeading(entry.heading);
      if (date) {
        if (currentDate && currentContent.trim()) {
          const occurrence = dateOccurrences.get(currentDate) || 1;
          articles.push(makeArticle(
            `Facts & Quotes — ${currentDate.slice(0, 10)}${occurrence > 1 ? ` — ${occurrence}` : ''}`,
            currentContent,
            'Facts & Quotes',
            'facts-and-quotes',
            currentDate,
          ));
        }
        currentDate = date;
        dateOccurrences.set(date, (dateOccurrences.get(date) || 0) + 1);
        currentContent = entry.body;
      } else if (currentDate) {
        currentContent += `\n\n# ${entry.heading}\n\n${entry.body}`;
      }
    }
    if (currentDate && currentContent.trim()) {
      const occurrence = dateOccurrences.get(currentDate) || 1;
      articles.push(makeArticle(
        `Facts & Quotes — ${currentDate.slice(0, 10)}${occurrence > 1 ? ` — ${occurrence}` : ''}`,
        currentContent,
        'Facts & Quotes',
        'facts-and-quotes',
        currentDate,
      ));
    }
    return articles;
  }

  if (fileName === 'Science Signal.md') {
    const date = dateFromHeading(entries[0]?.heading || '');
    if (!date) throw new Error('Science Signal has no publication date');
    for (const entry of entries.slice(1)) {
      articles.push(makeArticle(entry.heading, entry.body, 'Science', 'science-signal', date));
    }
    return articles;
  }

  if (fileName === 'daily random project ideas.md') {
    let currentDate: string | undefined;
    for (const entry of entries) {
      const date = dateFromHeading(entry.heading);
      if (date) {
        currentDate = date;
        continue;
      }
      if (!currentDate || !/^(?:\d+\.|Weekly Roundup)/.test(entry.heading)) continue;
      const category = clean(entry.heading.match(/\(([^)]+)\)\s*$/)?.[1] || 'Project Ideas');
      articles.push(makeArticle(entry.heading, entry.body, category, 'project-ideas', currentDate));
    }
    return articles;
  }

  return [];
};

const request = async (url: string, init?: RequestInit): Promise<any> => {
  const response = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey!, ...(init?.headers || {}) },
  });
  const body = await response.json();
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(body)}`);
  return body;
};

const requestWithRetry = async (url: string, init: RequestInit): Promise<any> => {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await request(url, init);
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
  throw lastError;
};

const allArticles = (await Promise.all([
  'Concept of the Day.md',
  'daily random project ideas.md',
  'FACTS & QUOTE.md',
  'Mind Signal.md',
  'Science Signal.md',
].map(parseSeedFile))).flat();
const existingResponse = await requestWithRetry(`${apiUrl}/articles?limit=100`, {});
const existing: PublishedArticle[] = existingResponse.data || [];
const pending = allArticles.filter((article) => !existing.some((item) => item.title === article.title));

console.log(`Parsed ${allArticles.length} seed articles; importing ${pending.length}.`);
for (let index = 0; index < pending.length; index += 20) {
  const batch = pending.slice(index, index + 20);
  const result = await requestWithRetry(`${apiUrl}/ai/publish/batch`, {
    method: 'POST',
    body: JSON.stringify({ articles: batch }),
  });
  console.log(`Imported ${Math.min(index + batch.length, pending.length)}/${pending.length}.`);
}

console.log('Seed import complete.');
