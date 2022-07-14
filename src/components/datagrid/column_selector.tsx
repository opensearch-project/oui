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
  Fragment,
  useState,
  useMemo,
  useCallback,
  ReactElement,
  ChangeEvent,
} from 'react';
import classNames from 'classnames';
import {
  OuiDataGridColumn,
  OuiDataGridColumnVisibility,
  OuiDataGridToolBarVisibilityColumnSelectorOptions,
  OuiDataGridToolBarVisibilityOptions,
} from './data_grid_types';
import { OuiPopover, OuiPopoverFooter, OuiPopoverTitle } from '../popover';
import { OuiI18n } from '../i18n';
import { OuiButtonEmpty } from '../button';
import { OuiFlexGroup, OuiFlexItem } from '../flex';
import { OuiSwitch, OuiFieldText } from '../form';
import {
  OuiDragDropContext,
  OuiDraggable,
  OuiDroppable,
  ouiDragDropReorder,
} from '../drag_and_drop';
import { DropResult } from 'react-beautiful-dnd';
import { OuiIcon } from '../icon';
import { useDependentState } from '../../services';

const getShowColumnSelectorValue = (
  showColumnSelector: OuiDataGridToolBarVisibilityOptions['showColumnSelector'],
  valueName: keyof OuiDataGridToolBarVisibilityColumnSelectorOptions
) => {
  if (showColumnSelector === false) return false;
  if (showColumnSelector == null) return true;
  if (showColumnSelector === true) return true;
  return showColumnSelector[valueName] !== false;
};

export const useDataGridColumnSelector = (
  availableColumns: OuiDataGridColumn[],
  columnVisibility: OuiDataGridColumnVisibility,
  showColumnSelector: OuiDataGridToolBarVisibilityOptions['showColumnSelector'],
  displayValues: { [key: string]: string }
): [
  ReactElement,
  OuiDataGridColumn[],
  (columns: string[]) => void,
  (colFrom: string, colTo: string) => void
] => {
  const allowColumnHiding = getShowColumnSelectorValue(
    showColumnSelector,
    'allowHide'
  );
  const allowColumnReorder = getShowColumnSelectorValue(
    showColumnSelector,
    'allowReorder'
  );

  const [sortedColumns, setSortedColumns] = useDependentState(
    () => availableColumns.map(({ id }) => id),
    [availableColumns]
  );

  const { visibleColumns, setVisibleColumns } = columnVisibility;
  const visibleColumnIds = useMemo(() => new Set(visibleColumns), [
    visibleColumns,
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const setColumns = useCallback(
    (nextColumns: string[]) => {
      setSortedColumns(nextColumns);

      const nextVisibleColumns = nextColumns.filter((id) =>
        visibleColumnIds.has(id)
      );
      setVisibleColumns(nextVisibleColumns);
    },
    [setSortedColumns, setVisibleColumns, visibleColumnIds]
  );

  function onDragEnd({
    source: { index: sourceIndex },
    destination,
  }: DropResult) {
    const destinationIndex = destination!.index;
    const nextSortedColumns = ouiDragDropReorder(
      sortedColumns,
      sourceIndex,
      destinationIndex
    );
    setColumns(nextSortedColumns);
  }

  const numberOfHiddenFields = availableColumns.length - visibleColumns.length;

  const [columnSearchText, setColumnSearchText] = useState('');

  const controlBtnClasses = classNames('ouiDataGrid__controlBtn', {
    'ouiDataGrid__controlBtn--active': numberOfHiddenFields > 0,
  });

  const filteredColumns = sortedColumns.filter(
    (id) =>
      (displayValues[id] || id)
        .toLowerCase()
        .indexOf(columnSearchText.toLowerCase()) !== -1
  );

  const isDragEnabled = allowColumnReorder && columnSearchText.length === 0; // only allow drag-and-drop when not filtering columns

  let buttonText = (
    <OuiI18n token="ouiColumnSelector.button" default="Columns" />
  );

  if (numberOfHiddenFields === 1) {
    buttonText = (
      <OuiI18n
        token="ouiColumnSelector.buttonActiveSingular"
        default="{numberOfHiddenFields} column hidden"
        values={{ numberOfHiddenFields }}
      />
    );
  } else if (numberOfHiddenFields > 1) {
    buttonText = (
      <OuiI18n
        token="ouiColumnSelector.buttonActivePlural"
        default="{numberOfHiddenFields} columns hidden"
        values={{ numberOfHiddenFields }}
      />
    );
  }

  const columnSelector = (
    <OuiPopover
      data-test-subj="dataGridColumnSelectorPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downLeft"
      panelPaddingSize="s"
      panelClassName="ouiDataGridColumnSelectorPopover"
      button={
        <OuiButtonEmpty
          size="xs"
          iconType={allowColumnHiding ? 'listAdd' : 'list'}
          color="text"
          className={controlBtnClasses}
          data-test-subj="dataGridColumnSelectorButton"
          onClick={() => setIsOpen(!isOpen)}>
          {buttonText}
        </OuiButtonEmpty>
      }>
      <div>
        {allowColumnHiding && (
          <OuiPopoverTitle>
            <OuiI18n
              tokens={[
                'ouiColumnSelector.search',
                'ouiColumnSelector.searchcolumns',
              ]}
              defaults={['Search', 'Search columns']}>
              {([search, searchcolumns]: string[]) => (
                <OuiFieldText
                  compressed
                  placeholder={search}
                  aria-label={searchcolumns}
                  value={columnSearchText}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setColumnSearchText(e.currentTarget.value)
                  }
                />
              )}
            </OuiI18n>
          </OuiPopoverTitle>
        )}
        <div className="ouiDataGrid__controlScroll">
          <OuiDragDropContext onDragEnd={onDragEnd}>
            <OuiDroppable
              droppableId="columnOrder"
              isDropDisabled={!isDragEnabled}>
              <Fragment>
                {filteredColumns.map((id, index) => (
                  <OuiDraggable
                    key={id}
                    draggableId={id}
                    index={index}
                    isDragDisabled={!isDragEnabled}>
                    {(provided, state) => (
                      <div
                        className={`ouiDataGridColumnSelector__item ${
                          state.isDragging &&
                          'ouiDataGridColumnSelector__item-isDragging'
                        }`}>
                        <OuiFlexGroup
                          responsive={false}
                          gutterSize="m"
                          alignItems="center">
                          <OuiFlexItem>
                            {allowColumnHiding ? (
                              <OuiSwitch
                                name={id}
                                label={displayValues[id] || id}
                                checked={visibleColumnIds.has(id)}
                                compressed
                                className="ouiSwitch--mini"
                                onChange={(event) => {
                                  const {
                                    target: { checked },
                                  } = event;
                                  const nextVisibleColumns = sortedColumns.filter(
                                    (columnId) =>
                                      checked
                                        ? visibleColumnIds.has(columnId) ||
                                          id === columnId
                                        : visibleColumnIds.has(columnId) &&
                                          id !== columnId
                                  );
                                  setVisibleColumns(nextVisibleColumns);
                                }}
                              />
                            ) : (
                              <span className="ouiDataGridColumnSelector__itemLabel">
                                {id}
                              </span>
                            )}
                          </OuiFlexItem>
                          {isDragEnabled && (
                            <OuiFlexItem grow={false}>
                              <OuiIcon type="grab" color="subdued" />
                            </OuiFlexItem>
                          )}
                        </OuiFlexGroup>
                      </div>
                    )}
                  </OuiDraggable>
                ))}
              </Fragment>
            </OuiDroppable>
          </OuiDragDropContext>
        </div>
      </div>
      {allowColumnHiding && (
        <OuiPopoverFooter>
          <OuiFlexGroup
            gutterSize="s"
            responsive={false}
            justifyContent="spaceBetween">
            <OuiFlexItem grow={false}>
              <OuiButtonEmpty
                size="xs"
                flush="left"
                onClick={() => setVisibleColumns(sortedColumns)}>
                <OuiI18n
                  token="ouiColumnSelector.selectAll"
                  default="Show all"
                />
              </OuiButtonEmpty>
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiButtonEmpty
                size="xs"
                flush="right"
                onClick={() => setVisibleColumns([])}>
                <OuiI18n token="ouiColumnSelector.hideAll" default="Hide all" />
              </OuiButtonEmpty>
            </OuiFlexItem>
          </OuiFlexGroup>
        </OuiPopoverFooter>
      )}
    </OuiPopover>
  );

  const orderedVisibleColumns = useMemo(
    () =>
      visibleColumns
        .map<OuiDataGridColumn>(
          (columnId) =>
            availableColumns.find(
              ({ id }) => id === columnId
            ) as OuiDataGridColumn // cast to avoid `undefined`, it filters those out next
        )
        .filter((column) => column != null),
    [availableColumns, visibleColumns]
  );
  /**
   * Used for moving columns left/right, available in the headers actions menu
   */
  const switchColumnPos = useCallback(
    (fromColId: string, toColId: string) => {
      const moveFromIdx = sortedColumns.indexOf(fromColId);
      const moveToIdx = sortedColumns.indexOf(toColId);
      if (moveFromIdx === -1 || moveToIdx === -1) {
        return;
      }
      const nextSortedColumns = [...sortedColumns];
      nextSortedColumns.splice(moveFromIdx, 1);
      nextSortedColumns.splice(moveToIdx, 0, fromColId);
      setColumns(nextSortedColumns);
    },
    [setColumns, sortedColumns]
  );

  return [
    columnSelector,
    orderedVisibleColumns,
    setVisibleColumns,
    switchColumnPos,
  ];
};
