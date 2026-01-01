/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  OnChangeFn,
  Table as TanStackTable,
  Row,
} from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTableToolbar } from './data-table-toolbar'
import { DataTableRowActions } from './data-table-row-actions'

// Core DataTable component interfaces
export interface DataTableProps<TData, TValue = unknown> {
  // Required props
  columns: Array<ColumnDef<TData, TValue>>
  data: TData[]

  // Feature toggles (with better defaults)
  enableSorting?: boolean
  enableFiltering?: boolean
  enablePagination?: boolean
  enableRowSelection?: boolean
  enableColumnOrdering?: boolean
  enableColumnPinning?: boolean
  enableVirtualization?: boolean

  // Pagination configuration
  pageSize?: number
  pageSizeOptions?: number[]

  // State management - controlled mode
  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  columnFilters?: ColumnFiltersState
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>
  columnVisibility?: VisibilityState
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>

  // Global filtering
  globalFilter?: string
  onGlobalFilterChange?: (value: string) => void

  // Event handlers
  onRowClick?: (row: Row<TData>) => void
  onRowDoubleClick?: (row: Row<TData>) => void

  // Toolbar options
  searchPlaceholder?: string
  showSearch?: boolean
  showViewOptions?: boolean
  showClearFilters?: boolean


  // Row actions configuration
  rowActionsConfig?: {
    onView?: (row: Row<TData>) => void
    onEdit?: (row: Row<TData>) => void
    onCopy?: (row: Row<TData>) => void
    onDelete?: (row: Row<TData>) => void
    actions?: Array<{
      label: string
      onClick: (row: Row<TData>) => void
      icon?: React.ComponentType<{ className?: string }>
      destructive?: boolean
      disabled?: boolean | ((row: Row<TData>) => boolean)
    }>
    showDefaultActions?: boolean
    compact?: boolean
  }

  // Layout options
  variant?: 'default' | 'compact' | 'comfortable'
  showBorder?: boolean
  fullWidth?: boolean

  // Customization
  toolbar?: React.ComponentType<DataTableToolbarProps<TData>>
  rowActions?: React.ComponentType<DataTableRowActionsProps<TData>>
  emptyState?: React.ReactNode
  loading?: boolean
  loadingRows?: number

  // Styling
  className?: string
  containerClassName?: string
}

// Toolbar component interface
export interface DataTableToolbarProps<TData> {
  table: TanStackTable<TData>
  globalFilter?: string
  onGlobalFilterChange?: (value: string) => void
}

// Row actions component interface
export interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

// Column header component interface
export interface DataTableColumnHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  column: any // TanStack table column type
  title: string
}

// Pagination component interface
export interface DataTablePaginationProps<TData> {
  table: TanStackTable<TData>
}

// Main DataTable component
export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableRowSelection = false,
  // enableColumnOrdering = false,
  // enableColumnPinning = false,
  // enableVirtualization = false,
  pageSize = 10,
  // pageSizeOptions = [10, 20, 30, 40, 50],
  sorting: controlledSorting,
  onSortingChange: onControlledSortingChange,
  columnFilters: controlledColumnFilters,
  onColumnFiltersChange: onControlledColumnFiltersChange,
  columnVisibility: controlledColumnVisibility,
  onColumnVisibilityChange: onControlledColumnVisibilityChange,
  rowSelection: controlledRowSelection,
  onRowSelectionChange: onControlledRowSelectionChange,
  globalFilter,
  onGlobalFilterChange,
  onRowClick,
  onRowDoubleClick,

  // Enhanced props
  searchPlaceholder = 'Search...',
  showSearch = true,
  showViewOptions = true,
  showClearFilters = true,
  rowActionsConfig,
  variant = 'default',
  showBorder = true,
  fullWidth = true,

  toolbar: customToolbar,
  rowActions: customRowActions,
  emptyState,
  loading = false,
  loadingRows = 5,
  className,
  containerClassName,
}: DataTableProps<TData, TValue>) {
  // Internal state for uncontrolled mode
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([])
  const [internalColumnFilters, setInternalColumnFilters] = React.useState<ColumnFiltersState>([])
  const [internalColumnVisibility, setInternalColumnVisibility] = React.useState<VisibilityState>({})
  const [internalRowSelection, setInternalRowSelection] = React.useState<RowSelectionState>({})
  const [internalGlobalFilter, setInternalGlobalFilter] = React.useState('')

  // Determine if we're in controlled or uncontrolled mode
  const sorting = controlledSorting !== undefined ? controlledSorting : internalSorting
  const onSortingChange = onControlledSortingChange || setInternalSorting

  const columnFilters = controlledColumnFilters !== undefined ? controlledColumnFilters : internalColumnFilters
  const onColumnFiltersChange = onControlledColumnFiltersChange || setInternalColumnFilters

  const columnVisibility = controlledColumnVisibility !== undefined ? controlledColumnVisibility : internalColumnVisibility
  const onColumnVisibilityChange = onControlledColumnVisibilityChange || setInternalColumnVisibility

  const rowSelection = controlledRowSelection !== undefined ? controlledRowSelection : internalRowSelection
  const onRowSelectionChange = onControlledRowSelectionChange || setInternalRowSelection

  const currentGlobalFilter = globalFilter !== undefined ? globalFilter : internalGlobalFilter
  const currentOnGlobalFilterChange = onGlobalFilterChange || setInternalGlobalFilter

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(enableSorting && {
      getSortedRowModel: getSortedRowModel(),
      onSortingChange,
    }),
    ...(enableFiltering && {
      getFilteredRowModel: getFilteredRowModel(),
      onColumnFiltersChange,
      onGlobalFilterChange: currentOnGlobalFilterChange,
      globalFilterFn: 'includesString',
    }),
    ...(enablePagination && {
      getPaginationRowModel: getPaginationRowModel(),
    }),
    ...(enableRowSelection && {
      onRowSelectionChange,
    }),
    onColumnVisibilityChange,
    state: {
      ...(enableSorting && { sorting }),
      ...(enableFiltering && {
        columnFilters,
        globalFilter: currentGlobalFilter,
      }),
      columnVisibility,
      ...(enableRowSelection && { rowSelection }),
    },
    initialState: {
      ...(enablePagination && {
        pagination: {
          pageSize,
        },
      }),
    },
  })

  // Create toolbar component
  const toolbar = React.useMemo(() => {
    if (!showSearch && !showViewOptions && !customToolbar) {
      return undefined
    }

    if (customToolbar) {
      return customToolbar
    }

    return (props: DataTableToolbarProps<TData>) => (
      <DataTableToolbar
        {...props}
        searchPlaceholder={searchPlaceholder}
        showViewOptions={showViewOptions}
        showClearFilters={showClearFilters}
      />
    )
  }, [showSearch, showViewOptions, customToolbar, searchPlaceholder, showClearFilters])

  // Create row actions component
  const rowActions = React.useMemo(() => {
    if (!rowActionsConfig && !customRowActions) return undefined

    if (customRowActions) {
      return customRowActions
    }

    if (!rowActionsConfig) return undefined

    return ({ row }: DataTableRowActionsProps<TData>) => (
      <DataTableRowActions
        row={row}
        actions={rowActionsConfig.actions}
        onView={rowActionsConfig.onView}
        onEdit={rowActionsConfig.onEdit}
        onCopy={rowActionsConfig.onCopy}
        onDelete={rowActionsConfig.onDelete}
        showDefaultActions={rowActionsConfig.showDefaultActions}
        compact={rowActionsConfig.compact}
      />
    )
  }, [rowActionsConfig, customRowActions])

  // Apply variant styles
  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'oui:text-sm'
      case 'comfortable':
        return '[&_td]:oui:py-4 [&_th]:oui:py-4'
      default:
        return ''
    }
  }

  // Handle row click events
  const handleRowClick = React.useCallback(
    (row: Row<TData>) => {
      if (onRowClick) {
        onRowClick(row)
      }
    },
    [onRowClick]
  )

  const handleRowDoubleClick = React.useCallback(
    (row: Row<TData>) => {
      if (onRowDoubleClick) {
        onRowDoubleClick(row)
      }
    },
    [onRowDoubleClick]
  )

  // Render loading state
  if (loading) {
    return (
      <div
        data-slot="data-table-container"
        className={cn(
          'oui:space-y-4',
          fullWidth ? 'oui:w-full' : 'oui:max-w-7xl oui:mx-auto',
          containerClassName
        )}
      >
        {toolbar && (
          <div className="oui:space-y-4">
            {React.createElement(toolbar, {
              table,
              globalFilter: currentGlobalFilter,
              onGlobalFilterChange: currentOnGlobalFilterChange,
            })}
          </div>
        )}
        <div className={cn('oui:rounded-md', showBorder && 'oui:border')}>
          <Table className={cn(getVariantClasses(), className)}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="oui:h-12">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {Array.from({ length: loadingRows }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((_, colIndex) => (
                    <TableCell key={colIndex} className="oui:h-12">
                      <div className="oui:h-4 oui:bg-muted oui:rounded oui:animate-pulse" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div
      data-slot="data-table-container"
      className={cn(
        'oui:space-y-4',
        fullWidth ? 'oui:w-full' : 'oui:max-w-7xl oui:mx-auto',
        containerClassName
      )}
    >
      {toolbar && (
        <div className="oui:space-y-4">
          {React.createElement(toolbar, {
            table,
            globalFilter: currentGlobalFilter,
            onGlobalFilterChange: currentOnGlobalFilterChange,
          })}
        </div>
      )}
      <div className={cn('oui:rounded-md', showBorder && 'oui:border')}>
        <Table className={cn(getVariantClasses(), className)}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="oui:h-12">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(
                    onRowClick && 'oui:cursor-pointer',
                    onRowDoubleClick && 'oui:cursor-pointer'
                  )}
                  onClick={() => handleRowClick(row)}
                  onDoubleClick={() => handleRowDoubleClick(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  {rowActions && (
                    <TableCell className="oui:w-[50px]">
                      {React.createElement(rowActions, { row })}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + (rowActions ? 1 : 0)} className="oui:h-24 oui:text-center">
                  {emptyState || 'No results.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export type {
  TanStackTable as Table,
  Row,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  RowSelectionState
}