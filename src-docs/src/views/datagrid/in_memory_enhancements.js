/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';

import { OuiDataGrid, OuiLink } from '../../../../src/components/';

const columns = [
  {
    id: 'name',
  },
  {
    id: 'email',
  },
  {
    id: 'location',
  },
  {
    id: 'account',
  },
  {
    id: 'date',
  },
  {
    id: 'amount',
  },
  {
    id: 'phone',
  },
  {
    id: 'version',
  },
];

const raw_data = [];

for (let i = 1; i < 100; i++) {
  raw_data.push({
    name: faker.helpers.fake(
      '{{name.lastName}}, {{name.firstName}} {{name.suffix}}'
    ),
    email: (
      <OuiLink href="">{faker.helpers.fake('{{internet.email}}')}</OuiLink>
    ),
    location: (
      <Fragment>
        {`${faker.helpers.fake('{{address.city}}')}, `}
        <OuiLink href="https://google.com">
          {faker.helpers.fake('{{address.country}}')}
        </OuiLink>
      </Fragment>
    ),
    date: faker.helpers.fake('{{date.past}}'),
    account: faker.helpers.fake('{{finance.account}}'),
    amount: faker.helpers.fake('${{commerce.price}}'),
    phone: faker.helpers.fake('{{phone.number}}'),
    version: faker.helpers.fake('{{system.semver}}'),
  });
}

export default () => {
  // ** Pagination config
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const onChangeItemsPerPage = useCallback(
    (pageSize) =>
      setPagination((pagination) => ({
        ...pagination,
        pageSize,
        pageIndex: 0,
      })),
    [setPagination]
  );
  const onChangePage = useCallback(
    (pageIndex) =>
      setPagination((pagination) => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  // ** Sorting config
  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    (sortingColumns) => {
      setSortingColumns(sortingColumns);
    },
    [setSortingColumns]
  );

  // Sort data
  let data = useMemo(() => {
    // the grid itself is responsible for sorting if inMemory is `sorting`

    return [...raw_data].sort((a, b) => {
      for (let i = 0; i < sortingColumns.length; i++) {
        const column = sortingColumns[i];
        const aValue = a[column.id];
        const bValue = b[column.id];

        if (aValue < bValue) return column.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return column.direction === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }, [sortingColumns]);

  // Pagination
  data = useMemo(() => {
    const rowStart = pagination.pageIndex * pagination.pageSize;
    const rowEnd = Math.min(rowStart + pagination.pageSize, data.length);
    return data.slice(rowStart, rowEnd);
  }, [data, pagination]);

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  ); // initialize to the full set of columns

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId }) => {
      // Because inMemory is not set for pagination, we need to manage it
      // The row index must be adjusted as `data` has already been pruned to the page size
      const adjustedRowIndex =
        rowIndex - pagination.pageIndex * pagination.pageSize;

      return data.hasOwnProperty(adjustedRowIndex)
        ? data[adjustedRowIndex][columnId]
        : null;
    };
  }, [data, pagination.pageIndex, pagination.pageSize]);

  return (
    <div>
      <OuiDataGrid
        aria-label="Data grid demo"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        rowCount={raw_data.length}
        renderCellValue={renderCellValue}
        inMemory={{ level: 'enhancements' }}
        sorting={{ columns: sortingColumns, onSort }}
        pagination={{
          ...pagination,
          pageSizeOptions: [10, 50, 100],
          onChangeItemsPerPage: onChangeItemsPerPage,
          onChangePage: onChangePage,
        }}
      />
    </div>
  );
};
