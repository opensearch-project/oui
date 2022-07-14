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
import { fake } from 'faker';

import { OuiDataGrid, OuiPanel, OuiLink } from '../../../../src/components/';

const columns = [
  {
    id: 'name',
  },
  {
    id: 'email',
  },
  {
    id: 'city',
  },
  {
    id: 'country',
  },
  {
    id: 'account',
  },
];

const data = [];

for (let i = 1; i < 20; i++) {
  data.push({
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    email: fake('{{internet.email}}'),
    city: (
      <OuiLink href="http://google.com">{fake('{{address.city}}')}</OuiLink>
    ),
    country: fake('{{address.country}}'),
    account: fake('{{finance.account}}'),
  });
}

export default () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

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
    <OuiPanel style={{ width: 400, paddingBottom: 4 }} paddingSize="none">
      <div style={{ height: 300 }}>
        <OuiDataGrid
          aria-label="Container constrained data grid demo"
          columns={columns}
          columnVisibility={{
            visibleColumns: visibleColumns,
            setVisibleColumns: setVisibleColumns,
          }}
          rowCount={data.length}
          gridStyle={{
            border: 'horizontal',
            header: 'underline',
          }}
          renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
          pagination={{
            ...pagination,
            pageSizeOptions: [5, 10, 25],
            onChangeItemsPerPage: setPageSize,
            onChangePage: setPageIndex,
          }}
        />
      </div>
    </OuiPanel>
  );
};
