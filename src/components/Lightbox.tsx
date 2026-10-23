import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { lockScroll } from '../lib/smoothScroll';

/** An image that opens full screen on click. In the lightbox, click or press Z to zoom; drag the pointer to pan. */
export function ZoomImage({ src, alt, className, width, height }: { src: string; alt: string; className?: string; width: number; height: number }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={`zoom-trigger ${className ?? ''}`} onClick={() => setOpen(true)} data-cursor="Zoom" aria-label={`Open full-size image: ${alt}`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" width={width} height={height} />
        <span className="zoom-hint" aria-hidden="true">
          <ZoomIn /> Click to zoom
        </span>
      </button>
      <Lightbox open={open} onClose={() => setOpen(false)} src={src} alt={alt} />
    </>
  );
}

function Lightbox({ open, onClose, src, alt }: { open: boolean; onClose: () => void; src: string; alt: string }) {
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const prev = document.activeElement as HTMLElement | null;
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key.toLowerCase() === 'z') setZoom((z) => !z);
      if (e.key === 'Tab') {
        // Keep focus inside the dialog: cycle between its two buttons.
        e.preventDefault();
        const btns = Array.from(document.querySelectorAll<HTMLButtonElement>('.lightbox-bar button'));
        const i = btns.indexOf(document.activeElement as HTMLButtonElement);
        btns[(i + (e.shiftKey ? -1 : 1) + btns.length) % btns.length]?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
      setZoom(false);
      prev?.focus();
    };
  }, [open, onClose]);

  const pan = (e: React.PointerEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="lightbox-bar" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="icon-btn" onClick={() => setZoom((z) => !z)} aria-label={zoom ? 'Zoom out' : 'Zoom in'}>
              {zoom ? <ZoomOut aria-hidden="true" /> : <ZoomIn aria-hidden="true" />}
            </button>
            <button type="button" ref={close} className="icon-btn" onClick={onClose} aria-label="Close image">
              <X aria-hidden="true" />
            </button>
          </div>
          <motion.div
            className={`lightbox-frame${zoom ? ' is-zoomed' : ''}`}
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => {
              e.stopPropagation();
              pan(e as unknown as React.PointerEvent);
              setZoom((z) => !z);
            }}
            onPointerMove={zoom ? pan : undefined}
            data-cursor={zoom ? 'Zoom out' : 'Zoom in'}
          >
            <img src={src} alt={alt} style={{ transformOrigin: origin, transform: zoom ? 'scale(2.2)' : 'none' }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
