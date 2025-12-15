/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { Switch as BaseSwitch } from '../ui/switch';
import { useCompatId } from '@/lib/react-compat';

const switchVariants = cva('', {
  variants: {
    variant: {
      default: '',
      box: 'oui:bg-card oui:text-card-foreground oui:border oui:border-border oui:rounded-lg oui:p-4 oui:shadow-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface SwitchProps
  extends
    React.ComponentProps<typeof BaseSwitch>,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
  variant?: 'default' | 'box';
}

function Switch({
  className,
  variant = 'default',
  label,
  description,
  id,
  ...props
}: SwitchProps) {
  const generatedId = useCompatId();
  const switchId = id || generatedId;

  const switchElement = (
    <BaseSwitch id={switchId} className={className} {...props} />
  );

  // If no label or description, return just the switch
  if (!label && !description) {
    return variant === 'box' ? (
      <div className={switchVariants({ variant })}>{switchElement}</div>
    ) : (
      switchElement
    );
  }

  // If variant is box, wrap everything in the box container
  if (variant === 'box') {
    return (
      <div className={switchVariants({ variant })}>
        <div className="oui:flex oui:items-center oui:justify-between">
          <div className="oui:space-y-1">
            {label && (
              <label
                htmlFor={switchId}
                className="oui:text-sm oui:font-medium oui:leading-none oui:peer-disabled:cursor-not-allowed oui:peer-disabled:opacity-70">
                {label}
              </label>
            )}
            {description && (
              <p className="oui:text-xs oui:text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {switchElement}
        </div>
      </div>
    );
  }

  // Default variant with label/description
  return (
    <div className="oui:flex oui:items-center oui:space-x-2">
      {switchElement}
      <div className="oui:space-y-1">
        {label && (
          <label
            htmlFor={switchId}
            className="oui:text-sm oui:font-medium oui:leading-none oui:peer-disabled:cursor-not-allowed oui:peer-disabled:opacity-70">
            {label}
          </label>
        )}
        {description && (
          <p className="oui:text-xs oui:text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

export { Switch, type SwitchProps };
