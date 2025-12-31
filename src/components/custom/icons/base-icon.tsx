/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Icon props interface that matches lucide-react icon signature exactly
 * This ensures all custom icons have the same API as lucide icons
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
  color?: string;
  strokeWidth?: string | number;
  absoluteStrokeWidth?: boolean;
}

/**
 * Base icon component for custom SVG icons
 * Matches lucide-react behavior and provides consistent defaults
 */
export const BaseIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      size = 24,
      color = 'currentColor',
      strokeWidth = 2,
      absoluteStrokeWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={absoluteStrokeWidth ? Number(strokeWidth) : strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('oui:shrink-0', className)}
        {...props}>
        {children}
      </svg>
    );
  }
);

BaseIcon.displayName = 'BaseIcon';
