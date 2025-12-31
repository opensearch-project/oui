import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import {
  DataTable,
  Button,
} from '@/components';
import { createDocsWithWarning } from './utils/warning-banner';

// Import story support files
import {
  tasks,
  users,
  products,
  analytics,
  simpleData,
  generateLargeDataset,
} from './data-table/data';
import {
  taskColumns,
  userColumns,
  productColumns,
  analyticsColumns,
  simpleColumns,
  minimalTaskColumns,
} from './data-table/columns';
import type { ColumnFiltersState } from '@tanstack/react-table';

const meta: Meta<typeof DataTable> = {
  title: 'UI/DataTable',
  component: DataTable,
  parameters: {
    layout: 'fullscreen',
    ...createDocsWithWarning(
      'A powerful data table component built on TanStack Table with full sorting, filtering, pagination, and selection capabilities.'
    ),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  render: () => (
    <div className="oui:p-6 oui:space-y-4">
      <h2 className="oui:text-lg oui:font-semibold">Basic DataTable</h2>
      <DataTable
        columns={simpleColumns}
        data={simpleData}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic DataTable with minimal configuration.',
      },
    },
  },
};

export const WithSorting: Story = {
  render: () => (
    <div className="oui:p-6 oui:space-y-4">
      <h2 className="oui:text-lg oui:font-semibold">Sortable DataTable</h2>
      <DataTable
        columns={productColumns}
        data={products}
        enableSorting
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'DataTable with sortable columns. Click column headers to sort.',
      },
    },
  },
};

export const WithPagination: Story = {
  render: () => (
    <div className="oui:p-6 oui:space-y-4">
      <h2 className="oui:text-lg oui:font-semibold">Paginated DataTable</h2>
      <DataTable
        columns={taskColumns}
        data={tasks}
        enablePagination
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'DataTable with pagination controls and configurable page size.',
      },
    },
  },
};

// Filtering Examples
export const WithGlobalSearch: Story = {
  render: () => {
    const [globalFilter, setGlobalFilter] = useState('');

    return (
      <div className="oui:p-6 oui:space-y-4">
        <h2 className="oui:text-lg oui:font-semibold">DataTable with Global Search</h2>
        <DataTable
          columns={userColumns}
          data={users}
          enableSorting
          enableFiltering
          searchPlaceholder="Search users..."
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with global search functionality in the toolbar.',
      },
    },
  },
};

export const WithColumnFilters: Story = {
  render: () => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    return (
      <div className="oui:p-6 oui:space-y-4">
        <h2 className="oui:text-lg oui:font-semibold">DataTable with Column Filters</h2>
        <DataTable
          columns={taskColumns}
          data={tasks}
          enableSorting
          enableFiltering
          enablePagination
          columnFilters={columnFilters}
          onColumnFiltersChange={setColumnFilters}
          searchPlaceholder="Search tasks..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with column-specific filtering capabilities.',
      },
    },
  },
};

// Selection Examples
export const WithRowSelection: Story = {
  render: () => {
    const [rowSelection, setRowSelection] = useState({});

    return (
      <div className="oui:p-6 oui:space-y-4">
        <h2 className="oui:text-lg oui:font-semibold">DataTable with Row Selection</h2>
        <div className="oui:mb-4">
          <p className="oui:text-sm oui:text-muted-foreground">
            Selected rows: {Object.keys(rowSelection).length}
          </p>
        </div>
        <DataTable
          columns={userColumns}
          data={users}
          enableSorting
          enableFiltering
          enableRowSelection
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          searchPlaceholder="Search users..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with checkbox-based row selection and bulk operations.',
      },
    },
  },
};

export const WithBulkActions: Story = {
  render: () => {
    const [rowSelection, setRowSelection] = useState({});
    const selectedCount = Object.keys(rowSelection).length;

    const handleBulkDelete = () => {
      console.log('Bulk delete:', Object.keys(rowSelection));
      setRowSelection({});
    };

    const handleBulkExport = () => {
      console.log('Bulk export:', Object.keys(rowSelection));
    };

    return (
      <div className="oui:p-6 oui:space-y-4">
        <h2 className="oui:text-lg oui:font-semibold">DataTable with Bulk Actions</h2>
        {selectedCount > 0 && (
          <div className="oui:flex oui:items-center oui:justify-between oui:p-4 oui:bg-muted oui:rounded-md">
            <p className="oui:text-sm">
              {selectedCount} row{selectedCount !== 1 ? 's' : ''} selected
            </p>
            <div className="oui:flex oui:space-x-2">
              <Button size="sm" variant="outline" onClick={handleBulkExport}>
                Export Selected
              </Button>
              <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
                Delete Selected
              </Button>
            </div>
          </div>
        )}
        <DataTable
          columns={taskColumns}
          data={tasks}
          enableSorting
          enableFiltering
          enableRowSelection
          enablePagination
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          searchPlaceholder="Search tasks..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with bulk actions for selected rows.',
      },
    },
  },
};

// Advanced Features
export const WithColumnVisibility: Story = {
  render: () => {
    const [columnVisibility, setColumnVisibility] = useState({});

    return (
      <div className="oui:p-6 oui:space-y-4">
        <h2 className="oui:text-lg oui:font-semibold">DataTable with Column Visibility</h2>
        <DataTable
          columns={userColumns}
          data={users}
          enableSorting
          enableFiltering
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
          searchPlaceholder="Search users..."
          showViewOptions
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with column visibility controls in the view options.',
      },
    },
  },
};

export const WithLoadingState: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);

    // Simulate loading
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="oui:p-6 oui:space-y-4">
        <h2 className="oui:text-lg oui:font-semibold">DataTable Loading State</h2>
        <div className="oui:mb-4">
          <Button onClick={() => setLoading(!loading)}>
            {loading ? 'Stop Loading' : 'Start Loading'}
          </Button>
        </div>
        <DataTable
          columns={taskColumns}
          data={tasks}
          enableSorting
          enableFiltering
          loading={loading}
          loadingRows={8}
          searchPlaceholder="Search tasks..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with skeleton loading animation.',
      },
    },
  },
};

export const WithEmptyState: Story = {
  render: () => (
    <div className="oui:p-6 oui:space-y-4">
      <h2 className="oui:text-lg oui:font-semibold">DataTable Empty State</h2>
      <DataTable
        columns={taskColumns}
        data={[]}
        enableSorting
        enableFiltering
        searchPlaceholder="Search tasks..."
        emptyState={
          <div className="oui:flex oui:flex-col oui:items-center oui:justify-center oui:py-12">
            <div className="oui:text-center">
              <h3 className="oui:text-lg oui:font-medium">No tasks found</h3>
              <p className="oui:text-muted-foreground oui:mt-2">
                Get started by creating your first task.
              </p>
              <Button className="oui:mt-4">Create Task</Button>
            </div>
          </div>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'DataTable with custom empty state content.',
      },
    },
  },
};

// Performance Example
export const WithVirtualization: Story = {
  render: () => {
    const largeDataset = generateLargeDataset(1000);

    return (
      <div className="oui:p-6 oui:space-y-4">
        <h2 className="oui:text-lg oui:font-semibold">DataTable with Large Dataset</h2>
        <p className="oui:text-sm oui:text-muted-foreground">
          Displaying 1,000 rows with pagination for optimal performance.
        </p>
        <DataTable
          columns={minimalTaskColumns}
          data={largeDataset}
          enableSorting
          enableFiltering
          enablePagination
          pageSize={50}
          pageSizeOptions={[50, 100, 200, 500]}
          searchPlaceholder="Search tasks..."
          variant="compact"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable optimized for large datasets with pagination.',
      },
    },
  },
};

// Real-world Examples
export const TaskManagement: Story = {
  render: () => {
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState('');

    return (
      <div className="oui:p-6 oui:space-y-4">
        <h2 className="oui:text-lg oui:font-semibold">Task Management Table</h2>
        <DataTable
          columns={taskColumns}
          data={tasks}
          enableSorting
          enableFiltering
          enablePagination
          enableRowSelection
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          searchPlaceholder="Search tasks..."
          rowActionsConfig={{
            onView: (row) => console.log('View task:', row.original),
            onEdit: (row) => console.log('Edit task:', row.original),
            onDelete: (row) => console.log('Delete task:', row.original),
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete task management table with all features enabled.',
      },
    },
  },
};

export const UserDirectory: Story = {
  render: () => (
    <div className="oui:p-6 oui:space-y-4">
      <h2 className="oui:text-lg oui:font-semibold">User Directory Table</h2>
      <DataTable
        columns={userColumns}
        data={users}
        enableRowSelection
        searchPlaceholder="Search users..."
        variant="comfortable"
        rowActionsConfig={{
          onView: (row) => console.log('View user:', row.original),
          onEdit: (row) => console.log('Edit user:', row.original),
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'User directory table using the preset configuration.',
      },
    },
  },
};

export const AnalyticsDashboard: Story = {
  render: () => (
    <div className="oui:p-6 oui:space-y-4">
      <h2 className="oui:text-lg oui:font-semibold">Analytics Dashboard Table</h2>
      <DataTable
        columns={analyticsColumns}
        data={analytics}
        searchPlaceholder="Search data..."
        variant="compact"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Analytics dashboard table using the compact preset.',
      },
    },
  },
};

// Customization Examples
export const CustomToolbar: Story = {
  render: () => {
    const CustomToolbarComponent = ({ table, globalFilter, onGlobalFilterChange }: any) => (
      <div className="oui:flex oui:items-center oui:justify-between oui:p-4 oui:bg-muted oui:rounded-md">
        <div>
          <h3 className="oui:text-lg oui:font-semibold">Products</h3>
          <p className="oui:text-sm oui:text-muted-foreground">
            Manage your product inventory
          </p>
        </div>
        <div className="oui:flex oui:items-center oui:space-x-2">
          <Button size="sm">Add Product</Button>
          <Button size="sm" variant="outline">Export</Button>
        </div>
      </div>
    );

    return (
      <div className="oui:p-6 oui:space-y-4">
        <h2 className="oui:text-lg oui:font-semibold">DataTable with Custom Toolbar</h2>
        <DataTable
          columns={productColumns}
          data={products}
          enableSorting
          enablePagination
          toolbar={CustomToolbarComponent}
          showSearch={false}
          showViewOptions={false}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with a completely custom toolbar component.',
      },
    },
  },
};

export const VariantExamples: Story = {
  render: () => (
    <div className="oui:p-6 oui:space-y-8">
      <div className="oui:space-y-4">
        <h2 className="oui:text-lg oui:font-semibold">Default Variant</h2>
        <DataTable
          columns={simpleColumns}
          data={simpleData.slice(0, 3)}
          variant="default"
        />
      </div>

      <div className="oui:space-y-4">
        <h2 className="oui:text-lg oui:font-semibold">Compact Variant</h2>
        <DataTable
          columns={simpleColumns}
          data={simpleData.slice(0, 3)}
          variant="compact"
        />
      </div>

      <div className="oui:space-y-4">
        <h2 className="oui:text-lg oui:font-semibold">Comfortable Variant</h2>
        <DataTable
          columns={simpleColumns}
          data={simpleData.slice(0, 3)}
          variant="comfortable"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'DataTable variants with different spacing and typography.',
      },
    },
  },
};

// Showcase Story
export const Showcase: Story = {
  render: () => (
    <div className="oui:p-6 oui:space-y-8">
      <div>
        <h2 className="oui:text-xl oui:font-bold oui:mb-4">DataTable Component Showcase</h2>
        <p className="oui:text-muted-foreground oui:mb-6">
          A comprehensive data table component with sorting, filtering, pagination, selection, and more.
        </p>
      </div>

      <div className="oui:space-y-8">
        <div>
          <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Basic Table</h3>
          <DataTable
            columns={simpleColumns}
            data={simpleData}
          />
        </div>

        <div>
          <h3 className="oui:text-lg oui:font-semibold oui:mb-4">Enhanced Table with All Features</h3>
          <DataTable
            columns={taskColumns}
            data={tasks}
            enableSorting
            enableFiltering
            enablePagination
            enableRowSelection
            searchPlaceholder="Search tasks..."
            rowActionsConfig={{
              onView: (row) => console.log('View:', row.original),
              onEdit: (row) => console.log('Edit:', row.original),
              onDelete: (row) => console.log('Delete:', row.original),
            }}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete showcase of DataTable capabilities and features.',
      },
    },
  },
};