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
      '{{person.lastName}}, {{person.firstName}} {{person.suffix}}'
    ),
    email: (
      <OuiLink href="https://oui.opensearch.org/latest/">
        {faker.helpers.fake('{{internet.email}}')}
      </OuiLink>
    ),
    location: (
      <Fragment>
        {`${faker.helpers.fake('{{location.city}}')}, `}
        <OuiLink href="https://oui.opensearch.org/latest/">
          {faker.helpers.fake('{{location.country}}')}
        </OuiLink>
      </Fragment>
    ),
    date: faker.helpers.fake('{{date.past}}'),
    account: faker.helpers.fake('{{finance.accountNumber}}'),
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

  // Because inMemory's level is set to `pagination` we still need to sort the data, but no longer need to chunk it for pagination
  const data = useMemo(() => {
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

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  ); // initialize to the full set of columns

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId }) => {
      return data.hasOwnProperty(rowIndex) ? data[rowIndex][columnId] : null;
    };
  }, [data]);

  return (
    <OuiDataGrid
      aria-label="inMemory level set to pagination data grid demo"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={raw_data.length}
      renderCellValue={renderCellValue}
      inMemory={{ level: 'pagination' }}
      sorting={{ columns: sortingColumns, onSort }}
      pagination={{
        ...pagination,
        pageSizeOptions: [10, 50, 100],
        onChangeItemsPerPage: onChangeItemsPerPage,
        onChangePage: onChangePage,
      }}
    />
  );
};
