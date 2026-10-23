import { useEffect } from 'react';
import { SITE_URL, seo as defaults } from '../data/content';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

/** Keep title, description, canonical and Open Graph tags in sync with the current page. */
export function useSeo(title: string, description: string, path: string, image = defaults.ogImage) {
  useEffect(() => {
    const url = SITE_URL + path;
    const img = image.startsWith('http') ? image : SITE_URL + image;
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:type', path === '/' ? 'website' : 'article');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [title, description, path, image]);
}
