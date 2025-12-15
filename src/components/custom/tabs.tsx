/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  Tabs as BaseTabs,
  TabsList as BaseTabsList,
  TabsTrigger as BaseTabsTrigger,
  TabsContent as BaseTabsContent,
} from '../ui/tabs';

// Re-export base components
const Tabs = BaseTabs;
const TabsList = BaseTabsList;
const TabsContent = BaseTabsContent;

// Custom TabsTrigger with rounded-full styling
function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabsTrigger>) {
  return (
    <BaseTabsTrigger className={cn('oui:rounded-full', className)} {...props} />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
