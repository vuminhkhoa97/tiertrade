import { Select } from '@tier-trade/ui';

interface FilterOption {
  id: string;
  value: string;
  label: string;
}

interface FilterSelectProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
}

export default function FilterSelect({ title, value, onChange, options }: FilterSelectProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-foreground mb-3">{title}</h3>
      <Select
        value={value}
        onChange={(value) => onChange(value as string)}
        options={options}
      />
    </div>
  );
}
