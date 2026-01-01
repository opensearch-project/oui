/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use client'

import * as React from 'react'
import { Table } from '@tanstack/react-table'
import { XIcon, SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  globalFilter?: string
  onGlobalFilterChange?: (value: string) => void
  searchPlaceholder?: string
  showViewOptions?: boolean
  showClearFilters?: boolean
  children?: React.ReactNode
  className?: string
}

export function DataTableToolbar<TData>({
  table,
  globalFilter = '',
  onGlobalFilterChange,
  searchPlaceholder = 'Search...',
  showViewOptions = true,
  showClearFilters = true,
  children,
  className,
}: DataTableToolbarProps<TData>) {
  const [searchValue, setSearchValue] = React.useState(globalFilter)

  // Debounce search input for performance
  const debouncedSearch = React.useMemo(() => {
    let timeoutId: NodeJS.Timeout
    return (value: string) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        if (onGlobalFilterChange) {
          onGlobalFilterChange(value)
        }
      }, 300)
    }
  }, [onGlobalFilterChange])

  // Update search value when globalFilter prop changes
  React.useEffect(() => {
    setSearchValue(globalFilter)
  }, [globalFilter])

  const handleSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setSearchValue(value)
      debouncedSearch(value)
    },
    [debouncedSearch]
  )

  const clearSearch = React.useCallback(() => {
    setSearchValue('')
    if (onGlobalFilterChange) {
      onGlobalFilterChange('')
    }
  }, [onGlobalFilterChange])

  const isFiltered = table.getState().columnFilters.length > 0 || searchValue.length > 0

  return (
    <div
      data-slot="data-table-toolbar"
      className={cn(
        'oui:flex oui:flex-col oui:gap-4 oui:sm:flex-row oui:sm:items-center oui:sm:justify-between',
        className
      )}
    >
      <div className="oui:flex oui:flex-1 oui:flex-col oui:gap-4 oui:sm:flex-row oui:sm:items-center oui:sm:space-x-2">
        {/* Global Search */}
        <div className="oui:relative oui:flex oui:items-center oui:space-x-2">
          <div className="oui:relative oui:w-full oui:sm:w-[300px]">
            <SearchIcon className="oui:absolute oui:left-3 oui:top-1/2 oui:h-4 oui:w-4 oui:-translate-y-1/2 oui:text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={handleSearchChange}
              className="oui:pl-9 oui:pr-9"
              data-slot="data-table-search"
            />
            {searchValue && (
              <Button
                variant="ghost"
                size="icon-sm"
                className="oui:absolute oui:right-1 oui:top-1/2 oui:h-7 oui:w-7 oui:-translate-y-1/2"
                onClick={clearSearch}
                data-slot="data-table-search-clear"
              >
                <XIcon className="oui:h-3 oui:w-3" />
                <span className="oui:sr-only">Clear search</span>
              </Button>
            )}
          </div>
        </div>

        {/* Custom content/filters */}
        {children && (
          <div className="oui:flex oui:flex-1 oui:flex-wrap oui:items-center oui:gap-2">
            {children}
          </div>
        )}

        {/* Clear filters button */}
        {isFiltered && showClearFilters && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters()
              clearSearch()
            }}
            className="oui:h-8 oui:px-2 oui:lg:px-3"
            data-slot="data-table-clear-filters"
          >
            Reset
            <XIcon className="oui:ml-2 oui:h-4 oui:w-4" />
          </Button>
        )}
      </div>

      {/* Right side controls */}
      <div className="oui:flex oui:items-center oui:space-x-2">
        {showViewOptions && <DataTableViewOptions table={table} />}
      </div>
    </div>
  )
}

// Simple toolbar variant with just search
export function DataTableSimpleToolbar<TData>({
  table: _table,
  globalFilter = '',
  onGlobalFilterChange,
  searchPlaceholder = 'Search...',
  className,
}: Pick<
  DataTableToolbarProps<TData>,
  'table' | 'globalFilter' | 'onGlobalFilterChange' | 'searchPlaceholder' | 'className'
>) {
  const [searchValue, setSearchValue] = React.useState(globalFilter)

  // Debounce search input for performance
  const debouncedSearch = React.useMemo(() => {
    let timeoutId: NodeJS.Timeout
    return (value: string) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        if (onGlobalFilterChange) {
          onGlobalFilterChange(value)
        }
      }, 300)
    }
  }, [onGlobalFilterChange])

  React.useEffect(() => {
    setSearchValue(globalFilter)
  }, [globalFilter])

  const handleSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setSearchValue(value)
      debouncedSearch(value)
    },
    [debouncedSearch]
  )

  const clearSearch = React.useCallback(() => {
    setSearchValue('')
    if (onGlobalFilterChange) {
      onGlobalFilterChange('')
    }
  }, [onGlobalFilterChange])

  return (
    <div
      data-slot="data-table-simple-toolbar"
      className={cn('oui:flex oui:items-center oui:justify-between', className)}
    >
      <div className="oui:relative oui:w-full oui:sm:w-[300px]">
        <SearchIcon className="oui:absolute oui:left-3 oui:top-1/2 oui:h-4 oui:w-4 oui:-translate-y-1/2 oui:text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={handleSearchChange}
          className="oui:pl-9 oui:pr-9"
          data-slot="data-table-simple-search"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="oui:absolute oui:right-1 oui:top-1/2 oui:h-7 oui:w-7 oui:-translate-y-1/2"
            onClick={clearSearch}
            data-slot="data-table-simple-search-clear"
          >
            <XIcon className="oui:h-3 oui:w-3" />
            <span className="oui:sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export type { DataTableToolbarProps }