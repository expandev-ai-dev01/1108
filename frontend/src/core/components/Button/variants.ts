import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-600',
        secondary:
          'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-600',
        outline:
          'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-600',
        ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-600',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
      },
      size: {
        small: 'h-8 px-3 text-sm',
        medium: 'h-10 px-4 text-base',
        large: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);
