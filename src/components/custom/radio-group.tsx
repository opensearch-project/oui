/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import {
  RadioGroup as BaseRadioGroup,
  RadioGroupItem as BaseRadioGroupItem,
} from '../ui/radio-group';

const radioGroupVariants = cva('oui:grid', {
  variants: {
    variant: {
      default: 'oui:gap-3',
      box: 'oui:gap-2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const radioGroupItemVariants = cva(
  'oui:border oui:text-primary oui:focus-visible:border-ring oui:focus-visible:ring-ring/50 oui:aria-invalid:ring-destructive/20 oui:dark:aria-invalid:ring-destructive/40 oui:aria-invalid:border-destructive oui:transition-[color,box-shadow] oui:outline-none oui:focus-visible:ring-[3px] oui:disabled:cursor-not-allowed oui:disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'oui:border-input oui:dark:bg-input/30 oui:aspect-square oui:size-4 oui:shrink-0 oui:rounded-full oui:shadow-xs',
        box: 'oui:group oui:border-input oui:hover:border-primary oui:data-[state=checked]:border-primary oui:data-[state=checked]:bg-primary/5 oui:flex oui:items-start oui:gap-3 oui:p-3 oui:rounded-lg oui:cursor-pointer oui:w-full oui:text-left',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface RadioGroupProps
  extends
    React.ComponentProps<typeof RadioGroupPrimitive.Root>,
    VariantProps<typeof radioGroupVariants> {}

function RadioGroup({ className, variant, ...props }: RadioGroupProps) {
  // For default variant, use the base UI component
  if (variant === 'default' || !variant) {
    return (
      <BaseRadioGroup
        className={cn(radioGroupVariants({ variant }), className)}
        {...props}
      />
    );
  }

  // For custom variants, use the primitive directly
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn(radioGroupVariants({ variant }), className)}
      {...props}
    />
  );
}

interface RadioGroupItemProps
  extends
    React.ComponentProps<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioGroupItemVariants> {
  children?: React.ReactNode;
}

function RadioGroupItem({
  className,
  variant,
  children,
  ...props
}: RadioGroupItemProps) {
  // For box variant, use custom implementation
  if (variant === 'box') {
    return (
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        className={cn(radioGroupItemVariants({ variant }), className)}
        {...props}>
        <div className="oui:aspect-square oui:size-4 oui:shrink-0 oui:rounded-full oui:border oui:border-input oui:flex oui:items-center oui:justify-center oui:relative oui:group-data-[state=checked]:border-primary oui:group-data-[state=checked]:bg-primary">
          <RadioGroupPrimitive.Indicator
            data-slot="radio-group-indicator"
            className="oui:relative oui:flex oui:items-center oui:justify-center">
            <div className="oui:size-2 oui:rounded-full oui:bg-white" />
          </RadioGroupPrimitive.Indicator>
        </div>
        {children && (
          <div className="oui:flex oui:flex-col oui:gap-1.5 oui:flex-1">
            {children}
          </div>
        )}
      </RadioGroupPrimitive.Item>
    );
  }

  // For default variant, extend the base UI component
  return (
    <BaseRadioGroupItem
      className={cn(radioGroupItemVariants({ variant }), className)}
      {...props}
    />
  );
}

export { RadioGroup, RadioGroupItem };
