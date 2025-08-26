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

import React, { useEffect, useState } from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { OuiDataGrid } from './';
import { requiredProps } from '../../test';
import { OuiDataGridRowHeightOption } from './data_grid_types';
import { keys } from '../../services';

jest.mock('./row_height_utils', () => {
  return {
    RowHeightUtils: jest.fn().mockImplementation(() => {
      return {
        computeStylesForGridCell: () => {},
        getCalculatedHeight: (
          heightOption: OuiDataGridRowHeightOption,
          defaultHeight: number
        ) => {
          if (typeof heightOption === 'object') {
            if (heightOption.lineCount) {
              return heightOption.lineCount;
            }

            if (heightOption.height) {
              return heightOption.height;
            }
          }

          if (heightOption) {
            return heightOption;
          }

          return defaultHeight;
        },
      };
    }),
    getStylesForCell: () => ({}),
  };
});

function getFocusableCell(container: HTMLElement) {
  const cells = container.querySelectorAll(
    '[data-test-subj="dataGridRowCell"]'
  );
  for (const cell of cells) {
    if ((cell as HTMLElement).tabIndex === 0) {
      return cell as HTMLElement;
    }
  }
  return null;
}

function extractGridData(
  container: HTMLElement,
  columnVisibility: { visibleColumns: string[] }
) {
  const rows: string[][] = [];

  // Get header cells
  const headerCells = container.querySelectorAll(
    '[data-test-subj*="dataGridHeaderCell"]'
  );
  const headerRow: string[] = [];
  headerCells.forEach((cell) => {
    const content = cell.querySelector('.ouiDataGridHeaderCell__content');
    if (content) {
      headerRow.push(content.textContent || '');
    }
  });
  rows.push(headerRow);

  // Get grid cells and organize into rows
  const columnCount = columnVisibility.visibleColumns.length;
  const gridCells = container.querySelectorAll(
    '[data-test-subj="dataGridRowCell"]'
  );
  const visibleRowsCount = gridCells.length / columnCount;

  for (let i = 0; i < visibleRowsCount; i++) {
    const rowContent: string[] = [];
    for (let j = i * columnCount; j < (i + 1) * columnCount; j++) {
      const cell = gridCells[j];
      const cellContent = cell.querySelector('[data-test-subj="cell-content"]');
      rowContent.push(cellContent?.textContent || '');
    }
    rows.push(rowContent);
  }

  return rows;
}

function extractRowHeights(container: HTMLElement) {
  const heights: { [key: string]: number } = {};
  const cells = container.querySelectorAll(
    '[data-test-subj="dataGridRowCell"]'
  );

  cells.forEach((cell) => {
    const cellContent = cell.querySelector('[data-test-subj="cell-content"]');
    if (cellContent) {
      const rowIndex =
        cellContent.getAttribute('data-row-index') ||
        cellContent.textContent?.match(/^(\d+),/)?.[1] ||
        '0';
      const style = (cell as HTMLElement).style;
      if (style.height) {
        heights[rowIndex] = parseFloat(style.height);
      }
    }
  });

  return heights;
}

function extractColumnWidths(container: HTMLElement) {
  const widths: { [key: string]: number } = {};
  const headerCells = container.querySelectorAll(
    '[data-test-subj*="dataGridHeaderCell-"]'
  );

  headerCells.forEach((cell) => {
    const testSubj = cell.getAttribute('data-test-subj');
    if (testSubj) {
      const match = testSubj.match(/dataGridHeaderCell-(.*)/);
      if (match) {
        const columnId = match[1];
        const style = (cell as HTMLElement).style;
        if (style.width) {
          widths[columnId] = parseFloat(style.width);
        }
      }
    }
  });

  return widths;
}

function resizeColumn(
  container: HTMLElement,
  columnId: string,
  columnWidth: number
) {
  const widths = extractColumnWidths(container);
  const originalWidth = widths[columnId] || 100;

  // Find the resizer element for this column
  const resizer = container.querySelector(
    `[data-test-subj="dataGridHeaderCell-${columnId}"] [data-test-subj="dataGridColumnResizer"]`
  ) as HTMLElement;

  if (resizer) {
    // Create proper mouse events with pageX property
    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    // Add pageX property to the event
    Object.defineProperty(mouseDownEvent, 'pageX', {
      value: originalWidth,
      writable: false,
    });

    const mouseMoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    Object.defineProperty(mouseMoveEvent, 'pageX', {
      value: columnWidth,
      writable: false,
    });

    const mouseUpEvent = new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    // Trigger the events
    act(() => {
      resizer.dispatchEvent(mouseDownEvent);
    });
    act(() => {
      window.dispatchEvent(mouseMoveEvent);
    });
    act(() => {
      window.dispatchEvent(mouseUpEvent);
    });
  }
}

function openColumnSorterSelection() {
  const columnSelectionPopover = document.body.querySelector(
    '[data-test-subj="dataGridColumnSortingPopoverColumnSelection"]'
  ) as HTMLElement;
  if (columnSelectionPopover) {
    const popoverButton = columnSelectionPopover.querySelector(
      'button'
    ) as HTMLButtonElement;
    if (popoverButton) {
      fireEvent.click(popoverButton);
    }
  }

  return columnSelectionPopover;
}

function closeColumnSorterSelection(container: HTMLElement) {
  const columnSelectionPopover = container.querySelector(
    '[data-test-subj="dataGridColumnSortingPopoverColumnSelection"]'
  ) as HTMLElement;

  if (columnSelectionPopover) {
    const popoverButton = columnSelectionPopover.querySelector(
      'button'
    ) as HTMLButtonElement;
    if (popoverButton) {
      fireEvent.click(popoverButton);
    }
  }

  return columnSelectionPopover;
}

function openColumnSorter(container: HTMLElement) {
  const popover = container.querySelector(
    '[data-test-subj="dataGridColumnSortingPopover"]'
  ) as HTMLElement;

  if (popover) {
    const popoverButton = popover.querySelector('button') as HTMLButtonElement;
    if (popoverButton) {
      fireEvent.click(popoverButton);
    }
  }

  return popover;
}

function closeColumnSorter(container: HTMLElement) {
  const popover = container.querySelector(
    '[data-test-subj="dataGridColumnSortingPopover"]'
  ) as HTMLElement;

  if (popover) {
    const popoverButton = popover.querySelector('button') as HTMLButtonElement;
    if (popoverButton) {
      fireEvent.click(popoverButton);
    }
  }

  return popover;
}

function sortByColumn(
  container: HTMLElement,
  columnId: string,
  direction: 'asc' | 'desc' | 'off'
) {
  // Open the column sorting popover first
  const sortingPopover = container.querySelector(
    '[data-test-subj="dataGridColumnSortingPopover"] button'
  );
  if (sortingPopover) {
    fireEvent.click(sortingPopover);
  }

  const inactiveFieldsSelector = document.querySelector(
    '[data-test-subj="dataGridColumnSortingPopoverColumnSelection"] button'
  );
  if (inactiveFieldsSelector) {
    fireEvent.click(inactiveFieldsSelector);
  }

  const columnPopover = document.querySelector(
    `[data-test-subj="dataGridColumnSortingPopoverColumnSelection-${columnId}"]`
  );

  if (columnPopover) {
    fireEvent.click(columnPopover);
  }

  // Find and click the sort button for the specific column and direction
  const sortButton = document.querySelector(
    `[data-test-subj="ouiDataGridColumnSorting-sortColumn-${columnId}-${direction}"]`
  ) as HTMLElement;
  if (sortButton) {
    fireEvent.click(sortButton);
  }
}

// Custom Jest matchers for RTL migration - simplified for DOM elements
expect.extend({
  toBeOuiPopover(received: HTMLElement) {
    const pass =
      received.getAttribute('data-test-subj')?.includes('Popover') || false;
    if (pass) {
      return {
        pass: true,
        message: () => 'expected element to not be OuiPopover',
      };
    } else {
      return {
        pass: false,
        message: () => 'expected element to be OuiPopover',
      };
    }
  },
  ouiPopoverToBeOpen(received: HTMLElement) {
    const pass =
      received.getAttribute('aria-expanded') === 'true' ||
      received.classList.contains('ouiPopover-isOpen') ||
      received.querySelector('[data-popover-open="true"]') !== null;
    if (pass) {
      return {
        pass: true,
        message: () => 'expected OuiPopover to be closed',
      };
    } else {
      return {
        pass: false,
        message: () => 'expected OuiPopover to be open',
      };
    }
  },
});
declare global {
  /* eslint-disable-next-line @typescript-eslint/no-namespace,no-redeclare */
  namespace jest {
    interface Matchers<R> {
      toBeOuiPopover(): R;
      ouiPopoverToBeOpen(): R;
    }
  }
}

async function openColumnSelector(container: HTMLElement) {
  const popover = container.querySelector(
    '[data-test-subj="dataGridColumnSelectorPopover"]'
  ) as HTMLElement;

  if (popover) {
    const popoverButton = popover.querySelector('button') as HTMLButtonElement;
    if (popoverButton) {
      fireEvent.click(popoverButton);
      // Wait for the popover content to be rendered
      await waitFor(() => {
        expect(
          document.body.querySelector('.ouiDataGridColumnSelector__item')
        ).toBeInTheDocument();
      });
    }
  }

  return popover;
}

async function closeColumnSelector(container: HTMLElement) {
  const popover = container.querySelector(
    '[data-test-subj="dataGridColumnSelectorPopover"]'
  ) as HTMLElement;

  if (popover) {
    const popoverButton = popover.querySelector('button') as HTMLButtonElement;
    if (popoverButton) {
      fireEvent.click(popoverButton);
      // Wait for the popover to close
      await waitFor(() => {
        expect(
          document.body.querySelector('.ouiDataGridColumnSelector__item')
        ).not.toBeInTheDocument();
      });
    }
  }

  return popover;
}

async function moveColumnToIndex(
  container: HTMLElement,
  columnId: string,
  nextIndex: number,
  setVisibleColumnsCallback: (columns: string[]) => void
) {
  // For RTL migration, we'll simulate the column reordering behavior
  // by opening the column selector, but using the callback to simulate drag and drop
  // as beautiful dnd uses custom events.
  await openColumnSelector(container);

  // Find columnIds from draggable elements
  const draggables: NodeListOf<HTMLElement> = document.querySelectorAll(
    '[data-rbd-draggable-id]'
  );
  const columnIds = [...draggables].map(
    (draggable) => draggable.dataset.rbdDraggableId
  );
  const currentIndex = columnIds.indexOf(columnId);
  if (currentIndex === -1) {
    throw new Error(`Column ${columnId} not found in draggable column list`);
  }

  // move the column
  const newColumnIds = [...columnIds] as string[];
  const [movedColumn] = newColumnIds.splice(currentIndex, 1);
  newColumnIds.splice(nextIndex, 0, movedColumn);

  // Use act to wrap the state update callback
  act(() => {
    setVisibleColumnsCallback(newColumnIds);
  });

  await closeColumnSelector(container);
}

describe('OuiDataGrid', () => {
  describe('rendering', () => {
    const getBoundingClientRect =
      window.Element.prototype.getBoundingClientRect;
    beforeAll(() => {
      window.Element.prototype.getBoundingClientRect = () =>
        ({ width: 100, height: 100 } as DOMRect);
    });
    afterAll(() => {
      window.Element.prototype.getBoundingClientRect = getBoundingClientRect;
    });

    it('renders with common and div attributes', () => {
      const { container } = render(
        <OuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}, ${columnId}`
          }
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('renders custom column headers', () => {
      const { container } = render(
        <OuiDataGrid
          {...requiredProps}
          columns={[
            { id: 'A', display: 'Column A' },
            { id: 'B', display: <div>More Elements</div> },
          ]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}, ${columnId}`
          }
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('renders and applies custom props', () => {
      const { container } = render(
        <OuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId, setCellProps }) => {
            useEffect(() => {
              setCellProps({
                className: 'customClass',
                'data-test-subj': `cell-${rowIndex}-${columnId}`,
                style: { color: columnId === 'A' ? 'red' : 'blue' },
              });
            }, [columnId, rowIndex, setCellProps]);

            return `${rowIndex}, ${columnId}`;
          }}
        />
      );

      const cells = container.querySelectorAll('.ouiDataGridRowCell');
      const cellProps = Array.from(cells).map((cell: Element) => {
        const htmlCell = cell as HTMLElement;
        return {
          className: htmlCell.className,
          'data-test-subj': htmlCell.getAttribute('data-test-subj'),
          role: htmlCell.getAttribute('role'),
          style: {
            color: htmlCell.style.color,
            height: parseFloat(htmlCell.style.height) || undefined,
            left: parseFloat(htmlCell.style.left) || undefined,
            position: htmlCell.style.position || undefined,
            right: htmlCell.style.right || undefined,
            top: htmlCell.style.top,
            width: parseFloat(htmlCell.style.width) || undefined,
          },
          tabIndex: htmlCell.tabIndex,
        };
      });

      expect(cellProps).toMatchInlineSnapshot(`
        Array [
          Object {
            "className": "ouiDataGridRowCell ouiDataGridRowCell--firstColumn customClass",
            "data-test-subj": "dataGridRowCell",
            "role": "gridcell",
            "style": Object {
              "color": "red",
              "height": 34,
              "left": undefined,
              "position": "absolute",
              "right": undefined,
              "top": "100px",
              "width": 100,
            },
            "tabIndex": -1,
          },
          Object {
            "className": "ouiDataGridRowCell ouiDataGridRowCell--lastColumn customClass",
            "data-test-subj": "dataGridRowCell",
            "role": "gridcell",
            "style": Object {
              "color": "blue",
              "height": 34,
              "left": 100,
              "position": "absolute",
              "right": undefined,
              "top": "100px",
              "width": 100,
            },
            "tabIndex": -1,
          },
          Object {
            "className": "ouiDataGridRowCell ouiDataGridRowCell--stripe ouiDataGridRowCell--firstColumn customClass",
            "data-test-subj": "dataGridRowCell",
            "role": "gridcell",
            "style": Object {
              "color": "red",
              "height": 34,
              "left": undefined,
              "position": "absolute",
              "right": undefined,
              "top": "134px",
              "width": 100,
            },
            "tabIndex": -1,
          },
          Object {
            "className": "ouiDataGridRowCell ouiDataGridRowCell--stripe ouiDataGridRowCell--lastColumn customClass",
            "data-test-subj": "dataGridRowCell",
            "role": "gridcell",
            "style": Object {
              "color": "blue",
              "height": 34,
              "left": 100,
              "position": "absolute",
              "right": undefined,
              "top": "134px",
              "width": 100,
            },
            "tabIndex": -1,
          },
        ]
      `);
    });

    it('renders correct aria attributes on column headers', () => {
      const TestComponent = ({ sorting }: { sorting?: any }) => (
        <OuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={1}
          renderCellValue={() => 'value'}
          sorting={sorting}
        />
      );

      const { container, rerender } = render(<TestComponent />);

      // no columns are sorted, expect no aria-sort or aria-describedby attributes
      expect(
        container.querySelectorAll('[role="columnheader"][aria-sort]').length
      ).toBe(0);
      expect(
        container.querySelectorAll('[role="columnheader"][aria-describedby]')
          .length
      ).toBe(0);

      // sort on one column
      rerender(
        <TestComponent
          sorting={{
            columns: [{ id: 'A', direction: 'asc' }],
            onSort: () => {},
          }}
        />
      );

      // expect A column to have aria-sort, expect no aria-describedby
      expect(
        container.querySelectorAll('[role="columnheader"][aria-sort]').length
      ).toBe(1);
      expect(
        container.querySelectorAll(
          '[role="columnheader"][aria-sort="ascending"][data-test-subj="dataGridHeaderCell-A"]'
        ).length
      ).toBe(1);
      expect(
        container.querySelectorAll('[role="columnheader"][aria-describedby]')
          .length
      ).toBe(0);

      // sort on both columns
      rerender(
        <TestComponent
          sorting={{
            columns: [
              { id: 'A', direction: 'asc' },
              { id: 'B', direction: 'desc' },
            ],
            onSort: () => {},
          }}
        />
      );

      // expect no aria-sort, both columns have aria-describedby
      expect(
        container.querySelectorAll('[role="columnheader"][aria-sort]').length
      ).toBe(0);
      expect(
        container.querySelectorAll('[role="columnheader"][aria-describedby]')
          .length
      ).toBe(2);
      expect(
        container.querySelectorAll(
          '[role="columnheader"][aria-describedby="generated-id"]'
        ).length
      ).toBe(2);
    });

    it('renders additional toolbar controls', () => {
      const { container } = render(
        <OuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}, ${columnId}`
          }
          toolbarVisibility={{ additionalControls: <button>Button</button> }}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('renders control columns', () => {
      const { container } = render(
        <OuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          leadingControlColumns={[
            {
              id: 'leading',
              width: 50,
              headerCellRender: () => <span>leading heading</span>,
              rowCellRender: ({ rowIndex }) => rowIndex,
            },
          ]}
          trailingControlColumns={[
            {
              id: 'trailing',
              width: 50,
              headerCellRender: () => <span>trailing heading</span>,
              rowCellRender: ({ rowIndex }) => rowIndex,
            },
          ]}
          rowCount={3}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}, ${columnId}`
          }
          toolbarVisibility={{ additionalControls: <button>Button</button> }}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('can hide the toolbar', () => {
      const TestComponent = ({
        toolbarVisibility,
      }: {
        toolbarVisibility?: any;
      }) => (
        <OuiDataGrid
          {...requiredProps}
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          toolbarVisibility={toolbarVisibility}
          rowCount={1}
          renderCellValue={() => 'value'}
        />
      );

      const { container, rerender } = render(
        <TestComponent toolbarVisibility={false} />
      );

      // The toolbar should not show
      expect(
        container.querySelectorAll('[data-test-subj="dataGridControls"]').length
      ).toBe(0);

      // Check for false / true and unset values
      rerender(
        <TestComponent
          toolbarVisibility={{
            showFullScreenSelector: false,
            showSortSelector: false,
            showStyleSelector: true,
          }}
        />
      );

      // fullscreen selector
      expect(
        container.querySelectorAll('[data-test-subj="dataGridFullScrenButton"]')
          .length
      ).toBe(0);

      // sort selector
      expect(
        container.querySelectorAll(
          '[data-test-subj="dataGridColumnSortingButton"]'
        ).length
      ).toBe(0);

      // style selector
      expect(
        container.querySelectorAll(
          '[data-test-subj="dataGridStyleSelectorButton"]'
        ).length
      ).toBe(1);

      // column selector
      expect(
        container.querySelectorAll(
          '[data-test-subj="dataGridColumnSelectorButton"]'
        ).length
      ).toBe(1);
    });

    describe('schema classnames', () => {
      it('applies classnames from explicit schemas', () => {
        const { container } = render(
          <OuiDataGrid
            {...requiredProps}
            columns={[
              { id: 'A', schema: 'numeric' },
              { id: 'B', schema: 'customFormatName' },
            ]}
            columnVisibility={{
              visibleColumns: ['A', 'B'],
              setVisibleColumns: () => {},
            }}
            rowCount={3}
            renderCellValue={({ rowIndex, columnId }) =>
              `${rowIndex}, ${columnId}`
            }
          />
        );

        const gridCells = container.querySelectorAll(
          '[class*="ouiDataGridRowCell--"]'
        );
        const gridCellClassNames = Array.from(gridCells).map(
          (cell) => (cell as HTMLElement).className
        );
        expect(gridCellClassNames).toMatchInlineSnapshot(`
          Array [
            "ouiDataGridRowCell ouiDataGridRowCell--numeric ouiDataGridRowCell--firstColumn",
            "ouiDataGridRowCell ouiDataGridRowCell--customFormatName ouiDataGridRowCell--lastColumn",
            "ouiDataGridRowCell ouiDataGridRowCell--numeric ouiDataGridRowCell--stripe ouiDataGridRowCell--firstColumn",
            "ouiDataGridRowCell ouiDataGridRowCell--customFormatName ouiDataGridRowCell--stripe ouiDataGridRowCell--lastColumn",
            "ouiDataGridRowCell ouiDataGridRowCell--numeric ouiDataGridRowCell--firstColumn",
            "ouiDataGridRowCell ouiDataGridRowCell--customFormatName ouiDataGridRowCell--lastColumn",
          ]
        `);
      });

      it('automatically detects column types and applies classnames', () => {
        const { container } = render(
          <OuiDataGrid
            {...requiredProps}
            columns={[{ id: 'A' }, { id: 'B' }, { id: 'C' }]}
            columnVisibility={{
              visibleColumns: ['A', 'B', 'C'],
              setVisibleColumns: () => {},
            }}
            inMemory={{ level: 'pagination' }}
            rowCount={2}
            renderCellValue={({ columnId }) => {
              if (columnId === 'A') {
                return 5.5;
              } else if (columnId === 'B') {
                return 'true';
              } else {
                return 'asdf';
              }
            }}
          />
        );

        const gridCells = container.querySelectorAll(
          '[class~="ouiDataGridRowCell"]'
        );
        const gridCellClassNames = Array.from(gridCells).map(
          (cell) => (cell as HTMLElement).className
        );
        expect(gridCellClassNames).toMatchInlineSnapshot(`
          Array [
            "ouiDataGridRowCell ouiDataGridRowCell--numeric ouiDataGridRowCell--firstColumn",
            "ouiDataGridRowCell ouiDataGridRowCell--boolean",
            "ouiDataGridRowCell ouiDataGridRowCell--lastColumn",
            "ouiDataGridRowCell ouiDataGridRowCell--numeric ouiDataGridRowCell--stripe ouiDataGridRowCell--firstColumn",
            "ouiDataGridRowCell ouiDataGridRowCell--boolean ouiDataGridRowCell--stripe",
            "ouiDataGridRowCell ouiDataGridRowCell--stripe ouiDataGridRowCell--lastColumn",
          ]
        `);
      });

      it('overrides automatically detected column types with supplied schema', () => {
        const { container } = render(
          <OuiDataGrid
            {...requiredProps}
            columns={[{ id: 'A' }, { id: 'B', schema: 'alphanumeric' }]}
            columnVisibility={{
              visibleColumns: ['A', 'B'],
              setVisibleColumns: () => {},
            }}
            inMemory={{ level: 'pagination' }}
            rowCount={2}
            renderCellValue={({ columnId }) =>
              columnId === 'A' ? 5.5 : 'true'
            }
          />
        );

        const gridCells = container.querySelectorAll(
          '[class~="ouiDataGridRowCell"]'
        );
        const gridCellClassNames = Array.from(gridCells).map(
          (cell) => (cell as HTMLElement).className
        );
        expect(gridCellClassNames).toMatchInlineSnapshot(`
          Array [
            "ouiDataGridRowCell ouiDataGridRowCell--numeric ouiDataGridRowCell--firstColumn",
            "ouiDataGridRowCell ouiDataGridRowCell--alphanumeric ouiDataGridRowCell--lastColumn",
            "ouiDataGridRowCell ouiDataGridRowCell--numeric ouiDataGridRowCell--stripe ouiDataGridRowCell--firstColumn",
            "ouiDataGridRowCell ouiDataGridRowCell--alphanumeric ouiDataGridRowCell--stripe ouiDataGridRowCell--lastColumn",
          ]
        `);
      });

      it('detects all of the supported types', () => {
        const values: { [key: string]: string } = {
          A: '-5.80',
          B: 'false',
          C: '$-5.80',
          E: '2019-09-18T12:31:28',
          F: '2019-09-18T12:31:28Z',
          G: '2019-09-18T12:31:28.234',
          H: '2019-09-18T12:31:28.234+0300',
        };
        const { container } = render(
          <OuiDataGrid
            {...requiredProps}
            columns={Object.keys(values).map((id) => ({ id }))}
            columnVisibility={{
              visibleColumns: Object.keys(values),
              setVisibleColumns: () => {},
            }}
            inMemory={{ level: 'pagination' }}
            rowCount={1}
            renderCellValue={({ columnId }) => values[columnId]}
          />
        );

        const gridCells = container.querySelectorAll(
          '[class~="ouiDataGridRowCell"]'
        );
        const gridCellClassNames = Array.from(gridCells).map(
          (cell) => (cell as HTMLElement).className
        );
        expect(gridCellClassNames).toMatchInlineSnapshot(`
          Array [
            "ouiDataGridRowCell ouiDataGridRowCell--numeric ouiDataGridRowCell--firstColumn",
            "ouiDataGridRowCell ouiDataGridRowCell--boolean",
            "ouiDataGridRowCell ouiDataGridRowCell--currency",
            "ouiDataGridRowCell ouiDataGridRowCell--datetime",
            "ouiDataGridRowCell ouiDataGridRowCell--datetime",
            "ouiDataGridRowCell ouiDataGridRowCell--datetime",
            "ouiDataGridRowCell ouiDataGridRowCell--datetime ouiDataGridRowCell--lastColumn",
          ]
        `);
      });

      it('accepts extra detectors', () => {
        const values: { [key: string]: string } = {
          A: '-5.80',
          B: '127.0.0.1',
        };
        const { container } = render(
          <OuiDataGrid
            {...requiredProps}
            columns={Object.keys(values).map((id) => ({ id }))}
            columnVisibility={{
              visibleColumns: Object.keys(values),
              setVisibleColumns: () => {},
            }}
            schemaDetectors={[
              {
                type: 'ipaddress',
                detector(value: string) {
                  return value.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)
                    ? 1
                    : 0;
                },
                icon: 'alert',
                color: 'primary',
                sortTextAsc: 'a-z',
                sortTextDesc: 'z-a',
              },
            ]}
            inMemory={{ level: 'pagination' }}
            rowCount={1}
            renderCellValue={({ columnId }) => values[columnId]}
          />
        );

        const gridCells = container.querySelectorAll(
          '[class~="ouiDataGridRowCell"]'
        );
        const gridCellClassNames = Array.from(gridCells).map(
          (cell) => (cell as HTMLElement).className
        );
        expect(gridCellClassNames).toMatchInlineSnapshot(`
          Array [
            "ouiDataGridRowCell ouiDataGridRowCell--numeric ouiDataGridRowCell--firstColumn",
            "ouiDataGridRowCell ouiDataGridRowCell--ipaddress ouiDataGridRowCell--lastColumn",
          ]
        `);
      });
    });
  });

  describe('cell rendering', () => {
    it('supports hooks', () => {
      const { container } = render(
        <OuiDataGrid
          aria-label="test"
          columns={[{ id: 'Column 1' }, { id: 'Column 2' }]}
          columnVisibility={{
            visibleColumns: ['Column 1', 'Column 2'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) => {
            const value = `Hello, Row ${rowIndex}-${columnId}!`;
            return <span data-test-subj="cell-content">{value}</span>;
          }}
        />
      );

      expect(
        extractGridData(container, { visibleColumns: ['Column 1', 'Column 2'] })
      ).toMatchInlineSnapshot(`
        Array [
          Array [
            "Column 1",
            "Column 2",
          ],
          Array [
            "Hello, Row 0-Column 1!",
            "Hello, Row 0-Column 2!",
          ],
          Array [
            "Hello, Row 1-Column 1!",
            "Hello, Row 1-Column 2!",
          ],
        ]
      `);
    });
  });

  describe('pagination', () => {
    it('renders', () => {
      const { container } = render(
        <OuiDataGrid
          aria-label="test grid"
          columns={[{ id: 'Column' }]}
          columnVisibility={{
            visibleColumns: ['Column'],
            setVisibleColumns: () => {},
          }}
          rowCount={10}
          renderCellValue={({ rowIndex }) => rowIndex}
          pagination={{
            pageIndex: 1,
            pageSize: 6,
            pageSizeOptions: [3, 6, 10],
            onChangePage: () => {},
            onChangeItemsPerPage: () => {},
          }}
        />
      );

      const pagination = container.querySelector('.ouiDataGrid__pagination');
      expect(pagination).toMatchSnapshot();
    });

    describe('page navigation', () => {
      it('next button pages through content', () => {
        const onChangePage = jest.fn();

        const TestComponent = () => {
          const [pageIndex, setPageIndex] = useState(0);

          const handlePageChange = (newPageIndex: number) => {
            onChangePage(newPageIndex);
            setPageIndex(newPageIndex);
          };

          return (
            <OuiDataGrid
              aria-label="test grid"
              columns={[{ id: 'Column' }]}
              columnVisibility={{
                visibleColumns: ['Column'],
                setVisibleColumns: () => {},
              }}
              rowCount={8}
              renderCellValue={({ rowIndex }) => (
                <span data-test-subj="cell-content">{rowIndex}</span>
              )}
              pagination={{
                pageIndex,
                pageSize: 3,
                pageSizeOptions: [3, 6, 10],
                onChangePage: handlePageChange,
                onChangeItemsPerPage: jest.fn(),
              }}
            />
          );
        };

        const { container } = render(<TestComponent />);

        expect(
          extractGridData(container, { visibleColumns: ['Column'] })
        ).toEqual([['Column'], ['0'], ['1'], ['2']]);

        const nextButton = screen.getByTestId('pagination-button-next');
        fireEvent.click(nextButton);

        expect(onChangePage).toHaveBeenCalledTimes(1);
        expect(onChangePage).toHaveBeenCalledWith(1);

        expect(
          extractGridData(container, { visibleColumns: ['Column'] })
        ).toEqual([['Column'], ['3'], ['4'], ['5']]);

        fireEvent.click(nextButton);

        expect(onChangePage).toHaveBeenCalledTimes(2);
        expect(onChangePage).toHaveBeenCalledWith(2);

        expect(
          extractGridData(container, { visibleColumns: ['Column'] })
        ).toEqual([['Column'], ['6'], ['7']]);
      });

      it('pages are navigable through page links', () => {
        const onChangePage = jest.fn();

        const TestComponent = () => {
          const [pageIndex, setPageIndex] = useState(0);

          const handlePageChange = (newPageIndex: number) => {
            onChangePage(newPageIndex);
            setPageIndex(newPageIndex);
          };

          return (
            <OuiDataGrid
              aria-label="test grid"
              columns={[{ id: 'Column' }]}
              columnVisibility={{
                visibleColumns: ['Column'],
                setVisibleColumns: () => {},
              }}
              rowCount={8}
              renderCellValue={({ rowIndex }) => (
                <span data-test-subj="cell-content">{rowIndex}</span>
              )}
              pagination={{
                pageIndex,
                pageSize: 3,
                pageSizeOptions: [3, 6, 10],
                onChangePage: handlePageChange,
                onChangeItemsPerPage: jest.fn(),
              }}
            />
          );
        };

        const { container } = render(<TestComponent />);

        expect(
          extractGridData(container, { visibleColumns: ['Column'] })
        ).toEqual([['Column'], ['0'], ['1'], ['2']]);

        // goto page 3
        const page3Button = screen.getByTestId('pagination-button-2');
        fireEvent.click(page3Button);

        expect(onChangePage).toHaveBeenCalledTimes(1);
        expect(onChangePage).toHaveBeenCalledWith(2);

        expect(
          extractGridData(container, { visibleColumns: ['Column'] })
        ).toEqual([['Column'], ['6'], ['7']]);

        // goto page 2
        const page2Button = screen.getByTestId('pagination-button-1');
        fireEvent.click(page2Button);

        expect(onChangePage).toHaveBeenCalledTimes(2);
        expect(onChangePage).toHaveBeenCalledWith(1);

        expect(
          extractGridData(container, { visibleColumns: ['Column'] })
        ).toEqual([['Column'], ['3'], ['4'], ['5']]);
      });
    });

    it('changes the page size', () => {
      const onChangeItemsPerPage = jest.fn();

      const TestComponent = () => {
        const [pageSize, setPageSize] = useState(3);

        const handlePageSizeChange = (newPageSize: number) => {
          onChangeItemsPerPage(newPageSize);
          setPageSize(newPageSize);
        };

        return (
          <OuiDataGrid
            aria-label="test grid"
            columns={[{ id: 'Column' }]}
            columnVisibility={{
              visibleColumns: ['Column'],
              setVisibleColumns: () => {},
            }}
            rowCount={8}
            renderCellValue={({ rowIndex }) => (
              <span data-test-subj="cell-content">{rowIndex}</span>
            )}
            pagination={{
              pageIndex: 0,
              pageSize,
              pageSizeOptions: [3, 6, 10],
              onChangePage: jest.fn(),
              onChangeItemsPerPage: handlePageSizeChange,
            }}
          />
        );
      };

      const { container } = render(<TestComponent />);

      expect(
        extractGridData(container, { visibleColumns: ['Column'] })
      ).toEqual([['Column'], ['0'], ['1'], ['2']]);

      const pageSizeButton = screen.getByTestId('tablePaginationPopoverButton');
      fireEvent.click(pageSizeButton);

      const rowButtons: NodeListOf<HTMLButtonElement> = document.body.querySelectorAll(
        '.ouiContextMenuItem'
      );
      expect(
        Array.prototype.map.call(
          rowButtons,
          (button: HTMLDivElement) => button.textContent || ''
        )
      ).toEqual(['3 rows', '6 rows', '10 rows']);
      fireEvent.click(rowButtons[1]);

      expect(onChangeItemsPerPage).toHaveBeenCalledTimes(1);
      expect(onChangeItemsPerPage).toHaveBeenCalledWith(6);

      expect(
        extractGridData(container, { visibleColumns: ['Column'] })
      ).toEqual([['Column'], ['0'], ['1'], ['2'], ['3'], ['4'], ['5']]);
    });
  });

  describe('column sizing', () => {
    it('uses a columns initialWidth', () => {
      const { container } = render(
        <OuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'Column 1', initialWidth: 400 }, { id: 'Column 2' }]}
          columnVisibility={{
            visibleColumns: ['Column 1', 'Column 2'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={() => 'value'}
        />
      );

      const originalCellWidths = extractColumnWidths(container);
      expect(originalCellWidths).toEqual({
        'Column 1': 400,
        'Column 2': 100,
      });
    });

    describe('resizing', () => {
      it('resizes a column by grab handles', async () => {
        const { container } = render(
          <OuiDataGrid
            aria-labelledby="#test"
            columns={[{ id: 'Column 1' }, { id: 'Column 2' }]}
            columnVisibility={{
              visibleColumns: ['Column 1', 'Column 2'],
              setVisibleColumns: () => {},
            }}
            rowCount={3}
            renderCellValue={() => 'value'}
          />
        );

        const originalCellWidths = extractColumnWidths(container);
        expect(originalCellWidths).toEqual({
          'Column 1': 100,
          'Column 2': 100,
        });

        resizeColumn(container, 'Column 1', 150);

        const updatedCellWidths = extractColumnWidths(container);
        expect(updatedCellWidths).toEqual({
          'Column 1': 150,
          'Column 2': 100,
        });
      });

      it('should listen for column resize', () => {
        const onColumnResizeCallback = jest.fn();
        const { container } = render(
          <OuiDataGrid
            aria-labelledby="#test"
            columns={[{ id: 'Column 1' }, { id: 'Column 2', initialWidth: 75 }]}
            columnVisibility={{
              visibleColumns: ['Column 1', 'Column 2'],
              setVisibleColumns: () => {},
            }}
            rowCount={3}
            renderCellValue={() => 'value'}
            onColumnResize={(args) => onColumnResizeCallback(args)}
          />
        );

        resizeColumn(container, 'Column 1', 150);
        resizeColumn(container, 'Column 2', 100);

        expect(onColumnResizeCallback.mock.calls.length).toBe(2);
        expect(onColumnResizeCallback.mock.calls[0][0]).toEqual({
          columnId: 'Column 1',
          width: 150,
        });
        expect(onColumnResizeCallback.mock.calls[1][0]).toEqual({
          columnId: 'Column 2',
          width: 100,
        });
      });

      it('is prevented by isResizable:false', () => {
        const { container } = render(
          <OuiDataGrid
            aria-labelledby="#test"
            columns={[
              { id: 'Column 1', isResizable: false },
              { id: 'Column 2' },
            ]}
            columnVisibility={{
              visibleColumns: ['Column 1', 'Column 2'],
              setVisibleColumns: () => {},
            }}
            rowCount={3}
            renderCellValue={() => 'value'}
          />
        );

        const originalCellWidths = extractColumnWidths(container);
        expect(originalCellWidths).toEqual({
          'Column 1': 100,
          'Column 2': 100,
        });

        // verify there is no resizer on Column 1 but that there is on Column 2
        expect(
          container.querySelectorAll(
            '[data-test-subj="dataGridHeaderCell-Column 1"] [data-test-subj="dataGridColumnResizer"]'
          ).length
        ).toBe(0);
        expect(
          container.querySelectorAll(
            '[data-test-subj="dataGridHeaderCell-Column 2"] [data-test-subj="dataGridColumnResizer"]'
          ).length
        ).toBe(1);
      });

      it('does not trigger value re-renders', () => {
        const renderCellValue = jest.fn(() => 'value');

        const { container } = render(
          <OuiDataGrid
            aria-labelledby="#test"
            columns={[{ id: 'ColumnA' }]}
            columnVisibility={{
              visibleColumns: ['ColumnA'],
              setVisibleColumns: () => {},
            }}
            rowCount={3}
            renderCellValue={renderCellValue}
          />
        );

        expect(renderCellValue).toHaveBeenCalledTimes(3);
        renderCellValue.mockClear();

        resizeColumn(container, 'ColumnA', 200);

        expect(extractColumnWidths(container)).toEqual({ ColumnA: 200 });
        expect(renderCellValue).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('column options', () => {
    it('column visibility can be toggled', () => {
      let currentVisibleColumns = ['ColumnA', 'ColumnB'];
      let setVisibleColumnsCallback: (columns: string[]) => void;

      const TestComponent = () => {
        const [visibleColumns, setVisibleColumns] = useState(
          currentVisibleColumns
        );

        setVisibleColumnsCallback = (newColumns: string[]) => {
          currentVisibleColumns = newColumns;
          setVisibleColumns(newColumns);
        };

        return (
          <OuiDataGrid
            aria-labelledby="#test"
            columns={[{ id: 'ColumnA' }, { id: 'ColumnB' }]}
            columnVisibility={{
              visibleColumns,
              setVisibleColumns,
            }}
            rowCount={2}
            renderCellValue={({ rowIndex, columnId }) => (
              <span data-test-subj="cell-content">{`${rowIndex}-${columnId}`}</span>
            )}
          />
        );
      };

      const { container, rerender } = render(<TestComponent />);

      expect(
        extractGridData(container, { visibleColumns: ['ColumnA', 'ColumnB'] })
      ).toEqual([
        ['ColumnA', 'ColumnB'],
        ['0-ColumnA', '0-ColumnB'],
        ['1-ColumnA', '1-ColumnB'],
      ]);

      // Hide ColumnA
      act(() => {
        setVisibleColumnsCallback(['ColumnB']);
      });
      rerender(<TestComponent />);

      expect(
        extractGridData(container, { visibleColumns: ['ColumnB'] })
      ).toEqual([['ColumnB'], ['0-ColumnB'], ['1-ColumnB']]);

      // Show ColumnA again
      act(() => {
        setVisibleColumnsCallback(['ColumnA', 'ColumnB']);
      });
      rerender(<TestComponent />);

      expect(
        extractGridData(container, { visibleColumns: ['ColumnA', 'ColumnB'] })
      ).toEqual([
        ['ColumnA', 'ColumnB'],
        ['0-ColumnA', '0-ColumnB'],
        ['1-ColumnA', '1-ColumnB'],
      ]);
    });

    it('column order can be changed', async () => {
      let currentVisibleColumns = ['ColumnA', 'ColumnB'];
      let setVisibleColumnsCallback: (columns: string[]) => void = () => {};

      const TestComponent = () => {
        const [visibleColumns, setVisibleColumns] = useState(
          currentVisibleColumns
        );

        setVisibleColumnsCallback = (newColumns: string[]) => {
          currentVisibleColumns = newColumns;
          setVisibleColumns(newColumns);
        };

        return (
          <OuiDataGrid
            aria-labelledby="#test"
            columns={[{ id: 'ColumnA' }, { id: 'ColumnB' }]}
            columnVisibility={{
              visibleColumns,
              setVisibleColumns,
            }}
            rowCount={2}
            renderCellValue={({ rowIndex, columnId }) => (
              <span data-test-subj="cell-content">{`${rowIndex}-${columnId}`}</span>
            )}
          />
        );
      };

      const { container } = render(<TestComponent />);

      expect(
        extractGridData(container, { visibleColumns: ['ColumnA', 'ColumnB'] })
      ).toEqual([
        ['ColumnA', 'ColumnB'],
        ['0-ColumnA', '0-ColumnB'],
        ['1-ColumnA', '1-ColumnB'],
      ]);

      await moveColumnToIndex(
        container,
        'ColumnB',
        0,
        setVisibleColumnsCallback
      );

      // Wait for the state update to be reflected in the DOM
      await waitFor(() => {
        expect(
          extractGridData(container, { visibleColumns: ['ColumnB', 'ColumnA'] })
        ).toEqual([
          ['ColumnB', 'ColumnA'],
          ['0-ColumnB', '0-ColumnA'],
          ['1-ColumnB', '1-ColumnA'],
        ]);
      });
    });
  });

  describe('column sorting', () => {
    it('calls the onSort callback', () => {
      const onSort = jest.fn();

      const TestComponent = () => {
        const [sortColumns, setSortColumns] = useState<
          Array<{ id: string; direction: 'asc' | 'desc' }>
        >([]);

        const handleSort = (
          columns: Array<{ id: string; direction: 'asc' | 'desc' }>
        ) => {
          onSort(columns);
          setSortColumns(columns);
        };

        return (
          <OuiDataGrid
            aria-labelledby="#test"
            columns={[{ id: 'ColumnA' }]}
            columnVisibility={{
              visibleColumns: ['ColumnA'],
              setVisibleColumns: () => {},
            }}
            rowCount={1}
            sorting={{
              columns: sortColumns,
              onSort: handleSort,
            }}
            renderCellValue={() => (
              <span data-test-subj="cell-content">hello</span>
            )}
          />
        );
      };

      const { container } = render(<TestComponent />);

      // Sort by ColumnA descending using the sortByColumn helper
      sortByColumn(container, 'ColumnA', 'desc');

      expect(onSort).toHaveBeenCalledTimes(2);
      expect(onSort).toHaveBeenCalledWith([
        { id: 'ColumnA', direction: 'asc' },
      ]);
      expect(onSort).toHaveBeenCalledWith([
        { id: 'ColumnA', direction: 'desc' },
      ]);
    });

    describe('in-memory sorting', () => {
      it('sorts on initial render', () => {
        const { container } = render(
          <OuiDataGrid
            aria-label="test"
            columns={[{ id: 'A' }, { id: 'B' }]}
            columnVisibility={{
              visibleColumns: ['A', 'B'],
              setVisibleColumns: () => {},
            }}
            rowCount={5}
            renderCellValue={({ rowIndex, columnId }) => (
              // render A 0->4 and B 9->5
              <span data-test-subj="cell-content">
                {columnId === 'A' ? rowIndex : 9 - rowIndex}
              </span>
            )}
            inMemory={{ level: 'sorting' }}
            sorting={{
              columns: [{ id: 'A', direction: 'desc' }],
              onSort: () => {},
            }}
          />
        );

        expect(
          extractGridData(container, { visibleColumns: ['A', 'B'] })
        ).toEqual([
          ['A', 'B'],
          ['4', '5'],
          ['3', '6'],
          ['2', '7'],
          ['1', '8'],
          ['0', '9'],
        ]);
      });

      it('sorts on multiple columns', () => {
        const { container } = render(
          <OuiDataGrid
            aria-label="test"
            columns={[{ id: 'A' }, { id: 'B' }]}
            columnVisibility={{
              visibleColumns: ['A', 'B'],
              setVisibleColumns: () => {},
            }}
            rowCount={5}
            renderCellValue={({ rowIndex, columnId }) => (
              // render A as 0, 1, 0, 1, 0 and B as 9->5
              <span data-test-subj="cell-content">
                {columnId === 'A' ? rowIndex % 2 : 9 - rowIndex}
              </span>
            )}
            inMemory={{ level: 'sorting' }}
            sorting={{
              columns: [
                { id: 'A', direction: 'desc' },
                { id: 'B', direction: 'asc' },
              ],
              onSort: () => {},
            }}
          />
        );

        expect(
          extractGridData(container, { visibleColumns: ['A', 'B'] })
        ).toEqual([
          ['A', 'B'],
          ['1', '6'],
          ['1', '8'],
          ['0', '5'],
          ['0', '7'],
          ['0', '9'],
        ]);
      });

      it('sorts in response to user interaction', () => {
        const onSort = jest.fn();

        const TestComponent = () => {
          const [sortColumns, setSortColumns] = useState<
            Array<{ id: string; direction: 'asc' | 'desc' }>
          >([]);

          const handleSort = (
            columns: Array<{ id: string; direction: 'asc' | 'desc' }>
          ) => {
            onSort(columns);
            setSortColumns(columns);
          };

          return (
            <OuiDataGrid
              aria-labelledby="#test"
              columns={[{ id: 'A' }, { id: 'B' }]}
              columnVisibility={{
                visibleColumns: ['A', 'B'],
                setVisibleColumns: () => {},
              }}
              rowCount={5}
              renderCellValue={({ rowIndex, columnId }) => (
                // render A as 0, 1, 0, 1, 0 and B as 9->5
                <span data-test-subj="cell-content">
                  {columnId === 'A' ? rowIndex % 2 : 9 - rowIndex}
                </span>
              )}
              inMemory={{ level: 'sorting' }}
              sorting={{
                columns: sortColumns,
                onSort: handleSort,
              }}
            />
          );
        };

        const { container } = render(<TestComponent />);

        expect(
          extractGridData(container, { visibleColumns: ['A', 'B'] })
        ).toEqual([
          ['A', 'B'],
          ['0', '9'],
          ['1', '8'],
          ['0', '7'],
          ['1', '6'],
          ['0', '5'],
        ]);

        // Sort by column A descending using the sortByColumn helper
        sortByColumn(container, 'A', 'desc');

        expect(
          extractGridData(container, { visibleColumns: ['A', 'B'] })
        ).toEqual([
          ['A', 'B'],
          ['1', '8'],
          ['1', '6'],
          ['0', '9'],
          ['0', '7'],
          ['0', '5'],
        ]);

        // Sort by column B ascending (multi-column sort)
        sortByColumn(container, 'B', 'asc');

        expect(
          extractGridData(container, { visibleColumns: ['A', 'B'] })
        ).toEqual([
          ['A', 'B'],
          ['1', '6'],
          ['1', '8'],
          ['0', '5'],
          ['0', '7'],
          ['0', '9'],
        ]);
      });

      it('sorts with all digit groups in numerical-like', () => {
        const onSort = jest.fn();

        const TestComponent = () => {
          const [sortColumns, setSortColumns] = useState<
            Array<{ id: string; direction: 'asc' | 'desc' }>
          >([]);

          const handleSort = (
            columns: Array<{ id: string; direction: 'asc' | 'desc' }>
          ) => {
            onSort(columns);
            setSortColumns(columns);
          };

          return (
            <OuiDataGrid
              aria-label="test"
              columns={[{ id: 'version' }]}
              columnVisibility={{
                visibleColumns: ['version'],
                setVisibleColumns: () => {},
              }}
              rowCount={5}
              renderCellValue={
                ({ rowIndex }) => (
                  <span data-test-subj="cell-content">{`1.0.${
                    (rowIndex % 3) + rowIndex
                  }`}</span>
                ) // computes as 0,2,4,3,5
              }
              inMemory={{ level: 'sorting' }}
              sorting={{
                columns: sortColumns,
                onSort: handleSort,
              }}
            />
          );
        };

        const { container } = render(<TestComponent />);

        // verify rows are unordered
        expect(
          extractGridData(container, { visibleColumns: ['version'] })
        ).toEqual([
          ['version'],
          ['1.0.0'],
          ['1.0.2'],
          ['1.0.4'],
          ['1.0.3'],
          ['1.0.5'],
        ]);

        // Sort by version ascending using the sortByColumn helper
        sortByColumn(container, 'version', 'asc');

        expect(
          extractGridData(container, { visibleColumns: ['version'] })
        ).toEqual([
          ['version'],
          ['1.0.0'],
          ['1.0.2'],
          ['1.0.3'],
          ['1.0.4'],
          ['1.0.5'],
        ]);
      });
    });

    it('uses schema information to sort', () => {
      const { container } = render(
        <OuiDataGrid
          aria-label="test"
          columns={[{ id: 'A' }, { id: 'B' }]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={5}
          renderCellValue={({ rowIndex, columnId }) => (
            // render A 0->4 and B 12->8
            <span data-test-subj="cell-content">
              {columnId === 'A' ? rowIndex : 12 - rowIndex}
            </span>
          )}
          inMemory={{ level: 'sorting' }}
          sorting={{
            columns: [{ id: 'B', direction: 'asc' }],
            onSort: () => {},
          }}
        />
      );

      expect(
        extractGridData(container, { visibleColumns: ['A', 'B'] })
      ).toEqual([
        ['A', 'B'],
        ['4', '8'],
        ['3', '9'],
        ['2', '10'],
        ['1', '11'],
        ['0', '12'],
      ]);
    });
  });

  describe('updating column definitions', () => {
    it('renders the new set', () => {
      const TestComponent = ({
        columns,
        visibleColumns,
      }: {
        columns: Array<{ id: string }>;
        visibleColumns: string[];
      }) => (
        <OuiDataGrid
          aria-labelledby="#test"
          columns={columns}
          columnVisibility={{
            visibleColumns,
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) => (
            <span data-test-subj="cell-content">{`${rowIndex}-${columnId}`}</span>
          )}
        />
      );

      const { container, rerender } = render(
        <TestComponent
          columns={[{ id: 'A' }, { id: 'B' }]}
          visibleColumns={['A', 'B']}
        />
      );

      expect(
        extractGridData(container, { visibleColumns: ['A', 'B'] })
      ).toEqual([
        ['A', 'B'],
        ['0-A', '0-B'],
        ['1-A', '1-B'],
      ]);

      rerender(
        <TestComponent
          columns={[{ id: 'A' }, { id: 'C' }]}
          visibleColumns={['A', 'C']}
        />
      );

      expect(
        extractGridData(container, { visibleColumns: ['A', 'C'] })
      ).toEqual([
        ['A', 'C'],
        ['0-A', '0-C'],
        ['1-A', '1-C'],
      ]);
    });

    it('"Hide fields" updates', async () => {
      const TestComponent = ({
        columns,
        visibleColumns,
      }: {
        columns: Array<{ id: string }>;
        visibleColumns: string[];
      }) => (
        <OuiDataGrid
          aria-labelledby="#test"
          columns={columns}
          columnVisibility={{
            visibleColumns,
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) => (
            <span data-test-subj="cell-content">{`${rowIndex}-${columnId}`}</span>
          )}
        />
      );

      const { container, rerender } = render(
        <TestComponent
          columns={[{ id: 'A' }, { id: 'B' }]}
          visibleColumns={['A', 'B']}
        />
      );

      // verify original column list is A, B
      await openColumnSelector(container);
      let columnItems = document.body.querySelectorAll(
        '.ouiDataGridColumnSelector__item'
      );
      expect(Array.from(columnItems).map((item) => item.textContent)).toEqual([
        'A',
        'B',
      ]);
      await closeColumnSelector(container);

      // update columns
      rerender(
        <TestComponent
          columns={[{ id: 'A' }, { id: 'C' }]}
          visibleColumns={['A', 'C']}
        />
      );

      // test that the column list updated to A,C
      await openColumnSelector(container);
      columnItems = document.body.querySelectorAll(
        '.ouiDataGridColumnSelector__item'
      );
      expect(Array.from(columnItems).map((item) => item.textContent)).toEqual([
        'A',
        'C',
      ]);
      await closeColumnSelector(container);
    });

    it('"Sort fields" updates', () => {
      const TestComponent = ({
        columns,
        visibleColumns,
      }: {
        columns: Array<{ id: string }>;
        visibleColumns: string[];
      }) => (
        <OuiDataGrid
          aria-labelledby="#test"
          columns={columns}
          columnVisibility={{
            visibleColumns,
            setVisibleColumns: () => {},
          }}
          sorting={{
            onSort: () => {},
            columns: [],
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) => (
            <span data-test-subj="cell-content">{`${rowIndex}-${columnId}`}</span>
          )}
        />
      );

      const { container, rerender } = render(
        <TestComponent
          columns={[{ id: 'A' }, { id: 'B' }]}
          visibleColumns={['A', 'B']}
        />
      );

      // verify original column list is A, B
      openColumnSorter(container);
      openColumnSorterSelection();
      let sortingFields = document.body.querySelectorAll(
        '.ouiDataGridColumnSorting__field'
      );
      expect(
        Array.from(sortingFields).map((field) => field.textContent)
      ).toEqual(['A', 'B']);
      closeColumnSorterSelection(container);
      closeColumnSorter(container);

      // update columns
      rerender(
        <TestComponent
          columns={[{ id: 'A' }, { id: 'C' }]}
          visibleColumns={['A', 'C']}
        />
      );

      // test that the column list updated to A,C
      openColumnSorter(container);
      openColumnSorterSelection();
      sortingFields = document.body.querySelectorAll(
        '.ouiDataGridColumnSorting__field'
      );
      expect(
        Array.from(sortingFields).map((field) => field.textContent)
      ).toEqual(['A', 'C']);
      closeColumnSorterSelection(container);
      closeColumnSorter(container);
    });
  });

  describe('render column actions', () => {
    it('renders various column actions configurations', () => {
      const { container } = render(
        <OuiDataGrid
          aria-labelledby="#test"
          sorting={{
            columns: [{ id: 'A', direction: 'asc' }],
            onSort: () => {},
          }}
          columns={[
            { id: 'A', actions: false },
            { id: 'B', isSortable: true },
            {
              id: 'C',
              isSortable: true,
              actions: {
                showHide: false,
                showMoveRight: false,
                showMoveLeft: false,
                showSortAsc: false,
                showSortDesc: false,
                additional: [{ label: 'test' }],
              },
            },
            {
              id: 'D',
              isSortable: true,
              actions: {
                showHide: false,
                showMoveRight: false,
                showMoveLeft: false,
                additional: [{ label: 'test' }],
              },
            },
            {
              id: 'E',
              isSortable: true,
              actions: {
                showHide: { label: '1' },
                showSortAsc: { label: '2' },
                showSortDesc: { label: '3' },
                showMoveLeft: { label: '4' },
                showMoveRight: { label: '5' },
                additional: [{ label: 'test' }],
              },
            },
          ]}
          columnVisibility={{
            visibleColumns: ['A', 'B', 'C', 'D', 'E'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}-${columnId}`
          }
        />
      );

      const buttonA = container.querySelector(
        '[data-test-subj="dataGridHeaderCellActionButton-A"]'
      );
      expect(buttonA).toBeNull();

      for (const col of ['B', 'C', 'D', 'E']) {
        const button = container.querySelector(
          `[data-test-subj="dataGridHeaderCellActionButton-${col}"]`
        ) as HTMLButtonElement;
        if (button) {
          fireEvent.click(button);
          const actionGroup = document.body.querySelector(
            `[data-test-subj="dataGridHeaderCellActionGroup-${col}"]`
          );
          expect(actionGroup).toMatchSnapshot();
        }
      }
    });
  });

  describe('render sorting arrows', () => {
    it('renders sorting arrows when direction is given', () => {
      const { container } = render(
        <OuiDataGrid
          aria-labelledby="#test"
          sorting={{
            columns: [
              { id: 'A', direction: 'asc' },
              { id: 'B', direction: 'desc' },
            ],
            onSort: () => {},
          }}
          columns={[
            { id: 'A', isSortable: true },
            { id: 'B', isSortable: true },
          ]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}-${columnId}`
          }
        />
      );

      const arrowA = container.querySelector(
        '[data-test-subj="dataGridHeaderCellSortingIcon-A"]'
      );
      expect(arrowA).toBeInTheDocument();

      const arrowB = container.querySelector(
        '[data-test-subj="dataGridHeaderCellSortingIcon-B"]'
      );
      expect(arrowB).toBeInTheDocument();
    });

    it('does not render the arrows if the column is not sorted', () => {
      const { container } = render(
        <OuiDataGrid
          aria-labelledby="#test"
          sorting={{
            columns: [],
            onSort: () => {},
          }}
          columns={[
            {
              id: 'C',
              isSortable: true,
              actions: {
                showHide: false,
                showMoveRight: false,
                showMoveLeft: false,
                showSortAsc: false,
                showSortDesc: false,
                additional: [{ label: 'test' }],
              },
            },
          ]}
          columnVisibility={{
            visibleColumns: ['C'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}-${columnId}`
          }
        />
      );

      const arrowC = container.querySelector(
        '[data-test-subj="dataGridHeaderCellSortingIcon-C"]'
      );
      expect(arrowC).not.toBeInTheDocument();
    });

    it('renders the icons if they are sorted but user is not allowed to perform any action', () => {
      const { container } = render(
        <OuiDataGrid
          aria-labelledby="#test"
          sorting={{
            columns: [{ id: 'D', direction: 'asc' }],
            onSort: () => {},
          }}
          columns={[{ id: 'D', actions: false }]}
          columnVisibility={{
            visibleColumns: ['D'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}-${columnId}`
          }
        />
      );

      const arrowD = container.querySelector(
        '[data-test-subj="dataGridHeaderCellSortingIcon-D"]'
      );
      expect(arrowD).toBeInTheDocument();
    });
  });

  describe('render column cell actions', () => {
    it('renders various column cell actions configurations after cell gets hovered', async () => {
      const alertFn = jest.fn();
      const happyFn = jest.fn();
      const { container } = render(
        <OuiDataGrid
          aria-labelledby="#test"
          sorting={{
            columns: [{ id: 'A', direction: 'asc' }],
            onSort: () => {},
          }}
          columns={[
            {
              id: 'A',
              isSortable: true,
              cellActions: [
                ({ rowIndex, columnId, Component, isExpanded }) => {
                  return (
                    <Component
                      onClick={() => alertFn(rowIndex, columnId)}
                      iconType="alert"
                      aria-label="test1 aria label"
                      data-test-subj={
                        isExpanded ? 'alertActionPopover' : 'alertAction'
                      }>
                      test1
                    </Component>
                  );
                },
                ({ rowIndex, columnId, Component, isExpanded }) => {
                  return (
                    <Component
                      onClick={() => happyFn(rowIndex, columnId)}
                      iconType="faceHappy"
                      aria-label="test2 aria label"
                      data-test-subj={
                        isExpanded ? 'happyActionPopover' : 'happyAction'
                      }>
                      test2
                    </Component>
                  );
                },
              ],
            },
          ]}
          columnVisibility={{
            visibleColumns: ['A'],
            setVisibleColumns: () => {},
          }}
          rowCount={2}
          renderCellValue={({ rowIndex, columnId }) =>
            `${rowIndex}-${columnId}`
          }
        />
      );

      // cell buttons should not get rendered for unfocused, unhovered cell
      expect(screen.queryByTestId('alertAction')).not.toBeInTheDocument();
      expect(screen.queryByTestId('happyAction')).not.toBeInTheDocument();

      // Get the second cell (index 1) and trigger mouse enter
      const gridCells = container.querySelectorAll(
        '[data-test-subj="dataGridRowCell"]'
      );
      const secondCell = gridCells[1] as HTMLElement;

      fireEvent.mouseEnter(secondCell);

      // Wait for actions to appear
      await screen.findByTestId('alertAction');
      await screen.findByTestId('happyAction');

      // Click the alert action
      const alertAction = screen.getByTestId('alertAction');
      fireEvent.click(alertAction);
      expect(alertFn).toHaveBeenCalledWith(1, 'A');

      // Click the happy action
      const happyAction = screen.getByTestId('happyAction');
      fireEvent.click(happyAction);
      expect(happyFn).toHaveBeenCalledWith(1, 'A');

      alertFn.mockReset();
      happyFn.mockReset();

      // Trigger keydown to expand actions
      fireEvent.keyDown(secondCell, { key: keys.ENTER });

      // Wait for expanded actions to appear
      await screen.findByTestId('alertActionPopover');
      await screen.findByTestId('happyActionPopover');

      // Click the expanded alert action
      const alertActionPopover = screen.getByTestId('alertActionPopover');
      fireEvent.click(alertActionPopover);
      expect(alertFn).toHaveBeenCalledWith(1, 'A');

      // Click the expanded happy action
      const happyActionPopover = screen.getByTestId('happyActionPopover');
      fireEvent.click(happyActionPopover);
      expect(happyFn).toHaveBeenCalledWith(1, 'A');
    });
  });

  describe('rowHeighsOptions', () => {
    it('all row heights options applied correctly', async () => {
      const { container } = render(
        <OuiDataGrid
          aria-labelledby="#test"
          columns={[{ id: 'Column 1' }, { id: 'Column 2' }]}
          columnVisibility={{
            visibleColumns: ['Column 1', 'Column 2'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={({ rowIndex }) => (
            <span data-test-subj="cell-content" data-row-index={rowIndex}>
              value
            </span>
          )}
          rowHeightsOptions={{
            defaultHeight: 50,
            rowHeights: {
              0: 70,
              1: {
                lineCount: 3,
              },
            },
          }}
        />
      );

      const cellHeights = extractRowHeights(container);
      expect(cellHeights).toEqual({
        0: 70,
        1: 3,
        2: 50,
      });
    });

    it('render cells with correct height during pagination', () => {
      const TestComponent = () => {
        const [pageIndex, setPageIndex] = useState(0);

        const handlePageChange = (newPageIndex: number) => {
          setPageIndex(newPageIndex);
        };

        return (
          <OuiDataGrid
            aria-label="test grid"
            columns={[{ id: 'Column' }]}
            columnVisibility={{
              visibleColumns: ['Column'],
              setVisibleColumns: () => {},
            }}
            rowCount={8}
            renderCellValue={({ rowIndex }) => (
              <span data-test-subj="cell-content" data-row-index={rowIndex}>
                {rowIndex}
              </span>
            )}
            rowHeightsOptions={{
              defaultHeight: 50,
              rowHeights: {
                0: 70,
                1: {
                  lineCount: 3,
                },
              },
            }}
            pagination={{
              pageIndex,
              pageSize: 3,
              pageSizeOptions: [3, 6, 10],
              onChangePage: handlePageChange,
              onChangeItemsPerPage: jest.fn(),
            }}
          />
        );
      };

      const { container } = render(<TestComponent />);

      expect(extractRowHeights(container)).toEqual({
        0: 70,
        1: 3,
        2: 50,
      });

      const nextButton = screen.getByTestId('pagination-button-next');
      fireEvent.click(nextButton);

      expect(extractRowHeights(container)).toEqual({
        3: 50,
        4: 50,
        5: 50,
      });

      const previousButton = screen.getByTestId('pagination-button-previous');
      fireEvent.click(previousButton);

      expect(extractRowHeights(container)).toEqual({
        0: 70,
        1: 3,
        2: 50,
      });
    });
  });

  describe('keyboard controls', () => {
    // Note: mounting to document because activeElement requires being part of document
    let container: HTMLDivElement | null;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      container?.parentNode?.removeChild(container);
      container = null;
    });

    // Note: This test fails if run after simple arrow navigation test
    it('does not break arrow key focus control behavior when also using a mouse', async () => {
      const { container: rtlContainer } = render(
        <OuiDataGrid
          {...requiredProps}
          columns={[
            { id: 'A', actions: false },
            { id: 'B', actions: false },
          ]}
          columnVisibility={{
            visibleColumns: ['A', 'B'],
            setVisibleColumns: () => {},
          }}
          rowCount={3}
          renderCellValue={({ rowIndex, columnId }) => (
            <span data-test-subj="cell-content">{`${rowIndex}, ${columnId}`}</span>
          )}
        />,
        { container: container! }
      );

      // enable the grid to accept focus
      const dataGridWrapper = rtlContainer.querySelector(
        '[data-test-subj="dataGridWrapper"]'
      ) as HTMLElement;
      if (dataGridWrapper) {
        fireEvent.focus(dataGridWrapper);
      }

      let focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const firstCellContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(firstCellContent?.textContent).toEqual('0, A');

      const gridCells = rtlContainer.querySelectorAll(
        '[data-test-subj="dataGridRowCell"]'
      );
      const targetCell = gridCells[3] as HTMLElement;
      if (targetCell) {
        fireEvent.focus(targetCell);
      }

      // wait for a tick to give focus logic time to run
      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      expect(focusableCell).toBeTruthy();
      const secondCellContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(secondCellContent?.textContent).toEqual('1, B');
    });

    it('supports simple arrow navigation', async () => {
      const TestComponent = () => {
        const [pageIndex, setPageIndex] = useState(0);

        const pagination = {
          pageIndex,
          pageSize: 3,
          pageSizeOptions: [3, 6, 10],
          onChangePage: (newPageIndex: number) => {
            setPageIndex(newPageIndex);
          },
          onChangeItemsPerPage: () => {},
        };

        return (
          <OuiDataGrid
            {...requiredProps}
            columns={[
              { id: 'A', actions: false },
              { id: 'B', actions: false },
              { id: 'C', actions: false },
            ]}
            columnVisibility={{
              visibleColumns: ['A', 'B', 'C'],
              setVisibleColumns: () => {},
            }}
            rowCount={8}
            renderCellValue={({ rowIndex, columnId }) => (
              <span data-test-subj="cell-content">{`${rowIndex}, ${columnId}`}</span>
            )}
            pagination={pagination}
          />
        );
      };

      const { container: rtlContainer } = render(<TestComponent />, {
        container: container!,
      });

      // enable the grid to accept focus
      const dataGridWrapper = rtlContainer.querySelector(
        '[data-test-subj="dataGridWrapper"]'
      ) as HTMLElement;
      if (dataGridWrapper) {
        fireEvent.focus(dataGridWrapper);
      }

      let focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      // focus should begin at the first cell
      expect(focusableCell).toBeTruthy();
      const firstCellContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(firstCellContent?.textContent).toEqual('0, A');

      // focus should not move when up against the left edge
      if (focusableCell) {
        fireEvent.focus(focusableCell);
        fireEvent.keyDown(focusableCell, { key: keys.ARROW_LEFT });
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const leftEdgeContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(leftEdgeContent?.textContent).toEqual('0, A');

      // focus should not move when up against the top edge
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, { key: keys.ARROW_UP });
      }
      const topEdgeContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(topEdgeContent?.textContent).toEqual('0, A');

      // move down
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, { key: keys.ARROW_DOWN });
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const downContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(downContent?.textContent).toEqual('1, A');

      // move right
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, { key: keys.ARROW_RIGHT });
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const rightContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(rightContent?.textContent).toEqual('1, B');

      // move up
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, { key: keys.ARROW_UP });
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const upContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(upContent?.textContent).toEqual('0, B');

      // move left
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, { key: keys.ARROW_LEFT });
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const leftContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(leftContent?.textContent).toEqual('0, A');

      // move down and to the end of the row
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, { key: keys.ARROW_DOWN });
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, { key: keys.END });
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const endContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(endContent?.textContent).toEqual('1, C');

      // move up and to the beginning of the row
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, { key: keys.ARROW_UP });
        fireEvent.keyDown(focusableCell, { key: keys.HOME });
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const homeContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(homeContent?.textContent).toEqual('0, A');

      // jump to the last cell
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, {
          ctrlKey: true,
          key: keys.END,
        });
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const ctrlEndContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(ctrlEndContent?.textContent).toEqual('2, C');

      // jump to the first cell
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, {
          ctrlKey: true,
          key: keys.HOME,
        });
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const ctrlHomeContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(ctrlHomeContent?.textContent).toEqual('0, A');

      // page should not change when moving before the first entry
      // but the last row should remain focused
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, {
          key: keys.PAGE_UP,
        });
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const pageUpContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(pageUpContent?.textContent).toEqual('2, A');

      // advance to the next page
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, {
          key: keys.PAGE_DOWN,
        });
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const pageDownContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(pageDownContent?.textContent).toEqual('3, A');

      // move over one column and advance one more page
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, { key: keys.ARROW_RIGHT }); // 3, B
        fireEvent.keyDown(focusableCell, {
          key: keys.PAGE_DOWN,
        }); // 6, B
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const nextPageContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(nextPageContent?.textContent).toEqual('6, B');

      // does not advance beyond the last page
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, {
          key: keys.PAGE_DOWN,
        });
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const lastPageContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(lastPageContent?.textContent).toEqual('6, B');

      // move left one column, return to the previous page
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, { key: keys.ARROW_LEFT }); // 6, A
        fireEvent.keyDown(focusableCell, {
          key: keys.PAGE_UP,
        }); // 5, A
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const prevPageContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(prevPageContent?.textContent).toEqual('5, A');

      // return to the previous (first) page
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, {
          key: keys.PAGE_UP,
        });
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const firstPageContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(firstPageContent?.textContent).toEqual('2, A');

      // move to the last cell of the page then advance one page
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, {
          ctrlKey: true,
          key: keys.END,
        }); // 2, C (last cell of the first page)
        fireEvent.keyDown(focusableCell, {
          key: keys.PAGE_DOWN,
        }); // 3, C (first cell of the second page, same cell position as previous page)
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const finalMoveContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(finalMoveContent?.textContent).toEqual('3, C');

      // advance to the final page
      if (focusableCell) {
        fireEvent.keyDown(focusableCell, {
          key: keys.PAGE_DOWN,
        }); // 6, C
      }
      focusableCell = getFocusableCell(rtlContainer as HTMLElement);
      const finalContent = focusableCell?.querySelector(
        '[data-test-subj="cell-content"]'
      );
      expect(finalContent?.textContent).toEqual('6, C');
    });

    // NOTE: Not migrating these to RTL as were previously skipped so not sure about correctness
    // it.skip('supports arrow navigation through grids with different interactive cells', () => {
    //   const component = mount(
    //     <OuiDataGrid
    //       {...requiredProps}
    //       columns={[{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }]}
    //       columnVisibility={{
    //         visibleColumns: ['A', 'B', 'C', 'D'],
    //         setVisibleColumns: () => {},
    //       }}
    //       rowCount={2}
    //       renderCellValue={({ rowIndex, columnId }) => {
    //         if (columnId === 'A') {
    //           return `${rowIndex}, A`;
    //         }

    //         if (columnId === 'B') {
    //           return <button>{rowIndex}, B</button>;
    //         }

    //         if (columnId === 'C') {
    //           return (
    //             <>
    //               <button>{rowIndex}</button>, <button>C</button>
    //             </>
    //           );
    //         }

    //         if (columnId === 'D') {
    //           return (
    //             <div>
    //               {rowIndex}, <button>D</button>
    //             </div>
    //           );
    //         }

    //         return 'error';
    //       }}
    //     />
    //   );

    //   /**
    //    * Make sure we start from a happy state
    //    */
    //   let focusableCell = getFocusableCell(component);
    //   expect(focusableCell.length).toEqual(1);
    //   expect(focusableCell.text()).toEqual('0, A');
    //   focusableCell
    //     .simulate('focus')
    //     .simulate('keydown', { key: keys.ARROW_DOWN });

    //   /**
    //    * On text only cells, the cell receives focus
    //    */
    //   focusableCell = getFocusableCell(component);
    //   expect(focusableCell.text()).toEqual('1, A'); // make sure we're on the right cell
    //   expect(focusableCell.getDOMNode()).toBe(document.activeElement);

    //   focusableCell.simulate('keydown', { key: keys.ARROW_RIGHT });

    //   /**
    //    * On cells with 1 interactive item, the interactive item receives focus
    //    */
    //   focusableCell = getFocusableCell(component);
    //   expect(focusableCell.text()).toEqual('1, B');
    //   expect(focusableCell.find('button').getDOMNode()).toBe(
    //     document.activeElement
    //   );

    //   focusableCell.simulate('keydown', { key: keys.ARROW_RIGHT });

    //   /**
    //    * On cells with multiple interactive items, the cell receives focus
    //    */
    //   focusableCell = getFocusableCell(component);
    //   expect(focusableCell.text()).toEqual('1, C');
    //   expect(focusableCell.getDOMNode()).toBe(document.activeElement);

    //   focusableCell.simulate('keydown', { key: keys.ARROW_RIGHT });

    //   /**
    //    * On cells with 1 interactive item and non-interactive item(s), the cell receives focus
    //    */
    //   focusableCell = getFocusableCell(component);
    //   expect(focusableCell.text()).toEqual('1, D');
    //   expect(focusableCell.getDOMNode()).toBe(document.activeElement);
    // });
    // it.skip('allows user to enter and exit grid navigation', async () => {
    //   const component = mount(
    //     <OuiDataGrid
    //       {...requiredProps}
    //       columns={[{ id: 'A' }, { id: 'B' }]}
    //       columnVisibility={{
    //         visibleColumns: ['A', 'B'],
    //         setVisibleColumns: () => {},
    //       }}
    //       rowCount={3}
    //       renderCellValue={({ rowIndex, columnId }) => (
    //         <>
    //           <button>{rowIndex}</button>, <button>{columnId}</button>
    //         </>
    //       )}
    //     />
    //   );

    //   /**
    //    * Make sure we start from a happy state
    //    */
    //   let focusableCell = getFocusableCell(component);
    //   expect(focusableCell.length).toEqual(1);
    //   expect(focusableCell.text()).toEqual('0, A');
    //   focusableCell
    //     .simulate('focus')
    //     .simulate('keydown', { key: keys.ARROW_DOWN });
    //   focusableCell = getFocusableCell(component);

    //   /**
    //    * Confirm initial state is with grid navigation turn on
    //    */
    //   expect(focusableCell.text()).toEqual('1, A');
    //   expect(focusableCell.getDOMNode()).toBe(document.activeElement);
    //   expect(takeMountedSnapshot(component)).toMatchSnapshot();

    //   /**
    //    * Disable grid navigation using ENTER
    //    */
    //   focusableCell
    //     .simulate('keydown', { key: keys.ENTER })
    //     .simulate('keydown', { key: keys.ARROW_DOWN });

    //   let buttons = focusableCell.find('button');

    //   // grid navigation is disabled, location should not move
    //   expect(buttons.at(0).text()).toEqual('1');
    //   expect(buttons.at(1).text()).toEqual('A');
    //   expect(buttons.at(0).getDOMNode()).toBe(document.activeElement); // focus should move to first button
    //   expect(takeMountedSnapshot(component)).toMatchSnapshot(); // should prove focus lock is on

    //   /**
    //    * Enable grid navigation ESCAPE
    //    */
    //   focusableCell.simulate('keydown', { key: keys.ESCAPE });
    //   focusableCell = getFocusableCell(component);
    //   expect(focusableCell.getDOMNode()).toBe(document.activeElement); // focus should move back to cell

    //   focusableCell.simulate('keydown', { key: keys.ARROW_RIGHT });
    //   focusableCell = getFocusableCell(component);
    //   expect(focusableCell.text()).toEqual('1, B'); // grid navigation is enabled again, check that we can move
    //   expect(takeMountedSnapshot(component)).toMatchSnapshot();

    //   /**
    //    * Disable grid navigation using F2
    //    */
    //   focusableCell = getFocusableCell(component);
    //   focusableCell
    //     .simulate('keydown', { key: keys.F2 })
    //     .simulate('keydown', { key: keys.ARROW_UP });
    //   buttons = focusableCell.find('button');

    //   // grid navigation is disabled, location should not move
    //   expect(buttons.at(0).text()).toEqual('1');
    //   expect(buttons.at(1).text()).toEqual('B');
    //   expect(buttons.at(0).getDOMNode()).toBe(document.activeElement); // focus should move to first button
    //   expect(takeMountedSnapshot(component)).toMatchSnapshot(); // should prove focus lock is on

    //   /**
    //    * Enable grid navigation using F2
    //    */
    //   focusableCell.simulate('keydown', { key: keys.F2 });
    //   focusableCell = getFocusableCell(component);
    //   expect(focusableCell.getDOMNode()).toBe(document.activeElement); // focus should move back to cell

    //   focusableCell.simulate('keydown', { key: keys.ARROW_UP });
    //   focusableCell = getFocusableCell(component);
    //   expect(focusableCell.text()).toEqual('0, B'); // grid navigation is enabled again, check that we can move
    //   expect(takeMountedSnapshot(component)).toMatchSnapshot();
    // });
  });
});
