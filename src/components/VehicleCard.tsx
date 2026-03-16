import { Link } from 'react-router-dom';
import { Fuel, Gauge, Calendar, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Vehicle } from '@/data/vehicles';
import { useGarage } from '@/hooks/useGarage';

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
  featured?: boolean;
}

export default function VehicleCard({ vehicle, index = 0, featured = false }: VehicleCardProps) {
  const { toggle, isSaved } = useGarage();
  const saved = isSaved(vehicle.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', damping: 20, stiffness: 100, delay: index * 0.08 }}
      className={featured ? 'sm:col-span-2 sm:row-span-2' : ''}
    >
      <Link to={`/cars/${vehicle.slug}`} className="group block h-full">
        <div className="h-full gradient-card rounded-lg border border-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-luxury hover:scale-[1.03]"
          style={{ willChange: 'transform' }}
        >
          {/* Image placeholder */}
          <div className={`relative ${featured ? 'aspect-[16/9]' : 'aspect-[16/10]'} bg-muted overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Gauge className={`${featured ? 'w-16 h-16' : 'w-12 h-12'} mx-auto mb-2 opacity-30`} />
                <p className="text-xs opacity-50">{vehicle.name}</p>
              </div>
            </div>
            {/* Badges */}
            {vehicle.badges.length > 0 && (
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {vehicle.badges.map(badge => (
                  <span
                    key={badge}
                    className="px-2 py-0.5 text-[10px] font-heading font-semibold uppercase tracking-wider bg-accent text-accent-foreground rounded"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
            {/* Save to Garage */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(vehicle.id); }}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
                saved
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-background/40 border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50'
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-primary' : ''}`} />
            </button>
            {/* Hover overlay with glow */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-sm font-heading font-semibold text-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-md">
                View Details <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className={`font-heading font-bold text-foreground group-hover:text-primary transition-colors ${featured ? 'text-lg' : ''}`}>
                  {vehicle.name}
                </h3>
                <p className="text-xs text-muted-foreground">{vehicle.registration}</p>
              </div>
              <div className="text-right">
                <p className={`font-heading font-bold text-primary ${featured ? 'text-xl' : 'text-lg'}`}>
                  £{vehicle.price.toLocaleString()}
                </p>
                {vehicle.financeFrom && (
                  <p className="text-[10px] text-muted-foreground">
                    Finance from £{vehicle.financeFrom}/mo
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {vehicle.year}
              </span>
              <span className="flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5" /> {vehicle.mileage.toLocaleString()} mi
              </span>
              <span className="flex items-center gap-1">
                <Fuel className="w-3.5 h-3.5" /> {vehicle.fuelType}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
