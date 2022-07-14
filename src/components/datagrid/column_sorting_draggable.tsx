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

import React, { FunctionComponent, ReactChild } from 'react';
import { OuiI18n } from '../i18n';
import { OuiDraggable } from '../drag_and_drop';
import { OuiScreenReaderOnly } from '../accessibility';
import { OuiFlexGroup, OuiFlexItem } from '../flex';
import { OuiButtonIcon, OuiButtonGroup } from '../button';
import { OuiIcon } from '../icon';
import { OuiText } from '../text';
import {
  getDetailsForSchema,
  OuiDataGridSchema,
  OuiDataGridSchemaDetector,
} from './data_grid_schema';
import { OuiDataGridSorting } from './data_grid_types';
import { OuiToken } from '../token';

export interface OuiDataGridColumnSortingDraggableProps {
  id: string;
  direction: string;
  index: number;
  sorting: OuiDataGridSorting;
  schema: OuiDataGridSchema;
  schemaDetectors: OuiDataGridSchemaDetector[];
  /**
   * Value to be shown in column sorting popover.
   */
  display: string;
}

export const defaultSortAscLabel = (
  <OuiI18n token="ouiColumnSortingDraggable.defaultSortAsc" default="A-Z" />
);
export const defaultSortDescLabel = (
  <OuiI18n token="ouiColumnSortingDraggable.defaultSortDesc" default="Z-A" />
);

export const OuiDataGridColumnSortingDraggable: FunctionComponent<OuiDataGridColumnSortingDraggableProps> = ({
  id,
  display,
  direction,
  index,
  sorting,
  schema,
  schemaDetectors,
  ...rest
}) => {
  const schemaDetails =
    schema.hasOwnProperty(id) && schema[id].columnType != null
      ? getDetailsForSchema(schemaDetectors, schema[id].columnType)
      : null;

  const textSortAsc =
    schemaDetails != null ? schemaDetails.sortTextAsc : defaultSortAscLabel;

  const textSortDesc =
    schemaDetails != null ? schemaDetails.sortTextDesc : defaultSortDescLabel;

  const toggleOptions = [
    {
      id: `${id}Asc`,
      value: 'asc',
      label: textSortAsc,
      'data-test-subj': `ouiDataGridColumnSorting-sortColumn-${id}-asc`,
    },
    {
      id: `${id}Desc`,
      value: 'desc',
      label: textSortDesc,
      'data-test-subj': `ouiDataGridColumnSorting-sortColumn-${id}-desc`,
    },
  ];

  return (
    <OuiDraggable draggableId={id} index={index} {...rest}>
      {(provided, state) => (
        <div
          className={`ouiDataGridColumnSorting__item ${
            state.isDragging && 'ouiDataGridColumnSorting__item-isDragging'
          }`}>
          <OuiScreenReaderOnly>
            <p>
              <OuiI18n
                token="ouiColumnSortingDraggable.activeSortLabel"
                default="is sorting this data grid">
                {(activeSortLabel: ReactChild) => (
                  <span>
                    {display} {activeSortLabel}
                  </span>
                )}
              </OuiI18n>
            </p>
          </OuiScreenReaderOnly>
          <OuiFlexGroup
            gutterSize="xs"
            alignItems="center"
            responsive={false}
            data-test-subj={`ouiDataGridColumnSorting-sortColumn-${id}`}>
            <OuiFlexItem grow={false}>
              <OuiI18n
                token="ouiColumnSortingDraggable.removeSortLabel"
                default="Remove from data grid sort:">
                {(removeSortLabel: ReactChild) => (
                  <OuiButtonIcon
                    color="text"
                    className="ouiDataGridColumnSorting__button"
                    aria-label={`${removeSortLabel} ${id}`}
                    iconType="cross"
                    onClick={() => {
                      const nextColumns = [...sorting.columns];
                      const columnIndex = nextColumns
                        .map(({ id }) => id)
                        .indexOf(id);
                      nextColumns.splice(columnIndex, 1);
                      sorting.onSort(nextColumns);
                    }}
                  />
                )}
              </OuiI18n>
            </OuiFlexItem>

            <OuiFlexItem grow={false}>
              <OuiToken
                color={schemaDetails != null ? schemaDetails.color : undefined}
                iconType={
                  schemaDetails != null ? schemaDetails.icon : 'tokenString'
                }
              />
            </OuiFlexItem>
            <OuiFlexItem aria-hidden>
              <OuiText size="xs">
                <p>{display}</p>
              </OuiText>
            </OuiFlexItem>
            <OuiFlexItem className="ouiDataGridColumnSorting__orderButtons">
              <OuiI18n
                token="ouiColumnSortingDraggable.toggleLegend"
                default="Select sorting method for field: ">
                {(toggleLegend: ReactChild) => (
                  <OuiButtonGroup
                    legend={`${toggleLegend} ${id}`}
                    name={id}
                    isFullWidth
                    options={toggleOptions}
                    data-test-subj={`-${direction}`}
                    buttonSize="compressed"
                    className="ouiDataGridColumnSorting__order"
                    idSelected={direction === 'asc' ? `${id}Asc` : `${id}Desc`}
                    onChange={(_, direction) => {
                      const nextColumns = [...sorting.columns];
                      const columnIndex = nextColumns
                        .map(({ id }) => id)
                        .indexOf(id);
                      nextColumns.splice(columnIndex, 1, {
                        id,
                        direction,
                      });
                      sorting.onSort(nextColumns);
                    }}
                  />
                )}
              </OuiI18n>
            </OuiFlexItem>
            <OuiFlexItem grow={false} {...provided.dragHandleProps}>
              <div {...provided.dragHandleProps}>
                <OuiIcon type="grab" color="subdued" />
              </div>
            </OuiFlexItem>
          </OuiFlexGroup>
        </div>
      )}
    </OuiDraggable>
  );
};
