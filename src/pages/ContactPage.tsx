import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle } from 'lucide-react';
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
              <p className="text-sm text-accent font-semibold">Viewings by appointment only</p>
              {[
                { icon: Phone, label: '07436 624 578', href: 'tel:+447436624578' },
                { icon: Mail, label: 'admin@blazinbonnets.co.uk', href: 'mailto:admin@blazinbonnets.co.uk' },
                { icon: MapPin, label: '76 Lord Street, Walsall, WS1 4DP' },
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
              <a
                href="https://wa.me/447436624578?text=Hi%2C%20I%27m%20interested%20in%20one%20of%20your%20cars."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white font-heading font-semibold rounded-md hover:bg-green-700 transition-all"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Dealer
              </a>
            </div>

            {/* Google Maps */}
            <div className="aspect-video rounded-lg border border-border overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2425.5!2d-1.9825!3d52.5855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870a1e2e3f4f5a7%3A0x1234567890abcdef!2s76%20Lord%20St%2C%20Walsall%20WS1%204DP%2C%20UK!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Blazin Bonnets LTD Location"
              />
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
