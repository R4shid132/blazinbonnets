import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { name: 'James T.', car: 'BMW 420D M Sport', rating: 5, text: 'Absolutely brilliant experience. The car was exactly as described and the team made the whole process seamless. Would highly recommend to anyone looking for a quality used car.' },
  { name: 'Sarah M.', car: 'Hyundai i10', rating: 5, text: 'Bought my first car from Blazin Bonnets. They were patient, helpful and gave me a great deal. The car is perfect for commuting and exactly what I needed.' },
  { name: 'David K.', car: 'Audi A5 Sportback', rating: 5, text: 'Premium quality at a fair price. The inspection report was thorough and gave me total confidence in my purchase. A truly professional dealership.' },
  { name: 'Lisa R.', car: 'Vauxhall Viva', rating: 4, text: 'Great little car at a very fair price. Staff were friendly and not pushy at all. Made the buying process really easy and stress-free.' },
  { name: 'Michael P.', car: 'BMW 420D', rating: 5, text: 'Found my dream car at Blazin Bonnets. The M Sport spec is incredible and the price was very competitive compared to other dealers in the area.' },
  { name: 'Emma W.', car: 'Hyundai i10', rating: 5, text: 'Perfect first car! Low insurance, cheap to run, and in excellent condition. Blazin Bonnets really do pick the best stock. Thank you!' },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-accent font-heading font-semibold text-xs tracking-widest uppercase mb-2">Testimonials</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Customer Reviews</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="gradient-card rounded-lg border border-border p-6"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-4 h-4 ${j < r.rating ? 'fill-accent text-accent' : 'text-muted'}`} />
                ))}
              </div>
              <p className="text-sm text-secondary-foreground mb-4 italic leading-relaxed">"{r.text}"</p>
              <div className="border-t border-border pt-3">
                <p className="font-heading font-semibold text-foreground text-sm">{r.name}</p>
                <p className="text-xs text-muted-foreground">Purchased: {r.car}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
