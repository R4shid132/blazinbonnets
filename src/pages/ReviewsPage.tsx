import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function ReviewsPage() {
  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-accent font-heading font-semibold text-xs tracking-widest uppercase mb-2">Testimonials</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Customer Reviews</h1>
        </motion.div>

        <div className="max-w-lg mx-auto text-center">
          <div className="gradient-card rounded-lg border border-border p-12">
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-6 h-6 text-muted" />
              ))}
            </div>
            <p className="text-muted-foreground mb-2">Customer reviews coming soon.</p>
            <p className="text-sm text-muted-foreground">
              We're a new dealership building our reputation one happy customer at a time. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
