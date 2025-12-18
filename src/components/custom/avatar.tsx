/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Avatar as BaseAvatar,
  AvatarFallback as BaseAvatarFallback,
} from '../ui/avatar';

import { cn } from '@/lib/utils';

const avatarVariants = cva('', {
  variants: {
    variant: {
      circular: 'oui:rounded-full',
      squared: 'oui:rounded-lg',
    },
  },
  defaultVariants: {
    variant: 'circular',
  },
});

interface AvatarProps
  extends
    React.ComponentProps<typeof BaseAvatar>,
    VariantProps<typeof avatarVariants> {}

function Avatar({ className, variant, ...props }: AvatarProps) {
  return (
    <BaseAvatar
      className={cn(avatarVariants({ variant }), className)}
      {...props}
    />
  );
}

interface AvatarFallbackProps
  extends
    React.ComponentProps<typeof BaseAvatarFallback>,
    VariantProps<typeof avatarVariants> {}

function AvatarFallback({ className, variant, ...props }: AvatarFallbackProps) {
  return (
    <BaseAvatarFallback
      className={cn(avatarVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback };
export { AvatarImage } from '../ui/avatar';
