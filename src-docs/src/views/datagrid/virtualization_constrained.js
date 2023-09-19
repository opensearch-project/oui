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

import React, {
  Fragment,
  useCallback,
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { faker } from '@faker-js/faker';

import {
  OuiDataGrid,
  OuiLink,
  OuiText,
  OuiResizableContainer,
} from '../../../../src/components/';

const DataContext = createContext();

const columns = [
  {
    id: 'name',
    displayAsText: 'Name',
    defaultSortDirection: 'asc',
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
    defaultSortDirection: 'desc',
  },
  {
    id: 'amount',
  },
  {
    id: 'phone',
    isSortable: false,
  },
  {
    id: 'version',
    defaultSortDirection: 'desc',
    initialWidth: 65,
    isResizable: false,
  },
];

// it is expensive to compute 10000 rows of fake data
// instead of loading up front, generate entries on the fly
const raw_data = [];
function RenderCellValue({ rowIndex, columnId }) {
  const { data, adjustMountedCellCount } = useContext(DataContext);

  useEffect(() => {
    adjustMountedCellCount(1);
    return () => adjustMountedCellCount(-1);
  }, [adjustMountedCellCount]);

  if (data[rowIndex] == null) {
    const email = faker.helpers.fake('{{internet.email}}');
    const name = faker.helpers.fake(
      '{{person.lastName}}, {{person.firstName}}'
    );
    const suffix = faker.helpers.fake('{{person.suffix}}');
    data[rowIndex] = {
      name: `${name} ${suffix}`,
      email: (
        <OuiLink href="https://oui.opensearch.org/latest/">{email}</OuiLink>
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
    };
  }

  return data[rowIndex][columnId];
}

export default () => {
  // ** Pagination config
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 });
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

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  ); // initialize to the full set of columns

  const [mountedCellCount, setMountedCellCount] = useState(0);

  const dataContext = useMemo(
    () => ({
      data: raw_data,
      adjustMountedCellCount: (adjustment) =>
        setMountedCellCount(
          (mountedCellCount) => mountedCellCount + adjustment
        ),
    }),
    []
  );

  const grid = (
    <OuiDataGrid
      aria-label="Virtualized data grid demo"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={10000}
      renderCellValue={RenderCellValue}
      pagination={{
        ...pagination,
        pageSizeOptions: [50, 250, 1000],
        onChangeItemsPerPage: onChangeItemsPerPage,
        onChangePage: onChangePage,
      }}
    />
  );

  return (
    <DataContext.Provider value={dataContext}>
      <OuiText>
        <p>There are {mountedCellCount} rendered cells</p>
      </OuiText>

      <OuiResizableContainer style={{ height: '400px' }}>
        {(OuiResizablePanel, OuiResizableButton) => (
          <>
            <OuiResizablePanel initialSize={50} minSize="30%">
              {grid}
            </OuiResizablePanel>

            <OuiResizableButton />

            <OuiResizablePanel initialSize={50} minSize="200px">
              <OuiText>
                <p>
                  This panel is constraining the datagrid. You can resize it
                  using the drag handle and <strong>OuiDataGrid</strong>{' '}
                  automatically detects the changes to its container size.
                </p>
              </OuiText>
            </OuiResizablePanel>
          </>
        )}
      </OuiResizableContainer>
    </DataContext.Provider>
  );
};
