import { Car, Truck, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const bodyTypeIcons: Record<string, LucideIcon> = {
  Hatchback: Car,
  Sportback: Zap,
  Coupe: Zap,
  SUV: Truck,
  Sedan: Car,
  Estate: Truck,
};

interface Props {
  bodyTypes: string[];
  active: string;
  onChange: (value: string) => void;
}

export default function BodyTypeChips({ bodyTypes, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('')}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-heading font-semibold rounded-full border transition-all ${
          active === ''
            ? 'bg-primary text-primary-foreground border-primary glow-red'
            : 'bg-muted text-muted-foreground border-border hover:border-primary/50'
        }`}
      >
        All
      </button>
      {bodyTypes.map(type => {
        const Icon = bodyTypeIcons[type] || Car;
        const isActive = active === type;
        return (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-heading font-semibold rounded-full border transition-all ${
              isActive
                ? 'bg-primary text-primary-foreground border-primary glow-red'
                : 'bg-muted text-muted-foreground border-border hover:border-primary/50'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {type}
          </button>
        );
      })}
    </div>
  );
}
