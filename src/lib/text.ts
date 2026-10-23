const TODO = /\[TODO:[^\]]*\]/g;

/** Strip "[TODO: …]" notes from a string. They live in content.ts but never reach the page. */
export const clean = (s?: string) => (s ?? '').replace(TODO, '').replace(/\s{2,}/g, ' ').trim();

/** Clean a list and drop items that were only a TODO. */
export const shown = (items: string[]) => items.map(clean).filter(Boolean);

export const hasValue = (s?: string) => clean(s) !== '';

/** Reading time from all the strings in an object, at 200 words per minute. */
// Tables, charts and diagrams are scanned rather than read, so they don't add reading time.
const SKIP = new Set(['slug', 'seo', 'coverAlt', 'secondaryAlt', 'curvesAlt', 'links', 'accent', 'accent2', 'cover', 'coverMd', 'secondary', 'icon', 'facts', 'confusion', 'architecture', 'breakdowns', 'meta', 'stack', 'tags']);

export function readingMinutes(value: unknown): number {
  let words = 0;
  const walk = (v: unknown, key = '') => {
    if (SKIP.has(key)) return;
    if (typeof v === 'string') {
      if (v.startsWith('/') || v.startsWith('#') || v.startsWith('http')) return;
      words += clean(v).split(/\s+/).filter(Boolean).length;
    } else if (Array.isArray(v)) v.forEach((x) => walk(x));
    else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => walk(x, k));
  };
  walk(value);
  return Math.max(1, Math.round(words / 200));
}
