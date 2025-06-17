'use client';

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/20/solid';

interface SelectOption {
  id: string | number;
  name?: string;
  avatar?: string;
  value?: string | number;
  label?: string;
}

interface SelectProps {
  value: SelectOption | string | number;
  onChange: (value: SelectOption | string | number) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
}

const Select = ({
  value,
  onChange,
  options,
  label = '',
  placeholder,
}: SelectProps) => {
  // Normalize value to SelectOption for internal use
  const normalizedValue =
    typeof value === 'object'
      ? value
      : options.find((opt) => (opt.value || opt.id) === value) || {
          id: value,
          name: String(value),
          label: String(value),
        };

  // Handle option selection
  const handleChange = (selectedOption: SelectOption) => {
    // Return the original format - if original value was string/number, return that format
    if (typeof value === 'string' || typeof value === 'number') {
      onChange(selectedOption.value || selectedOption.id);
    } else {
      onChange(selectedOption);
    }
  };
  return (
    <Listbox value={normalizedValue} onChange={handleChange}>
      <Label className="block text-sm/6 font-medium text-foreground">
        {label}
      </Label>{' '}
      <div className="relative mt-2">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-background text-foreground py-2 pl-3 pr-2 text-left border border-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            {normalizedValue.avatar && (
              <img
                alt=""
                src={normalizedValue.avatar}
                className="size-5 shrink-0 rounded-full"
              />
            )}{' '}
            <span className="block truncate">
              {normalizedValue.label ||
                normalizedValue.name ||
                String(normalizedValue.id) ||
                placeholder}
            </span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-muted-foreground sm:size-4"
          />
        </ListboxButton>
        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-popover py-1 text-base shadow-lg ring-1 ring-border focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-popover-foreground data-[focus]:bg-accent data-[focus]:text-accent-foreground data-[focus]:outline-none"
            >
              <div className="flex items-center">
                {option.avatar && (
                  <img
                    alt=""
                    src={option.avatar}
                    className="size-5 shrink-0 rounded-full"
                  />
                )}{' '}
                <span
                  className={`${
                    option.avatar ? 'ml-3' : ''
                  } block truncate font-normal group-data-selected:font-semibold`}
                >
                  {option.label || option.name || String(option.id)}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-[&:not([data-selected])]:hidden group-data-[focus]:text-accent-foreground">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export { Select };
export type { SelectOption, SelectProps };
