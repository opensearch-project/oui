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
  ReactChild,
  ReactNode,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { OuiDataGridColumn, OuiDataGridSorting } from './data_grid_types';
import { OuiPopover, OuiPopoverFooter } from '../popover';
import { OuiI18n } from '../i18n';
import { OuiText } from '../text';
import { OuiButtonEmpty } from '../button';
import { OuiFlexGroup, OuiFlexItem } from '../flex';
import {
  OuiDragDropContext,
  OuiDroppable,
  ouiDragDropReorder,
} from '../drag_and_drop';
import { DropResult } from 'react-beautiful-dnd';
import { OuiDataGridColumnSortingDraggable } from './column_sorting_draggable';
import {
  OuiDataGridSchema,
  OuiDataGridSchemaDetector,
  getDetailsForSchema,
} from './data_grid_schema';
import { OuiToken } from '../token';

export const useDataGridColumnSorting = (
  columns: OuiDataGridColumn[],
  sorting: OuiDataGridSorting | undefined,
  schema: OuiDataGridSchema,
  schemaDetectors: OuiDataGridSchemaDetector[],
  displayValues: { [key: string]: string }
): ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  const [avilableColumnsisOpen, setAvailableColumnsIsOpen] = useState(false);
  // prune any non-existent/hidden columns from sorting
  useEffect(() => {
    if (sorting) {
      const nextSortingColumns: OuiDataGridSorting['columns'] = [];

      const availableColumnIds = new Set(columns.map(({ id }) => id));
      for (let i = 0; i < sorting.columns.length; i++) {
        const column = sorting.columns[i];
        if (availableColumnIds.has(column.id)) {
          nextSortingColumns.push(column);
        }
      }

      // if the column array lengths differ then the sorting columns have been pruned
      if (nextSortingColumns.length !== sorting.columns.length) {
        sorting.onSort(nextSortingColumns);
      }
    }
  }, [columns, sorting]);

  if (sorting == null) return [null];

  const activeColumnIds = new Set(sorting.columns.map(({ id }) => id));
  const { inactiveColumns } = columns.reduce<{
    activeColumns: OuiDataGridColumn[];
    inactiveColumns: OuiDataGridColumn[];
  }>(
    (acc, column) => {
      if (activeColumnIds.has(column.id)) {
        acc.activeColumns.push(column);
      } else {
        acc.inactiveColumns.push(column);
      }
      return acc;
    },
    {
      activeColumns: [],
      inactiveColumns: [],
    }
  );

  function onDragEnd({
    source: { index: sourceIndex },
    destination,
  }: DropResult) {
    const destinationIndex = destination!.index;
    const nextColumns = ouiDragDropReorder(
      sorting!.columns,
      sourceIndex,
      destinationIndex
    );

    sorting!.onSort(nextColumns);
  }

  const controlBtnClasses = classNames('ouiDataGrid__controlBtn', {
    'ouiDataGrid__controlBtn--active': sorting.columns.length > 0,
  });

  const numberOfSortedFields = sorting.columns.length;

  const schemaDetails = (id: string | number) =>
    schema.hasOwnProperty(id) && schema[id].columnType != null
      ? getDetailsForSchema(schemaDetectors, schema[id].columnType)
      : null;

  const inactiveSortableColumns = inactiveColumns.filter(
    ({ id, isSortable }) => {
      const schemaDetail = schemaDetails(id);
      let sortable = true;
      if (isSortable != null) {
        sortable = isSortable;
      } else if (schemaDetail != null) {
        sortable = schemaDetail.hasOwnProperty('isSortable')
          ? schemaDetail.isSortable!
          : true;
      }
      return sortable;
    }
  );

  const columnSorting = (
    <OuiPopover
      data-test-subj="dataGridColumnSortingPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downLeft"
      panelPaddingSize="s"
      panelClassName="ouiDataGridColumnSortingPopover"
      button={
        <OuiI18n
          tokens={['ouiColumnSorting.button', 'ouiColumnSorting.buttonActive']}
          defaults={['Sort fields', 'fields sorted']}>
          {([button, buttonActive]: ReactChild[]) => (
            <OuiButtonEmpty
              size="xs"
              iconType="sortable"
              color="text"
              className={controlBtnClasses}
              data-test-subj="dataGridColumnSortingButton"
              onClick={() => setIsOpen(!isOpen)}>
              {numberOfSortedFields > 0
                ? `${numberOfSortedFields} ${buttonActive}`
                : button}
            </OuiButtonEmpty>
          )}
        </OuiI18n>
      }>
      {sorting.columns.length > 0 ? (
        <div
          role="region"
          aria-live="assertive"
          className="ouiDataGrid__controlScroll">
          <OuiDragDropContext onDragEnd={onDragEnd}>
            <OuiDroppable droppableId="columnSorting">
              <Fragment>
                {sorting.columns.map(({ id, direction }, index) => {
                  return (
                    <OuiDataGridColumnSortingDraggable
                      key={id}
                      id={id}
                      display={displayValues[id]}
                      direction={direction}
                      index={index}
                      sorting={sorting}
                      schema={schema}
                      schemaDetectors={schemaDetectors}
                    />
                  );
                })}
              </Fragment>
            </OuiDroppable>
          </OuiDragDropContext>
        </div>
      ) : (
        <OuiText size="s" color="subdued">
          <p role="alert">
            <OuiI18n
              token="ouiColumnSorting.emptySorting"
              default="Currently no fields are sorted"
            />
          </p>
        </OuiText>
      )}
      {(inactiveSortableColumns.length > 0 || sorting.columns.length > 0) && (
        <OuiPopoverFooter>
          <OuiFlexGroup
            gutterSize="m"
            justifyContent="spaceBetween"
            responsive={false}>
            <OuiFlexItem grow={false}>
              {inactiveSortableColumns.length > 0 && (
                <OuiPopover
                  data-test-subj="dataGridColumnSortingPopoverColumnSelection"
                  isOpen={avilableColumnsisOpen}
                  closePopover={() => setAvailableColumnsIsOpen(false)}
                  anchorPosition="downLeft"
                  panelPaddingSize="none"
                  button={
                    <OuiButtonEmpty
                      size="xs"
                      flush="left"
                      iconType="arrowDown"
                      iconSide="right"
                      onClick={() =>
                        setAvailableColumnsIsOpen(!avilableColumnsisOpen)
                      }>
                      <OuiI18n
                        token="ouiColumnSorting.pickFields"
                        default="Pick fields to sort by"
                      />
                    </OuiButtonEmpty>
                  }>
                  <OuiI18n
                    token="ouiColumnSorting.sortFieldAriaLabel"
                    default="Sort by: ">
                    {(sortFieldAriaLabel: string) => (
                      <div
                        className="ouiDataGridColumnSorting__fieldList"
                        role="listbox">
                        {inactiveSortableColumns.map(
                          ({ id, defaultSortDirection }) => {
                            return (
                              <button
                                key={id}
                                className="ouiDataGridColumnSorting__field"
                                aria-label={`${sortFieldAriaLabel} ${id}`}
                                role="option"
                                aria-selected="false"
                                data-test-subj={`dataGridColumnSortingPopoverColumnSelection-${id}`}
                                onClick={() => {
                                  const nextColumns = [...sorting.columns];
                                  nextColumns.push({
                                    id,
                                    direction:
                                      defaultSortDirection ||
                                      (schemaDetails(id) &&
                                        schemaDetails(id)!
                                          .defaultSortDirection) ||
                                      'asc',
                                  });
                                  sorting.onSort(nextColumns);
                                }}>
                                <OuiFlexGroup
                                  alignItems="center"
                                  gutterSize="s"
                                  component="span"
                                  responsive={false}>
                                  <OuiFlexItem grow={false}>
                                    <OuiToken
                                      iconType={
                                        schemaDetails(id) != null
                                          ? getDetailsForSchema(
                                              schemaDetectors,
                                              schema[id].columnType
                                            ).icon
                                          : 'tokenString'
                                      }
                                      color={
                                        schemaDetails(id) != null
                                          ? getDetailsForSchema(
                                              schemaDetectors,
                                              schema[id].columnType
                                            ).color
                                          : undefined
                                      }
                                    />
                                  </OuiFlexItem>
                                  <OuiFlexItem grow={false}>
                                    <OuiText size="xs">
                                      {displayValues[id]}
                                    </OuiText>
                                  </OuiFlexItem>
                                </OuiFlexGroup>
                              </button>
                            );
                          }
                        )}
                      </div>
                    )}
                  </OuiI18n>
                </OuiPopover>
              )}
            </OuiFlexItem>
            {sorting.columns.length > 0 ? (
              <OuiFlexItem grow={false}>
                <OuiButtonEmpty
                  size="xs"
                  flush="right"
                  onClick={() => sorting.onSort([])}>
                  <OuiI18n
                    token="ouiColumnSorting.clearAll"
                    default="Clear sorting"
                  />
                </OuiButtonEmpty>
              </OuiFlexItem>
            ) : null}
          </OuiFlexGroup>
        </OuiPopoverFooter>
      )}
    </OuiPopover>
  );

  return columnSorting;
};
