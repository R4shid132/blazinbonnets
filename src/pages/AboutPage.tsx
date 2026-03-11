import { motion } from 'framer-motion';
import { Shield, CheckCircle, Eye, Users, Wrench, Award } from 'lucide-react';

const values = [
  { icon: Eye, title: 'Rigorous Selection', desc: 'We hand-pick every vehicle from trusted sources, ensuring only quality stock reaches our forecourt.' },
  { icon: Shield, title: '60-Point Inspection', desc: 'Every car undergoes a comprehensive mechanical and cosmetic inspection before sale.' },
  { icon: Users, title: 'Customer First', desc: 'We believe in transparent, honest dealings. No pressure, no hidden fees, just great cars.' },
  { icon: Wrench, title: 'Extended Warranty', desc: 'Optional warranty packages give you peace of mind long after you drive away.' },
  { icon: Award, title: 'Dealer Reliability', desc: 'Fully registered UK motor trade dealer with proven track record of customer satisfaction.' },
  { icon: CheckCircle, title: 'Finance Options', desc: 'Flexible finance solutions tailored to your budget, subject to status.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-16">
          <p className="text-accent font-heading font-semibold text-xs tracking-widest uppercase mb-2">About Us</p>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Driven by <span className="text-primary">Quality</span>
          </h1>
          <p className="text-secondary-foreground leading-relaxed mb-4">
            Blazin Bonnets LTD is a Walsall-based used vehicle dealership dedicated to providing premium quality pre-owned cars at competitive prices. We source vehicles carefully, inspect them thoroughly, and present them honestly.
          </p>
          <p className="text-secondary-foreground leading-relaxed">
            Whether you're a first-time driver looking for a reliable runabout or a professional seeking an affordable premium vehicle, our handpicked selection caters to every need and budget. Based in the heart of the West Midlands, we serve customers across Walsall, Birmingham, and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="gradient-card rounded-lg border border-border p-6 hover:border-primary/40 transition-colors"
            >
              <v.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading font-bold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
