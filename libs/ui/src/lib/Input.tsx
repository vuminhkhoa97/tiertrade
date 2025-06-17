'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = 'text', label, error, leftIcon, rightIcon, ...props },
    ref
  ) => {
    const baseStyles =
      'w-full px-3 py-2 border rounded-md text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring disabled:opacity-50 disabled:cursor-not-allowed';

    const errorStyles = error
      ? 'border-destructive focus:border-destructive focus:ring-destructive'
      : 'border-input';

    const paddingWithIcons =
      leftIcon || rightIcon
        ? cn(leftIcon ? 'pl-10' : '', rightIcon ? 'pr-10' : '')
        : '';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(baseStyles, errorStyles, paddingWithIcons, className)}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
