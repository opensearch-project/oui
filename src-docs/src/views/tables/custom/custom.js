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

import React, { Component } from 'react';

import {
  OuiBadge,
  OuiHealth,
  OuiButton,
  OuiButtonIcon,
  OuiCheckbox,
  OuiContextMenuItem,
  OuiContextMenuPanel,
  OuiFieldSearch,
  OuiFlexGroup,
  OuiFlexItem,
  OuiIcon,
  OuiLink,
  OuiPopover,
  OuiSpacer,
  OuiTable,
  OuiTableBody,
  OuiTableFooter,
  OuiTableFooterCell,
  OuiTableHeader,
  OuiTableHeaderCell,
  OuiTableHeaderCellCheckbox,
  OuiTablePagination,
  OuiTableRow,
  OuiTableRowCell,
  OuiTableRowCellCheckbox,
  OuiTableSortMobile,
  OuiTableHeaderMobile,
} from '../../../../../src/components';

import {
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  Pager,
  SortableProperties,
} from '../../../../../src/services';

import { isFunction } from '../../../../../src/services/predicate';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemIdToSelectedMap: {},
      itemIdToOpenActionsPopoverMap: {},
      sortedColumn: 'title',
      itemsPerPage: 10,
    };

    this.items = [
      {
        id: 0,
        title:
          'A very long line which will wrap on narrower screens and NOT become truncated and replaced by an ellipsis',
        type: 'user',
        dateCreated: 'Tue Dec 28 2016',
        magnitude: 1,
        health: <OuiBadge color="success">Healthy</OuiBadge>,
      },
      {
        id: 1,
        title: {
          value:
            'A very long line which will not wrap on narrower screens and instead will become truncated and replaced by an ellipsis',
          truncateText: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 01 2016',
        magnitude: 1,
        health: <OuiBadge color="success">Healthy</OuiBadge>,
      },
      {
        id: 2,
        title: (
          <span>
            A very long line in an ELEMENT which will wrap on narrower screens
            and NOT become truncated and replaced by an ellipsis
          </span>
        ),
        type: 'user',
        dateCreated: (
          <span>
            Tue Dec 01 2016 &nbsp; <OuiBadge color="accent">New!</OuiBadge>
          </span>
        ),
        magnitude: 10,
        health: <OuiBadge color="warning">Warning</OuiBadge>,
      },
      {
        id: 3,
        title: {
          value: (
            <span>
              A very long line in an ELEMENT which will not wrap on narrower
              screens and instead will become truncated and replaced by an
              ellipsis
            </span>
          ),
          truncateText: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 16 2016',
        magnitude: 100,
        health: <OuiBadge color="success">Healthy</OuiBadge>,
      },
      {
        id: 4,
        title: {
          value: 'Dog',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 13 2016',
        magnitude: 1000,
        health: <OuiBadge color="warning">Warning</OuiBadge>,
      },
      {
        id: 5,
        title: {
          value: 'Dragon',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <OuiBadge color="success">Healthy</OuiBadge>,
      },
      {
        id: 6,
        title: {
          value: 'Bear',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <OuiBadge color="danger">Danger</OuiBadge>,
      },
      {
        id: 7,
        title: {
          value: 'Dinosaur',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <OuiBadge color="warning">Warning</OuiBadge>,
      },
      {
        id: 8,
        title: {
          value: 'Spider',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <OuiBadge color="warning">Warning</OuiBadge>,
      },
      {
        id: 9,
        title: {
          value: 'Bugbear',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <OuiBadge color="success">Healthy</OuiBadge>,
      },
      {
        id: 10,
        title: {
          value: 'Bear',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <OuiBadge color="danger">Danger</OuiBadge>,
      },
      {
        id: 11,
        title: {
          value: 'Dinosaur',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <OuiBadge color="warning">Warning</OuiBadge>,
      },
      {
        id: 12,
        title: {
          value: 'Spider',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <OuiHealth color="success">Healthy</OuiHealth>,
      },
      {
        id: 13,
        title: {
          value: 'Bugbear',
          isLink: true,
        },
        type: 'user',
        dateCreated: 'Tue Dec 11 2016',
        magnitude: 10000,
        health: <OuiBadge color="danger">Danger</OuiBadge>,
      },
    ];

    this.sortableProperties = new SortableProperties(
      [
        {
          name: 'title',
          getValue: (item) => item.title.toLowerCase(),
          isAscending: true,
        },
        {
          name: 'dateCreated',
          getValue: (item) => item.dateCreated.toLowerCase(),
          isAscending: true,
        },
        {
          name: 'magnitude',
          getValue: (item) => item.magnitude.toLowerCase(),
          isAscending: true,
        },
      ],
      this.state.sortedColumn
    );

    this.columns = [
      {
        id: 'checkbox',
        isCheckbox: true,
        textOnly: false,
        width: '32px',
      },
      {
        id: 'type',
        label: '',
        alignment: LEFT_ALIGNMENT,
        width: '24px',
        cellProvider: (cell) => <OuiIcon type={cell} size="m" />,
        mobileOptions: {
          show: false,
        },
      },
      {
        id: 'title',
        label: 'Title',
        footer: <em>Title</em>,
        alignment: LEFT_ALIGNMENT,
        isSortable: true,
        mobileOptions: {
          show: false,
        },
      },
      {
        id: 'title_type',
        label: 'Title',
        mobileOptions: {
          only: true,
          header: false,
          enlarge: true,
          fullWidth: true,
        },
        render: (title, item) => (
          <span>
            <OuiIcon
              type={item.type}
              size="m"
              style={{ verticalAlign: 'text-top' }}
            />{' '}
            {title}
          </span>
        ),
      },
      {
        id: 'health',
        label: 'Health',
        footer: '',
        alignment: LEFT_ALIGNMENT,
      },
      {
        id: 'dateCreated',
        label: 'Date created',
        footer: 'Date created',
        alignment: LEFT_ALIGNMENT,
        isSortable: true,
      },
      {
        id: 'magnitude',
        label: 'Orders of magnitude',
        footer: ({ items, pagination }) => {
          const { pageIndex, pageSize } = pagination;
          const startIndex = pageIndex * pageSize;
          const pageOfItems = items.slice(
            startIndex,
            Math.min(startIndex + pageSize, items.length)
          );
          return (
            <strong>
              Total: {pageOfItems.reduce((acc, cur) => acc + cur.magnitude, 0)}
            </strong>
          );
        },
        alignment: RIGHT_ALIGNMENT,
        isSortable: true,
      },
      {
        id: 'actions',
        label: '',
        alignment: RIGHT_ALIGNMENT,
        isActionsPopover: true,
        width: '32px',
      },
    ];

    this.pager = new Pager(this.items.length, this.state.itemsPerPage);
    this.state.firstItemIndex = this.pager.getFirstItemIndex();
    this.state.lastItemIndex = this.pager.getLastItemIndex();
  }

  onChangeItemsPerPage = (itemsPerPage) => {
    this.pager.setItemsPerPage(itemsPerPage);
    this.setState({
      itemsPerPage,
      firstItemIndex: this.pager.getFirstItemIndex(),
      lastItemIndex: this.pager.getLastItemIndex(),
    });
  };

  onChangePage = (pageIndex) => {
    this.pager.goToPageIndex(pageIndex);
    this.setState({
      firstItemIndex: this.pager.getFirstItemIndex(),
      lastItemIndex: this.pager.getLastItemIndex(),
    });
  };

  onSort = (prop) => {
    this.sortableProperties.sortOn(prop);

    this.setState({
      sortedColumn: prop,
    });
  };

  toggleItem = (itemId) => {
    this.setState((previousState) => {
      const newItemIdToSelectedMap = {
        ...previousState.itemIdToSelectedMap,
        [itemId]: !previousState.itemIdToSelectedMap[itemId],
      };

      return {
        itemIdToSelectedMap: newItemIdToSelectedMap,
      };
    });
  };

  toggleAll = () => {
    const allSelected = this.areAllItemsSelected();
    const newItemIdToSelectedMap = {};
    this.items.forEach(
      (item) => (newItemIdToSelectedMap[item.id] = !allSelected)
    );

    this.setState({
      itemIdToSelectedMap: newItemIdToSelectedMap,
    });
  };

  isItemSelected = (itemId) => {
    return this.state.itemIdToSelectedMap[itemId];
  };

  areAllItemsSelected = () => {
    const indexOfUnselectedItem = this.items.findIndex(
      (item) => !this.isItemSelected(item.id)
    );
    return indexOfUnselectedItem === -1;
  };

  areAnyRowsSelected = () => {
    return (
      Object.keys(this.state.itemIdToSelectedMap).findIndex((id) => {
        return this.state.itemIdToSelectedMap[id];
      }) !== -1
    );
  };

  togglePopover = (itemId) => {
    this.setState((previousState) => {
      const newItemIdToOpenActionsPopoverMap = {
        ...previousState.itemIdToOpenActionsPopoverMap,
        [itemId]: !previousState.itemIdToOpenActionsPopoverMap[itemId],
      };

      return {
        itemIdToOpenActionsPopoverMap: newItemIdToOpenActionsPopoverMap,
      };
    });
  };

  closePopover = (itemId) => {
    // only update the state if this item's popover is open
    if (this.isPopoverOpen(itemId)) {
      this.setState((previousState) => {
        const newItemIdToOpenActionsPopoverMap = {
          ...previousState.itemIdToOpenActionsPopoverMap,
          [itemId]: false,
        };

        return {
          itemIdToOpenActionsPopoverMap: newItemIdToOpenActionsPopoverMap,
        };
      });
    }
  };

  isPopoverOpen = (itemId) => {
    return this.state.itemIdToOpenActionsPopoverMap[itemId];
  };

  renderSelectAll = (mobile) => {
    return (
      <OuiCheckbox
        id="selectAllCheckbox"
        label={mobile ? 'Select all' : null}
        checked={this.areAllItemsSelected()}
        onChange={this.toggleAll.bind(this)}
        type={mobile ? null : 'inList'}
      />
    );
  };

  getTableMobileSortItems() {
    const items = [];
    this.columns.forEach((column) => {
      if (column.isCheckbox || !column.isSortable) {
        return;
      }
      items.push({
        name: column.label,
        key: column.id,
        onSort: this.onSort.bind(this, column.id),
        isSorted: this.state.sortedColumn === column.id,
        isSortAscending: this.sortableProperties.isAscendingByName(column.id),
      });
    });
    return items.length ? items : null;
  }

  renderHeaderCells() {
    const headers = [];

    this.columns.forEach((column, columnIndex) => {
      if (column.isCheckbox) {
        headers.push(
          <OuiTableHeaderCellCheckbox key={column.id} width={column.width}>
            {this.renderSelectAll()}
          </OuiTableHeaderCellCheckbox>
        );
      } else {
        headers.push(
          <OuiTableHeaderCell
            key={column.id}
            align={this.columns[columnIndex].alignment}
            width={column.width}
            onSort={
              column.isSortable ? this.onSort.bind(this, column.id) : undefined
            }
            isSorted={this.state.sortedColumn === column.id}
            isSortAscending={this.sortableProperties.isAscendingByName(
              column.id
            )}
            mobileOptions={column.mobileOptions}>
            {column.label}
          </OuiTableHeaderCell>
        );
      }
    });
    return headers.length ? headers : null;
  }

  renderRows() {
    const renderRow = (item) => {
      const cells = this.columns.map((column) => {
        const cell = item[column.id];

        let child;

        if (column.isCheckbox) {
          return (
            <OuiTableRowCellCheckbox key={column.id}>
              <OuiCheckbox
                id={`${item.id}-checkbox`}
                checked={this.isItemSelected(item.id)}
                onChange={this.toggleItem.bind(this, item.id)}
                type="inList"
              />
            </OuiTableRowCellCheckbox>
          );
        }

        if (column.isActionsPopover) {
          return (
            <OuiTableRowCell
              key={column.id}
              header={column.label}
              textOnly={false}
              hasActions={true}
              align="right">
              <OuiPopover
                id={`${item.id}-actions`}
                button={
                  <OuiButtonIcon
                    aria-label="Actions"
                    iconType="gear"
                    size="s"
                    color="text"
                    onClick={() => this.togglePopover(item.id)}
                  />
                }
                isOpen={this.isPopoverOpen(item.id)}
                closePopover={() => this.closePopover(item.id)}
                panelPaddingSize="none"
                anchorPosition="leftCenter">
                <OuiContextMenuPanel
                  items={[
                    <OuiContextMenuItem
                      key="A"
                      icon="pencil"
                      onClick={() => {
                        this.closePopover(item.id);
                      }}>
                      Edit
                    </OuiContextMenuItem>,
                    <OuiContextMenuItem
                      key="B"
                      icon="share"
                      onClick={() => {
                        this.closePopover(item.id);
                      }}>
                      Share
                    </OuiContextMenuItem>,
                    <OuiContextMenuItem
                      key="C"
                      icon="trash"
                      onClick={() => {
                        this.closePopover(item.id);
                      }}>
                      Delete
                    </OuiContextMenuItem>,
                  ]}
                />
              </OuiPopover>
            </OuiTableRowCell>
          );
        }

        if (column.render) {
          const titleText = item.title.truncateText
            ? item.title.value
            : item.title;
          const title = item.title.isLink ? (
            <OuiLink href="">{item.title.value}</OuiLink>
          ) : (
            titleText
          );
          child = column.render(title, item);
        } else if (column.cellProvider) {
          child = column.cellProvider(cell);
        } else if (cell.isLink) {
          child = <OuiLink href="">{cell.value}</OuiLink>;
        } else if (cell.truncateText) {
          child = cell.value;
        } else {
          child = cell;
        }

        return (
          <OuiTableRowCell
            key={column.id}
            align={column.alignment}
            truncateText={cell && cell.truncateText}
            textOnly={cell ? cell.textOnly : true}
            mobileOptions={{
              header: column.label,
              ...column.mobileOptions,
            }}>
            {child}
          </OuiTableRowCell>
        );
      });

      return (
        <OuiTableRow
          key={item.id}
          isSelected={this.isItemSelected(item.id)}
          isSelectable={true}
          hasActions={true}>
          {cells}
        </OuiTableRow>
      );
    };

    const rows = [];

    for (
      let itemIndex = this.state.firstItemIndex;
      itemIndex <= this.state.lastItemIndex;
      itemIndex++
    ) {
      const item = this.items[itemIndex];
      rows.push(renderRow(item));
    }

    return rows;
  }

  renderFooterCells() {
    const footers = [];

    const items = this.items;
    const pagination = {
      pageIndex: this.pager.getCurrentPageIndex(),
      pageSize: this.state.itemsPerPage,
      totalItemCount: this.pager.getTotalPages(),
    };

    this.columns.forEach((column) => {
      const footer = this.getColumnFooter(column, { items, pagination });
      if (column.mobileOptions && column.mobileOptions.only) {
        return; // exclude columns that only exist for mobile headers
      }

      if (footer) {
        footers.push(
          <OuiTableFooterCell
            key={`footer_${column.id}`}
            align={column.alignment}>
            {footer}
          </OuiTableFooterCell>
        );
      } else {
        footers.push(
          <OuiTableFooterCell
            key={`footer_empty_${footers.length - 1}`}
            align={column.alignment}>
            {undefined}
          </OuiTableFooterCell>
        );
      }
    });
    return footers;
  }

  getColumnFooter = (column, { items, pagination }) => {
    if (column.footer === null) {
      return null;
    }

    if (column.footer) {
      if (isFunction(column.footer)) {
        return column.footer({ items, pagination });
      }
      return column.footer;
    }

    return undefined;
  };

  render() {
    let optionalActionButtons;
    const exampleId = 'example-id';

    if (this.areAnyRowsSelected() > 0) {
      optionalActionButtons = (
        <OuiFlexItem grow={false}>
          <OuiButton color="danger">Delete selected</OuiButton>
        </OuiFlexItem>
      );
    }

    return (
      <div>
        <OuiFlexGroup gutterSize="m">
          {optionalActionButtons}

          <OuiFlexItem>
            <OuiFieldSearch fullWidth placeholder="Search..." />
          </OuiFlexItem>
        </OuiFlexGroup>

        <OuiSpacer size="m" />

        <OuiTableHeaderMobile>
          <OuiFlexGroup
            responsive={false}
            justifyContent="spaceBetween"
            alignItems="baseline">
            <OuiFlexItem grow={false}>{this.renderSelectAll(true)}</OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiTableSortMobile items={this.getTableMobileSortItems()} />
            </OuiFlexItem>
          </OuiFlexGroup>
        </OuiTableHeaderMobile>

        <OuiTable id={exampleId}>
          <OuiTableHeader>{this.renderHeaderCells()}</OuiTableHeader>

          <OuiTableBody>{this.renderRows()}</OuiTableBody>

          <OuiTableFooter>{this.renderFooterCells()}</OuiTableFooter>
        </OuiTable>

        <OuiSpacer size="m" />

        <OuiTablePagination
          aria-controls={exampleId}
          activePage={this.pager.getCurrentPageIndex()}
          itemsPerPage={this.state.itemsPerPage}
          itemsPerPageOptions={[5, 10, 20]}
          pageCount={this.pager.getTotalPages()}
          onChangeItemsPerPage={this.onChangeItemsPerPage}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}
