import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { contactLinks, linkProps } from './contactLinks';

const QUICK = ['email', 'whatsapp', 'phone', 'linkedin'];

/** Sticky "Let's talk" button with quick contact options. Mobile only (CSS). */
export function TalkButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
      if (e instanceof PointerEvent && ref.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    window.addEventListener('pointerdown', close);
    window.addEventListener('keydown', close);
    return () => {
      window.removeEventListener('pointerdown', close);
      window.removeEventListener('keydown', close);
    };
  }, [open]);
  return (
    <div className="talk" ref={ref}>
      <AnimatePresence>
        {open && (
          <motion.ul
            id="talk-menu"
            className="talk-menu glass"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            style={{ transformOrigin: 'bottom right' }}
          >
            {contactLinks
              .filter((l) => QUICK.includes(l.id))
              .map((l) => (
                <li key={l.id}>
                  <a href={l.href} {...linkProps(l)} onClick={() => setOpen(false)}>
                    {l.icon}
                    {l.label}
                  </a>
                </li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <button className="talk-btn" aria-expanded={open} aria-controls="talk-menu" onClick={() => setOpen((o) => !o)}>
        {open ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
        {open ? 'Close' : "Let's talk"}
      </button>
    </div>
  );
}
