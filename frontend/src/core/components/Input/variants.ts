import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      error: {
        true: 'border-red-300 focus:border-red-500 focus:ring-red-600',
        false: 'border-gray-300 focus:border-primary-500 focus:ring-primary-600',
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);
