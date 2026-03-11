import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function SellYourCarPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', make: '', model: '', year: '', mileage: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Valuation request submitted! We\'ll be in touch soon.');
  };

  const inputClass = "w-full bg-muted text-foreground text-sm rounded-md px-4 py-3 border border-border focus:border-primary focus:outline-none font-body placeholder:text-muted-foreground";

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Request Submitted!</h2>
          <p className="text-muted-foreground">We'll review your details and get back to you with a valuation.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-accent font-heading font-semibold text-xs tracking-widest uppercase mb-2">Sell Your Car</p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Get a <span className="text-primary">Free Valuation</span>
            </h1>
            <p className="text-secondary-foreground mb-8">
              Looking to sell or part-exchange your vehicle? Fill in the form below and we'll provide a competitive valuation.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="gradient-card rounded-lg border border-border p-6 md:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className={inputClass} />
              <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className={inputClass} />
              <input required placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} className={inputClass} />
              <input required placeholder="Vehicle Make" value={form.make} onChange={e => setForm(f => ({...f, make: e.target.value}))} className={inputClass} />
              <input required placeholder="Model" value={form.model} onChange={e => setForm(f => ({...f, model: e.target.value}))} className={inputClass} />
              <input required placeholder="Year" value={form.year} onChange={e => setForm(f => ({...f, year: e.target.value}))} className={inputClass} />
              <input required placeholder="Mileage" value={form.mileage} onChange={e => setForm(f => ({...f, mileage: e.target.value}))} className={inputClass} />
            </div>

            <div className="border-2 border-dashed border-border rounded-md p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Upload photos of your vehicle (optional)</p>
              <p className="text-xs text-muted-foreground mt-1">Photo upload coming soon</p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-primary-foreground font-heading font-semibold rounded-md hover:glow-red transition-all"
            >
              Get Vehicle Valuation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
