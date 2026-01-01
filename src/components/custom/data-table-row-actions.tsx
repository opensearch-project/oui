/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use client'

import * as React from 'react'
import { Row } from '@tanstack/react-table'
import {
  MoreHorizontalIcon,
  EditIcon,
  CopyIcon,
  TrashIcon,
  EyeIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  actions?: Array<{
    label: string
    onClick: (row: Row<TData>) => void
    icon?: React.ComponentType<{ className?: string }>
    destructive?: boolean
    disabled?: boolean | ((row: Row<TData>) => boolean)
  }>
  onView?: (row: Row<TData>) => void
  onEdit?: (row: Row<TData>) => void
  onCopy?: (row: Row<TData>) => void
  onDelete?: (row: Row<TData>) => void
  showDefaultActions?: boolean
  compact?: boolean
}

export function DataTableRowActions<TData>({
  row,
  actions = [],
  onView,
  onEdit,
  onCopy,
  onDelete,
  showDefaultActions = true,
  compact = false,
}: DataTableRowActionsProps<TData>) {
  const defaultActions = React.useMemo(() => {
    const items: Array<{
      label: string
      onClick: (row: Row<TData>) => void
      icon?: React.ComponentType<{ className?: string }>
      destructive?: boolean
      disabled?: boolean | ((row: Row<TData>) => boolean)
    }> = []

    if (onView) {
      items.push({
        label: 'View',
        onClick: onView,
        icon: EyeIcon,
      })
    }

    if (onEdit) {
      items.push({
        label: 'Edit',
        onClick: onEdit,
        icon: EditIcon,
      })
    }

    if (onCopy) {
      items.push({
        label: 'Copy',
        onClick: onCopy,
        icon: CopyIcon,
      })
    }

    if (onDelete) {
      items.push({
        label: 'Delete',
        onClick: onDelete,
        icon: TrashIcon,
        destructive: true,
      })
    }

    return items
  }, [onView, onEdit, onCopy, onDelete])

  const allActions = showDefaultActions ? [...defaultActions, ...actions] : actions
  const hasDestructiveActions = allActions.some((action) => action.destructive)

  if (allActions.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`oui:h-8 oui:w-8 oui:p-0 data-[state=open]:bg-muted ${
            compact ? 'oui:h-6 oui:w-6' : ''
          }`}
          data-slot="data-table-row-actions-trigger"
        >
          <MoreHorizontalIcon className={`oui:h-4 oui:w-4 ${compact ? 'oui:h-3 oui:w-3' : ''}`} />
          <span className="oui:sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="oui:w-[160px]"
        data-slot="data-table-row-actions-content"
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {allActions
          .filter((action) => !action.destructive)
          .map((action, index) => {
            const isDisabled =
              typeof action.disabled === 'function'
                ? action.disabled(row)
                : action.disabled

            return (
              <DropdownMenuItem
                key={index}
                onClick={() => action.onClick(row)}
                disabled={isDisabled}
                className="oui:cursor-pointer"
              >
                {action.icon && (
                  <action.icon className="oui:mr-2 oui:h-4 oui:w-4" />
                )}
                {action.label}
              </DropdownMenuItem>
            )
          })}

        {hasDestructiveActions && (
          <>
            <DropdownMenuSeparator />
            {allActions
              .filter((action) => action.destructive)
              .map((action, index) => {
                const isDisabled =
                  typeof action.disabled === 'function'
                    ? action.disabled(row)
                    : action.disabled

                return (
                  <DropdownMenuItem
                    key={`destructive-${index}`}
                    onClick={() => action.onClick(row)}
                    disabled={isDisabled}
                    className="oui:cursor-pointer oui:text-destructive oui:focus:text-destructive"
                  >
                    {action.icon && (
                      <action.icon className="oui:mr-2 oui:h-4 oui:w-4" />
                    )}
                    {action.label}
                  </DropdownMenuItem>
                )
              })}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Simple row actions variant with just buttons (no dropdown)
export function DataTableSimpleRowActions<TData>({
  row,
  onView,
  onEdit,
  onDelete,
  compact = false,
}: Pick<DataTableRowActionsProps<TData>, 'row' | 'onView' | 'onEdit' | 'onDelete' | 'compact'>) {
  const buttonSize = compact ? 'icon-sm' : 'icon'

  return (
    <div
      className="oui:flex oui:items-center oui:space-x-1"
      data-slot="data-table-simple-row-actions"
    >
      {onView && (
        <Button
          variant="ghost"
          size={buttonSize}
          onClick={() => onView(row)}
          className="oui:hover:bg-muted"
        >
          <EyeIcon className="oui:h-4 oui:w-4" />
          <span className="oui:sr-only">View</span>
        </Button>
      )}

      {onEdit && (
        <Button
          variant="ghost"
          size={buttonSize}
          onClick={() => onEdit(row)}
          className="oui:hover:bg-muted"
        >
          <EditIcon className="oui:h-4 oui:w-4" />
          <span className="oui:sr-only">Edit</span>
        </Button>
      )}

      {onDelete && (
        <Button
          variant="ghost"
          size={buttonSize}
          onClick={() => onDelete(row)}
          className="oui:hover:bg-destructive/10 oui:text-destructive oui:hover:text-destructive"
        >
          <TrashIcon className="oui:h-4 oui:w-4" />
          <span className="oui:sr-only">Delete</span>
        </Button>
      )}
    </div>
  )
}

// Helper function to create row actions
export const createRowActions = <TData,>(
  config: Omit<DataTableRowActionsProps<TData>, 'row'>
) => {
  return ({ row }: { row: Row<TData> }) => (
    <DataTableRowActions row={row} {...config} />
  )
}

// Helper function to create simple row actions
export const createSimpleRowActions = <TData,>(
  config: Omit<DataTableRowActionsProps<TData>, 'row' | 'actions' | 'showDefaultActions'>
) => {
  return ({ row }: { row: Row<TData> }) => (
    <DataTableSimpleRowActions row={row} {...config} />
  )
}

export type { DataTableRowActionsProps }