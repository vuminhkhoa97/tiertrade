'use client';

import { Select } from '@tier-trade/ui';
import { useThemes } from '../../../hooks/useThemes';

interface ThemeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ThemeSelect({ value, onChange }: ThemeSelectProps) {
  const { themes, loading, error } = useThemes();
  const options = [
    { id: '', value: '', label: 'All Themes' },
    ...themes.map(theme => ({
      id: theme.id.toString(),
      value: theme.id.toString(),
      label: theme.name,
    })),
  ];

  if (loading) {
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Theme</h3>
        <div className="w-full h-10 bg-background animate-pulse rounded-md"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Theme</h3>
        <div className="text-sm text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-foreground mb-3">Theme</h3>
      <Select
        value={value}
        onChange={(selectedValue) => onChange(selectedValue as string)}
        options={options}
      />
    </div>
  );
}
