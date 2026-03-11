import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { makes, fuelTypes, transmissions } from '@/data/vehicles';

export default function VehicleSearch() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ make: '', fuelType: '', transmission: '', priceMax: '' });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
    navigate(`/cars?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="gradient-card rounded-lg border border-border p-4 md:p-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <select
          value={filters.make}
          onChange={e => setFilters(f => ({ ...f, make: e.target.value }))}
          className="bg-muted text-foreground text-sm rounded-md px-3 py-2.5 border border-border focus:border-primary focus:outline-none font-body"
        >
          <option value="">All Makes</option>
          {makes.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <select
          value={filters.fuelType}
          onChange={e => setFilters(f => ({ ...f, fuelType: e.target.value }))}
          className="bg-muted text-foreground text-sm rounded-md px-3 py-2.5 border border-border focus:border-primary focus:outline-none font-body"
        >
          <option value="">All Fuel Types</option>
          {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
        </select>

        <select
          value={filters.transmission}
          onChange={e => setFilters(f => ({ ...f, transmission: e.target.value }))}
          className="bg-muted text-foreground text-sm rounded-md px-3 py-2.5 border border-border focus:border-primary focus:outline-none font-body"
        >
          <option value="">All Transmissions</option>
          {transmissions.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <select
          value={filters.priceMax}
          onChange={e => setFilters(f => ({ ...f, priceMax: e.target.value }))}
          className="bg-muted text-foreground text-sm rounded-md px-3 py-2.5 border border-border focus:border-primary focus:outline-none font-body"
        >
          <option value="">Max Price</option>
          <option value="3000">Up to £3,000</option>
          <option value="5000">Up to £5,000</option>
          <option value="7500">Up to £7,500</option>
          <option value="10000">Up to £10,000</option>
          <option value="15000">Up to £15,000</option>
        </select>

        <button
          type="submit"
          className="col-span-2 md:col-span-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-semibold text-sm rounded-md px-5 py-2.5 hover:glow-red transition-all"
        >
          <Search className="w-4 h-4" /> Search
        </button>
      </div>
    </form>
  );
}
