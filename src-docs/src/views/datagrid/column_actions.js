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

import React, { useState, useCallback } from 'react';
import { faker } from '@faker-js/faker';

import { OuiDataGrid, OuiAvatar } from '../../../../src/components/';

const columns = [
  {
    id: 'avatar',
    initialWidth: 40,
    isResizable: false,
    actions: false,
  },
  {
    id: 'name',
    initialWidth: 100,
    isSortable: true,
    actions: {
      showHide: false,
    },
  },
  {
    id: 'email',
    isSortable: true,
    actions: {
      additional: [
        {
          iconType: 'heart',
          label: 'Send Email',
          size: 'xs',
          onClick: () => {},
        },
      ],
    },
  },
  {
    id: 'city',
    isSortable: true,
    actions: {
      showHide: {
        iconType: 'cross',
        label: 'Remove column',
      },
    },
  },
  {
    id: 'country',
  },
  {
    id: 'account',
  },
];

const data = [];

for (let i = 1; i < 5; i++) {
  data.push({
    avatar: (
      <OuiAvatar
        size="s"
        name={faker.helpers.fake('{{person.lastName}}, {{person.firstName}}')}
      />
    ),
    name: faker.helpers.fake(
      '{{person.lastName}}, {{person.firstName}} {{person.suffix}}'
    ),
    email: faker.helpers.fake('{{internet.email}}'),
    city: faker.helpers.fake('{{location.city}}'),
    country: faker.helpers.fake('{{location.country}}'),
    account: faker.helpers.fake('{{finance.accountNumber}}'),
  });
}

export default () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  );

  const setPageIndex = useCallback(
    (pageIndex) => setPagination({ ...pagination, pageIndex }),
    [pagination, setPagination]
  );
  const setPageSize = useCallback(
    (pageSize) => setPagination({ ...pagination, pageSize, pageIndex: 0 }),
    [pagination, setPagination]
  );

  return (
    <OuiDataGrid
      aria-label="DataGrid demonstrating column sizing constraints"
      columns={columns}
      columnVisibility={{
        visibleColumns: visibleColumns,
        setVisibleColumns: setVisibleColumns,
      }}
      rowCount={data.length}
      renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
      pagination={{
        ...pagination,
        pageSizeOptions: [5, 10, 25],
        onChangeItemsPerPage: setPageSize,
        onChangePage: setPageIndex,
      }}
    />
  );
};
