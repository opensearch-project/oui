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
  createContext,
  useContext,
  useCallback,
  useReducer,
  useState,
  Fragment,
} from 'react';
import { faker } from '@faker-js/faker';

import {
  OuiDataGrid,
  OuiAvatar,
  OuiCheckbox,
  OuiButtonIcon,
  OuiPopover,
  OuiButtonEmpty,
  OuiFlexGroup,
  OuiFlexItem,
  OuiPopoverTitle,
  OuiSpacer,
  OuiPortal,
  OuiFlyout,
  OuiFlyoutBody,
  OuiFlyoutHeader,
  OuiTitle,
  OuiDescriptionList,
  OuiDescriptionListTitle,
  OuiDescriptionListDescription,
} from '../../../../src/components/';

const columns = [
  {
    id: 'avatar',
    initialWidth: 38,
    isExpandable: false,
    isResizable: false,
    headerCellRender: () => null,
  },
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

for (let i = 1; i < 500; i++) {
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

const SelectionContext = createContext();

const SelectionButton = () => {
  const [selectedRows] = useContext(SelectionContext);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  if (selectedRows.size > 0) {
    return (
      <OuiPopover
        isOpen={isPopoverOpen}
        anchorPosition="upCenter"
        panelPaddingSize="s"
        button={
          <OuiButtonEmpty
            size="xs"
            iconType="arrowDown"
            color="primary"
            className="ouiDataGrid__controlBtn"
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            {selectedRows.size} {selectedRows.size > 1 ? 'items' : 'item'}{' '}
            selected
          </OuiButtonEmpty>
        }
        closePopover={() => setIsPopoverOpen(false)}>
        <OuiPopoverTitle>
          {selectedRows.size} {selectedRows.size > 1 ? 'items' : 'item'}
        </OuiPopoverTitle>
        <div style={{ width: 150 }}>
          <button onClick={() => {}} component="span">
            <OuiFlexGroup
              responsive={false}
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
              <OuiFlexItem>Pin items</OuiFlexItem>
            </OuiFlexGroup>
          </button>
          <OuiSpacer size="s" />
          <button onClick={() => {}}>
            <OuiFlexGroup
              responsive={false}
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
              <OuiFlexItem>Delete items</OuiFlexItem>
            </OuiFlexGroup>
          </button>
        </div>
      </OuiPopover>
    );
  } else {
    return null;
  }
};

const SelectionHeaderCell = () => {
  const [selectedRows, updateSelectedRows] = useContext(SelectionContext);
  const isIndeterminate =
    selectedRows.size > 0 && selectedRows.size < data.length;
  return (
    <OuiCheckbox
      id="selection-toggle"
      aria-label="Select all rows"
      indeterminate={isIndeterminate}
      checked={selectedRows.size > 0}
      onChange={(e) => {
        if (isIndeterminate) {
          // clear selection
          updateSelectedRows({ action: 'clear' });
        } else {
          if (e.target.checked) {
            // select everything
            updateSelectedRows({ action: 'selectAll' });
          } else {
            // clear selection
            updateSelectedRows({ action: 'clear' });
          }
        }
      }}
    />
  );
};

const SelectionRowCell = ({ rowIndex }) => {
  const [selectedRows, updateSelectedRows] = useContext(SelectionContext);
  const isChecked = selectedRows.has(rowIndex);

  return (
    <div>
      <OuiCheckbox
        id={`${rowIndex}`}
        aria-label={`Select row ${rowIndex}, ${data[rowIndex].name}`}
        checked={isChecked}
        onChange={(e) => {
          if (e.target.checked) {
            updateSelectedRows({ action: 'add', rowIndex });
          } else {
            updateSelectedRows({ action: 'delete', rowIndex });
          }
        }}
      />
    </div>
  );
};

const FlyoutRowCell = (rowIndex) => {
  let flyout;
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  if (isFlyoutOpen) {
    const rowData = data[rowIndex.rowIndex];

    const details = Object.entries(rowData).map(([key, value]) => {
      return (
        <Fragment>
          <OuiDescriptionListTitle>{key}</OuiDescriptionListTitle>
          <OuiDescriptionListDescription>{value}</OuiDescriptionListDescription>
        </Fragment>
      );
    });

    flyout = (
      <OuiPortal>
        <OuiFlyout ownFocus onClose={() => setIsFlyoutOpen(!isFlyoutOpen)}>
          <OuiFlyoutHeader hasBorder>
            <OuiTitle size="m">
              <h2>{rowData.name}</h2>
            </OuiTitle>
          </OuiFlyoutHeader>
          <OuiFlyoutBody>
            <OuiDescriptionList>{details}</OuiDescriptionList>
          </OuiFlyoutBody>
        </OuiFlyout>
      </OuiPortal>
    );
  }

  return (
    <Fragment>
      <OuiButtonIcon
        color="text"
        iconType="eye"
        iconSize="s"
        aria-label="View details"
        onClick={() => setIsFlyoutOpen(!isFlyoutOpen)}
      />
      {flyout}
    </Fragment>
  );
};

const leadingControlColumns = [
  {
    id: 'selection',
    width: 32,
    headerCellRender: SelectionHeaderCell,
    rowCellRender: SelectionRowCell,
  },
  {
    id: 'View',
    width: 36,
    headerCellRender: () => null,
    rowCellRender: FlyoutRowCell,
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
            anchorPosition="upCenter"
            panelPaddingSize="s"
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
              <button onClick={() => {}} component="span">
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

export default function DataGrid() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });
  const setPageIndex = useCallback(
    (pageIndex) => setPagination({ ...pagination, pageIndex }),
    [pagination, setPagination]
  );
  const setPageSize = useCallback(
    (pageSize) => setPagination({ ...pagination, pageSize, pageIndex: 0 }),
    [pagination, setPagination]
  );

  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  );

  const rowSelection = useReducer((rowSelection, { action, rowIndex }) => {
    if (action === 'add') {
      const nextRowSelection = new Set(rowSelection);
      nextRowSelection.add(rowIndex);
      return nextRowSelection;
    } else if (action === 'delete') {
      const nextRowSelection = new Set(rowSelection);
      nextRowSelection.delete(rowIndex);
      return nextRowSelection;
    } else if (action === 'clear') {
      return new Set();
    } else if (action === 'selectAll') {
      return new Set(data.map((_, index) => index));
    }
    return rowSelection;
  }, new Set());

  const renderCellValue = useCallback(
    ({ rowIndex, columnId }) => data[rowIndex][columnId],
    []
  );

  return (
    <SelectionContext.Provider value={rowSelection}>
      <div>
        <OuiDataGrid
          aria-label="Top OUI contributors"
          leadingControlColumns={leadingControlColumns}
          trailingControlColumns={trailingControlColumns}
          columns={columns}
          columnVisibility={{
            visibleColumns,
            setVisibleColumns,
          }}
          rowCount={data.length}
          renderCellValue={renderCellValue}
          pagination={{
            ...pagination,
            pageSizeOptions: [5, 15, 25],
            onChangeItemsPerPage: setPageSize,
            onChangePage: setPageIndex,
          }}
          toolbarVisibility={{
            additionalControls: <SelectionButton />,
          }}
        />
      </div>
    </SelectionContext.Provider>
  );
}
