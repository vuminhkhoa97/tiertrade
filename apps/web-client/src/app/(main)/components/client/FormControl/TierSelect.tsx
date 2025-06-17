'use client';

import { Select } from '@tier-trade/ui';
import { useTiers } from '../../../hooks/useTiers';

interface TierSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TierSelect({ value, onChange }: TierSelectProps) {
  const { tiers, loading, error } = useTiers();
  const options = [
    { id: '', value: '', label: 'All Tiers' },
    ...tiers.map((tier) => ({
      id: tier.id.toString(),
      value: tier.id.toString(),
      label: tier.name,
    })),
  ];

  if (loading) {
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Tier</h3>
        <div className="w-full h-10 bg-background animate-pulse rounded-md"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Tier</h3>
        <div className="text-sm text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-foreground mb-3">Tier</h3>
      <Select
        value={value}
        onChange={(selectedValue) => onChange(selectedValue as string)}
        options={options}
      />
    </div>
  );
}
