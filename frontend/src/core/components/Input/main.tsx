import { forwardRef } from 'react';
import { cn } from '@/core/utils';
import { inputVariants } from './variants';
import type { InputProps } from './types';

/**
 * @component Input
 * @summary Reusable input component with label and error support
 * @domain core
 * @type ui-component
 * @category form
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="ml-1 text-red-600">*</span>}
          </label>
        )}
        <input ref={ref} className={cn(inputVariants({ error: !!error }), className)} {...props} />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
