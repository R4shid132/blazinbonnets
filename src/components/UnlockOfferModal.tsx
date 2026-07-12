import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { submitLead } from '@/lib/leads';

interface Props {
  vehicleName: string;
  vehicleId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function UnlockOfferModal({ vehicleName, vehicleId, isOpen, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitLead({
        type: 'offer_unlock',
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        vehicle_id: vehicleId,
        vehicle_name: vehicleName,
        source: 'unlock_offer_modal',
      });
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
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
                  <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} type="text" placeholder="Your Name" className="w-full bg-muted text-foreground text-sm rounded-md px-3 py-2.5 border border-border focus:border-primary focus:outline-none" />
                  <input required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} type="tel" placeholder="Phone Number" className="w-full bg-muted text-foreground text-sm rounded-md px-3 py-2.5 border border-border focus:border-primary focus:outline-none" />
                  <input value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} type="email" placeholder="Email (optional)" className="w-full bg-muted text-foreground text-sm rounded-md px-3 py-2.5 border border-border focus:border-primary focus:outline-none" />
                  <button disabled={loading} type="submit" className="w-full py-3 bg-accent text-accent-foreground font-heading font-semibold rounded-md hover:glow-gold transition-all disabled:opacity-60">
                    {loading ? 'Unlocking...' : 'Unlock My Offer'}
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
