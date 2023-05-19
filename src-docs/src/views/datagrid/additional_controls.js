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

import React, { useState, useCallback, Fragment } from 'react';
import { faker } from '@faker-js/faker';

import {
  OuiDataGrid,
  OuiButtonEmpty,
  OuiLink,
} from '../../../../src/components/';

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
    name: faker.helpers.fake(
      '{{person.lastName}}, {{person.firstName}} {{person.suffix}}'
    ),
    email: faker.helpers.fake('{{internet.email}}'),
    city: (
      <OuiLink href="http://google.com">
        {faker.helpers.fake('{{location.city}}')}
      </OuiLink>
    ),
    country: faker.helpers.fake('{{location.country}}'),
    account: faker.helpers.fake('{{finance.accountNumber}}'),
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
    <OuiDataGrid
      aria-label="Data grid demo with additional controls"
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
      toolbarVisibility={{
        additionalControls: (
          <Fragment>
            <OuiButtonEmpty
              size="xs"
              iconType="bell"
              color="primary"
              className="ouiDataGrid__controlBtn"
              onClick={() => {}}>
              New button
            </OuiButtonEmpty>
            <OuiButtonEmpty
              size="xs"
              iconType="branch"
              color="danger"
              className="ouiDataGrid__controlBtn"
              onClick={() => {}}>
              Another button
            </OuiButtonEmpty>
          </Fragment>
        ),
      }}
    />
  );
};
