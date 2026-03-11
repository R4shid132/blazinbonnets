import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Truck, Wrench, Star, ArrowRight, ChevronRight } from 'lucide-react';
import VehicleCard from '@/components/VehicleCard';
import VehicleSearch from '@/components/VehicleSearch';
import { vehicles } from '@/data/vehicles';

const trustPoints = [
  { icon: CheckCircle, title: '60-Point Inspection', desc: 'Every vehicle thoroughly checked' },
  { icon: Shield, title: 'Quality Assured', desc: 'Hand-picked premium vehicles' },
  { icon: Wrench, title: 'Extended Warranty', desc: 'Peace of mind protection' },
  { icon: Truck, title: 'Nationwide Delivery', desc: 'Direct to your door' },
];

const testimonials = [
  { name: 'James T.', car: 'BMW 420D M Sport', rating: 5, text: 'Absolutely brilliant experience. The car was exactly as described and the team made the whole process seamless.' },
  { name: 'Sarah M.', car: 'Hyundai i10', rating: 5, text: 'Bought my first car from Blazin Bonnets. They were patient, helpful and gave me a great deal. Highly recommend!' },
  { name: 'David K.', car: 'Audi A5 Sportback', rating: 5, text: 'Premium quality at a fair price. The inspection report was thorough and gave me total confidence in my purchase.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(0_70%_50%/0.08),transparent_60%)]" />
        <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-4">
              Premium Used Cars · Walsall
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-[1.1] mb-6">
              Ignite Your Drive with{' '}
              <span className="text-primary">Blazin</span>{' '}
              <span className="text-gradient-gold">Bonnets</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary-foreground max-w-xl mb-8 font-body font-light leading-relaxed">
              Premium hand-picked vehicles inspected for quality and performance. Find your next car in Walsall, West Midlands.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/cars"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-heading font-semibold rounded-md hover:glow-red transition-all"
              >
                Browse Cars <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/sell-your-car"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-accent text-accent font-heading font-semibold rounded-md hover:bg-accent hover:text-accent-foreground transition-all"
              >
                Sell Your Car
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-border text-secondary-foreground font-heading font-semibold rounded-md hover:border-primary hover:text-primary transition-all"
              >
                Book Viewing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <VehicleSearch />
      </section>

      {/* Featured Vehicles */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-accent font-heading font-semibold text-xs tracking-widest uppercase mb-2">Handpicked Selection</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Featured Vehicles</h2>
          </div>
          <Link to="/cars" className="hidden md:flex items-center gap-1 text-sm text-primary font-heading font-semibold hover:gap-2 transition-all">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vehicles.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} index={i} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link to="/cars" className="inline-flex items-center gap-1 text-sm text-primary font-heading font-semibold">
            View All Vehicles <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary border-y border-border">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <p className="text-accent font-heading font-semibold text-xs tracking-widest uppercase mb-2">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Quality You Can Trust</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((tp, i) => (
              <motion.div
                key={tp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="gradient-card rounded-lg border border-border p-6 text-center hover:border-primary/40 transition-colors"
              >
                <tp.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading font-bold text-foreground mb-2">{tp.title}</h3>
                <p className="text-sm text-muted-foreground">{tp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-accent font-heading font-semibold text-xs tracking-widest uppercase mb-2">Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="gradient-card rounded-lg border border-border p-6"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-secondary-foreground mb-4 italic">"{t.text}"</p>
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.car}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0_70%_50%/0.15),transparent_70%)]" />
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Your Next Car Is <span className="text-primary">Waiting</span>
          </h2>
          <p className="text-secondary-foreground max-w-md mx-auto mb-8">
            Browse our handpicked selection of quality used vehicles, all inspected and ready to drive.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-heading font-semibold rounded-md hover:glow-red transition-all"
            >
              Browse Vehicles <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-border text-secondary-foreground font-heading font-semibold rounded-md hover:border-primary hover:text-primary transition-all"
            >
              Contact Dealer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
