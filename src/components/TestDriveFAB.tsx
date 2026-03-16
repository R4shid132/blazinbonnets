import { useState, useEffect } from 'react';
import { CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function TestDriveFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollPercent > 0.2);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-24 right-6 z-40"
        >
          <Link
            to="/contact"
            className="flex items-center gap-2 px-5 py-3 bg-accent text-accent-foreground font-heading font-semibold text-sm rounded-full shadow-luxury hover:glow-gold transition-all hover:scale-105"
          >
            <CalendarCheck className="w-4 h-4" />
            Book Test Drive
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
