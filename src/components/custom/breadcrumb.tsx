/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { Slash } from 'lucide-react';
import { BreadcrumbSeparator as BaseBreadcrumbSeparator } from '../ui/breadcrumb';

// Custom BreadcrumbSeparator with Slash icon instead of ChevronRight
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <BaseBreadcrumbSeparator className={className} {...props}>
      {children ?? <Slash />}
    </BaseBreadcrumbSeparator>
  );
}

// Re-export unchanged components from ui
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbEllipsis,
} from '../ui/breadcrumb';

// Export customized component
export { BreadcrumbSeparator };
