/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Pagination as BasePagination,
  PaginationContent as BasePaginationContent,
  PaginationItem as BasePaginationItem,
  PaginationLink as BasePaginationLink,
  PaginationPrevious as BasePaginationPrevious,
  PaginationNext as BasePaginationNext,
  PaginationEllipsis as BasePaginationEllipsis,
} from '../ui/pagination';

// Override PaginationLink completely to avoid buttonVariants conflicts
function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: React.ComponentProps<typeof BasePaginationLink>) {
  return (
    <a // eslint-disable-line jsx-a11y/anchor-has-content -- content comes from props.children
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        // Base styling with rounded rectangle shape (not circular)
        'oui:inline-flex oui:items-center oui:justify-center oui:whitespace-nowrap oui:text-sm oui:font-medium oui:transition-colors oui:focus-visible:outline-none oui:focus-visible:ring-1 oui:focus-visible:ring-ring oui:disabled:pointer-events-none oui:disabled:opacity-50',
        // Size variants - using rounded-md for rectangular shape
        size === 'icon'
          ? 'oui:size-9 oui:rounded-md'
          : 'oui:h-9 oui:px-4 oui:py-2 oui:rounded-md',
        // Custom pagination styling to match Figma design
        isActive
          ? 'oui:bg-slate-50 oui:border oui:border-slate-200 oui:text-slate-950 oui:hover:bg-slate-100 oui:dark:bg-slate-800 oui:dark:border-slate-700 oui:dark:text-slate-50'
          : 'oui:text-slate-950 oui:hover:bg-slate-100 oui:hover:text-slate-950 oui:dark:text-slate-50 oui:dark:hover:bg-slate-800',
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof BasePaginationPrevious>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('oui:gap-1 oui:px-2.5 oui:sm:pl-2.5', className)}
      {...props}>
      <ChevronLeftIcon className="oui:size-4" />
      <span className="oui:hidden oui:sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof BasePaginationNext>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('oui:gap-1 oui:px-2.5 oui:sm:pr-2.5', className)}
      {...props}>
      <span className="oui:hidden oui:sm:block">Next</span>
      <ChevronRightIcon className="oui:size-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<typeof BasePaginationEllipsis>) {
  return (
    <BasePaginationEllipsis
      className={cn('oui:text-slate-950 oui:dark:text-slate-50', className)}
      {...props}
    />
  );
}

export {
  // Re-exported unchanged components
  BasePagination as Pagination,
  BasePaginationContent as PaginationContent,
  BasePaginationItem as PaginationItem,
  // Customized components
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
