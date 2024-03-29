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
  useCallback,
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { faker } from '@faker-js/faker';

import { OuiDataGrid, OuiText } from '../../../../src/components/';

const DataContext = createContext();

const columns = [
  {
    id: 'name',
    displayAsText: 'Name',
    defaultSortDirection: 'asc',
  },
  {
    id: 'text',
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
    data[rowIndex] = {
      name: faker.helpers.fake('{{lorem.text}}'),
      text: faker.helpers.fake('{{lorem.text}}'),
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

  const rowHeightsOptions = useMemo(
    () => ({
      defaultHeight: {
        lineCount: 2,
      },
      rowHeights: {
        1: {
          lineCount: 5,
        },
        4: 140,
        5: 80,
      },
    }),
    []
  );

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
      aria-label="Row height options demo"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={10000}
      height={400}
      renderCellValue={RenderCellValue}
      rowHeightsOptions={rowHeightsOptions}
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
      {grid}
    </DataContext.Provider>
  );
};
