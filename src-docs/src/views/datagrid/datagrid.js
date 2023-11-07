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
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
  useRef,
} from 'react';
import { faker } from '@faker-js/faker';

import {
  OuiDataGrid,
  OuiLink,
  OuiFlexGroup,
  OuiFlexItem,
  OuiPopover,
  OuiPopoverTitle,
  OuiButtonIcon,
  OuiSpacer,
} from '../../../../src/components/';
const DataContext = createContext();

const raw_data = [];

for (let i = 1; i < 100; i++) {
  const email = faker.helpers.fake('{{internet.email}}');
  const name = faker.helpers.fake('{{person.lastName}}, {{person.firstName}}');
  const suffix = faker.helpers.fake('{{person.suffix}}');
  raw_data.push({
    name: {
      formatted: `${name} ${suffix}`,
      raw: name,
    },
    email: {
      formatted: (
        <OuiLink href="https://oui.opensearch.org/latest/">
          {faker.helpers.fake('{{internet.email}}')}
        </OuiLink>
      ),
      raw: email,
    },
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

const columns = [
  {
    id: 'name',
    displayAsText: 'Name',
    defaultSortDirection: 'asc',
    cellActions: [
      ({ rowIndex, columnId, Component }) => {
        const data = useContext(DataContext);
        return (
          <Component
            onClick={() => alert(`Hi ${data[rowIndex][columnId].raw}`)}
            iconType="heart"
            aria-label={`Say hi to ${data[rowIndex][columnId].raw}!`}>
            Say hi
          </Component>
        );
      },
      ({ rowIndex, columnId, Component }) => {
        const data = useContext(DataContext);
        return (
          <Component
            onClick={() => alert(`Bye ${data[rowIndex][columnId].raw}`)}
            iconType="moon"
            aria-label={`Say bye to ${data[rowIndex][columnId].raw}!`}>
            Say bye
          </Component>
        );
      },
    ],
  },
  {
    id: 'email',
    displayAsText: 'Email address',
    initialWidth: 130,
    cellActions: [
      ({ rowIndex, columnId, Component }) => {
        const data = useContext(DataContext);
        return (
          <Component
            onClick={() => alert(data[rowIndex][columnId].raw)}
            iconType="email"
            aria-label={`Send email to ${data[rowIndex][columnId].raw}`}>
            Send email
          </Component>
        );
      },
    ],
  },
  {
    id: 'location',
    displayAsText: 'Location',
  },
  {
    id: 'account',
    displayAsText: 'Account',
    actions: {
      showHide: { label: 'Custom hide label' },
      showMoveLeft: false,
      showMoveRight: false,
      additional: [
        {
          label: 'Custom action',
          onClick: () => {},
          iconType: 'cheer',
          size: 'xs',
          color: 'text',
        },
      ],
    },
    cellActions: [
      ({ rowIndex, columnId, Component, isExpanded }) => {
        const data = useContext(DataContext);
        const onClick = isExpanded
          ? () =>
              alert(`Sent money to ${data[rowIndex][columnId]} when expanded`)
          : () =>
              alert(
                `Sent money to ${data[rowIndex][columnId]} when not expanded`
              );
        return (
          <Component
            onClick={onClick}
            iconType="faceHappy"
            aria-label={`Send money to ${data[rowIndex][columnId]}`}>
            Send money
          </Component>
        );
      },
    ],
  },
  {
    id: 'date',
    displayAsText: 'Date',
    defaultSortDirection: 'desc',
  },
  {
    id: 'amount',
    displayAsText: 'Amount',
  },
  {
    id: 'phone',
    displayAsText: 'Phone',
    isSortable: false,
  },
  {
    id: 'version',
    displayAsText: 'Version',
    defaultSortDirection: 'desc',
    initialWidth: 70,
    isResizable: false,
    actions: false,
  },
];

const trailingControlColumns = [
  {
    id: 'actions',
    width: 40,
    headerCellRender: () => null,
    rowCellRender: function RowCellRender() {
      const [isPopoverOpen, setIsPopoverOpen] = useState(false);
      return (
        <div>
          <OuiPopover
            isOpen={isPopoverOpen}
            panelPaddingSize="s"
            anchorPosition="upCenter"
            button={
              <OuiButtonIcon
                aria-label="show actions"
                iconType="boxesHorizontal"
                color="text"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              />
            }
            closePopover={() => setIsPopoverOpen(false)}>
            <OuiPopoverTitle>Actions</OuiPopoverTitle>
            <div style={{ width: 150 }}>
              <button onClick={() => {}}>
                <OuiFlexGroup
                  alignItems="center"
                  component="span"
                  gutterSize="s">
                  <OuiFlexItem grow={false}>
                    <OuiButtonIcon
                      aria-label="Pin selected items"
                      iconType="pin"
                      color="text"
                    />
                  </OuiFlexItem>
                  <OuiFlexItem>Pin</OuiFlexItem>
                </OuiFlexGroup>
              </button>
              <OuiSpacer size="s" />
              <button onClick={() => {}}>
                <OuiFlexGroup
                  alignItems="center"
                  component="span"
                  gutterSize="s">
                  <OuiFlexItem grow={false}>
                    <OuiButtonIcon
                      aria-label="Delete selected items"
                      iconType="trash"
                      color="text"
                    />
                  </OuiFlexItem>
                  <OuiFlexItem>Delete</OuiFlexItem>
                </OuiFlexGroup>
              </button>
            </div>
          </OuiPopover>
        </div>
      );
    },
  },
];

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

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  ); // initialize to the full set of columns

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId, setCellProps }) => {
      const data = useContext(DataContext);
      useEffect(() => {
        if (columnId === 'amount') {
          if (data.hasOwnProperty(rowIndex)) {
            const numeric = parseFloat(
              data[rowIndex][columnId].match(/\d+\.\d+/)[0],
              10
            );
            setCellProps({
              style: {
                backgroundColor: `rgba(0, 255, 0, ${numeric * 0.0002})`,
              },
            });
          }
        }
      }, [rowIndex, columnId, setCellProps, data]);

      function getFormatted() {
        return data[rowIndex][columnId].formatted
          ? data[rowIndex][columnId].formatted
          : data[rowIndex][columnId];
      }

      return data.hasOwnProperty(rowIndex)
        ? getFormatted(rowIndex, columnId)
        : null;
    };
  }, []);

  const onColumnResize = useRef((eventData) => {
    console.log(eventData);
  });

  const onFullScreenChange = useRef((eventData) => {
    console.log('isFullScreen:', eventData);
  });

  return (
    <DataContext.Provider value={raw_data}>
      <OuiDataGrid
        aria-label="Data grid demo"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        trailingControlColumns={trailingControlColumns}
        rowCount={raw_data.length}
        renderCellValue={renderCellValue}
        inMemory={{ level: 'sorting' }}
        sorting={{ columns: sortingColumns, onSort }}
        pagination={{
          ...pagination,
          pageSizeOptions: [10, 50, 100],
          onChangeItemsPerPage: onChangeItemsPerPage,
          onChangePage: onChangePage,
        }}
        onColumnResize={onColumnResize.current}
        onFullScreenChange={onFullScreenChange.current}
      />
    </DataContext.Provider>
  );
};
