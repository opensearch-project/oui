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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  Component,
  Fragment,
  HTMLAttributes,
  ReactNode,
  ReactElement,
} from 'react';
import classNames from 'classnames';
import moment from 'moment';
import {
  Direction,
  formatAuto,
  formatBoolean,
  formatDate,
  formatNumber,
  formatText,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  SortDirection,
} from '../../services';
import { CommonProps } from '../common';
import { isFunction } from '../../services/predicate';
import { get } from '../../services/objects';
import { OuiFlexGroup, OuiFlexItem } from '../flex';
import { OuiCheckbox } from '../form';

import {
  OuiTable,
  OuiTableProps,
  OuiTableBody,
  OuiTableFooter,
  OuiTableFooterCell,
  OuiTableHeader,
  OuiTableHeaderCell,
  OuiTableHeaderCellCheckbox,
  OuiTableHeaderMobile,
  OuiTableRow,
  OuiTableRowCell,
  OuiTableRowCellCheckbox,
  OuiTableSortMobile,
} from '../table';

import { CollapsedItemActions } from './collapsed_item_actions';
import { ExpandedItemActions } from './expanded_item_actions';

import { Pagination, PaginationBar } from './pagination_bar';
import { OuiIcon } from '../icon';
import { OuiKeyboardAccessible, OuiScreenReaderOnly } from '../accessibility';
import { OuiI18n } from '../i18n';
import { OuiDelayRender } from '../delay_render';

import { htmlIdGenerator } from '../../services/accessibility';
import { Action } from './action_types';
import {
  OuiTableActionsColumnType,
  OuiTableComputedColumnType,
  OuiTableDataType,
  OuiTableFieldDataColumnType,
  OuiTableFooterProps,
  ItemId,
  OuiTableSelectionType,
  OuiTableSortingType,
  ItemIdResolved,
} from './table_types';
import { OuiTableSortMobileProps } from '../table/mobile/table_sort_mobile';

type DataTypeProfiles = Record<
  OuiTableDataType,
  {
    align: typeof LEFT_ALIGNMENT | typeof RIGHT_ALIGNMENT;
    render: (value: any) => string;
  }
>;

const dataTypesProfiles: DataTypeProfiles = {
  auto: {
    align: LEFT_ALIGNMENT,
    render: (value: any) => formatAuto(value),
  },
  string: {
    align: LEFT_ALIGNMENT,
    render: (value: any) => formatText(value),
  },
  number: {
    align: RIGHT_ALIGNMENT,
    render: (value: number | null) => formatNumber(value),
  },
  boolean: {
    align: LEFT_ALIGNMENT,
    render: (value: boolean) => formatBoolean(value),
  },
  date: {
    align: LEFT_ALIGNMENT,
    render: (value: moment.MomentInput) => formatDate(value),
  },
};

const DATA_TYPES = Object.keys(dataTypesProfiles);

interface ItemIdToExpandedRowMap {
  [id: string]: ReactNode;
}

export function getItemId<T>(item: T, itemId?: ItemId<T>) {
  if (itemId) {
    if (isFunction(itemId)) {
      return itemId(item);
    }
    // @ts-ignore never mind about the index signature
    return item[itemId];
  }
}

function getRowProps<T>(item: T, rowProps: RowPropsCallback<T>) {
  if (rowProps) {
    if (isFunction(rowProps)) {
      return rowProps(item);
    }
    return rowProps;
  }

  return {};
}

function getCellProps<T>(
  item: T,
  column: OuiBasicTableColumn<T>,
  cellProps: CellPropsCallback<T>
) {
  if (cellProps) {
    if (isFunction(cellProps)) {
      return cellProps(item, column);
    }
    return cellProps;
  }

  return {};
}

function getColumnFooter<T>(
  column: OuiBasicTableColumn<T>,
  { items, pagination }: OuiTableFooterProps<T>
) {
  const { footer } = column as OuiTableFieldDataColumnType<T>;
  if (footer) {
    if (isFunction(footer)) {
      return footer({ items, pagination });
    }
    return footer;
  }

  return undefined;
}

export type OuiBasicTableColumn<T> =
  | OuiTableFieldDataColumnType<T>
  | OuiTableComputedColumnType<T>
  | OuiTableActionsColumnType<T>;

export interface Criteria<T> {
  /**
   * If the shown items represents a page (slice) into a bigger set, this describes this page
   */
  page?: {
    index: number;
    size: number;
  };
  /**
   * If the shown items are sorted, this describes the sort criteria
   */
  sort?: {
    field: keyof T;
    direction: Direction;
  };
}

export interface CriteriaWithPagination<T> extends Criteria<T> {
  /**
   * If the shown items represents a page (slice) into a bigger set, this describes this page
   */
  page: {
    index: number;
    size: number;
  };
}

type CellPropsCallback<T> = (item: T, column: OuiBasicTableColumn<T>) => object;
type RowPropsCallback<T> = (item: T) => object;

interface BasicTableProps<T> extends Omit<OuiTableProps, 'onChange'> {
  /**
   * Describes how to extract a unique ID from each item, used for selections & expanded rows
   */
  itemId?: ItemId<T>;
  /**
   * Row expansion uses the itemId prop to identify each row
   */
  itemIdToExpandedRowMap?: ItemIdToExpandedRowMap;
  /**
   * A list of objects to who in the table - an item per row
   */
  items: T[];
  /**
   * Applied to `OuiTableRowCell`
   */
  cellProps?: object | CellPropsCallback<T>;
  /**
   * An array of one of the objects: #OuiTableFieldDataColumnType, #OuiTableComputedColumnType or #OuiTableActionsColumnType.
   */
  columns: Array<OuiBasicTableColumn<T>>;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Describes the content of the table. If not specified, the caption will be "This table contains {itemCount} rows."
   */
  tableCaption?: string;
  /**
   * Indicates which column should be used as the identifying cell in each row. Should match a "field" prop in FieldDataColumn
   */
  rowHeader?: string;
  hasActions?: boolean;
  isExpandable?: boolean;
  isSelectable?: boolean;
  /**
   * Provides an infinite loading indicator
   */
  loading?: boolean;
  /**
   * Message to display if table is empty
   */
  noItemsMessage?: ReactNode;
  /**
   * Called whenever pagination or sorting changes (this property is required when either pagination or sorting is configured). See #Criteria or #CriteriaWithPagination
   */
  onChange?: (criteria: Criteria<T>) => void;
  /**
   * Configures #Pagination
   */
  pagination?: undefined;
  /**
   * If true, will convert table to cards in mobile view
   */
  responsive?: boolean;
  /**
   * Applied to `OuiTableRow`
   */
  rowProps?: object | RowPropsCallback<T>;
  /**
   * Configures #OuiTableSelectionType
   */
  selection?: OuiTableSelectionType<T>;
  /**
   * Configures #OuiTableSortingType
   */
  sorting?: OuiTableSortingType<T>;
  /**
   * Sets the table-layout CSS property. Note that auto tableLayout prevents truncateText from working properly.
   */
  tableLayout?: 'fixed' | 'auto';
  /**
   * Applied to table cells => Any cell using render function will set this to be false, leading to unnecessary word breaks. Apply textOnly: true in order to ensure it breaks properly
   */
  textOnly?: boolean;
}

type BasicTableWithPaginationProps<T> = Omit<
  BasicTableProps<T>,
  'pagination' | 'onChange'
> & {
  pagination: Pagination;
  onChange?: (criteria: CriteriaWithPagination<T>) => void;
};

export type OuiBasicTableProps<T> = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  (BasicTableProps<T> | BasicTableWithPaginationProps<T>);

interface State<T> {
  initialSelectionRendered: boolean;
  selection: T[];
}

interface SortOptions {
  isSorted?: boolean;
  isSortAscending?: boolean;
  onSort?: () => void;
  allowNeutralSort?: boolean;
  readOnly?: boolean;
}

function hasPagination<T>(
  x: OuiBasicTableProps<T>
): x is BasicTableWithPaginationProps<T> {
  return x.hasOwnProperty('pagination') && !!x.pagination;
}

export class OuiBasicTable<T = any> extends Component<
  OuiBasicTableProps<T>,
  State<T>
> {
  static defaultProps = {
    responsive: true,
    tableLayout: 'fixed',
    noItemsMessage: 'No items found',
  };

  static getDerivedStateFromProps<T>(
    nextProps: OuiBasicTableProps<T>,
    prevState: State<T>
  ) {
    if (!nextProps.selection) {
      // next props doesn't have a selection, reset our state
      return { selection: [] };
    }

    const { itemId } = nextProps;
    const selection = prevState.selection.filter(
      (selectedItem: T) =>
        nextProps.items.findIndex(
          (item: T) =>
            getItemId(item, itemId) === getItemId(selectedItem, itemId)
        ) !== -1
    );

    if (selection.length !== prevState.selection.length) {
      if (nextProps.selection.onSelectionChange) {
        nextProps.selection.onSelectionChange(selection);
      }

      return { selection };
    }

    return null;
  }

  // used for moving in & out of `loading` state
  private cleanups: Array<() => void> = [];
  private tbody: HTMLTableSectionElement | null = null;

  constructor(props: OuiBasicTableProps<T>) {
    super(props);
    this.state = {
      // used for checking if  initial selection is rendered
      initialSelectionRendered: false,
      selection: [],
    };
  }

  componentDidMount() {
    if (this.props.loading && this.tbody) this.addLoadingListeners(this.tbody);
    this.getInitialSelection();
  }

  componentDidUpdate(prevProps: OuiBasicTableProps<T>) {
    if (prevProps.loading !== this.props.loading) {
      if (this.props.loading && this.tbody) {
        this.addLoadingListeners(this.tbody);
      } else {
        this.removeLoadingListeners();
      }
    }
    this.getInitialSelection();
  }

  componentWillUnmount() {
    this.removeLoadingListeners();
  }

  getInitialSelection() {
    if (
      this.props.selection &&
      this.props.selection.initialSelected &&
      !this.state.initialSelectionRendered &&
      this.props.items.length > 0
    ) {
      this.setState({ selection: this.props.selection.initialSelected });
      this.setState({ initialSelectionRendered: true });
    }
  }

  setSelection(newSelection: T[]) {
    this.changeSelection(newSelection);
  }

  private setTbody = (tbody: HTMLTableSectionElement | null) => {
    // remove listeners from an existing element
    this.removeLoadingListeners();

    // update the ref
    this.tbody = tbody;

    // if loading, add listeners
    if (this.props.loading === true && tbody) {
      this.addLoadingListeners(tbody);
    }
  };

  private addLoadingListeners = (tbody: HTMLTableSectionElement) => {
    const listener = (event: Event) => {
      event.stopPropagation();
      event.preventDefault();
    };
    [
      'mousedown',
      'mouseup',
      'mouseover',
      'mouseout',
      'mouseenter',
      'mouseleave',
      'click',
      'dblclick',
      'keydown',
      'keyup',
      'keypress',
    ].forEach((event) => {
      tbody.addEventListener(event, listener, true);
      this.cleanups.push(() => {
        tbody.removeEventListener(event, listener, true);
      });
    });
  };

  private removeLoadingListeners = () => {
    this.cleanups.forEach((cleanup) => cleanup());
    this.cleanups.length = 0;
  };

  buildCriteria(props: OuiBasicTableProps<T>): Criteria<T> {
    const criteria: Criteria<T> = {};
    if (hasPagination(props)) {
      criteria.page = {
        index: props.pagination.pageIndex,
        size: props.pagination.pageSize,
      };
    }
    if (props.sorting) {
      criteria.sort = props.sorting.sort;
    }
    return criteria;
  }

  changeSelection(selection: T[]) {
    if (!this.props.selection) {
      return;
    }
    this.setState({ selection });
    if (this.props.selection.onSelectionChange) {
      this.props.selection.onSelectionChange(selection);
    }
  }

  clearSelection() {
    this.changeSelection([]);
  }

  onPageSizeChange(size: number) {
    this.clearSelection();
    const currentCriteria = this.buildCriteria(this.props);
    const criteria: CriteriaWithPagination<T> = {
      ...currentCriteria,
      page: {
        index: 0, // when page size changes, we take the user back to the first page
        size,
      },
    };
    if (this.props.onChange) {
      this.props.onChange(criteria);
    }
  }

  onPageChange(index: number) {
    this.clearSelection();
    const currentCriteria = this.buildCriteria(this.props);
    const criteria: CriteriaWithPagination<T> = {
      ...currentCriteria,
      page: {
        ...currentCriteria.page!,
        index,
      },
    };
    if (this.props.onChange) {
      this.props.onChange(criteria);
    }
  }

  onColumnSortChange(column: OuiBasicTableColumn<T>) {
    this.clearSelection();
    const currentCriteria = this.buildCriteria(this.props);
    let direction: Direction = SortDirection.ASC;
    if (
      currentCriteria &&
      currentCriteria.sort &&
      (currentCriteria.sort.field ===
        (column as OuiTableFieldDataColumnType<T>).field ||
        currentCriteria.sort.field === column.name)
    ) {
      direction = SortDirection.reverse(currentCriteria.sort.direction);
    }
    const criteria: Criteria<T> = {
      ...currentCriteria,
      // resetting the page if the criteria has one
      page: !currentCriteria.page
        ? undefined
        : {
            index: 0,
            size: currentCriteria.page.size,
          },
      sort: {
        field: ((column as OuiTableFieldDataColumnType<T>).field ||
          column.name) as keyof T,
        direction,
      },
    };
    if (this.props.onChange) {
      // @ts-ignore complex relationship between pagination's existence and criteria, the code logic ensures this is correctly maintained
      this.props.onChange(criteria);
    }
  }

  tableId = htmlIdGenerator('__table')();

  render() {
    const {
      className,
      loading,
      items,
      itemId,
      columns,
      pagination,
      sorting,
      selection,
      onChange,
      error,
      noItemsMessage,
      compressed,
      itemIdToExpandedRowMap,
      responsive,
      isSelectable,
      isExpandable,
      hasActions,
      rowProps,
      cellProps,
      tableCaption,
      rowHeader,
      tableLayout,
      ...rest
    } = this.props;

    const classes = classNames(
      'ouiBasicTable',
      {
        'ouiBasicTable-loading': loading,
      },
      className
    );

    const table = this.renderTable();
    const paginationBar = this.renderPaginationBar();

    return (
      <div className={classes} {...rest}>
        {table}
        {paginationBar}
      </div>
    );
  }

  renderTable() {
    const { compressed, responsive, tableLayout } = this.props;

    const mobileHeader = responsive ? (
      <OuiTableHeaderMobile>
        <OuiFlexGroup
          responsive={false}
          justifyContent="spaceBetween"
          alignItems="baseline">
          <OuiFlexItem grow={false}>{this.renderSelectAll(true)}</OuiFlexItem>
          <OuiFlexItem grow={false}>{this.renderTableMobileSort()}</OuiFlexItem>
        </OuiFlexGroup>
      </OuiTableHeaderMobile>
    ) : undefined;
    const caption = this.renderTableCaption();
    const head = this.renderTableHead();
    const body = this.renderTableBody();
    const footer = this.renderTableFooter();
    return (
      <div>
        {mobileHeader}
        <OuiTable
          id={this.tableId}
          tableLayout={tableLayout}
          responsive={responsive}
          compressed={compressed}>
          {caption}
          {head}
          {body}
          {footer}
        </OuiTable>
      </div>
    );
  }

  renderTableMobileSort() {
    const { columns, sorting } = this.props;
    const items: OuiTableSortMobileProps['items'] = [];

    if (!sorting) {
      return null;
    }

    columns.forEach((column: OuiBasicTableColumn<T>, index: number) => {
      if (
        (column as OuiTableFieldDataColumnType<T>).field &&
        sorting.sort &&
        !!sorting.enableAllColumns &&
        (column as OuiTableFieldDataColumnType<T>).sortable == null
      ) {
        column = {
          ...(column as OuiTableFieldDataColumnType<T>),
          sortable: true,
        };
      }

      if (
        !(column as OuiTableFieldDataColumnType<T>).sortable ||
        (column as OuiTableFieldDataColumnType<T>).hideForMobile
      ) {
        return;
      }

      const sortDirection = this.resolveColumnSortDirection(column);

      items.push({
        name: column.name,
        key: `_data_s_${
          (column as OuiTableFieldDataColumnType<T>).field
        }_${index}`,
        onSort: this.resolveColumnOnSort(column),
        isSorted: !!sortDirection,
        isSortAscending: sortDirection
          ? SortDirection.isAsc(sortDirection)
          : undefined,
      });
    });

    return items.length ? <OuiTableSortMobile items={items} /> : null;
  }

  renderTableCaption() {
    const { items, pagination, tableCaption } = this.props;
    let captionElement;
    if (tableCaption) {
      if (pagination) {
        captionElement = (
          <OuiI18n
            token="ouiBasicTable.tableCaptionWithPagination"
            default="{tableCaption}; Page {page} of {pageCount}."
            values={{
              tableCaption,
              page: pagination.pageIndex + 1,
              pageCount: Math.ceil(
                pagination.totalItemCount / pagination.pageSize
              ),
            }}
          />
        );
      } else {
        captionElement = tableCaption;
      }
    } else {
      if (pagination) {
        if (pagination.totalItemCount > 0) {
          captionElement = (
            <OuiI18n
              token="ouiBasicTable.tableAutoCaptionWithPagination"
              default="This table contains {itemCount} rows out of {totalItemCount} rows; Page {page} of {pageCount}."
              values={{
                totalItemCount: pagination.totalItemCount,
                itemCount: items.length,
                page: pagination.pageIndex + 1,
                pageCount: Math.ceil(
                  pagination.totalItemCount / pagination.pageSize
                ),
              }}
            />
          );
        } else {
          captionElement = (
            <OuiI18n
              token="ouiBasicTable.tableSimpleAutoCaptionWithPagination"
              default="This table contains {itemCount} rows; Page {page} of {pageCount}."
              values={{
                itemCount: items.length,
                page: pagination.pageIndex + 1,
                pageCount: Math.ceil(
                  pagination.totalItemCount / pagination.pageSize
                ),
              }}
            />
          );
        }
      } else {
        captionElement = (
          <OuiI18n
            token="ouiBasicTable.tableAutoCaptionWithoutPagination"
            default="This table contains {itemCount} rows."
            values={{
              itemCount: items.length,
            }}
          />
        );
      }
    }
    return (
      <OuiScreenReaderOnly>
        <caption className="ouiTableCaption">
          <OuiDelayRender>{captionElement}</OuiDelayRender>
        </caption>
      </OuiScreenReaderOnly>
    );
  }

  renderSelectAll = (isMobile: boolean) => {
    const { items, selection } = this.props;

    if (!selection) {
      return;
    }

    const selectableItems = items.filter(
      (item: T) => !selection.selectable || selection.selectable(item)
    );

    const checked =
      this.state.selection &&
      selectableItems.length > 0 &&
      this.state.selection.length === selectableItems.length;

    const disabled = selectableItems.length === 0;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        this.changeSelection(selectableItems);
      } else {
        this.changeSelection([]);
      }
    };

    return (
      <OuiI18n token="ouiBasicTable.selectAllRows" default="Select all rows">
        {(selectAllRows: string) => (
          <OuiCheckbox
            id={`_selection_column-checkbox_${htmlIdGenerator()()}`}
            type={isMobile ? undefined : 'inList'}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            // Only add data-test-subj to one of the checkboxes
            data-test-subj={isMobile ? undefined : 'checkboxSelectAll'}
            aria-label={selectAllRows}
            label={isMobile ? selectAllRows : null}
          />
        )}
      </OuiI18n>
    );
  };

  renderTableHead() {
    const { columns, selection } = this.props;

    const headers: ReactNode[] = [];

    if (selection) {
      headers.push(
        <OuiTableHeaderCellCheckbox key="_selection_column_h">
          {this.renderSelectAll(false)}
        </OuiTableHeaderCellCheckbox>
      );
    }

    columns.forEach((column: OuiBasicTableColumn<T>, index: number) => {
      const {
        field,
        width,
        name,
        align,
        dataType,
        sortable,
        mobileOptions,
        isMobileHeader,
        hideForMobile,
        readOnly,
        description,
      } = column as OuiTableFieldDataColumnType<T>;

      const columnAlign = align || this.getAlignForDataType(dataType);

      // actions column
      if ((column as OuiTableActionsColumnType<T>).actions) {
        headers.push(
          <OuiTableHeaderCell
            key={`_actions_h_${index}`}
            align="right"
            width={width}
            description={description}
            mobileOptions={mobileOptions}>
            {name}
          </OuiTableHeaderCell>
        );
        return;
      }

      // computed column
      if (!(column as OuiTableFieldDataColumnType<T>).field) {
        const sorting: SortOptions = {};
        // computed columns are only sortable if their `sortable` is a function
        if (this.props.sorting && typeof sortable === 'function') {
          const sortDirection = this.resolveColumnSortDirection(column);
          sorting.isSorted = !!sortDirection;
          sorting.isSortAscending = sortDirection
            ? SortDirection.isAsc(sortDirection)
            : undefined;
          sorting.onSort = this.resolveColumnOnSort(column);
          sorting.readOnly = this.props.sorting.readOnly || readOnly;
        }
        headers.push(
          <OuiTableHeaderCell
            key={`_computed_column_h_${index}`}
            align={columnAlign}
            width={width}
            mobileOptions={mobileOptions}
            data-test-subj={`tableHeaderCell_${name}_${index}`}
            description={description}
            {...sorting}>
            {name}
          </OuiTableHeaderCell>
        );
        return;
      }

      // field data column
      const sorting: SortOptions = {};
      if (this.props.sorting) {
        if (
          this.props.sorting.sort &&
          !!this.props.sorting.enableAllColumns &&
          (column as OuiTableFieldDataColumnType<T>).sortable == null
        ) {
          column = {
            ...(column as OuiTableFieldDataColumnType<T>),
            sortable: true,
          };
        }

        const { sortable } = column as OuiTableFieldDataColumnType<T>;

        if (sortable) {
          const sortDirection = this.resolveColumnSortDirection(column);
          sorting.isSorted = !!sortDirection;
          sorting.isSortAscending = sortDirection
            ? SortDirection.isAsc(sortDirection)
            : undefined;
          sorting.onSort = this.resolveColumnOnSort(column);
          sorting.readOnly = this.props.sorting.readOnly || readOnly;
        }
      }
      headers.push(
        <OuiTableHeaderCell
          key={`_data_h_${field}_${index}`}
          align={columnAlign}
          width={width}
          isMobileHeader={isMobileHeader}
          hideForMobile={hideForMobile}
          mobileOptions={mobileOptions}
          data-test-subj={`tableHeaderCell_${field}_${index}`}
          description={description}
          {...sorting}>
          {name}
        </OuiTableHeaderCell>
      );
    });

    return <OuiTableHeader>{headers}</OuiTableHeader>;
  }

  renderTableFooter() {
    const { items, columns, pagination, selection } = this.props;

    const footers = [];
    let hasDefinedFooter = false;

    if (selection) {
      // Create an empty cell to compensate for additional selection column
      footers.push(
        <OuiTableFooterCell key="_selection_column_f">
          {undefined}
        </OuiTableFooterCell>
      );
    }

    columns.forEach((column: OuiBasicTableColumn<T>) => {
      const footer = getColumnFooter(column, { items, pagination });
      const {
        mobileOptions,
        isMobileHeader,
        field,
        align,
      } = column as OuiTableFieldDataColumnType<T>;

      if ((mobileOptions && mobileOptions!.only) || isMobileHeader) {
        return; // exclude columns that only exist for mobile headers
      }

      if (footer) {
        footers.push(
          <OuiTableFooterCell
            key={`footer_${field}_${footers.length - 1}`}
            align={align}>
            {footer}
          </OuiTableFooterCell>
        );
        hasDefinedFooter = true;
      } else {
        // Footer is undefined, so create an empty cell to preserve layout
        footers.push(
          <OuiTableFooterCell
            key={`footer_empty_${footers.length - 1}`}
            align={align}>
            {undefined}
          </OuiTableFooterCell>
        );
      }
    });

    return footers.length && hasDefinedFooter ? (
      <OuiTableFooter>{footers}</OuiTableFooter>
    ) : null;
  }

  renderTableBody() {
    if (this.props.error) {
      return this.renderErrorBody(this.props.error);
    }
    const { items } = this.props;
    if (items.length === 0) {
      return this.renderEmptyBody();
    }

    const rows = items.map((item: T, index: number) => {
      // if there's pagination the item's index must be adjusted to the where it is in the whole dataset
      const tableItemIndex = hasPagination(this.props)
        ? this.props.pagination.pageIndex * this.props.pagination.pageSize +
          index
        : index;
      return this.renderItemRow(item, tableItemIndex);
    });
    return <OuiTableBody bodyRef={this.setTbody}>{rows}</OuiTableBody>;
  }

  renderErrorBody(error: string) {
    const colSpan = this.props.columns.length + (this.props.selection ? 1 : 0);
    return (
      <OuiTableBody>
        <OuiTableRow>
          <OuiTableRowCell
            align="center"
            colSpan={colSpan}
            isMobileFullWidth={true}>
            <OuiIcon type="minusInCircle" color="danger" /> {error}
          </OuiTableRowCell>
        </OuiTableRow>
      </OuiTableBody>
    );
  }

  renderEmptyBody() {
    const { columns, selection, noItemsMessage } = this.props;
    const colSpan = columns.length + (selection ? 1 : 0);
    return (
      <OuiTableBody>
        <OuiTableRow>
          <OuiTableRowCell
            align="center"
            colSpan={colSpan}
            isMobileFullWidth={true}>
            {noItemsMessage}
          </OuiTableRowCell>
        </OuiTableRow>
      </OuiTableBody>
    );
  }

  renderItemRow(item: T, rowIndex: number) {
    const {
      columns,
      selection,
      isSelectable,
      hasActions,
      rowHeader,
      itemIdToExpandedRowMap = {},
      isExpandable,
    } = this.props;

    const cells = [];

    const { itemId: itemIdCallback } = this.props;
    const itemId: ItemIdResolved =
      getItemId(item, itemIdCallback) != null
        ? getItemId(item, itemIdCallback)
        : rowIndex;
    const selected = !selection
      ? false
      : this.state.selection &&
        !!this.state.selection.find(
          (selectedItem: T) =>
            getItemId(selectedItem, itemIdCallback) === itemId
        );

    let calculatedHasSelection;
    if (selection) {
      cells.push(this.renderItemSelectionCell(itemId, item, selected));
      calculatedHasSelection = true;
    }

    let calculatedHasActions;
    columns.forEach((column: OuiBasicTableColumn<T>, columnIndex: number) => {
      if ((column as OuiTableActionsColumnType<T>).actions) {
        cells.push(
          this.renderItemActionsCell(
            itemId,
            item,
            column as OuiTableActionsColumnType<T>,
            columnIndex
          )
        );
        calculatedHasActions = true;
      } else if ((column as OuiTableFieldDataColumnType<T>).field) {
        const fieldDataColumn = column as OuiTableFieldDataColumnType<T>;
        cells.push(
          this.renderItemFieldDataCell(
            itemId,
            item,
            column as OuiTableFieldDataColumnType<T>,
            columnIndex,
            fieldDataColumn.field === rowHeader
          )
        );
      } else {
        cells.push(
          this.renderItemComputedCell(
            itemId,
            item,
            column as OuiTableComputedColumnType<T>,
            columnIndex
          )
        );
      }
    });

    // Occupy full width of table, taking checkbox & mobile only columns into account.
    let expandedRowColSpan = selection ? columns.length + 1 : columns.length;

    const mobileOnlyCols = columns.reduce<number>((num, column) => {
      if (
        (column as OuiTableFieldDataColumnType<T>).mobileOptions &&
        (column as OuiTableFieldDataColumnType<T>).mobileOptions!.only
      ) {
        return num + 1;
      }

      return (column as OuiTableFieldDataColumnType<T>).isMobileHeader
        ? num + 1
        : num + 0; // BWC only
    }, 0);

    expandedRowColSpan = expandedRowColSpan - mobileOnlyCols;

    // We'll use the ID to associate the expanded row with the original.
    const hasExpandedRow = itemIdToExpandedRowMap.hasOwnProperty(itemId);
    const expandedRowId = hasExpandedRow
      ? `row_${itemId}_expansion`
      : undefined;
    const expandedRow = hasExpandedRow ? (
      <OuiTableRow
        id={expandedRowId}
        isExpandedRow={true}
        isSelectable={isSelectable}>
        <OuiTableRowCell colSpan={expandedRowColSpan} textOnly={false}>
          {itemIdToExpandedRowMap[itemId]}
        </OuiTableRowCell>
      </OuiTableRow>
    ) : undefined;

    const { rowProps: rowPropsCallback } = this.props;
    const rowProps = getRowProps(item, rowPropsCallback as RowPropsCallback<T>);
    const row = (
      <OuiTableRow
        aria-owns={expandedRowId}
        isSelectable={
          isSelectable == null ? calculatedHasSelection : isSelectable
        }
        isSelected={selected}
        hasActions={hasActions == null ? calculatedHasActions : hasActions}
        isExpandable={isExpandable}
        {...rowProps}>
        {cells}
      </OuiTableRow>
    );

    return (
      <Fragment key={`row_${itemId}`}>
        {(rowProps as any).onClick ? (
          <OuiKeyboardAccessible>{row}</OuiKeyboardAccessible>
        ) : (
          row
        )}
        {expandedRow}
      </Fragment>
    );
  }

  renderItemSelectionCell(itemId: ItemId<T>, item: T, selected: boolean) {
    const { selection } = this.props;
    const key = `_selection_column_${itemId}`;
    const checked = selected;
    const disabled = selection!.selectable && !selection!.selectable(item);
    const title =
      selection!.selectableMessage &&
      selection!.selectableMessage(!disabled, item);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        this.changeSelection([...this.state.selection, item]);
      } else {
        const { itemId: itemIdCallback } = this.props;
        this.changeSelection(
          this.state.selection.reduce((selection: T[], selectedItem: T) => {
            if (getItemId(selectedItem, itemIdCallback) !== itemId) {
              selection.push(selectedItem);
            }
            return selection;
          }, [])
        );
      }
    };
    return (
      <OuiTableRowCellCheckbox key={key}>
        <OuiI18n token="ouiBasicTable.selectThisRow" default="Select this row">
          {(selectThisRow: string) => (
            <OuiCheckbox
              id={`${key}-checkbox`}
              type="inList"
              disabled={disabled}
              checked={checked}
              onChange={onChange}
              title={title || selectThisRow}
              aria-label={title || selectThisRow}
              data-test-subj={`checkboxSelectRow-${itemId}`}
            />
          )}
        </OuiI18n>
      </OuiTableRowCellCheckbox>
    );
  }

  renderItemActionsCell(
    itemId: ItemIdResolved,
    item: T,
    column: OuiTableActionsColumnType<T>,
    columnIndex: number
  ) {
    const actionEnabled = (action: Action<T>) =>
      this.state.selection.length === 0 &&
      (!action.enabled || action.enabled(item));

    let actualActions = column.actions.filter(
      (action: Action<T>) => !action.available || action.available(item)
    );
    if (actualActions.length > 2) {
      // if any of the actions `isPrimary`, add them inline as well, but only the first 2
      const primaryActions = actualActions.filter((o) => o.isPrimary);
      actualActions = primaryActions.slice(0, 2);

      // if we have more than 1 action, we don't show them all in the cell, instead we
      // put them all in a popover tool. This effectively means we can only have a maximum
      // of one tool per row (it's either and normal action, or it's a popover that shows multiple actions)
      //
      // here we create a single custom action that triggers the popover with all the configured actions

      actualActions.push({
        name: 'All actions',
        render: (item: T) => {
          return (
            <CollapsedItemActions
              actions={column.actions}
              itemId={itemId}
              item={item}
              actionEnabled={actionEnabled}
            />
          );
        },
      });
    }

    const tools = (
      <ExpandedItemActions
        actions={actualActions}
        itemId={itemId}
        item={item}
        actionEnabled={actionEnabled}
      />
    );

    const key = `record_actions_${itemId}_${columnIndex}`;
    return (
      <OuiTableRowCell
        showOnHover={true}
        key={key}
        align="right"
        textOnly={false}
        hasActions={true}>
        {tools}
      </OuiTableRowCell>
    );
  }

  renderItemFieldDataCell(
    itemId: ItemId<T>,
    item: T,
    column: OuiTableFieldDataColumnType<T>,
    columnIndex: number,
    setScopeRow: boolean
  ) {
    const { field, render, dataType } = column;

    const key = `_data_column_${field}_${itemId}_${columnIndex}`;
    const contentRenderer = render || this.getRendererForDataType(dataType);
    const value = get(item, field as string);
    const content = contentRenderer(value, item);

    return this.renderItemCell(item, column, key, content, setScopeRow);
  }

  renderItemComputedCell(
    itemId: ItemId<T>,
    item: T,
    column: OuiTableComputedColumnType<T>,
    columnIndex: number
  ) {
    const { render } = column;

    const key = `_computed_column_${itemId}_${columnIndex}`;
    const contentRenderer = render || this.getRendererForDataType();
    const content = contentRenderer(item);

    return this.renderItemCell(item, column, key, content, false);
  }

  renderItemCell(
    item: T,
    column: OuiBasicTableColumn<T>,
    key: string | number,
    content: ReactNode,
    setScopeRow: boolean
  ) {
    const {
      align,
      render,
      dataType,
      isExpander,
      textOnly,
      name,
      field,
      description,
      sortable,
      footer,
      mobileOptions,
      ...rest
    } = column as OuiTableFieldDataColumnType<T>;
    const columnAlign = align || this.getAlignForDataType(dataType);
    const { cellProps: cellPropsCallback } = this.props;
    const cellProps = getCellProps(
      item,
      column,
      cellPropsCallback as CellPropsCallback<T>
    );

    return (
      <OuiTableRowCell
        key={key}
        align={columnAlign}
        isExpander={isExpander}
        textOnly={textOnly || !render}
        setScopeRow={setScopeRow}
        mobileOptions={{
          ...mobileOptions,
          render:
            mobileOptions && mobileOptions.render && mobileOptions.render(item),
          header:
            mobileOptions && mobileOptions.header === false ? false : name,
        }}
        {...cellProps}
        {...rest}>
        {content}
      </OuiTableRowCell>
    );
  }

  resolveColumnSortDirection = (column: OuiBasicTableColumn<T>) => {
    const { sorting } = this.props;
    const { sortable, field, name } = column as OuiTableFieldDataColumnType<T>;
    if (!sorting || !sorting.sort || !sortable) {
      return;
    }
    if (sorting.sort.field === field || sorting.sort.field === name) {
      return sorting.sort.direction;
    }
  };

  resolveColumnOnSort = (column: OuiBasicTableColumn<T>) => {
    const { sorting } = this.props;
    const { sortable, name } = column as OuiTableFieldDataColumnType<T>;
    if (!sorting || !sortable) {
      return;
    }
    if (!this.props.onChange) {
      throw new Error(`BasicTable is configured to be sortable on column [${name}] but
          [onChange] is not configured. This callback must be implemented to handle the sort requests`);
    }
    return () => this.onColumnSortChange(column);
  };

  getRendererForDataType(dataType: OuiTableDataType = 'auto') {
    const profile = dataTypesProfiles[dataType];
    if (!profile) {
      throw new Error(
        `Unknown dataType [${dataType}]. The supported data types are [${DATA_TYPES.join(
          ', '
        )}]`
      );
    }
    return profile.render;
  }

  getAlignForDataType(dataType: OuiTableDataType = 'auto') {
    const profile = dataTypesProfiles[dataType];
    if (!profile) {
      throw new Error(
        `Unknown dataType [${dataType}]. The supported data types are [${DATA_TYPES.join(
          ', '
        )}]`
      );
    }
    return profile.align;
  }

  renderPaginationBar() {
    const { error, pagination, tableCaption, onChange } = this.props;
    if (!error && pagination && pagination.totalItemCount > 0) {
      if (!onChange) {
        throw new Error(`The Basic Table is configured with pagination but [onChange] is
        not configured. This callback must be implemented to handle pagination changes`);
      }

      let ariaLabel: ReactElement | undefined = undefined;

      if (tableCaption) {
        ariaLabel = (
          <OuiI18n
            token="ouiBasicTable.tablePagination"
            default="Pagination for preceding table: {tableCaption}"
            values={{ tableCaption }}
          />
        );
      }

      return (
        <PaginationBar
          aria-controls={this.tableId}
          pagination={pagination}
          onPageSizeChange={this.onPageSizeChange.bind(this)}
          onPageChange={this.onPageChange.bind(this)}
          aria-label={ariaLabel}
        />
      );
    }
  }
}
