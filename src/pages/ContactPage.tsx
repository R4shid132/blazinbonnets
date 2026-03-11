import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', enquiryType: 'general', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Enquiry submitted! We\'ll be in touch soon.');
  };

  const inputClass = "w-full bg-muted text-foreground text-sm rounded-md px-4 py-3 border border-border focus:border-primary focus:outline-none font-body placeholder:text-muted-foreground";

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-accent font-heading font-semibold text-xs tracking-widest uppercase mb-2">Get In Touch</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Contact Us</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="gradient-card rounded-lg border border-border p-6 space-y-5">
              <h2 className="font-heading font-bold text-foreground text-lg">Blazin Bonnets LTD</h2>
              {[
                { icon: Phone, label: '01234 567 890', href: 'tel:+441234567890' },
                { icon: Mail, label: 'info@blazinbonnets.co.uk', href: 'mailto:info@blazinbonnets.co.uk' },
                { icon: MapPin, label: 'Walsall, West Midlands, UK' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-primary" />
                  {item.href ? (
                    <a href={item.href} className="text-secondary-foreground hover:text-primary transition-colors">{item.label}</a>
                  ) : (
                    <span className="text-secondary-foreground">{item.label}</span>
                  )}
                </div>
              ))}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-sm text-secondary-foreground">
                  <p>Mon - Fri: 9:00 - 18:00</p>
                  <p>Saturday: 10:00 - 16:00</p>
                  <p>Sunday: By appointment</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="aspect-video rounded-lg border border-border bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Google Maps integration coming soon</p>
                <p className="text-xs">Walsall, West Midlands</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="gradient-card rounded-lg border border-border p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-heading font-bold text-foreground mb-2">Message Sent!</h2>
                <p className="text-muted-foreground">Thank you for your enquiry. We'll respond within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="gradient-card rounded-lg border border-border p-6 md:p-8 space-y-4">
                <h2 className="font-heading font-bold text-foreground text-lg mb-2">Send an Enquiry</h2>
                <input required placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className={inputClass} />
                <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className={inputClass} />
                <input placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} className={inputClass} />
                <select value={form.enquiryType} onChange={e => setForm(f => ({...f, enquiryType: e.target.value}))} className={inputClass}>
                  <option value="general">General Enquiry</option>
                  <option value="viewing">Book a Viewing</option>
                  <option value="finance">Finance Enquiry</option>
                  <option value="sell">Sell My Car</option>
                </select>
                <textarea required rows={4} placeholder="Your message..." value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} className={inputClass + ' resize-none'} />
                <button type="submit" className="w-full py-3.5 bg-primary text-primary-foreground font-heading font-semibold rounded-md hover:glow-red transition-all">
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
