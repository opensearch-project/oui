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
  JSXElementConstructor,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  OuiDataGridCellValueElementProps,
  OuiDataGridCellProps,
} from './data_grid_cell';
import { OuiDataGridColumn, OuiDataGridInMemory } from './data_grid_types';
import { enqueueStateChange } from '../../services/react';
import { OuiMutationObserver } from '../observer/mutation_observer';

export interface OuiDataGridInMemoryRendererProps {
  inMemory: OuiDataGridInMemory;
  columns: OuiDataGridColumn[];
  rowCount: number;
  renderCellValue: OuiDataGridCellProps['renderCellValue'];
  onCellRender: (rowIndex: number, columnId: string, value: string) => void;
}

function noop() {}

function getElementText(element: HTMLElement) {
  return 'innerText' in element ? element.innerText : element.textContent || '';
}

export const OuiDataGridInMemoryRenderer: FunctionComponent<OuiDataGridInMemoryRendererProps> = ({
  inMemory,
  columns,
  rowCount,
  renderCellValue,
  onCellRender,
}) => {
  const [documentFragment] = useState(() => document.createDocumentFragment());

  const cells = useMemo(() => {
    const CellElement = renderCellValue as JSXElementConstructor<
      OuiDataGridCellValueElementProps
    >;

    const cells = [];

    for (let i = 0; i < rowCount; i++) {
      cells.push(
        columns
          .map((column) => {
            const skipThisColumn =
              inMemory.skipColumns &&
              inMemory.skipColumns.indexOf(column.id) !== -1;

            if (skipThisColumn) {
              return null;
            }

            const isExpandable =
              column.isExpandable !== undefined ? column.isExpandable : true;

            return (
              <div
                key={`${i}-${column.id}`}
                data-dg-row={i}
                data-dg-column={column.id}>
                <CellElement
                  rowIndex={i}
                  columnId={column.id}
                  setCellProps={noop}
                  isExpandable={isExpandable}
                  isExpanded={false}
                  isDetails={false}
                />
              </div>
            );
          })
          .filter((cell) => cell != null)
      );
    }

    return cells;
  }, [rowCount, columns, inMemory.skipColumns, renderCellValue]);

  const onMutation = useCallback<MutationCallback>(
    (records) => {
      recordLoop: for (let i = 0; i < records.length; i++) {
        const record = records[i];
        let target: Node | null = record.target;

        while (true) {
          if (target == null) continue recordLoop; // somehow hit the document fragment
          if (
            target.nodeType === Node.ELEMENT_NODE &&
            (target as Element).hasAttribute('data-dg-row')
          ) {
            // target is the cell wrapping div
            break;
          }
          target = target.parentElement;
        }

        const cellDiv = target as HTMLDivElement;
        const rowIndex = parseInt(cellDiv.getAttribute('data-dg-row')!, 10);
        const column = cellDiv.getAttribute('data-dg-column')!;
        enqueueStateChange(() =>
          onCellRender(rowIndex, column, getElementText(cellDiv))
        );
      }
    },
    [onCellRender]
  );

  useEffect(() => {
    const cellDivs = documentFragment.childNodes[0].childNodes;
    for (let i = 0; i < cellDivs.length; i++) {
      const cellDiv = cellDivs[i] as HTMLDivElement;
      const rowIndex = parseInt(cellDiv.getAttribute('data-dg-row')!, 10);
      const column = cellDiv.getAttribute('data-dg-column')!;
      onCellRender(rowIndex, column, getElementText(cellDiv));
    }
    // changes to documentFragment.children is reflected by `cells`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCellRender, cells]);

  return createPortal(
    <OuiMutationObserver
      onMutation={onMutation}
      observerOptions={{
        characterData: true,
        subtree: true,
        attributes: true,
        childList: true,
      }}>
      {(ref) => <div ref={ref}>{cells}</div>}
    </OuiMutationObserver>,
    (documentFragment as unknown) as Element
  );
};
