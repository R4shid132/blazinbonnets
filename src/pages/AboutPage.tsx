import { motion } from 'framer-motion';
import { Shield, CheckCircle, Eye, Users, Calendar } from 'lucide-react';

const values = [
  { icon: Eye, title: 'Carefully Sourced', desc: 'We hand-pick every vehicle from trusted sources, ensuring only quality stock is offered for sale.' },
  { icon: Shield, title: 'Quality Inspected', desc: 'Every car undergoes a thorough mechanical and cosmetic inspection before being listed.' },
  { icon: Users, title: 'Honest Descriptions', desc: 'No pressure, no hidden surprises. What you see is what you get — transparent and straightforward.' },
  { icon: CheckCircle, title: 'Competitive Prices', desc: 'Premium quality at affordable prices. We keep overheads low so you get the best deal.' },
  { icon: Calendar, title: 'Appointment Viewings', desc: 'All viewings are by appointment only. Call or WhatsApp us to arrange a convenient time.' },
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
            Blazin Bonnets LTD is a small, independent used car dealership based in Walsall, West Midlands. We carefully source vehicles, inspect them thoroughly, and describe them honestly — no gimmicks, no pressure.
          </p>
          <p className="text-secondary-foreground leading-relaxed mb-4">
            Whether you're a first-time driver looking for a reliable runabout or a professional seeking an affordable premium vehicle, our handpicked selection caters to every need and budget.
          </p>
          <p className="text-accent font-heading font-semibold">
            All viewings are by appointment only — call or WhatsApp us to arrange.
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
