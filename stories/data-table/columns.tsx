/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ColumnDef } from '@tanstack/react-table'
import {
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
} from 'lucide-react'

import {
  Badge,
  Checkbox,
  DataTableColumnHeader,
  DataTableRowActions,
} from '@/components'

import type { Task, User, Product, Analytics, SimpleData } from './schema'

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'done':
    case 'delivered':
    case 'paid':
    case 'in-stock':
      return 'default'
    case 'in-progress':
    case 'processing':
    case 'shipped':
      return 'secondary'
    case 'pending':
    case 'todo':
    case 'low-stock':
      return 'outline'
    case 'inactive':
    case 'canceled':
    case 'failed':
    case 'out-of-stock':
    case 'discontinued':
      return 'destructive'
    default:
      return 'secondary'
  }
}

// Helper function to get priority color
const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'critical':
      return 'destructive'
    case 'high':
      return 'outline'
    case 'medium':
      return 'secondary'
    case 'low':
      return 'outline'
    default:
      return 'secondary'
  }
}

// Helper function to get trend icon
const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <TrendingUpIcon className="oui:h-4 oui:w-4 oui:text-green-600" />
    case 'down':
      return <TrendingDownIcon className="oui:h-4 oui:w-4 oui:text-red-600" />
    case 'stable':
      return <MinusIcon className="oui:h-4 oui:w-4 oui:text-gray-600" />
    default:
      return null
  }
}

// Task columns
export const taskColumns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="oui:translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="oui:translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const title = row.getValue('title') as string
      return (
        <div className="oui:max-w-[300px] oui:truncate oui:font-medium">
          {title}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge variant={getStatusColor(status)} className="oui:capitalize">
          {status.replace('-', ' ')}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
    cell: ({ row }) => {
      const priority = row.getValue('priority') as string
      return (
        <Badge variant={getPriorityColor(priority)} className="oui:capitalize">
          {priority}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'assignee',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Assignee" />,
    cell: ({ row }) => {
      const assignee = row.getValue('assignee') as string
      return assignee ? (
        <div className="oui:font-medium">{assignee}</div>
      ) : (
        <span className="oui:text-muted-foreground">Unassigned</span>
      )
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
    cell: ({ row }) => {
      const dueDate = row.getValue('dueDate') as string
      return dueDate ? (
        <div className="oui:font-mono oui:text-sm">{dueDate}</div>
      ) : (
        <span className="oui:text-muted-foreground">No due date</span>
      )
    },
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string[]
      return tags && tags.length > 0 ? (
        <div className="oui:flex oui:flex-wrap oui:gap-1">
          {tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="oui:text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge variant="outline" className="oui:text-xs">
              +{tags.length - 2}
            </Badge>
          )}
        </div>
      ) : null
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original
      return (
        <DataTableRowActions
          row={row}
          actions={[
            {
              label: 'View Details',
              onClick: () => console.log('View task:', task),
            },
            {
              label: 'Edit',
              onClick: () => console.log('Edit task:', task),
            },
            {
              label: 'Duplicate',
              onClick: () => console.log('Duplicate task:', task),
            },
            {
              label: 'Delete',
              onClick: () => console.log('Delete task:', task),
              destructive: true,
            },
          ]}
        />
      )
    },
  },
]

// User columns
export const userColumns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="oui:font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      const role = row.getValue('role') as string
      return (
        <Badge variant="outline" className="oui:capitalize">
          {role}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge variant={getStatusColor(status)} className="oui:capitalize">
          {status}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'department',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Department" />,
  },
  {
    accessorKey: 'lastLogin',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Login" />,
    cell: ({ row }) => {
      const lastLogin = row.getValue('lastLogin') as string
      return lastLogin ? (
        <div className="oui:font-mono oui:text-sm">{lastLogin}</div>
      ) : (
        <span className="oui:text-muted-foreground">Never</span>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      return (
        <DataTableRowActions
          row={row}
          onView={() => console.log('View user:', user)}
          onEdit={() => console.log('Edit user:', user)}
          onDelete={() => console.log('Delete user:', user)}
        />
      )
    },
  },
]

// Product columns
export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product" />,
    cell: ({ row }) => (
      <div className="oui:font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => {
      const price = row.getValue('price') as number
      return <div className="oui:font-mono">${price.toFixed(2)}</div>
    },
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
    cell: ({ row }) => {
      const stock = row.getValue('stock') as number
      return <div className="oui:font-mono">{stock}</div>
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge variant={getStatusColor(status)} className="oui:capitalize">
          {status.replace('-', ' ')}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rating" />,
    cell: ({ row }) => {
      const rating = row.getValue('rating') as number
      return (
        <div className="oui:flex oui:items-center oui:space-x-1">
          <span className="oui:font-mono">{rating}</span>
          <span className="oui:text-yellow-500">⭐</span>
        </div>
      )
    },
  },
]

// Analytics columns
export const analyticsColumns: ColumnDef<Analytics>[] = [
  {
    accessorKey: 'metric',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Metric" />,
    cell: ({ row }) => (
      <div className="oui:font-medium">{row.getValue('metric')}</div>
    ),
  },
  {
    accessorKey: 'value',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Value" />,
    cell: ({ row }) => {
      const value = row.getValue('value') as number
      return <div className="oui:font-mono">{value.toLocaleString()}</div>
    },
  },
  {
    accessorKey: 'change',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Change" />,
    cell: ({ row }) => {
      const change = row.getValue('change') as number
      const trend = row.original.trend
      return (
        <div className="oui:flex oui:items-center oui:space-x-2">
          {getTrendIcon(trend)}
          <span
            className={`oui:font-mono ${
              change > 0
                ? 'oui:text-green-600'
                : change < 0
                ? 'oui:text-red-600'
                : 'oui:text-gray-600'
            }`}
          >
            {change > 0 ? '+' : ''}
            {change}%
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      const category = row.getValue('category') as string
      return (
        <Badge variant="outline">
          {category}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'period',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Period" />,
  },
]

// Simple columns for basic examples
export const simpleColumns: ColumnDef<SimpleData>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'value',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Value" />,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
  },
]

// Minimal columns without sorting for performance testing
export const minimalTaskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="oui:font-mono oui:text-sm">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const title = row.getValue('title') as string
      return <div className="oui:max-w-[400px] oui:truncate">{title}</div>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return <Badge variant={getStatusColor(status)}>{status}</Badge>
    },
  },
  {
    accessorKey: 'assignee',
    header: 'Assignee',
  },
]