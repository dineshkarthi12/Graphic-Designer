import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { projects, seo, SITE_URL } from './src/data/content';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Swap the home-page meta tags in index.html for a page's own tags. */
function withMeta(html: string, m: { title: string; description: string; path: string; image: string }) {
  const url = SITE_URL + m.path;
  const img = SITE_URL + m.image;
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(m.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(m.description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(m.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escape(m.description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:image" content=")[^"]*/, `$1${img}`)
    .replace(/(<meta property="og:type" content=")[^"]*/, `$1${m.path === '/' ? 'website' : 'article'}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${escape(m.title)}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${escape(m.description)}`)
    .replace(/(<meta name="twitter:image" content=")[^"]*/, `$1${img}`);
}

/**
 * After the build, write one HTML file per case study with its own title, description
 * and Open Graph tags, so link previews work without JavaScript. Also writes
 * 404.html, sitemap.xml and robots.txt.
 */
function staticPages(): Plugin {
  return {
    name: 'static-pages',
    apply: 'build',
    closeBundle() {
      const dist = resolve(process.cwd(), 'dist');
      const index = readFileSync(resolve(dist, 'index.html'), 'utf8');
      writeFileSync(
        resolve(dist, 'index.html'),
        withMeta(index, { ...seo.home, path: '/', image: seo.ogImage }),
      );
      for (const p of projects) {
        const dir = resolve(dist, 'projects', p.slug);
        mkdirSync(dir, { recursive: true });
        writeFileSync(
          resolve(dir, 'index.html'),
          withMeta(index, {
            title: `${p.seo.title} · Dinesh Kumar`,
            description: p.seo.description,
            path: `/projects/${p.slug}`,
            image: p.cover,
          }),
        );
      }
      writeFileSync(resolve(dist, '404.html'), index);
      const urls = ['/', ...projects.map((p) => `/projects/${p.slug}`)];
      writeFileSync(
        resolve(dist, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`)
          .join('\n')}\n</urlset>\n`,
      );
      writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
    },
  };
}

export default defineConfig({
  plugins: [react(), staticPages()],
  build: {
    target: 'es2020',
    // three.js and React Three Fiber load lazily with the 3D scene, after first paint.
    chunkSizeWarningLimit: 1600,
  },
});
