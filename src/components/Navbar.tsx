import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { contact, person } from '../data/content';
import { scrollToTarget, lockScroll } from '../lib/smoothScroll';
import { Magnetic } from './Magnetic';
import { GithubIcon, LinkedinIcon } from './Icon';

export const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

/** Go to a home-page section from anywhere. */
export function useGoToSection() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (id: string) => {
    if (pathname === '/') {
      scrollToTarget(`#${id}`);
      history.replaceState(null, '', `#${id}`);
    } else navigate(`/#${id}`);
  };
}

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!enabled) return setActive('');
    const els = ['hero', ...NAV_ITEMS.map((n) => n.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === 'hero' ? '' : e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

export function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const active = useActiveSection(isHome);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const goTo = useGoToSection();

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > 160);
          last = y;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const onNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    goTo(id);
  };

  return (
    <>
      <header className={`nav${hidden && !open ? ' is-hidden' : ''}`}>
        <Link to="/" className="nav-logo" onClick={() => isHome && scrollToTarget(0)}>
          <span className="logo-mark" aria-hidden="true">
            {person.initials}
          </span>
          <span>{person.name}</span>
        </Link>
        <nav aria-label="Main">
          <ul className="nav-links">
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <a
                  href={`/#${n.id}`}
                  className={`nav-link${active === n.id ? ' is-active' : ''}`}
                  aria-current={active === n.id ? 'location' : undefined}
                  onClick={(e) => onNav(e, n.id)}
                >
                  {active === n.id && (
                    <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                  )}
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-right">
          <Magnetic>
            <a className="btn btn-primary btn-sm" href={contact.resumePdf} download="Dinesh_Kumar_AI_ML_Engineer_Resume.pdf">
              <Download aria-hidden="true" />
              <span>
                <span className="nav-resume-label">Download </span>Resume
              </span>
            </a>
          </Magnetic>
          <button
            className="nav-burger"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu-top">
              <span className="nav-logo">
                <span className="logo-mark" aria-hidden="true">
                  {person.initials}
                </span>
                <span>{person.name}</span>
              </span>
              <button className="menu-close" aria-label="Close menu" onClick={() => setOpen(false)} autoFocus>
                <X aria-hidden="true" />
              </button>
            </div>
            <ul className="menu-links">
              {NAV_ITEMS.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a href={`/#${n.id}`} onClick={(e) => onNav(e, n.id)}>
                    <small>0{i + 1}</small>
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="menu-bottom">
              <a className="btn btn-primary" href={contact.resumePdf} download="Dinesh_Kumar_AI_ML_Engineer_Resume.pdf">
                <Download aria-hidden="true" /> Download resume
              </a>
              <div style={{ display: 'flex', gap: 8 }}>
                <a className="icon-btn" href={contact.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
                  <LinkedinIcon />
                </a>
                <a className="icon-btn" href={contact.github} target="_blank" rel="noopener" aria-label="GitHub">
                  <GithubIcon />
                </a>
                <a className="btn btn-ghost btn-sm" href={`mailto:${contact.email}`} style={{ marginLeft: 'auto' }}>
                  {contact.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
