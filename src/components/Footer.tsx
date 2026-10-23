import { ArrowUp } from 'lucide-react';
import { person } from '../data/content';
import { scrollToTarget } from '../lib/smoothScroll';
import { contactLinks, linkProps } from './contactLinks';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: '-0.02em' }}>{person.name}</strong>
          <p>
            {person.role} · {person.location}
          </p>
        </div>
        <ul className="footer-icons" aria-label="Contact links">
          {contactLinks.map((l) => (
            <li key={l.id}>
              <a
                className="icon-btn"
                href={l.href}
                {...linkProps(l)}
                aria-label={`${l.label}: ${l.value}${l.external ? ' (opens in a new tab)' : ''}`}
                title={`${l.label}: ${l.value}`}
              >
                {l.icon}
              </a>
            </li>
          ))}
        </ul>
        <div className="footer-copy">
          <span>© {new Date().getFullYear()} {person.name}. Built with React, Three.js and React Three Fiber.</span>
          <button type="button" onClick={() => scrollToTarget(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
            Back to top <ArrowUp aria-hidden="true" size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
