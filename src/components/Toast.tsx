import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';
import { toast } from '../lib/toast';
import { useStore } from '../lib/useStore';

export function Toast() {
  const { message, id } = useStore(toast);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!id) return;
    setVisible(true);
    const t = window.setTimeout(() => setVisible(false), 2400);
    return () => window.clearTimeout(t);
  }, [id]);
  return (
    <div aria-live="polite" role="status">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={id}
            className="toast"
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <CircleCheck aria-hidden="true" />
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
