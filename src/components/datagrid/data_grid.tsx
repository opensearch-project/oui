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
  FunctionComponent,
  HTMLAttributes,
  KeyboardEvent,
  useCallback,
  useState,
  useEffect,
  Fragment,
  ReactChild,
  useMemo,
  useRef,
  MutableRefObject,
  CSSProperties,
  RefObject,
} from 'react';
import classNames from 'classnames';
import { tabbable } from 'tabbable';
import { OuiI18n, useOuiI18n } from '../i18n';
import { CommonProps, OneOf } from '../common';
import {
  OuiDataGridColumn,
  OuiDataGridColumnWidths,
  OuiDataGridInMemory,
  OuiDataGridPaginationProps,
  OuiDataGridInMemoryValues,
  OuiDataGridControlColumn,
  OuiDataGridSorting,
  OuiDataGridStyle,
  OuiDataGridStyleBorders,
  OuiDataGridStyleCellPaddings,
  OuiDataGridStyleFontSizes,
  OuiDataGridStyleHeader,
  OuiDataGridStyleRowHover,
  OuiDataGridPopoverContents,
  OuiDataGridColumnVisibility,
  OuiDataGridToolBarVisibilityOptions,
  OuiDataGridFocusedCell,
  OuiDataGridOnColumnResizeHandler,
  OuiDataGridStyleFooter,
  OuiDataGridRowHeightsOptions,
} from './data_grid_types';
import { OuiDataGridCellProps } from './data_grid_cell';
import { OuiButtonEmpty } from '../button';
import { keys, htmlIdGenerator } from '../../services';
import { OuiDataGridBody, VIRTUALIZED_CONTAINER_CLASS } from './data_grid_body';
import { useDataGridColumnSelector } from './column_selector';
import { useDataGridStyleSelector, startingStyles } from './style_selector';
import { OuiTablePagination } from '../table/table_pagination';
import { OuiFocusTrap } from '../focus_trap';
import { useResizeObserver } from '../observer/resize_observer';
import { OuiDataGridInMemoryRenderer } from './data_grid_inmemory_renderer';
import {
  useMergedSchema,
  OuiDataGridSchemaDetector,
  useDetectSchema,
  schemaDetectors as providedSchemaDetectors,
} from './data_grid_schema';
import {
  DataGridFocusContext,
  DataGridFocusContextShape,
  DataGridSortingContext,
} from './data_grid_context';
import { useDataGridColumnSorting } from './column_sorting';
import { RowHeightUtils } from './row_height_utils';

// Used to short-circuit some async browser behaviour that is difficult to account for in tests
const IS_JEST_ENVIRONMENT = global.hasOwnProperty('_isJest');

// When below this number the grid only shows the full screen button
const MINIMUM_WIDTH_FOR_GRID_CONTROLS = 479;

type CommonGridProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * An array of #OuiDataGridControlColumn objects. Used to define ancillary columns on the left side of the data grid.
     */
    leadingControlColumns?: OuiDataGridControlColumn[];
    /**
     * An array of #OuiDataGridControlColumn objects. Used to define ancillary columns on the right side of the data grid.
     */
    trailingControlColumns?: OuiDataGridControlColumn[];
    /**
     * An array of #OuiDataGridColumn objects. Lists the columns available and the schema and settings tied to it.
     */
    columns: OuiDataGridColumn[];
    /**
     * An array of #OuiDataGridColumnVisibility objects. Defines which columns are visible in the grid and the order they are displayed.
     */
    columnVisibility: OuiDataGridColumnVisibility;
    /**
     * An array of custom #OuiDataGridSchemaDetector objects. You can inject custom schemas to the grid to define the classnames applied
     */
    schemaDetectors?: OuiDataGridSchemaDetector[];
    /**
     * An object mapping #OuiDataGridColumn `schema`s to a custom popover formatting component which receives #OuiDataGridPopoverContent props
     */
    popoverContents?: OuiDataGridPopoverContents;
    /**
     * The total number of rows in the dataset (used by e.g. pagination to know how many pages to list)
     */
    rowCount: number;
    /**
     * A function called to render a cell's value. Behind the scenes it is treated as a React component
     * allowing hooks, context, and other React concepts to be used. The function receives a #CellValueElement
     * as its only argument.
     */
    renderCellValue: OuiDataGridCellProps['renderCellValue'];
    /**
     * A function called to render a cell's value. Behind the scenes it is treated as a React component
     * allowing hooks, context, and other React concepts to be used. The function receives a #CellValueElement
     * as its only argument.
     */
    renderFooterCellValue?: OuiDataGridCellProps['renderCellValue'];
    /**
     * Defines the look and feel for the grid. Accepts a partial #OuiDataGridStyle object. Settings provided may be overwritten or merged with user defined preferences if toolbarVisibility density controls are available.
     */
    gridStyle?: OuiDataGridStyle;
    /**
     * Accepts either a boolean or #OuiDataGridToolbarVisibilityOptions object. When used as a boolean, defines the display of the toolbar entire. WHen passed an object allows you to turn off individual controls within the toolbar as well as add additional buttons.
     */
    toolbarVisibility?: boolean | OuiDataGridToolBarVisibilityOptions;
    /**
     * A #OuiDataGridInMemory object to definite the level of high order schema-detection and sorting logic to use on your data. *Try to set when possible*. When omitted, disables all enhancements and assumes content is flat strings.
     */
    inMemory?: OuiDataGridInMemory;
    /**
     * A #OuiDataGridPagination object. Omit to disable pagination completely.
     */
    pagination?: OuiDataGridPaginationProps;
    /**
     * A #OuiDataGridSorting object that provides the sorted columns along with their direction. Omit to disable, but you'll likely want to also turn off the user sorting controls through the `toolbarVisibility` prop.
     */
    sorting?: OuiDataGridSorting;
    /**
     * A callback for when a column's size changes. Callback receives `{ columnId: string, width: number }`.
     */
    onColumnResize?: OuiDataGridOnColumnResizeHandler;
    /**
     * Defines a minimum width for the grid to show all controls in its header.
     */
    minSizeForControls?: number;
    /**
     * Sets the grid's height, forcing it to overflow in a scrollable container with cell virtualization
     */
    height?: CSSProperties['height'];
    /**
     * Sets the grid's width, forcing it to overflow in a scrollable container with cell virtualization
     */
    width?: CSSProperties['width'];
    /**
     * A #OuiDataGridRowHeightsOptions object that provides row heights options
     */
    rowHeightsOptions?: OuiDataGridRowHeightsOptions;
  };

// Force either aria-label or aria-labelledby to be defined
export type OuiDataGridProps = OneOf<
  CommonGridProps,
  'aria-label' | 'aria-labelledby'
>;

// Each gridStyle object above sets a specific CSS select to .ouiGrid
const fontSizesToClassMap: { [size in OuiDataGridStyleFontSizes]: string } = {
  s: 'ouiDataGrid--fontSizeSmall',
  m: '',
  l: 'ouiDataGrid--fontSizeLarge',
};

const headerToClassMap: { [header in OuiDataGridStyleHeader]: string } = {
  shade: 'ouiDataGrid--headerShade',
  underline: 'ouiDataGrid--headerUnderline',
};

const footerToClassMap: { [footer in OuiDataGridStyleFooter]: string } = {
  shade: 'ouiDataGrid--footerShade',
  overline: 'ouiDataGrid--footerOverline',
  striped: '',
};

const rowHoverToClassMap: {
  [rowHighlight in OuiDataGridStyleRowHover]: string;
} = {
  highlight: 'ouiDataGrid--rowHoverHighlight',
  none: '',
};

const bordersToClassMap: { [border in OuiDataGridStyleBorders]: string } = {
  all: 'ouiDataGrid--bordersAll',
  horizontal: 'ouiDataGrid--bordersHorizontal',
  none: 'ouiDataGrid--bordersNone',
};

const cellPaddingsToClassMap: {
  [cellPaddings in OuiDataGridStyleCellPaddings]: string;
} = {
  s: 'ouiDataGrid--paddingSmall',
  m: '',
  l: 'ouiDataGrid--paddingLarge',
};

function computeVisibleRows(
  props: Pick<OuiDataGridProps, 'pagination' | 'rowCount'>
) {
  const { pagination, rowCount } = props;

  const startRow = pagination ? pagination.pageIndex * pagination.pageSize : 0;
  let endRow = pagination
    ? (pagination.pageIndex + 1) * pagination.pageSize
    : rowCount;
  endRow = Math.min(endRow, rowCount);

  return endRow - startRow;
}

function renderPagination(props: OuiDataGridProps, controls: string) {
  const { pagination } = props;

  if (pagination == null) {
    return null;
  }

  const {
    pageIndex,
    pageSize,
    pageSizeOptions,
    onChangePage,
    onChangeItemsPerPage,
  } = pagination;
  const pageCount = Math.ceil(props.rowCount / pageSize);
  const minSizeOption =
    pageSizeOptions && [...pageSizeOptions].sort((a, b) => a - b)[0];

  if (props.rowCount < (minSizeOption || pageSize)) {
    /**
     * Do not render the pagination when:
     * 1. Rows count is less than min pagination option (rows per page)
     * 2. Rows count is less than pageSize (the case when there are no pageSizeOptions provided)
     */
    return null;
  }

  // hide select rows per page if pageSizeOptions is undefined or an empty array
  const hidePerPageOptions = !pageSizeOptions || pageSizeOptions.length === 0;

  return (
    <OuiI18n
      token="ouiDataGrid.ariaLabelGridPagination"
      default="Pagination for preceding grid: {label}"
      values={{ label: props['aria-label'] }}>
      {(ariaLabelGridPagination: string) => {
        return (
          <OuiI18n
            token="ouiDataGrid.ariaLabelledByGridPagination"
            default="Pagination for preceding grid">
            {(ariaLabelledByGridPagination: string) => {
              const accessibleName = {
                ...(props['aria-label'] && {
                  'aria-label': ariaLabelGridPagination,
                }),
                ...(props['aria-labelledby'] && {
                  'aria-labelledby': ariaLabelledByGridPagination,
                }),
              };

              return (
                <div className="ouiDataGrid__pagination">
                  <OuiTablePagination
                    aria-controls={controls}
                    activePage={pageIndex}
                    hidePerPageOptions={hidePerPageOptions}
                    itemsPerPage={pageSize}
                    itemsPerPageOptions={pageSizeOptions}
                    pageCount={pageCount}
                    onChangePage={onChangePage}
                    onChangeItemsPerPage={onChangeItemsPerPage}
                    {...accessibleName}
                  />
                </div>
              );
            }}
          </OuiI18n>
        );
      }}
    </OuiI18n>
  );
}

/**
 * Returns the size of the cell container minus the scroll bar width.
 * To do so, this hook is listening for size changes of the container itself,
 * as well as pagination changes to make sure every update is caught.
 *
 * This is necessary because there is no callback/event fired by the browser
 * indicating the scroll bar state has changed.
 * @param resizeRef the wrapper element containging the data grid
 * @param pageSize the currently applied page size
 */
function useVirtualizeContainerWidth(
  resizeRef: RefObject<HTMLDivElement>,
  pageSize: number | undefined
) {
  const [virtualizeContainerWidth, setVirtualizeContainerWidth] = useState(0);
  const virtualizeContainer = resizeRef.current?.getElementsByClassName(
    VIRTUALIZED_CONTAINER_CLASS
  )[0] as HTMLDivElement | null;

  // re-render data grid on size changes
  useResizeObserver({ element: virtualizeContainer });

  useEffect(() => {
    if (virtualizeContainer?.clientWidth) {
      setVirtualizeContainerWidth(virtualizeContainer.clientWidth);
    }
  }, [virtualizeContainer?.clientWidth]);

  useEffect(() => {
    // wait for layout to settle, then measure virtualize container
    setTimeout(() => {
      if (virtualizeContainer?.clientWidth) {
        const containerWidth = virtualizeContainer.clientWidth;
        setVirtualizeContainerWidth(containerWidth);
      }
    }, 100);
  }, [pageSize, virtualizeContainer]);

  return virtualizeContainerWidth;
}

function useDefaultColumnWidth(
  gridWidth: number,
  leadingControlColumns: OuiDataGridControlColumn[],
  trailingControlColumns: OuiDataGridControlColumn[],
  columns: OuiDataGridProps['columns']
): number | null {
  const computeDefaultWidth = useCallback((): number | null => {
    if (IS_JEST_ENVIRONMENT) return 100;
    if (gridWidth === 0) return null; // we can't tell what size to compute yet

    const controlColumnWidths = [
      ...leadingControlColumns,
      ...trailingControlColumns,
    ].reduce<number>(
      (claimedWidth, controlColumn: OuiDataGridControlColumn) =>
        claimedWidth + controlColumn.width,
      0
    );

    const columnsWithWidths = columns.filter<
      OuiDataGridColumn & { initialWidth: number }
    >(doesColumnHaveAnInitialWidth);

    const definedColumnsWidth = columnsWithWidths.reduce(
      (claimedWidth, column) => claimedWidth + column.initialWidth,
      0
    );

    const claimedWidth = controlColumnWidths + definedColumnsWidth;

    const widthToFill = gridWidth - claimedWidth;
    const unsizedColumnCount = columns.length - columnsWithWidths.length;
    if (unsizedColumnCount === 0) {
      return 100;
    }
    return Math.max(widthToFill / unsizedColumnCount, 100);
  }, [gridWidth, columns, leadingControlColumns, trailingControlColumns]);

  const [defaultColumnWidth, setDefaultColumnWidth] = useState<number | null>(
    computeDefaultWidth
  );

  useEffect(() => {
    const columnWidth = computeDefaultWidth();
    setDefaultColumnWidth(columnWidth);
  }, [computeDefaultWidth]);

  return defaultColumnWidth;
}

function doesColumnHaveAnInitialWidth(
  column: OuiDataGridColumn
): column is OuiDataGridColumn & { initialWidth: number } {
  return column.hasOwnProperty('initialWidth');
}

function useColumnWidths(
  columns: OuiDataGridColumn[],
  onColumnResize?: OuiDataGridOnColumnResizeHandler
): [OuiDataGridColumnWidths, (columnId: string, width: number) => void] {
  const hasMounted = useRef(false);

  const computeColumnWidths = useCallback(() => {
    return columns
      .filter<OuiDataGridColumn & { initialWidth: number }>(
        doesColumnHaveAnInitialWidth
      )
      .reduce<OuiDataGridColumnWidths>((initialWidths, column) => {
        initialWidths[column.id] = column.initialWidth;
        return initialWidths;
      }, {});
  }, [columns]);

  const [columnWidths, setColumnWidths] = useState<OuiDataGridColumnWidths>(
    computeColumnWidths
  );

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setColumnWidths(computeColumnWidths());
  }, [computeColumnWidths]);

  const setColumnWidth = useCallback(
    (columnId: string, width: number) => {
      setColumnWidths({ ...columnWidths, [columnId]: width });

      if (onColumnResize) {
        onColumnResize({ columnId, width });
      }
    },
    [columnWidths, onColumnResize]
  );

  return [columnWidths, setColumnWidth];
}

function useInMemoryValues(
  inMemory: OuiDataGridInMemory | undefined,
  rowCount: number
): [
  OuiDataGridInMemoryValues,
  (rowIndex: number, columnId: string, value: string) => void
] {
  /**
   * For performance, `onCellRender` below mutates the inMemoryValues object
   * instead of cloning. If this operation were done in a setState call
   * React would ignore the update as the object itself has not changed.
   * So, we keep a dual record: the in-memory values themselves and a "version" counter.
   * When the object is mutated, the version is incremented triggering a re-render, and
   * the returned `inMemoryValues` object is re-created (cloned) from the mutated version.
   * The version updates are batched, so only one clone happens per batch.
   **/
  const _inMemoryValues = useRef<OuiDataGridInMemoryValues>({});
  const [inMemoryValuesVersion, setInMemoryValuesVersion] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inMemoryValues = useMemo(() => ({ ..._inMemoryValues.current }), [
    inMemoryValuesVersion,
  ]);

  const onCellRender = useCallback((rowIndex, columnId, value) => {
    const nextInMemoryValues = _inMemoryValues.current;
    nextInMemoryValues[rowIndex] = nextInMemoryValues[rowIndex] || {};
    if (nextInMemoryValues[rowIndex][columnId] !== value) {
      nextInMemoryValues[rowIndex][columnId] = value;
      setInMemoryValuesVersion((version) => version + 1);
    }
  }, []);

  // if `inMemory.level` or `rowCount` changes reset the values
  const inMemoryLevel = inMemory && inMemory.level;
  const resetRunCount = useRef(0);
  useEffect(() => {
    if (resetRunCount.current++ > 0) {
      // this has to delete "overflow" keys from the object instead of resetting to an empty one,
      // as the internal inmemoryrenderer component's useEffect which sets the values
      // executes before this outer, wrapping useEffect
      const existingRowKeyCount = Object.keys(_inMemoryValues.current).length;
      for (let i = rowCount; i < existingRowKeyCount; i++) {
        delete _inMemoryValues.current[i];
      }
      setInMemoryValuesVersion((version) => version + 1);
    }
  }, [inMemoryLevel, rowCount]);

  return [inMemoryValues, onCellRender];
}

function createKeyDownHandler(
  props: OuiDataGridProps,
  contentElement: HTMLDivElement | null,
  visibleColumns: OuiDataGridProps['columns'],
  leadingControlColumns: OuiDataGridControlColumn[],
  trailingControlColumns: OuiDataGridControlColumn[],
  focusedCell: OuiDataGridFocusedCell | undefined,
  headerIsInteractive: boolean,
  setFocusedCell: (focusedCell: OuiDataGridFocusedCell) => void
) {
  return (event: KeyboardEvent<HTMLDivElement>) => {
    if (focusedCell == null) return;

    if (
      contentElement == null ||
      !contentElement.contains(document.activeElement)
    ) {
      // if the `contentElement` does not contain the focused element, don't handle the event
      // this happens when React bubbles the key event through a portal
      return;
    }

    const colCount =
      visibleColumns.length +
      leadingControlColumns.length +
      trailingControlColumns.length -
      1;
    const [x, y] = focusedCell;
    const rowCount = computeVisibleRows(props);
    const { key, ctrlKey } = event;

    if (key === keys.ARROW_DOWN) {
      event.preventDefault();
      if (props.renderFooterCellValue ? y < rowCount : y < rowCount - 1) {
        setFocusedCell([x, y + 1]);
      }
    } else if (key === keys.ARROW_LEFT) {
      event.preventDefault();
      if (x > 0) {
        setFocusedCell([x - 1, y]);
      }
    } else if (key === keys.ARROW_UP) {
      event.preventDefault();
      const minimumIndex = headerIsInteractive ? -1 : 0;
      if (y > minimumIndex) {
        setFocusedCell([x, y - 1]);
      }
    } else if (key === keys.ARROW_RIGHT) {
      event.preventDefault();
      if (x < colCount) {
        setFocusedCell([x + 1, y]);
      }
    } else if (key === keys.PAGE_DOWN) {
      if (props.pagination) {
        event.preventDefault();
        const rowCount = props.rowCount;
        const pageIndex = props.pagination.pageIndex;
        const pageSize = props.pagination.pageSize;
        const pageCount = Math.ceil(rowCount / pageSize);
        if (pageIndex < pageCount - 1) {
          props.pagination.onChangePage(pageIndex + 1);
        }
        setFocusedCell([focusedCell[0], 0]);
      }
    } else if (key === keys.PAGE_UP) {
      if (props.pagination) {
        event.preventDefault();
        const pageIndex = props.pagination.pageIndex;
        if (pageIndex > 0) {
          props.pagination.onChangePage(pageIndex - 1);
        }
        setFocusedCell([focusedCell[0], props.pagination.pageSize - 1]);
      }
    } else if (key === (ctrlKey && keys.END)) {
      event.preventDefault();
      setFocusedCell([colCount, rowCount - 1]);
    } else if (key === (ctrlKey && keys.HOME)) {
      event.preventDefault();
      setFocusedCell([0, 0]);
    } else if (key === keys.END) {
      event.preventDefault();
      setFocusedCell([colCount, y]);
    } else if (key === keys.HOME) {
      event.preventDefault();
      setFocusedCell([0, y]);
    }
  };
}

type FocusProps = Pick<HTMLAttributes<HTMLDivElement>, 'tabIndex' | 'onFocus'>;
const useFocus = (
  headerIsInteractive: boolean,
  cellsUpdateFocus: MutableRefObject<Map<string, Function>>
): [
  FocusProps,
  OuiDataGridFocusedCell | undefined,
  (focusedCell: OuiDataGridFocusedCell) => void
] => {
  const [focusedCell, setFocusedCell] = useState<
    OuiDataGridFocusedCell | undefined
  >(undefined);

  const previousCell = useRef<OuiDataGridFocusedCell | undefined>(undefined);
  useEffect(() => {
    if (previousCell.current) {
      notifyCellOfFocusState(
        cellsUpdateFocus.current,
        previousCell.current,
        false
      );
    }
    previousCell.current = focusedCell;

    if (focusedCell) {
      notifyCellOfFocusState(cellsUpdateFocus.current, focusedCell, true);
    }
  }, [cellsUpdateFocus, focusedCell]);

  const hasHadFocus = useMemo(() => focusedCell != null, [focusedCell]);

  const focusProps = useMemo<FocusProps>(
    () =>
      hasHadFocus
        ? {
            // FireFox allows tabbing to a div that is scrollable, while Chrome does not
            tabIndex: -1,
          }
        : {
            tabIndex: 0,
            onFocus: (e) => {
              // if e.target (the source element of the `focus event`
              // matches e.currentTarget (always the div with this onFocus listener)
              // then the user has focused directly on the data grid wrapper (almost definitely by tabbing)
              // so shift focus to the first interactive cell within the grid
              if (e.target === e.currentTarget) {
                setFocusedCell(headerIsInteractive ? [0, -1] : [0, 0]);
              }
            },
          },
    [hasHadFocus, setFocusedCell, headerIsInteractive]
  );

  return [focusProps, focusedCell, setFocusedCell];
};

// Typeguards to see if toolbarVisibility has a certain boolean property assigned
// If not, just set it to true and assume it's OK to show
function objectHasKey<O extends Record<string, any>, ObjectKey extends keyof O>(
  object: O,
  key: ObjectKey
): object is Required<O> {
  return object.hasOwnProperty(key);
}
function checkOrDefaultToolBarDiplayOptions<
  OptionKey extends keyof OuiDataGridToolBarVisibilityOptions
>(
  arg: OuiDataGridProps['toolbarVisibility'],
  option: OptionKey
): Required<OuiDataGridToolBarVisibilityOptions>[OptionKey] {
  if (arg === undefined) {
    return true;
  } else if (typeof arg === 'boolean') {
    return arg as boolean;
  } else if (objectHasKey(arg, option)) {
    return arg[option];
  } else {
    return true;
  }
}

function notifyCellOfFocusState(
  cellsUpdateFocus: Map<string, Function>,
  cell: OuiDataGridFocusedCell,
  isFocused: boolean
) {
  const key = `${cell[0]}-${cell[1]}`;
  const onFocus = cellsUpdateFocus.get(key);
  if (onFocus) {
    onFocus(isFocused);
  }
}

const emptyArrayDefault: OuiDataGridControlColumn[] = [];
export const OuiDataGrid: FunctionComponent<OuiDataGridProps> = (props) => {
  const {
    leadingControlColumns = emptyArrayDefault,
    trailingControlColumns = emptyArrayDefault,
    columns,
    columnVisibility,
    schemaDetectors,
    rowCount,
    renderCellValue,
    renderFooterCellValue,
    className,
    gridStyle,
    toolbarVisibility = true,
    pagination,
    sorting,
    inMemory,
    popoverContents,
    onColumnResize,
    minSizeForControls = MINIMUM_WIDTH_FOR_GRID_CONTROLS,
    height,
    width,
    rowHeightsOptions,
    ...rest
  } = props;

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [gridWidth, setGridWidth] = useState(0);

  const [interactiveCellId] = useState(htmlIdGenerator()());
  const [headerIsInteractive, setHeaderIsInteractive] = useState(false);

  const cellsUpdateFocus = useRef<Map<string, Function>>(new Map());

  const [wrappingDivFocusProps, focusedCell, setFocusedCell] = useFocus(
    headerIsInteractive,
    cellsUpdateFocus
  );

  // maintain a statically-referenced copy of `focusedCell`
  // so it can be looked up when needed without causing a re-render
  const focusedCellReference = useRef<
    OuiDataGridFocusedCell | null | undefined
  >(focusedCell);
  useEffect(() => {
    focusedCellReference.current = focusedCell;
  }, [focusedCell]);

  const handleHeaderChange = useCallback<(headerRow: HTMLElement) => void>(
    (headerRow) => {
      const tabbables = tabbable(headerRow);
      const managed = headerRow.querySelectorAll('[data-ouigrid-tab-managed]');
      const hasInteractives = tabbables.length > 0 || managed.length > 0;
      if (hasInteractives !== headerIsInteractive) {
        setHeaderIsInteractive(hasInteractives);

        // if the focus is on the header, and the header is no longer interactive
        // move the focus down to the first row
        const focusedCell = focusedCellReference.current;
        if (hasInteractives === false && focusedCell && focusedCell[1] === -1) {
          setFocusedCell([focusedCell[0], 0]);
        }
      }
    },
    [headerIsInteractive, setHeaderIsInteractive, setFocusedCell]
  );

  const handleHeaderMutation = useCallback<MutationCallback>(
    (records) => {
      const [{ target }] = records;

      // find the wrapping header div
      let headerRow = target.parentElement;
      while (
        headerRow &&
        (headerRow.getAttribute('data-test-subj') || '')
          .split(/\s+/)
          .indexOf('dataGridHeader') === -1
      ) {
        headerRow = headerRow.parentElement;
      }

      if (headerRow) handleHeaderChange(headerRow);
    },
    [handleHeaderChange]
  );

  const handleGridKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case keys.ESCAPE:
        if (isFullScreen) {
          event.preventDefault();
          setIsFullScreen(false);
        }
        break;
    }
  };

  // enables/disables grid controls based on available width
  const resizeRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const gridDimensions = useResizeObserver({
    elementRef: resizeRef,
    observableDimension: 'width',
  });
  const toolbarDimensions = useResizeObserver({
    elementRef: toolbarRef,
    observableDimension: 'height',
  });
  useEffect(() => {
    if (resizeRef) {
      const { width } = gridDimensions;
      setGridWidth(width);
    } else {
      setGridWidth(0);
    }
  }, [resizeRef, gridDimensions]);

  const virtualizeContainerWidth = useVirtualizeContainerWidth(
    resizeRef,
    pagination?.pageSize
  );

  const hasRoomForGridControls = IS_JEST_ENVIRONMENT
    ? true
    : gridWidth > minSizeForControls || isFullScreen;

  const [columnWidths, setColumnWidth] = useColumnWidths(
    columns,
    onColumnResize
  );

  // apply style props on top of defaults
  const gridStyleWithDefaults = { ...startingStyles, ...gridStyle };

  const [inMemoryValues, onCellRender] = useInMemoryValues(inMemory, rowCount);

  const definedColumnSchemas = useMemo(() => {
    return columns.reduce<{ [key: string]: string }>(
      (definedColumnSchemas, { id, schema }) => {
        if (schema != null) {
          definedColumnSchemas[id] = schema;
        }
        return definedColumnSchemas;
      },
      {}
    );
  }, [columns]);

  const allSchemaDetectors = useMemo(
    () => [...providedSchemaDetectors, ...(schemaDetectors || [])],
    [schemaDetectors]
  );
  const detectedSchema = useDetectSchema(
    inMemory,
    inMemoryValues,
    allSchemaDetectors,
    definedColumnSchemas,
    inMemory != null
  );
  const mergedSchema = useMergedSchema(detectedSchema, columns);

  const displayValues: { [key: string]: string } = columns.reduce(
    (acc: { [key: string]: string }, column: OuiDataGridColumn) => ({
      ...acc,
      [column.id]: column.displayAsText || column.id,
    }),
    {}
  );

  const [
    columnSelector,
    orderedVisibleColumns,
    setVisibleColumns,
    switchColumnPos,
  ] = useDataGridColumnSelector(
    columns,
    columnVisibility,
    checkOrDefaultToolBarDiplayOptions(toolbarVisibility, 'showColumnSelector'),
    displayValues
  );
  const columnSorting = useDataGridColumnSorting(
    orderedVisibleColumns,
    sorting,
    mergedSchema,
    allSchemaDetectors,
    displayValues
  );
  const [styleSelector, gridStyles] = useDataGridStyleSelector(
    gridStyleWithDefaults
  );

  // compute the default column width from the container's clientWidth and count of visible columns
  const defaultColumnWidth = useDefaultColumnWidth(
    // use clientWidth of the virtualization container to take scroll bar into account
    // if that's not possible fall back to the size of the wrapper element
    virtualizeContainerWidth || gridDimensions.width,
    leadingControlColumns,
    trailingControlColumns,
    orderedVisibleColumns
  );

  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef) {
      const headerElement = contentRef.querySelector(
        '[data-test-subj~=dataGridHeader]'
      );
      if (headerElement) {
        handleHeaderChange(headerElement as HTMLElement);
      }
    }
  }, [contentRef, handleHeaderChange]);

  // Because of a weird Chrome bug with position:sticky css items and focus, we force scrolling to the top
  // if the item is in the first row. This prevents the cell from ever being under the sticky header.
  useEffect(() => {
    if (focusedCell !== undefined && focusedCell[1] === 0) {
      if (contentRef != null) {
        contentRef.scrollTop = 0;
      }
    }
  }, [focusedCell, contentRef]);

  const [rowHeightUtils] = useState(new RowHeightUtils());

  useEffect(() => {
    rowHeightUtils.computeStylesForGridCell(gridStyles);
  }, [gridStyles, rowHeightUtils]);

  const classes = classNames(
    'ouiDataGrid',
    fontSizesToClassMap[gridStyles.fontSize!],
    bordersToClassMap[gridStyles.border!],
    headerToClassMap[gridStyles.header!],
    footerToClassMap[gridStyles.footer!],
    rowHoverToClassMap[gridStyles.rowHover!],
    cellPaddingsToClassMap[gridStyles.cellPadding!],
    {
      'ouiDataGrid--stripes': gridStyles.stripes!,
    },
    {
      'ouiDataGrid--stickyFooter': gridStyles.footer && gridStyles.stickyFooter,
    },
    {
      'ouiDataGrid--fullScreen': isFullScreen,
    },
    {
      'ouiDataGrid--noControls': !toolbarVisibility,
    },
    className
  );

  const controlBtnClasses = classNames(
    'ouiDataGrid__controlBtn',
    {
      'ouiDataGrid__controlBtn--active': isFullScreen,
    },
    className
  );

  // By default the toolbar appears
  const showToolbar = !!toolbarVisibility;

  // These grid controls will only show when there is room. Check the resize observer callback
  // They can also be optionally turned off individually by using toolbarVisibility
  const gridControls = (
    <Fragment>
      {checkOrDefaultToolBarDiplayOptions(
        toolbarVisibility,
        'additionalControls'
      ) && typeof toolbarVisibility !== 'boolean'
        ? toolbarVisibility.additionalControls
        : null}
      {checkOrDefaultToolBarDiplayOptions(
        toolbarVisibility,
        'showColumnSelector'
      )
        ? columnSelector
        : null}
      {checkOrDefaultToolBarDiplayOptions(
        toolbarVisibility,
        'showStyleSelector'
      )
        ? styleSelector
        : null}
      {checkOrDefaultToolBarDiplayOptions(toolbarVisibility, 'showSortSelector')
        ? columnSorting
        : null}
    </Fragment>
  );

  // need to safely access those Web APIs
  if (typeof document !== 'undefined') {
    // When data grid is full screen, we add a class to the body to remove the extra scrollbar
    if (isFullScreen) {
      document.body.classList.add('ouiDataGrid__restrictBody');
    } else {
      document.body.classList.remove('ouiDataGrid__restrictBody');
    }
  }

  const fullScreenSelector = (
    <OuiI18n
      tokens={[
        'ouiDataGrid.fullScreenButton',
        'ouiDataGrid.fullScreenButtonActive',
      ]}
      defaults={['Full screen', 'Exit full screen']}>
      {([fullScreenButton, fullScreenButtonActive]: ReactChild[]) => (
        <OuiButtonEmpty
          size="xs"
          iconType="fullScreen"
          color="text"
          className={controlBtnClasses}
          data-test-subj="dataGridFullScrenButton"
          onClick={() => setIsFullScreen(!isFullScreen)}>
          {isFullScreen ? fullScreenButtonActive : fullScreenButton}
        </OuiButtonEmpty>
      )}
    </OuiI18n>
  );

  const onFocusUpdate = useCallback(
    (cell: OuiDataGridFocusedCell, updateFocus: Function) => {
      const key = `${cell[0]}-${cell[1]}`;
      cellsUpdateFocus.current.set(key, updateFocus);
      return () => {
        cellsUpdateFocus.current.delete(key);
      };
    },
    []
  );
  const datagridFocusContext = useMemo<DataGridFocusContextShape>(() => {
    return {
      setFocusedCell,
      onFocusUpdate,
    };
  }, [setFocusedCell, onFocusUpdate]);

  const gridIds = htmlIdGenerator();
  const gridId = gridIds();
  const ariaLabelledById = gridIds();

  const ariaLabel = useOuiI18n(
    'ouiDataGrid.ariaLabel',
    '{label}; Page {page} of {pageCount}.',
    {
      label: rest['aria-label'],
      page: pagination ? pagination.pageIndex + 1 : 0,
      pageCount: pagination
        ? Math.ceil(props.rowCount / pagination.pageSize)
        : 0,
    }
  );

  const ariaLabelledBy = useOuiI18n(
    'ouiDataGrid.ariaLabelledBy',
    'Page {page} of {pageCount}.',
    {
      page: pagination ? pagination.pageIndex + 1 : 0,
      pageCount: pagination
        ? Math.ceil(props.rowCount / pagination.pageSize)
        : 0,
    }
  );

  // extract aria-label and/or aria-labelledby from `rest`
  const gridAriaProps: {
    'aria-label'?: string;
    'aria-labelledby'?: string;
  } = {};
  if ('aria-label' in rest) {
    gridAriaProps['aria-label'] = pagination ? ariaLabel : rest['aria-label'];
    delete rest['aria-label'];
  }
  if ('aria-labelledby' in rest) {
    gridAriaProps['aria-labelledby'] = `${rest['aria-labelledby']} ${
      pagination ? ariaLabelledById : ''
    }`;
    delete rest['aria-labelledby'];
  }

  return (
    <DataGridFocusContext.Provider value={datagridFocusContext}>
      <DataGridSortingContext.Provider value={sorting}>
        <OuiFocusTrap
          disabled={!isFullScreen}
          className="ouiDataGrid__focusWrap">
          <div
            className={classes}
            onKeyDown={handleGridKeyDown}
            style={isFullScreen ? undefined : { width, height }}
            ref={resizeRef}
            {...rest}>
            {(IS_JEST_ENVIRONMENT || defaultColumnWidth) && (
              <>
                {showToolbar ? (
                  <div
                    ref={toolbarRef}
                    className="ouiDataGrid__controls"
                    data-test-sub="dataGridControls">
                    {hasRoomForGridControls ? gridControls : null}
                    {checkOrDefaultToolBarDiplayOptions(
                      toolbarVisibility,
                      'showFullScreenSelector'
                    )
                      ? fullScreenSelector
                      : null}
                  </div>
                ) : null}
                <div
                  onKeyDown={createKeyDownHandler(
                    props,
                    contentRef,
                    orderedVisibleColumns,
                    leadingControlColumns,
                    trailingControlColumns,
                    focusedCell,
                    headerIsInteractive,
                    setFocusedCell
                  )}
                  className="ouiDataGrid__verticalScroll">
                  <div className="ouiDataGrid__overflow">
                    {inMemory ? (
                      <OuiDataGridInMemoryRenderer
                        inMemory={inMemory}
                        renderCellValue={renderCellValue}
                        columns={columns}
                        rowCount={
                          inMemory.level === 'enhancements'
                            ? // if `inMemory.level === enhancements` then we can only be sure the pagination's pageSize is available in memory
                              pagination?.pageSize || rowCount
                            : // otherwise, all of the data is present and usable
                              rowCount
                        }
                        onCellRender={onCellRender}
                      />
                    ) : null}
                    <div
                      ref={setContentRef}
                      data-test-subj="dataGridWrapper"
                      className="ouiDataGrid__content"
                      role="grid"
                      id={gridId}
                      {...wrappingDivFocusProps}
                      {...gridAriaProps}>
                      <OuiDataGridBody
                        isFullScreen={isFullScreen}
                        columns={orderedVisibleColumns}
                        columnWidths={columnWidths}
                        defaultColumnWidth={defaultColumnWidth}
                        toolbarHeight={toolbarDimensions.height}
                        leadingControlColumns={leadingControlColumns}
                        schema={mergedSchema}
                        trailingControlColumns={trailingControlColumns}
                        setVisibleColumns={setVisibleColumns}
                        switchColumnPos={switchColumnPos}
                        setColumnWidth={setColumnWidth}
                        headerIsInteractive={headerIsInteractive}
                        handleHeaderMutation={handleHeaderMutation}
                        inMemoryValues={inMemoryValues}
                        inMemory={inMemory}
                        schemaDetectors={allSchemaDetectors}
                        popoverContents={popoverContents}
                        pagination={pagination}
                        renderCellValue={renderCellValue}
                        renderFooterCellValue={renderFooterCellValue}
                        rowCount={rowCount}
                        interactiveCellId={interactiveCellId}
                        rowHeightsOptions={rowHeightsOptions}
                        rowHeightUtils={rowHeightUtils}
                        gridStyles={gridStyles}
                      />
                    </div>
                  </div>
                </div>
                {props.pagination && props['aria-labelledby'] && (
                  <p id={ariaLabelledBy} hidden>
                    {ariaLabelledBy}
                  </p>
                )}
                {renderPagination(props, gridId)}
                <p id={interactiveCellId} hidden>
                  <OuiI18n
                    token="ouiDataGrid.screenReaderNotice"
                    default="Cell contains interactive content."
                  />
                  {/* TODO: if no keyboard shortcuts panel gets built, add keyboard shortcut info here */}
                </p>
              </>
            )}
          </div>
        </OuiFocusTrap>
      </DataGridSortingContext.Provider>
    </DataGridFocusContext.Provider>
  );
};
