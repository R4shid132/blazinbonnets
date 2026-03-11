import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import VehicleCard from '@/components/VehicleCard';
import { vehicles, makes, fuelTypes, transmissions, bodyTypes } from '@/data/vehicles';

export default function InventoryPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    make: searchParams.get('make') || '',
    fuelType: searchParams.get('fuelType') || '',
    transmission: searchParams.get('transmission') || '',
    bodyType: '',
    priceMax: searchParams.get('priceMax') || '',
    yearMin: '',
    mileageMax: '',
  });

  const filtered = useMemo(() => {
    return vehicles.filter(v => {
      if (filters.make && v.make !== filters.make) return false;
      if (filters.fuelType && v.fuelType !== filters.fuelType) return false;
      if (filters.transmission && v.transmission !== filters.transmission) return false;
      if (filters.bodyType && v.bodyType !== filters.bodyType) return false;
      if (filters.priceMax && v.price > Number(filters.priceMax)) return false;
      if (filters.yearMin && v.year < Number(filters.yearMin)) return false;
      if (filters.mileageMax && v.mileage > Number(filters.mileageMax)) return false;
      return true;
    });
  }, [filters]);

  const selectClass = "bg-muted text-foreground text-sm rounded-md px-3 py-2.5 border border-border focus:border-primary focus:outline-none font-body w-full";

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-accent font-heading font-semibold text-xs tracking-widest uppercase mb-2">Our Inventory</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">Browse Cars</h1>
        </motion.div>

        {/* Filters */}
        <div className="gradient-card rounded-lg border border-border p-4 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            <select value={filters.make} onChange={e => setFilters(f => ({...f, make: e.target.value}))} className={selectClass}>
              <option value="">All Makes</option>
              {makes.map(m => <option key={m}>{m}</option>)}
            </select>
            <select value={filters.fuelType} onChange={e => setFilters(f => ({...f, fuelType: e.target.value}))} className={selectClass}>
              <option value="">Fuel Type</option>
              {fuelTypes.map(f => <option key={f}>{f}</option>)}
            </select>
            <select value={filters.transmission} onChange={e => setFilters(f => ({...f, transmission: e.target.value}))} className={selectClass}>
              <option value="">Transmission</option>
              {transmissions.map(t => <option key={t}>{t}</option>)}
            </select>
            <select value={filters.bodyType} onChange={e => setFilters(f => ({...f, bodyType: e.target.value}))} className={selectClass}>
              <option value="">Body Type</option>
              {bodyTypes.map(b => <option key={b}>{b}</option>)}
            </select>
            <select value={filters.priceMax} onChange={e => setFilters(f => ({...f, priceMax: e.target.value}))} className={selectClass}>
              <option value="">Max Price</option>
              <option value="3000">£3,000</option>
              <option value="5000">£5,000</option>
              <option value="7500">£7,500</option>
              <option value="10000">£10,000</option>
              <option value="15000">£15,000</option>
            </select>
            <select value={filters.mileageMax} onChange={e => setFilters(f => ({...f, mileageMax: e.target.value}))} className={selectClass}>
              <option value="">Max Mileage</option>
              <option value="50000">50,000</option>
              <option value="100000">100,000</option>
              <option value="150000">150,000</option>
            </select>
            <button
              onClick={() => setFilters({ make: '', fuelType: '', transmission: '', bodyType: '', priceMax: '', yearMin: '', mileageMax: '' })}
              className="text-sm text-primary font-heading font-semibold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">{filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-heading">No vehicles match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
