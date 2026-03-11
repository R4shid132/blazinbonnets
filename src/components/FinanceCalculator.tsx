import { useState } from 'react';

interface FinanceCalculatorProps {
  vehiclePrice: number;
}

export default function FinanceCalculator({ vehiclePrice }: FinanceCalculatorProps) {
  const [deposit, setDeposit] = useState(Math.round(vehiclePrice * 0.1));
  const [term, setTerm] = useState(36);
  const apr = 9.9;

  const loanAmount = vehiclePrice - deposit;
  const monthlyRate = apr / 100 / 12;
  const monthlyPayment = loanAmount > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
    : 0;

  return (
    <div className="gradient-card rounded-lg border border-border p-5">
      <h3 className="font-heading font-bold text-foreground mb-4">Finance Calculator</h3>
      <p className="text-xs text-muted-foreground mb-4">Representative APR {apr}%. For illustration purposes only.</p>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-muted-foreground font-heading mb-1 block">Deposit (£)</label>
          <input
            type="range"
            min={0}
            max={vehiclePrice}
            step={100}
            value={deposit}
            onChange={e => setDeposit(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <p className="text-sm font-heading font-semibold text-foreground mt-1">£{deposit.toLocaleString()}</p>
        </div>

        <div>
          <label className="text-xs text-muted-foreground font-heading mb-1 block">Loan Term (months)</label>
          <div className="flex gap-2">
            {[12, 24, 36, 48, 60].map(t => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`flex-1 py-2 text-xs font-heading font-semibold rounded-md border transition-colors ${
                  term === t
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted text-muted-foreground border-border hover:border-primary/50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Estimated Monthly Payment</p>
          <p className="text-3xl font-heading font-bold text-primary">
            £{Math.round(monthlyPayment).toLocaleString()}
            <span className="text-sm text-muted-foreground font-normal">/month</span>
          </p>
        </div>
      </div>
    </div>
  );
}
