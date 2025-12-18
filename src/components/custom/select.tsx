/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger as BaseSelectTrigger,
  SelectValue,
} from '../ui/select';

// Custom SelectTrigger with rounded-full styling
function SelectTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelectTrigger>) {
  return (
    <BaseSelectTrigger
      className={cn('oui:rounded-full oui:bg-white', className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
