/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import * as React from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem as BaseContextMenuItem,
  ContextMenuCheckboxItem as BaseContextMenuCheckboxItem,
  ContextMenuRadioItem as BaseContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger as BaseContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from '../ui/context-menu';
import { cn } from '@/lib/utils';

// Components that need secondary color overrides
function ContextMenuSubTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenuSubTrigger>) {
  return (
    <BaseContextMenuSubTrigger
      className={cn(
        'oui:[&[data-highlighted]]:bg-secondary oui:[&[data-highlighted]]:text-secondary-foreground',
        className
      )}
      {...props}
    />
  );
}

function ContextMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenuItem>) {
  return (
    <BaseContextMenuItem
      className={cn(
        'oui:[&[data-highlighted]]:bg-secondary oui:[&[data-highlighted]]:text-secondary-foreground',
        className
      )}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenuCheckboxItem>) {
  return (
    <BaseContextMenuCheckboxItem
      className={cn(
        'oui:[&[data-highlighted]]:bg-secondary oui:[&[data-highlighted]]:text-secondary-foreground',
        className
      )}
      {...props}
    />
  );
}

function ContextMenuRadioItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseContextMenuRadioItem>) {
  return (
    <BaseContextMenuRadioItem
      className={cn(
        'oui:[&[data-highlighted]]:bg-secondary oui:[&[data-highlighted]]:text-secondary-foreground',
        className
      )}
      {...props}
    />
  );
}

export {
  // Re-exported unchanged components
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuRadioGroup,
  // Customized components
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuSubTrigger,
};
