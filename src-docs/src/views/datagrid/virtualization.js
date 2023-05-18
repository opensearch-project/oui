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
  OuiSpacer,
  OuiButtonGroup,
} from '../../../../src/components/';
import { OuiFormRow } from '../../../../src/components/form/form_row';

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
    const name = faker.helpers.fake('{{name.lastName}}, {{name.firstName}}');
    const suffix = faker.helpers.fake('{{name.suffix}}');
    data[rowIndex] = {
      name: `${name} ${suffix}`,
      email: <OuiLink href="">{email}</OuiLink>,
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
    };
  }

  return data.hasOwnProperty(rowIndex) ? data[rowIndex][columnId] : null;
}

const dimensionSizes = {
  'height-300px': 300,
  'height-600px': 600,

  'width-200px': 200,
  'width-50%': '50%',
  'width-unconstrained': undefined,
};

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

  const [height, setHeight] = useState('height-300px');
  const [width, setWidth] = useState('width-50%');

  return (
    <>
      <OuiFormRow label="Height">
        <OuiButtonGroup
          legend="Set a height for the following grid"
          options={[
            { id: 'height-300px', label: '300px' },
            { id: 'height-600px', label: '600px' },
            { id: 'height-unconstrained', label: 'Unconstrained' },
          ]}
          idSelected={height}
          onChange={setHeight}
        />
      </OuiFormRow>

      <OuiFormRow label="Width">
        <OuiButtonGroup
          legend="Set a width for the following grid"
          options={[
            { id: 'width-200px', label: '200px' },
            { id: 'width-50%', label: '50%' },
            { id: 'width-unconstrained', label: 'Unconstrained' },
          ]}
          idSelected={width}
          onChange={setWidth}
        />
      </OuiFormRow>

      <OuiSpacer />

      <OuiText>
        <p>There are {mountedCellCount} rendered cells</p>
      </OuiText>

      <DataContext.Provider value={dataContext}>
        <OuiDataGrid
          // completely reset the grid when switching between controlled & uncontrolled heights
          // otherwise, going from constrained->unconstrained is ignored.
          // this is for example only, don't switch between controlled & uncontrolled heights
          key={
            height === 'height-unconstrained' ? 'unconstrained' : 'constrained'
          }
          aria-label="Virtualized data grid demo"
          height={dimensionSizes[height]}
          width={dimensionSizes[width]}
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
      </DataContext.Provider>
    </>
  );
};
