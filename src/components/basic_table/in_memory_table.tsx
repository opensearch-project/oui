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

import React, { Component, ReactNode } from 'react';
import {
  OuiBasicTable,
  Criteria,
  OuiBasicTableProps,
  OuiBasicTableColumn,
  CriteriaWithPagination,
} from './basic_table';
import {
  OuiTableFieldDataColumnType,
  OuiTableDataType,
  OuiTableSortingType,
} from './table_types';
import { PropertySort } from '../../services';
import {
  defaults as paginationBarDefaults,
  Pagination as PaginationBarType,
} from './pagination_bar';
import { isString } from '../../services/predicate';
import { Comparators, Direction } from '../../services/sort';
import { OuiSearchBar } from '../search_bar';
import { OuiSpacer } from '../spacer';
import { CommonProps } from '../common';
import { OuiSearchBarProps } from '../search_bar/search_bar';
import { SchemaType } from '../search_bar/search_box';
import { Query } from '../search_bar/query';

interface onChangeArgument {
  query: Query | null;
  queryText: string;
  error: Error | null;
}

function isOuiSearchBarProps<T>(
  x: OuiInMemoryTableProps<T>['search']
): x is OuiSearchBarProps {
  return typeof x !== 'boolean';
}

export type Search = boolean | OuiSearchBarProps;

interface PaginationOptions {
  pageSizeOptions?: number[];
  hidePerPageOptions?: boolean;
  initialPageIndex?: number;
  initialPageSize?: number;
  pageIndex?: number;
  pageSize?: number;
}

type Pagination = boolean | PaginationOptions;

interface SortingOptions {
  sort: PropertySort;
}

type Sorting = boolean | SortingOptions;

type InMemoryTableProps<T> = Omit<
  OuiBasicTableProps<T>,
  'pagination' | 'sorting' | 'noItemsMessage'
> & {
  message?: ReactNode;
  /**
   * Configures #Search.
   */
  search?: Search;
  pagination?: undefined;
  sorting?: Sorting;
  /**
   * Set `allowNeutralSort` to false to force column sorting. Defaults to true.
   */
  allowNeutralSort?: boolean;
  /**
   * Callback for when table pagination or sorting is changed. This is meant to be informational only, and not used to set any state as the in-memory table already manages this state. See #Criteria or #CriteriaWithPagination.
   */
  onTableChange?: (nextValues: Criteria<T>) => void;
  executeQueryOptions?: {
    defaultFields?: string[];
    isClauseMatcher?: (...args: any) => boolean;
    explain?: boolean;
  };
  /**
   * Insert content between the search bar and table components.
   */
  childrenBetween?: ReactNode;
};

type InMemoryTablePropsWithPagination<T> = Omit<
  InMemoryTableProps<T>,
  'pagination' | 'onTableChange'
> & {
  pagination: Pagination;
  onTableChange?: (nextValues: CriteriaWithPagination<T>) => void;
};

export type OuiInMemoryTableProps<T> = CommonProps &
  (InMemoryTableProps<T> | InMemoryTablePropsWithPagination<T>);

interface State<T> {
  prevProps: {
    items: T[];
    sortName: ReactNode;
    sortDirection?: Direction;
    search?: Search;
  };
  search?: Search;
  query: Query | null;
  pageIndex: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  sortName: ReactNode;
  sortDirection?: Direction;
  allowNeutralSort: boolean;
  hidePerPageOptions: boolean | undefined;
}

const getQueryFromSearch = (
  search: Search | undefined,
  defaultQuery: boolean
) => {
  let query: Query | string;
  if (!search) {
    query = '';
  } else {
    query =
      (defaultQuery
        ? (search as OuiSearchBarProps).defaultQuery ||
          (search as OuiSearchBarProps).query ||
          ''
        : (search as OuiSearchBarProps).query) || '';
  }

  return isString(query) ? OuiSearchBar.Query.parse(query) : query;
};

const getInitialPagination = (pagination: Pagination | undefined) => {
  if (!pagination) {
    return {
      pageIndex: undefined,
      pageSize: undefined,
    };
  }

  const {
    pageSizeOptions = paginationBarDefaults.pageSizeOptions,
    hidePerPageOptions,
  } = pagination as PaginationOptions;

  const defaultPageSize = pageSizeOptions
    ? pageSizeOptions[0]
    : paginationBarDefaults.pageSizeOptions[0];

  const initialPageIndex =
    pagination === true
      ? 0
      : pagination.pageIndex || pagination.initialPageIndex || 0;
  const initialPageSize =
    pagination === true
      ? defaultPageSize
      : pagination.pageSize || pagination.initialPageSize || defaultPageSize;

  if (
    !hidePerPageOptions &&
    initialPageSize &&
    (!pageSizeOptions || !pageSizeOptions.includes(initialPageSize))
  ) {
    throw new Error(
      `OuiInMemoryTable received initialPageSize ${initialPageSize}, which wasn't provided within pageSizeOptions.`
    );
  }

  return {
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
    pageSizeOptions,
    hidePerPageOptions,
  };
};

function findColumnByProp<T>(
  columns: Array<OuiBasicTableColumn<T>>,
  prop: 'field' | 'name',
  value: string
) {
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (
      (column as Record<'field' | 'name', keyof T | string | ReactNode>)[
        prop
      ] === value
    ) {
      return column;
    }
  }
}

function getInitialSorting<T>(
  columns: Array<OuiBasicTableColumn<T>>,
  sorting: Sorting | undefined
) {
  if (!sorting || !(sorting as SortingOptions).sort) {
    return {
      sortName: undefined,
      sortDirection: undefined,
    };
  }

  const {
    field: sortable,
    direction: sortDirection,
  } = (sorting as SortingOptions).sort;

  // sortable could be a column's `field` or its `name`
  // for backwards compatibility `field` must be checked first
  let sortColumn = findColumnByProp(columns, 'field', sortable);
  if (sortColumn == null) {
    sortColumn = findColumnByProp(columns, 'name', sortable);
  }

  if (sortColumn == null) {
    return {
      sortName: undefined,
      sortDirection: undefined,
    };
  }

  const sortName = sortColumn.name;

  return {
    sortName,
    sortDirection,
  };
}

export class OuiInMemoryTable<T> extends Component<
  OuiInMemoryTableProps<T>,
  State<T>
> {
  static defaultProps = {
    responsive: true,
    tableLayout: 'fixed',
  };
  tableRef: React.RefObject<OuiBasicTable>;

  static getDerivedStateFromProps<T>(
    nextProps: OuiInMemoryTableProps<T>,
    prevState: State<T>
  ) {
    let updatedPrevState = prevState;
    if (nextProps.items !== prevState.prevProps.items) {
      // We have new items because an external search has completed, so reset pagination state.

      let nextPageIndex = 0;
      if (
        nextProps.pagination != null &&
        typeof nextProps.pagination !== 'boolean'
      ) {
        nextPageIndex = nextProps.pagination.pageIndex || 0;
      }

      updatedPrevState = {
        ...updatedPrevState,
        prevProps: {
          ...updatedPrevState.prevProps,
          items: nextProps.items,
        },
        pageIndex: nextPageIndex,
      };
    }

    // apply changes to controlled pagination
    if (
      nextProps.pagination != null &&
      typeof nextProps.pagination !== 'boolean'
    ) {
      if (
        nextProps.pagination.pageSize != null &&
        nextProps.pagination.pageSize !== updatedPrevState.pageIndex
      ) {
        updatedPrevState = {
          ...updatedPrevState,
          pageSize: nextProps.pagination.pageSize,
        };
      }
      if (
        nextProps.pagination.pageIndex != null &&
        nextProps.pagination.pageIndex !== updatedPrevState.pageIndex
      ) {
        updatedPrevState = {
          ...updatedPrevState,
          pageIndex: nextProps.pagination.pageIndex,
        };
      }
    }

    const { sortName, sortDirection } = getInitialSorting(
      nextProps.columns,
      nextProps.sorting
    );
    if (
      sortName !== prevState.prevProps.sortName ||
      sortDirection !== prevState.prevProps.sortDirection
    ) {
      updatedPrevState = {
        ...updatedPrevState,
        sortName,
        sortDirection,
      };
    }

    const nextQuery = nextProps.search
      ? (nextProps.search as OuiSearchBarProps).query
      : '';
    const prevQuery = prevState.prevProps.search
      ? (prevState.prevProps.search as OuiSearchBarProps).query
      : '';

    if (nextQuery !== prevQuery) {
      updatedPrevState = {
        ...updatedPrevState,
        prevProps: {
          ...updatedPrevState.prevProps,
          search: nextProps.search,
        },
        query: getQueryFromSearch(nextProps.search, false),
      };
    }
    if (updatedPrevState !== prevState) {
      return updatedPrevState;
    }
    return null;
  }

  constructor(props: OuiInMemoryTableProps<T>) {
    super(props);

    const { columns, search, pagination, sorting, allowNeutralSort } = props;
    const {
      pageIndex,
      pageSize,
      pageSizeOptions,
      hidePerPageOptions,
    } = getInitialPagination(pagination);
    const { sortName, sortDirection } = getInitialSorting(columns, sorting);

    this.state = {
      prevProps: {
        items: props.items,
        sortName,
        sortDirection,
        search,
      },
      search: search,
      query: getQueryFromSearch(search, true),
      pageIndex: pageIndex || 0,
      pageSize,
      pageSizeOptions,
      sortName,
      sortDirection,
      allowNeutralSort: allowNeutralSort !== false,
      hidePerPageOptions,
    };

    this.tableRef = React.createRef<OuiBasicTable>();
  }

  setSelection(newSelection: T[]) {
    if (this.tableRef.current) {
      this.tableRef.current.setSelection(newSelection);
    }
  }

  onTableChange = ({ page, sort }: Criteria<T>) => {
    let { index: pageIndex, size: pageSize } = (page || {}) as {
      index: number;
      size: number;
    };

    // don't apply pagination changes that are otherwise controlled
    // `page` is left unchanged as it goes to the consumer's `onTableChange` callback, allowing the app to respond
    const { pagination } = this.props;
    if (pagination != null && typeof pagination !== 'boolean') {
      if (pagination.pageSize != null) pageSize = pagination.pageSize;
      if (pagination.pageIndex != null) pageIndex = pagination.pageIndex;
    }

    let { field: sortName, direction: sortDirection } = (sort || {}) as {
      field: keyof T;
      direction: Direction;
    };

    // To keep backwards compatibility reportedSortName needs to be tracked separately
    // from sortName; sortName gets stored internally while reportedSortName is sent to the callback
    let reportedSortName = sortName;

    // OuiBasicTable returns the column's `field` if it exists instead of `name`,
    // map back to `name` if this is the case
    for (let i = 0; i < this.props.columns.length; i++) {
      const column = this.props.columns[i];
      if (
        'field' in column &&
        (column as OuiTableFieldDataColumnType<T>).field === sortName
      ) {
        sortName = column.name as keyof T;
        break;
      }
    }

    // Allow going back to 'neutral' sorting
    if (
      this.state.allowNeutralSort &&
      this.state.sortName === sortName &&
      this.state.sortDirection === 'desc' &&
      sortDirection === 'asc'
    ) {
      sortName = '' as keyof T;
      reportedSortName = '' as keyof T;
      sortDirection = 'asc'; // Default sort direction.
    }

    if (this.props.onTableChange) {
      this.props.onTableChange({
        // @ts-ignore complex relationship between pagination's existence and criteria, the code logic ensures this is correctly maintained
        page,
        sort: {
          field: reportedSortName,
          direction: sortDirection,
        },
      });
    }

    this.setState({
      pageIndex,
      pageSize,
      sortName,
      sortDirection,
    });
  };

  onQueryChange = ({ query, queryText, error }: onChangeArgument) => {
    const { search } = this.props;
    if (isOuiSearchBarProps(search)) {
      if (search.onChange) {
        const shouldQueryInMemory =
          error == null
            ? search.onChange({
                query: query!,
                queryText,
                error: null,
              })
            : search.onChange({
                query: null,
                queryText,
                error,
              });
        if (!shouldQueryInMemory) {
          return;
        }
      }
    }

    // Reset pagination state.
    this.setState((state) => ({
      prevProps: {
        ...state.prevProps,
        search,
      },
      query,
      pageIndex: 0,
    }));
  };

  renderSearchBar() {
    const { search } = this.props;
    if (search) {
      let searchBarProps: Omit<OuiSearchBarProps, 'onChange'> = {};

      if (isOuiSearchBarProps(search)) {
        const { onChange, ..._searchBarProps } = search;
        searchBarProps = _searchBarProps;

        if (searchBarProps.box && searchBarProps.box.schema === true) {
          searchBarProps.box = {
            ...searchBarProps.box,
            schema: this.resolveSearchSchema(),
          };
        }
      }

      return (
        <>
          <OuiSearchBar onChange={this.onQueryChange} {...searchBarProps} />
          <OuiSpacer size="l" />
        </>
      );
    }
  }

  resolveSearchSchema(): SchemaType {
    const { columns } = this.props;
    return columns.reduce<{
      strict: boolean;
      fields: Record<string, { type: OuiTableDataType }>;
    }>(
      (schema, column) => {
        const { field, dataType } = column as OuiTableFieldDataColumnType<T>;
        if (field) {
          const type = dataType || 'string';
          schema.fields[field as string] = { type };
        }
        return schema;
      },
      { strict: true, fields: {} }
    );
  }

  getItemSorter(): (a: T, b: T) => number {
    const { sortName, sortDirection } = this.state;

    const { columns } = this.props;

    const sortColumn = columns.find(
      ({ name }) => name === sortName
    ) as OuiTableFieldDataColumnType<T>;

    if (sortColumn == null) {
      // can't return a non-function so return a function that says everything is the same
      return () => 0;
    }

    const sortable = sortColumn.sortable;

    if (typeof sortable === 'function') {
      return Comparators.value(sortable, Comparators.default(sortDirection));
    }

    return Comparators.property(
      sortColumn.field as string,
      Comparators.default(sortDirection)
    );
  }

  getItems() {
    const { executeQueryOptions } = this.props;
    const {
      prevProps: { items },
    } = this.state;

    if (!items.length) {
      return {
        items: [],
        totalItemCount: 0,
      };
    }

    const { query, sortName, pageIndex, pageSize } = this.state;

    const matchingItems = query
      ? OuiSearchBar.Query.execute(query, items, executeQueryOptions)
      : items;

    const sortedItems = sortName
      ? matchingItems
          .slice(0) // avoid mutating the source array
          .sort(this.getItemSorter()) // sort, causes mutation
      : matchingItems;

    const visibleItems =
      pageSize && this.props.pagination
        ? (() => {
            const startIndex = pageIndex * pageSize;
            return sortedItems.slice(
              startIndex,
              Math.min(startIndex + pageSize, sortedItems.length)
            );
          })()
        : sortedItems;

    return {
      items: visibleItems,
      totalItemCount: matchingItems.length,
    };
  }

  render() {
    const {
      columns,
      loading,
      message,
      error,
      selection,
      isSelectable,
      hasActions,
      compressed,
      pagination: hasPagination,
      sorting: hasSorting,
      itemIdToExpandedRowMap,
      itemId,
      rowProps,
      cellProps,
      tableLayout,
      items: _unuseditems,
      search,
      onTableChange,
      executeQueryOptions,
      allowNeutralSort,
      childrenBetween,
      ...rest
    } = this.props;

    const {
      pageIndex,
      pageSize,
      pageSizeOptions,
      sortName,
      sortDirection,
      hidePerPageOptions,
    } = this.state;

    const { items, totalItemCount } = this.getItems();

    const pagination: PaginationBarType | undefined = !hasPagination
      ? undefined
      : {
          pageIndex,
          pageSize: pageSize || 1,
          pageSizeOptions,
          totalItemCount,
          hidePerPageOptions,
        };

    // Data loaded from a server can have a default sort order which is meaningful to the
    // user, but can't be reproduced with client-side sort logic. So we allow the table to display
    // rows in the order in which they're initially loaded by providing an undefined sorting prop.
    const sorting: OuiTableSortingType<T> | undefined = !hasSorting
      ? undefined
      : {
          sort:
            !sortName && !sortDirection
              ? undefined
              : {
                  field: sortName as keyof T,
                  direction: sortDirection as Direction,
                },
          allowNeutralSort: this.state.allowNeutralSort,
        };

    const searchBar = this.renderSearchBar();

    const table = (
      // @ts-ignore complex relationship between pagination's existence and criteria, the code logic ensures this is correctly maintained
      <OuiBasicTable
        ref={this.tableRef}
        items={items}
        itemId={itemId}
        rowProps={rowProps}
        cellProps={cellProps}
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        selection={selection}
        isSelectable={isSelectable}
        hasActions={hasActions}
        onChange={this.onTableChange}
        error={error}
        loading={loading}
        noItemsMessage={message}
        tableLayout={tableLayout}
        compressed={compressed}
        itemIdToExpandedRowMap={itemIdToExpandedRowMap}
        {...rest}
      />
    );

    if (!searchBar) {
      return table;
    }

    return (
      <div>
        {searchBar}
        {childrenBetween}
        {table}
      </div>
    );
  }
}
