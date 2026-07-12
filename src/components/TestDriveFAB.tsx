import { useState, useEffect } from 'react';
import { CalendarCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { submitLead } from '@/lib/leads';

export default function TestDriveFAB() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', vehicle: '', when: '' });

  useEffect(() => {
    const handler = () => {
      const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(p > 0.2);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitLead({
        type: 'test_drive',
        name: form.name,
        phone: form.phone,
        vehicle_name: form.vehicle || undefined,
        message: form.when ? `Preferred time: ${form.when}` : undefined,
        source: 'test_drive_fab',
      });
      toast.success('Booking request sent. We\'ll confirm your slot shortly.');
      setOpen(false);
      setForm({ name: '', phone: '', vehicle: '', when: '' });
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const input = 'w-full bg-muted text-foreground text-sm rounded-md px-3 py-2.5 border border-border focus:border-primary focus:outline-none';

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-24 lg:bottom-24 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-accent text-accent-foreground font-heading font-semibold text-sm rounded-full shadow-luxury hover:glow-gold hover:scale-105 transition-all"
          >
            <CalendarCheck className="w-4 h-4" /> Book Test Drive
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="relative w-full max-w-md rounded-xl border border-border bg-card/90 backdrop-blur-xl p-6 shadow-luxury">
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              <div className="flex items-center gap-2 mb-4">
                <CalendarCheck className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-heading font-bold text-foreground">Book a Test Drive</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-5">Viewings are by appointment. Tell us when suits and we'll confirm.</p>
              <form onSubmit={submit} className="space-y-3">
                <input required placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className={input} />
                <input required type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} className={input} />
                <input placeholder="Vehicle of interest (optional)" value={form.vehicle} onChange={e => setForm(f => ({...f, vehicle: e.target.value}))} className={input} />
                <input placeholder="Preferred day/time" value={form.when} onChange={e => setForm(f => ({...f, when: e.target.value}))} className={input} />
                <button disabled={loading} className="w-full py-3 bg-accent text-accent-foreground font-heading font-semibold rounded-md hover:glow-gold transition disabled:opacity-60">
                  {loading ? 'Sending...' : 'Request Booking'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
