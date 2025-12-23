/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Button as BaseButton } from '../ui/button';
import { Spinner } from '@/components';

// Combined button variants that merge base variants with custom overrides
const buttonVariants = cva(
  "oui:inline-flex oui:items-center oui:justify-center oui:gap-2 oui:whitespace-nowrap oui:text-sm oui:font-medium oui:transition-all oui:disabled:pointer-events-none oui:disabled:opacity-50 oui:[&_svg]:pointer-events-none oui:[&_svg:not([class*='size-'])]:size-4 oui:shrink-0 oui:[&_svg]:shrink-0 oui:outline-none oui:focus-visible:border-ring oui:focus-visible:ring-ring/50 oui:focus-visible:ring-[3px] oui:aria-invalid:ring-destructive/20 oui:dark:aria-invalid:ring-destructive/40 oui:aria-invalid:border-destructive oui:rounded-sm oui:active:opacity-60 oui:active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          'oui:bg-primary oui:text-primary-foreground oui:hover:bg-primary/90 oui:active:bg-primary',
        destructive:
          'oui:bg-destructive oui:text-white oui:hover:bg-destructive/90 oui:focus-visible:ring-destructive/20 oui:dark:focus-visible:ring-destructive/40 oui:dark:bg-destructive/60 oui:active:bg-destructive',
        outline:
          'oui:border-primary oui:bg-background oui:shadow-xs oui:hover:bg-primary/10 oui:hover:text-aprimary oui:dark:bg-input/30 oui:dark:border-input oui:dark:hover:bg-input/50 oui:text-primary oui:active:bg-accent oui:dark:active:bg-input/50',
        secondary:
          'oui:bg-secondary oui:text-secondary-foreground oui:hover:bg-primary/10 oui:text-primary  oui:active:bg-secondary/70',
        ghost:
          'oui:hover:bg-accent oui:hover:text-primary oui:dark:hover:bg-accent/50 oui:text-primary oui:active:bg-accent oui:dark:active:bg-accent/50',
        link: 'oui:text-primary oui:underline-offset-4 oui:hover:underline oui:active:underline',
      },
      size: {
        default: 'oui:h-8 oui:px-4 oui:py-2 oui:has-[>svg]:px-3',
        sm: 'oui:h-7 oui:gap-1.5 oui:px-3 oui:has-[>svg]:px-2.5',
        lg: 'oui:h-9 oui:px-6 oui:has-[>svg]:px-4',
        icon: 'oui:size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size,
  asChild = false,
  loading = false,
  children,
  ...props
}: React.ComponentProps<typeof BaseButton> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  }) {
  const spinnerSize =
    size === 'sm' ? 'oui:size-3' : size === 'lg' ? 'oui:size-4' : 'oui:size-4';

  return (
    <BaseButton
      className={cn(buttonVariants({ variant, size }), className)}
      variant={variant}
      size={size}
      asChild={asChild}
      disabled={loading || props.disabled}
      {...props}>
      {loading && <Spinner className={cn('oui:mr-2', spinnerSize)} />}
      {children}
    </BaseButton>
  );
}

export { Button, buttonVariants };
