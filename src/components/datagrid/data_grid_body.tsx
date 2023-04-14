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
  forwardRef,
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useContext,
  useState,
} from 'react';
import classNames from 'classnames';
import { tabbable } from 'tabbable';
import {
  GridChildComponentProps,
  VariableSizeGrid as Grid,
  VariableSizeGridProps,
} from 'react-window';
import { OuiCodeBlock } from '../code';
import {
  OuiDataGridControlColumn,
  OuiDataGridColumn,
  OuiDataGridColumnWidths,
  OuiDataGridPopoverContents,
  OuiDataGridInMemory,
  OuiDataGridInMemoryValues,
  OuiDataGridPaginationProps,
  OuiDataGridPopoverContent,
  OuiDataGridRowHeightsOptions,
  OuiDataGridStyle,
} from './data_grid_types';
import { OuiDataGridCell, OuiDataGridCellProps } from './data_grid_cell';
import {
  OuiDataGridSchema,
  OuiDataGridSchemaDetector,
} from './data_grid_schema';
import { OuiDataGridFooterRow } from './data_grid_footer_row';
import {
  OuiDataGridHeaderRow,
  OuiDataGridHeaderRowProps,
} from './data_grid_header_row';
import {
  OuiMutationObserver,
  useMutationObserver,
} from '../observer/mutation_observer';
import { OuiText } from '../text';
import {
  DataGridSortingContext,
  DataGridWrapperRowsContext,
} from './data_grid_context';
import { useResizeObserver } from '../observer/resize_observer';
import { RowHeightUtils } from './row_height_utils';

export interface OuiDataGridBodyProps {
  isFullScreen: boolean;
  columnWidths: OuiDataGridColumnWidths;
  defaultColumnWidth?: number | null;
  leadingControlColumns?: OuiDataGridControlColumn[];
  trailingControlColumns?: OuiDataGridControlColumn[];
  columns: OuiDataGridColumn[];
  schema: OuiDataGridSchema;
  schemaDetectors: OuiDataGridSchemaDetector[];
  popoverContents?: OuiDataGridPopoverContents;
  rowCount: number;
  renderCellValue: OuiDataGridCellProps['renderCellValue'];
  renderFooterCellValue?: OuiDataGridCellProps['renderCellValue'];
  inMemory?: OuiDataGridInMemory;
  inMemoryValues: OuiDataGridInMemoryValues;
  interactiveCellId: OuiDataGridCellProps['interactiveCellId'];
  pagination?: OuiDataGridPaginationProps;
  setColumnWidth: (columnId: string, width: number) => void;
  headerIsInteractive: boolean;
  handleHeaderMutation: MutationCallback;
  setVisibleColumns: OuiDataGridHeaderRowProps['setVisibleColumns'];
  switchColumnPos: OuiDataGridHeaderRowProps['switchColumnPos'];
  toolbarHeight: number;
  rowHeightsOptions?: OuiDataGridRowHeightsOptions;
  rowHeightUtils: RowHeightUtils;
  gridStyles?: OuiDataGridStyle;
}

export const VIRTUALIZED_CONTAINER_CLASS = 'ouiDataGrid__virtualized';

const defaultComparator: NonNullable<
  OuiDataGridSchemaDetector['comparator']
> = (a, b, direction) => {
  if (a < b) return direction === 'asc' ? -1 : 1;
  if (a > b) return direction === 'asc' ? 1 : -1;
  return 0;
};

const providedPopoverContents: OuiDataGridPopoverContents = {
  json: ({ cellContentsElement }) => {
    let formattedText = cellContentsElement.innerText;

    // attempt to pretty-print the json
    try {
      formattedText = JSON.stringify(JSON.parse(formattedText), null, 2);
    } catch (e) {} // eslint-disable-line no-empty

    return (
      <OuiCodeBlock
        isCopyable
        transparentBackground
        paddingSize="none"
        language="json">
        {formattedText}
      </OuiCodeBlock>
    );
  },
};

const DefaultColumnFormatter: OuiDataGridPopoverContent = ({ children }) => {
  return <OuiText>{children}</OuiText>;
};

const Cell: FunctionComponent<GridChildComponentProps> = ({
  columnIndex,
  rowIndex: visibleRowIndex,
  style,
  data,
}) => {
  const {
    rowMap,
    rowOffset,
    leadingControlColumns,
    trailingControlColumns,
    columns,
    schema,
    popoverContents,
    columnWidths,
    defaultColumnWidth,
    renderCellValue,
    interactiveCellId,
    setRowHeight,
    schemaDetectors,
    rowHeightsOptions,
    getRowHeight,
  } = data;

  const { headerRowHeight } = useContext(DataGridWrapperRowsContext);

  const offsetRowIndex = visibleRowIndex + rowOffset;

  const rowIndex = rowMap.hasOwnProperty(offsetRowIndex)
    ? rowMap[offsetRowIndex]
    : offsetRowIndex;

  let cellContent;

  const isFirstColumn = columnIndex === 0;
  const isLastColumn =
    columnIndex ===
    columns.length +
      leadingControlColumns.length +
      trailingControlColumns.length -
      1;
  const isStripableRow = rowIndex % 2 !== 0;

  const isLeadingControlColumn = columnIndex < leadingControlColumns.length;
  const isTrailingControlColumn =
    columnIndex >= leadingControlColumns.length + columns.length;

  const dataColumnIndex = columnIndex - leadingControlColumns.length;
  const column = columns[dataColumnIndex];
  const columnId = column?.id;

  const transformClass = schemaDetectors.filter(
    (row: OuiDataGridSchemaDetector) => {
      return column?.schema
        ? column?.schema === row.type
        : columnId === row.type;
    }
  )[0];
  const textTransform = transformClass?.textTransform;

  const classes = classNames({
    'ouiDataGridRowCell--stripe': isStripableRow,
    'ouiDataGridRowCell--firstColumn': isFirstColumn,
    'ouiDataGridRowCell--lastColumn': isLastColumn,
    'ouiDataGridRowCell--controlColumn':
      isLeadingControlColumn || isTrailingControlColumn,
    [`ouiDataGridRowCell--${textTransform}`]: textTransform,
  });

  if (isLeadingControlColumn) {
    const leadingColumn = leadingControlColumns[columnIndex];
    const { id, rowCellRender } = leadingColumn;

    cellContent = (
      <OuiDataGridCell
        rowIndex={rowIndex}
        visibleRowIndex={visibleRowIndex}
        colIndex={columnIndex}
        columnId={id}
        popoverContent={DefaultColumnFormatter}
        width={leadingColumn.width}
        renderCellValue={rowCellRender}
        interactiveCellId={interactiveCellId}
        isExpandable={false}
        className={classes}
        setRowHeight={setRowHeight}
        getRowHeight={getRowHeight}
        rowHeightsOptions={rowHeightsOptions}
        style={{
          ...style,
          top: `${parseFloat(style.top as string) + headerRowHeight}px`,
        }}
      />
    );
  } else if (isTrailingControlColumn) {
    const columnOffset = columns.length + leadingControlColumns.length;
    const trailingColumnIndex = columnIndex - columnOffset;
    const trailingColumn = trailingControlColumns[trailingColumnIndex];
    const { id, rowCellRender } = trailingColumn;

    cellContent = (
      <OuiDataGridCell
        rowIndex={rowIndex}
        visibleRowIndex={visibleRowIndex}
        colIndex={columnIndex}
        columnId={id}
        popoverContent={DefaultColumnFormatter}
        width={trailingColumn.width}
        renderCellValue={rowCellRender}
        interactiveCellId={interactiveCellId}
        isExpandable={false}
        className={classes}
        rowHeightsOptions={rowHeightsOptions}
        getRowHeight={getRowHeight}
        style={{
          ...style,
          top: `${parseFloat(style.top as string) + headerRowHeight}px`,
        }}
      />
    );
  } else {
    // this is a normal data cell

    // offset the column index by the leading control columns
    const columnType = schema[columnId] ? schema[columnId].columnType : null;

    const isExpandable =
      column.isExpandable !== undefined ? column.isExpandable : true;

    const popoverContent =
      popoverContents[columnType as string] || DefaultColumnFormatter;

    const width = columnWidths[columnId] || defaultColumnWidth;

    cellContent = (
      <OuiDataGridCell
        rowIndex={rowIndex}
        visibleRowIndex={visibleRowIndex}
        colIndex={columnIndex}
        columnId={columnId}
        column={column}
        columnType={columnType}
        popoverContent={popoverContent}
        width={width || undefined}
        renderCellValue={renderCellValue}
        interactiveCellId={interactiveCellId}
        isExpandable={isExpandable}
        className={classes}
        rowHeightsOptions={rowHeightsOptions}
        getRowHeight={getRowHeight}
        style={{
          ...style,
          top: `${parseFloat(style.top as string) + headerRowHeight}px`,
        }}
      />
    );
  }

  return cellContent;
};

const InnerElement: VariableSizeGridProps['innerElementType'] = forwardRef<
  HTMLDivElement,
  { style: { height: number } }
>(({ children, style, ...rest }, ref) => {
  const { headerRowHeight, headerRow, footerRow } = useContext(
    DataGridWrapperRowsContext
  );
  return (
    <>
      <div
        ref={ref}
        style={{
          ...style,
          height: style.height + headerRowHeight,
        }}
        {...rest}>
        {headerRow}
        {children}
      </div>
      {footerRow}
    </>
  );
});
InnerElement.displayName = 'OuiDataGridInnerElement';

const INITIAL_ROW_HEIGHT = 34;
const IS_JEST_ENVIRONMENT = global.hasOwnProperty('_isJest');

export const OuiDataGridBody: FunctionComponent<OuiDataGridBodyProps> = (
  props
) => {
  const {
    isFullScreen,
    columnWidths,
    defaultColumnWidth,
    leadingControlColumns = [],
    trailingControlColumns = [],
    columns,
    schema,
    schemaDetectors,
    popoverContents,
    rowCount,
    renderCellValue,
    renderFooterCellValue,
    inMemory,
    inMemoryValues,
    interactiveCellId,
    pagination,
    setColumnWidth,
    headerIsInteractive,
    handleHeaderMutation,
    setVisibleColumns,
    switchColumnPos,
    toolbarHeight,
    rowHeightsOptions,
    rowHeightUtils,
    gridStyles,
  } = props;

  const headerRowRef = useRef<HTMLDivElement>(null);
  const footerRowRef = useRef<HTMLDivElement>(null);

  useMutationObserver(headerRowRef, handleHeaderMutation, {
    subtree: true,
    childList: true,
  });
  const { height: headerRowHeight } = useResizeObserver({
    elementRef: headerRowRef,
    observableDimension: 'height',
  });
  const { height: footerRowHeight } = useResizeObserver({
    elementRef: footerRowRef,
    observableDimension: 'height',
  });

  const startRow = pagination ? pagination.pageIndex * pagination.pageSize : 0;
  let endRow = pagination
    ? (pagination.pageIndex + 1) * pagination.pageSize
    : rowCount;
  endRow = Math.min(endRow, rowCount);

  const visibleRowIndices = useMemo(() => {
    const visibleRowIndices = [];
    for (let i = startRow; i < endRow; i++) {
      visibleRowIndices.push(i);
    }
    return visibleRowIndices;
  }, [startRow, endRow]);

  const sorting = useContext(DataGridSortingContext);
  const sortingColumns = sorting?.columns;

  const rowMap = useMemo(() => {
    const rowMap: { [key: number]: number } = {};

    if (
      inMemory?.level === 'sorting' &&
      sortingColumns != null &&
      sortingColumns.length > 0
    ) {
      const inMemoryRowIndices = Object.keys(inMemoryValues);
      const wrappedValues: Array<{
        index: number;
        values: OuiDataGridInMemoryValues[number];
      }> = [];
      for (let i = 0; i < inMemoryRowIndices.length; i++) {
        const inMemoryRow = inMemoryValues[inMemoryRowIndices[i]];
        wrappedValues.push({ index: i, values: inMemoryRow });
      }

      wrappedValues.sort((a, b) => {
        for (let i = 0; i < sortingColumns.length; i++) {
          const column = sortingColumns[i];
          const aValue = a.values[column.id];
          const bValue = b.values[column.id];

          // get the comparator, based on schema
          let comparator = defaultComparator;
          if (schema.hasOwnProperty(column.id)) {
            const columnType = schema[column.id].columnType;
            for (let i = 0; i < schemaDetectors.length; i++) {
              const detector = schemaDetectors[i];
              if (
                detector.type === columnType &&
                detector.hasOwnProperty('comparator')
              ) {
                comparator = detector.comparator!;
              }
            }
          }

          const result = comparator(aValue, bValue, column.direction);
          // only return if the columns are unequal, otherwise allow the next sort-by column to run
          if (result !== 0) return result;
        }

        return 0;
      });

      for (let i = 0; i < wrappedValues.length; i++) {
        rowMap[i] = wrappedValues[i].index;
      }
    }

    return rowMap;
  }, [
    sortingColumns,
    inMemoryValues,
    schema,
    schemaDetectors,
    inMemory?.level,
  ]);

  const mergedPopoverContents = useMemo(
    () => ({
      ...providedPopoverContents,
      ...popoverContents,
    }),
    [popoverContents]
  );

  const headerRow = useMemo(() => {
    return (
      <OuiDataGridHeaderRow
        ref={headerRowRef}
        switchColumnPos={switchColumnPos}
        setVisibleColumns={setVisibleColumns}
        leadingControlColumns={leadingControlColumns}
        trailingControlColumns={trailingControlColumns}
        columns={columns}
        columnWidths={columnWidths}
        defaultColumnWidth={defaultColumnWidth}
        setColumnWidth={setColumnWidth}
        schema={schema}
        schemaDetectors={schemaDetectors}
        headerIsInteractive={headerIsInteractive}
      />
    );
  }, [
    switchColumnPos,
    setVisibleColumns,
    leadingControlColumns,
    trailingControlColumns,
    columns,
    columnWidths,
    defaultColumnWidth,
    setColumnWidth,
    schema,
    schemaDetectors,
    headerIsInteractive,
  ]);

  const footerRow = useMemo(() => {
    if (renderFooterCellValue == null) return null;
    return (
      <OuiDataGridFooterRow
        ref={footerRowRef}
        leadingControlColumns={leadingControlColumns}
        trailingControlColumns={trailingControlColumns}
        columns={columns}
        schema={schema}
        popoverContents={mergedPopoverContents}
        columnWidths={columnWidths}
        defaultColumnWidth={defaultColumnWidth}
        renderCellValue={renderFooterCellValue}
        rowIndex={visibleRowIndices.length}
        visibleRowIndex={visibleRowIndices.length}
        interactiveCellId={interactiveCellId}
      />
    );
  }, [
    columnWidths,
    columns,
    defaultColumnWidth,
    interactiveCellId,
    leadingControlColumns,
    mergedPopoverContents,
    renderFooterCellValue,
    schema,
    trailingControlColumns,
    visibleRowIndices.length,
  ]);

  const paginationOffset = pagination
    ? pagination.pageIndex * pagination.pageSize
    : 0;
  const getCorrectRowIndex = useCallback(
    (rowIndex: number) => {
      let rowIndexWithOffset = rowIndex;

      if (rowIndex - paginationOffset <= 0) {
        rowIndexWithOffset = rowIndex + paginationOffset;
      }

      const correctRowIndex = rowMap.hasOwnProperty(rowIndexWithOffset)
        ? rowMap[rowIndexWithOffset]
        : rowIndexWithOffset;

      return correctRowIndex;
    },
    [paginationOffset, rowMap]
  );

  const gridRef = useRef<Grid>(null);
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.resetAfterColumnIndex(0);
    }
  }, [columns, columnWidths, defaultColumnWidth]);

  const getWidth = useCallback(
    (index: number) => {
      if (index < leadingControlColumns.length) {
        // this is a leading control column
        return leadingControlColumns[index].width;
      } else if (index >= leadingControlColumns.length + columns.length) {
        // this is a trailing control column
        return trailingControlColumns[
          index - leadingControlColumns.length - columns.length
        ].width;
      }
      // normal data column
      return (
        columnWidths[columns[index - leadingControlColumns.length].id] ||
        defaultColumnWidth ||
        100
      );
    },
    [
      leadingControlColumns,
      columns,
      columnWidths,
      defaultColumnWidth,
      trailingControlColumns,
    ]
  );

  const [minRowHeight, setRowHeight] = useState(INITIAL_ROW_HEIGHT);
  const defaultHeight = useMemo(
    () =>
      rowHeightsOptions?.defaultHeight
        ? rowHeightUtils.getCalculatedHeight(
            rowHeightsOptions.defaultHeight,
            minRowHeight
          )
        : minRowHeight,
    [rowHeightsOptions, minRowHeight, rowHeightUtils]
  );

  const getRowHeight = useCallback(
    (rowIndex) => {
      const correctRowIndex = getCorrectRowIndex(rowIndex);
      let height = defaultHeight;

      if (rowHeightsOptions) {
        if (rowHeightsOptions.rowHeights) {
          const initialHeight = rowHeightsOptions.rowHeights[correctRowIndex];

          if (initialHeight) {
            height = rowHeightUtils.getCalculatedHeight(
              initialHeight,
              minRowHeight
            );
          }
        }
      }

      return height;
    },
    [
      minRowHeight,
      rowHeightsOptions,
      getCorrectRowIndex,
      rowHeightUtils,
      defaultHeight,
    ]
  );

  useEffect(() => {
    if (gridRef.current && rowHeightsOptions) {
      gridRef.current.resetAfterRowIndex(0);
    }
  }, [pagination?.pageIndex, rowHeightsOptions, gridStyles]);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.resetAfterRowIndex(0);
    }
  }, [getRowHeight]);

  const rowCountToAffordFor = pagination
    ? pagination.pageSize
    : visibleRowIndices.length;
  const unconstrainedHeight =
    defaultHeight * rowCountToAffordFor + headerRowHeight + footerRowHeight;

  // unable to determine this until the container's size is known anyway
  const unconstrainedWidth = 0;

  const [height, setHeight] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number | undefined>(undefined);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperDimensions = useResizeObserver({ elementRef: wrapperRef });

  // reset height constraint when rowCount changes
  useEffect(() => {
    setHeight(wrapperRef.current!.getBoundingClientRect().height);
  }, [rowCount]);

  useEffect(() => {
    const boundingRect = wrapperRef.current!.getBoundingClientRect();

    if (boundingRect.height !== unconstrainedHeight && !isFullScreen) {
      setHeight(boundingRect.height);
    }
    if (boundingRect.width !== unconstrainedWidth) {
      setWidth(boundingRect.width);
    }
  }, [unconstrainedHeight, wrapperDimensions, isFullScreen]);

  const preventTabbing = useCallback(() => {
    if (wrapperRef.current) {
      const tabbables = tabbable(wrapperRef.current);
      for (let i = 0; i < tabbables.length; i++) {
        const element = tabbables[i];
        if (
          element.getAttribute('role') !== 'gridcell' &&
          !element.dataset['ouigrid-tab-managed']
        ) {
          element.setAttribute('tabIndex', '-1');
          element.setAttribute('data-datagrid-interactable', 'true');
        }
      }
    }
  }, [wrapperRef]);

  let finalHeight = IS_JEST_ENVIRONMENT
    ? Number.MAX_SAFE_INTEGER
    : height || unconstrainedHeight;
  let finalWidth = IS_JEST_ENVIRONMENT
    ? Number.MAX_SAFE_INTEGER
    : width || unconstrainedWidth;
  if (isFullScreen) {
    finalHeight =
      window.innerHeight - toolbarHeight - headerRowHeight - footerRowHeight;
    finalWidth = window.innerWidth;
  }

  return (
    <OuiMutationObserver
      observerOptions={{ subtree: true, childList: true }}
      onMutation={preventTabbing}>
      {(mutationRef) => (
        <div
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
          ref={(el) => {
            wrapperRef.current = el;
            mutationRef(el);
          }}>
          {(IS_JEST_ENVIRONMENT || finalWidth > 0) && (
            <DataGridWrapperRowsContext.Provider
              value={{ headerRowHeight, headerRow, footerRow }}>
              <Grid
                ref={gridRef}
                innerElementType={InnerElement}
                className={VIRTUALIZED_CONTAINER_CLASS}
                columnCount={
                  leadingControlColumns.length +
                  columns.length +
                  trailingControlColumns.length
                }
                width={finalWidth}
                columnWidth={getWidth}
                height={finalHeight}
                rowHeight={getRowHeight}
                itemData={{
                  schemaDetectors,
                  setRowHeight,
                  getRowHeight,
                  getCorrectRowIndex,
                  rowMap,
                  rowOffset: pagination
                    ? pagination.pageIndex * pagination.pageSize
                    : 0,
                  leadingControlColumns,
                  trailingControlColumns,
                  columns,
                  schema,
                  popoverContents: mergedPopoverContents,
                  columnWidths,
                  defaultColumnWidth,
                  renderCellValue,
                  interactiveCellId,
                  rowHeightsOptions,
                }}
                rowCount={
                  IS_JEST_ENVIRONMENT || headerRowHeight > 0
                    ? visibleRowIndices.length
                    : 0
                }>
                {Cell}
              </Grid>
            </DataGridWrapperRowsContext.Provider>
          )}
        </div>
      )}
    </OuiMutationObserver>
  );
};
