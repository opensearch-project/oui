/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use client'

import * as React from 'react'
import { Table } from '@tanstack/react-table'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/custom/pagination'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pageSizeOptions?: number[]
  showPageSizeSelector?: boolean
  showRowCount?: boolean
  showPageInfo?: boolean
  compact?: boolean
  className?: string
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  showPageSizeSelector = true,
  showRowCount = true,
  showPageInfo = true,
  compact = false,
  className,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()
  const totalRows = table.getFilteredRowModel().rows.length
  const currentPageSize = table.getState().pagination.pageSize
  const startRow = pageIndex * currentPageSize + 1
  const endRow = Math.min((pageIndex + 1) * currentPageSize, totalRows)

  // Generate page numbers for pagination
  const generatePageNumbers = React.useMemo(() => {
    const maxVisiblePages = compact ? 3 : 5
    const pages: Array<number | 'ellipsis'> = []

    if (pageCount <= maxVisiblePages + 2) {
      // Show all pages if total pages is small
      for (let i = 0; i < pageCount; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(0)

      if (pageIndex <= 2) {
        // Show first few pages
        for (let i = 1; i < Math.min(maxVisiblePages, pageCount - 1); i++) {
          pages.push(i)
        }
        if (pageCount > maxVisiblePages) {
          pages.push('ellipsis')
        }
      } else if (pageIndex >= pageCount - 3) {
        // Show last few pages
        if (pageCount > maxVisiblePages) {
          pages.push('ellipsis')
        }
        for (let i = Math.max(1, pageCount - maxVisiblePages); i < pageCount - 1; i++) {
          pages.push(i)
        }
      } else {
        // Show middle pages
        pages.push('ellipsis')
        for (let i = pageIndex - 1; i <= pageIndex + 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
      }

      // Always show last page (unless it's the first page)
      if (pageCount > 1) {
        pages.push(pageCount - 1)
      }
    }

    return pages
  }, [pageIndex, pageCount, compact])

  if (compact) {
    return (
      <div
        data-slot="data-table-pagination-compact"
        className={`oui:flex oui:items-center oui:justify-between oui:px-2 ${className || ''}`}
      >
        <div className="oui:flex oui:items-center oui:space-x-6 oui:lg:space-x-8">
          {showPageSizeSelector && (
            <div className="oui:flex oui:items-center oui:space-x-2">
              <p className="oui:text-sm oui:font-medium">Rows per page</p>
              <Select
                value={`${currentPageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="oui:h-8 oui:w-[70px]">
                  <SelectValue placeholder={currentPageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showRowCount && (
            <div className="oui:text-sm oui:text-muted-foreground">
              {totalRows === 0 ? (
                'No results'
              ) : (
                `${startRow}-${endRow} of ${totalRows}`
              )}
            </div>
          )}
        </div>

        <div className="oui:flex oui:items-center oui:space-x-2">
          <Button
            variant="outline"
            className="oui:h-8 oui:w-8 oui:p-0"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="oui:sr-only">Go to first page</span>
            <ChevronsLeftIcon className="oui:h-4 oui:w-4" />
          </Button>
          <Button
            variant="outline"
            className="oui:h-8 oui:w-8 oui:p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="oui:sr-only">Go to previous page</span>
            <ChevronLeftIcon className="oui:h-4 oui:w-4" />
          </Button>
          <Button
            variant="outline"
            className="oui:h-8 oui:w-8 oui:p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="oui:sr-only">Go to next page</span>
            <ChevronRightIcon className="oui:h-4 oui:w-4" />
          </Button>
          <Button
            variant="outline"
            className="oui:h-8 oui:w-8 oui:p-0"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="oui:sr-only">Go to last page</span>
            <ChevronsRightIcon className="oui:h-4 oui:w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      data-slot="data-table-pagination"
      className={`oui:flex oui:flex-col oui:gap-4 oui:sm:flex-row oui:sm:items-center oui:sm:justify-between oui:px-2 ${className || ''}`}
    >
      <div className="oui:flex oui:flex-col oui:gap-4 oui:sm:flex-row oui:sm:items-center oui:sm:space-x-6 oui:lg:space-x-8">
        {showPageSizeSelector && (
          <div className="oui:flex oui:items-center oui:space-x-2">
            <p className="oui:text-sm oui:font-medium">Rows per page</p>
            <Select
              value={`${currentPageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="oui:h-8 oui:w-[70px]">
                <SelectValue placeholder={currentPageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {showRowCount && (
          <div className="oui:text-sm oui:text-muted-foreground">
            {totalRows === 0 ? (
              'No results'
            ) : (
              `Showing ${startRow} to ${endRow} of ${totalRows} result${totalRows === 1 ? '' : 's'}`
            )}
          </div>
        )}

        {showPageInfo && pageCount > 1 && (
          <div className="oui:text-sm oui:text-muted-foreground">
            Page {pageIndex + 1} of {pageCount}
          </div>
        )}
      </div>

      {pageCount > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                className={
                  !table.getCanPreviousPage()
                    ? 'oui:pointer-events-none oui:opacity-50'
                    : 'oui:cursor-pointer'
                }
                aria-disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>

            {generatePageNumbers.map((page, index) => (
              <PaginationItem key={index}>
                {page === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => table.setPageIndex(page)}
                    isActive={pageIndex === page}
                    className="oui:cursor-pointer"
                  >
                    {page + 1}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                className={
                  !table.getCanNextPage()
                    ? 'oui:pointer-events-none oui:opacity-50'
                    : 'oui:cursor-pointer'
                }
                aria-disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

export type { DataTablePaginationProps }