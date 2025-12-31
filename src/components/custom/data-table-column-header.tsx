/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use client'

import * as React from 'react'
import { Column } from '@tanstack/react-table'
import { ArrowUpDownIcon, ArrowUpIcon, ArrowDownIcon, EyeOffIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  canSort?: boolean
  canHide?: boolean
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  canSort = true,
  canHide = true,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() || !canSort) {
    return (
      <div
        data-slot="data-table-column-header"
        className={cn('oui:flex oui:items-center oui:space-x-2', className)}
      >
        <span>{title}</span>
      </div>
    )
  }

  const sorted = column.getIsSorted()

  return (
    <div
      data-slot="data-table-column-header"
      className={cn('oui:flex oui:items-center oui:space-x-2', className)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="oui:-ml-3 oui:h-8 oui:data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {sorted === 'desc' ? (
              <ArrowDownIcon className="oui:ml-2 oui:h-4 oui:w-4" />
            ) : sorted === 'asc' ? (
              <ArrowUpIcon className="oui:ml-2 oui:h-4 oui:w-4" />
            ) : (
              <ArrowUpDownIcon className="oui:ml-2 oui:h-4 oui:w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="oui:mr-2 oui:h-3.5 oui:w-3.5 oui:text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="oui:mr-2 oui:h-3.5 oui:w-3.5 oui:text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          {canHide && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOffIcon className="oui:mr-2 oui:h-3.5 oui:w-3.5 oui:text-muted-foreground/70" />
                Hide
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// Simple sortable header variant (no dropdown)
export function DataTableSimpleColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div
        data-slot="data-table-simple-column-header"
        className={cn('oui:flex oui:items-center oui:space-x-2', className)}
      >
        <span>{title}</span>
      </div>
    )
  }

  const sorted = column.getIsSorted()

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        'oui:-ml-3 oui:h-8 oui:justify-start oui:p-0 oui:font-medium',
        className
      )}
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      data-slot="data-table-simple-column-header"
    >
      <span>{title}</span>
      {sorted === 'desc' ? (
        <ArrowDownIcon className="oui:ml-2 oui:h-4 oui:w-4" />
      ) : sorted === 'asc' ? (
        <ArrowUpIcon className="oui:ml-2 oui:h-4 oui:w-4" />
      ) : (
        <ArrowUpDownIcon className="oui:ml-2 oui:h-4 oui:w-4" />
      )}
    </Button>
  )
}

// Helper function to create sortable column header
export const createSortableHeader = <TData, TValue>(
  title: string,
  options?: {
    canSort?: boolean
    canHide?: boolean
    simple?: boolean
  }
) => {
  const { canSort = true, canHide = true, simple = false } = options || {}

  return ({ column }: { column: Column<TData, TValue> }) => {
    if (simple) {
      return (
        <DataTableSimpleColumnHeader
          column={column}
          title={title}
          canSort={canSort}
          canHide={canHide}
        />
      )
    }

    return (
      <DataTableColumnHeader
        column={column}
        title={title}
        canSort={canSort}
        canHide={canHide}
      />
    )
  }
}

export type { DataTableColumnHeaderProps }