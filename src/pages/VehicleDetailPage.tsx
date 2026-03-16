import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Gauge, Fuel, Cog, FileText, Shield, Phone, MessageCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { vehicles } from '@/data/vehicles';
import UnlockOfferModal from '@/components/UnlockOfferModal';

export default function VehicleDetailPage() {
  const { slug } = useParams();
  const vehicle = vehicles.find(v => v.slug === slug);
  const [offerOpen, setOfferOpen] = useState(false);

  if (!vehicle) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Vehicle Not Found</h1>
          <Link to="/cars" className="text-primary font-heading font-semibold hover:underline">
            ← Back to inventory
          </Link>
        </div>
      </div>
    );
  }

  const details = [
    { icon: Calendar, label: 'Year', value: vehicle.year },
    { icon: Gauge, label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} miles` },
    { icon: Fuel, label: 'Fuel', value: vehicle.fuelType },
    { icon: Cog, label: 'Transmission', value: vehicle.transmission },
    { icon: FileText, label: 'Registration', value: vehicle.registration },
    { icon: Shield, label: 'Condition', value: vehicle.condition },
  ];

  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in the ${vehicle.name} (${vehicle.registration}).`);

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-8">
        <Link to="/cars" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to inventory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Image */}
              <div className="aspect-[16/9] bg-muted rounded-lg border border-border flex items-center justify-center mb-6">
                <div className="text-center text-muted-foreground">
                  <Gauge className="w-16 h-16 mx-auto mb-2 opacity-30" />
                  <p className="text-sm opacity-50">{vehicle.name}</p>
                </div>
              </div>

              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {vehicle.badges.map(b => (
                      <span key={b} className="px-2 py-0.5 text-[10px] font-heading font-semibold uppercase tracking-wider bg-accent text-accent-foreground rounded">
                        {b}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{vehicle.name}</h1>
                  <p className="text-sm text-muted-foreground">{vehicle.registration}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-heading font-bold text-primary">£{vehicle.price.toLocaleString()}</p>
                </div>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {details.map(d => (
                  <div key={d.label} className="gradient-card rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <d.icon className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">{d.label}</span>
                    </div>
                    <p className="text-sm font-heading font-semibold text-foreground">{d.value}</p>
                  </div>
                ))}
                {vehicle.motExpiry && (
                  <div className="gradient-card rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-accent" />
                      <span className="text-xs text-muted-foreground">MOT Expiry</span>
                    </div>
                    <p className="text-sm font-heading font-semibold text-foreground">{vehicle.motExpiry}</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-lg font-heading font-bold text-foreground mb-3">Vehicle Description</h2>
                <p className="text-secondary-foreground leading-relaxed">{vehicle.description}</p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="gradient-card rounded-lg border border-border p-5 space-y-3 lg:sticky lg:top-24">
              <a
                href={`https://wa.me/447436624578?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white font-heading font-semibold rounded-md hover:bg-green-700 transition-all"
              >
                <MessageCircle className="w-4 h-4" /> Enquire via WhatsApp
              </a>
              <a
                href="tel:+447436624578"
                className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground font-heading font-semibold rounded-md hover:glow-red transition-all"
              >
                <Phone className="w-4 h-4" /> Call Dealer
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 w-full py-3 border border-border text-secondary-foreground font-heading font-semibold rounded-md hover:border-primary hover:text-primary transition-all"
              >
                Book Viewing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
