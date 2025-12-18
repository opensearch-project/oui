/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Progress as BaseProgress } from '../ui/progress';

const progressVariants = cva('', {
  variants: {
    size: {
      sm: 'oui:h-1 oui:w-64',
      default: 'oui:h-2 oui:w-80',
      md: 'oui:h-3 oui:w-80',
      lg: 'oui:h-4 oui:w-80',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface ProgressProps
  extends
    React.ComponentProps<typeof BaseProgress>,
    VariantProps<typeof progressVariants> {}

const Progress = React.forwardRef<
  React.ComponentRef<typeof BaseProgress>,
  ProgressProps
>(function Progress({ className, size, ...props }, ref) {
  return (
    <BaseProgress
      ref={ref}
      className={cn(progressVariants({ size }), className)}
      {...props}
    />
  );
});

Progress.displayName = 'Progress';

export { Progress };
