import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  vehicleName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function UnlockOfferModal({ vehicleName, isOpen, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-xl border border-border bg-card/80 backdrop-blur-xl p-6 shadow-luxury"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-heading font-bold text-foreground">Unlock Exclusive Offer</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-5">
                  Get a special deal on the <span className="text-foreground font-semibold">{vehicleName}</span>. Drop your details and we'll send you an exclusive price.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input required type="text" placeholder="Your Name" className="w-full bg-muted text-foreground text-sm rounded-md px-3 py-2.5 border border-border focus:border-primary focus:outline-none" />
                  <input required type="tel" placeholder="Phone Number" className="w-full bg-muted text-foreground text-sm rounded-md px-3 py-2.5 border border-border focus:border-primary focus:outline-none" />
                  <input type="email" placeholder="Email (optional)" className="w-full bg-muted text-foreground text-sm rounded-md px-3 py-2.5 border border-border focus:border-primary focus:outline-none" />
                  <button type="submit" className="w-full py-3 bg-accent text-accent-foreground font-heading font-semibold rounded-md hover:glow-gold transition-all">
                    Unlock My Offer
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <Sparkles className="w-10 h-10 text-accent mx-auto mb-3" />
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">Offer Unlocked!</h3>
                <p className="text-sm text-muted-foreground">We'll be in touch shortly with your exclusive deal.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
