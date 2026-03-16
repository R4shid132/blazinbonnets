import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Truck, Eye, ArrowRight, ChevronRight, MessageCircle } from 'lucide-react';
import VehicleCard from '@/components/VehicleCard';
import VehicleSearch from '@/components/VehicleSearch';
import { vehicles } from '@/data/vehicles';
import heroBg from '@/assets/hero-bg.jpg';

const trustPoints = [
{ icon: CheckCircle, title: 'Quality Checked', desc: 'Every vehicle thoroughly inspected before sale' },
{ icon: Shield, title: 'Transparent Descriptions', desc: 'Honest, accurate vehicle information' },
{ icon: Eye, title: 'Affordable Used Cars', desc: 'Competitive prices on quality vehicles' },
{ icon: Truck, title: 'Flexible Viewings', desc: 'Appointment-only viewings at your convenience' }];


export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Premium automotive showroom" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(0_70%_50%/0.08),transparent_60%)]" />
        </div>
        <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl">
            
            <p className="text-accent font-heading font-semibold text-sm tracking-widest uppercase mb-4">
              Premium Used Cars · Walsall
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-[1.1] mb-6">
              Ignite Your Drive with{' '}
              <span className="text-primary">Blazin</span>{' '}
              <span className="text-gradient-gold">Bonnets</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary-foreground max-w-xl mb-8 font-body font-light leading-relaxed">
              Quality inspected vehicles at competitive prices. Find your next car in Walsall, West Midlands.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/cars"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-heading font-semibold rounded-md hover:glow-red transition-all">
                
                Browse Cars <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/447436624578?text=Hi%2C%20I%27m%20interested%20in%20one%20of%20your%20cars."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-600 text-white font-heading font-semibold rounded-md hover:bg-green-700 transition-all">
                
                <MessageCircle className="w-4 h-4" /> WhatsApp Dealer
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-border text-secondary-foreground font-heading font-semibold rounded-md hover:border-primary hover:text-primary transition-all">
                
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
            <p className="font-heading font-semibold tracking-widest uppercase mb-2 text-center text-xl text-primary">Handpicked Selection</p>
            <h2 className="text-3xl font-heading font-bold text-accent md:text-sm">Featured Vehicles</h2>
          </div>
          <Link to="/cars" className="hidden md:flex items-center gap-1 text-sm text-primary font-heading font-semibold hover:gap-2 transition-all">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vehicles.map((v, i) =>
          <VehicleCard key={v.id} vehicle={v} index={i} featured={i === 0} />
          )}
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
            {trustPoints.map((tp, i) =>
            <motion.div
              key={tp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="gradient-card rounded-lg border border-border p-6 text-center hover:border-primary/40 transition-colors">
              
                <tp.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading font-bold text-foreground mb-2">{tp.title}</h3>
                <p className="text-sm text-muted-foreground">{tp.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews Placeholder */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <p className="text-accent font-heading font-semibold text-xs tracking-widest uppercase mb-2">Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">What Our Customers Say</h2>
          <div className="gradient-card rounded-lg border border-border p-12 max-w-lg mx-auto">
            <p className="text-muted-foreground">Customer reviews coming soon.</p>
            <p className="text-sm text-muted-foreground mt-2">We're a new dealership building our reputation one happy customer at a time.</p>
          </div>
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
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-heading font-semibold rounded-md hover:glow-red transition-all">
              
              Browse Vehicles <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/447436624578?text=Hi%2C%20I%27m%20interested%20in%20one%20of%20your%20cars."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-border text-secondary-foreground font-heading font-semibold rounded-md hover:border-green-500 hover:text-green-500 transition-all">
              
              <MessageCircle className="w-4 h-4" /> WhatsApp Dealer
            </a>
          </div>
        </div>
      </section>
    </div>);

}