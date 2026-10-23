import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../data/content';
import { rectOf, shared } from '../lib/sharedTransition';
import { prefersReducedMotion } from '../lib/env';

/** Start the shared-element flight from an image element to the case study. */
export function useOpenProject() {
  const navigate = useNavigate();
  return (p: Project, img?: HTMLElement | null) => {
    const to = `/projects/${p.slug}`;
    if (img && !prefersReducedMotion()) shared.set({ phase: 'flying', slug: p.slug, src: p.coverMd, from: rectOf(img), to: null });
    navigate(to);
  };
}

export function ProjectCard({ p, index, total }: { p: Project; index: number; total: number }) {
  const media = useRef<HTMLDivElement>(null);
  const open = useOpenProject();
  const onClick = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    open(p, media.current);
  };
  return (
    <a
      href={`/projects/${p.slug}`}
      className="project-card glass"
      data-slug={p.slug}
      data-cursor="View"
      onClick={onClick}
      style={{ '--accent': p.accent } as React.CSSProperties}
      aria-label={`${p.name}: ${p.outcome}. Read case study`}
    >
      <div className="project-media" ref={media}>
        <img src={p.coverMd} alt={p.coverAlt} loading="lazy" decoding="async" width={960} height={540} />
        <div className="project-badge">
          <strong>{p.cardMetric.value}</strong>
          <span>{p.cardMetric.label}</span>
        </div>
      </div>
      <div className="project-body">
        <div className="project-meta">
          <span className="dot" aria-hidden="true" />
          <span className="project-name">{p.name}</span>
          <span aria-hidden="true">·</span>
          <span>{p.category}</span>
        </div>
        <h3>{p.outcome}</h3>
        <ul className="project-tags" aria-label="Tags">
          {p.tags.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        <div className="project-foot">
          <span className="project-cta">
            Read case study <ArrowRight aria-hidden="true" />
          </span>
          <span className="project-index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>
    </a>
  );
}
