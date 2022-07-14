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

import React, { forwardRef, HTMLAttributes, memo } from 'react';
import classnames from 'classnames';
import {
  OuiDataGridControlColumn,
  OuiDataGridColumn,
  OuiDataGridColumnWidths,
  OuiDataGridPopoverContent,
  OuiDataGridPopoverContents,
} from './data_grid_types';
import { CommonProps } from '../common';

import { OuiDataGridCell, OuiDataGridCellProps } from './data_grid_cell';
import { OuiDataGridSchema } from './data_grid_schema';
import { OuiText } from '../text';

export type OuiDataGridFooterRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    rowIndex: number;
    leadingControlColumns: OuiDataGridControlColumn[];
    trailingControlColumns: OuiDataGridControlColumn[];
    columns: OuiDataGridColumn[];
    schema: OuiDataGridSchema;
    popoverContents: OuiDataGridPopoverContents;
    columnWidths: OuiDataGridColumnWidths;
    defaultColumnWidth?: number | null;
    renderCellValue: OuiDataGridCellProps['renderCellValue'];
    interactiveCellId: OuiDataGridCellProps['interactiveCellId'];
    visibleRowIndex?: number;
  };

const DefaultColumnFormatter: OuiDataGridPopoverContent = ({ children }) => {
  return <OuiText>{children}</OuiText>;
};

const OuiDataGridFooterRow = memo(
  forwardRef<HTMLDivElement, OuiDataGridFooterRowProps>(
    (
      {
        leadingControlColumns,
        trailingControlColumns,
        columns,
        schema,
        popoverContents,
        columnWidths,
        defaultColumnWidth,
        className,
        renderCellValue,
        rowIndex,
        interactiveCellId,
        'data-test-subj': _dataTestSubj,
        visibleRowIndex = rowIndex,
        ...rest
      },
      ref
    ) => {
      const classes = classnames(
        'ouiDataGridRow',
        'ouiDataGridFooter',
        className
      );
      const dataTestSubj = classnames('dataGridRow', _dataTestSubj);

      return (
        <div
          ref={ref}
          role="row"
          className={classes}
          data-test-subj={dataTestSubj}
          {...rest}>
          {leadingControlColumns.map(({ id, width }, i) => (
            <OuiDataGridCell
              key={`${id}-${rowIndex}`}
              rowIndex={rowIndex}
              visibleRowIndex={visibleRowIndex}
              colIndex={i}
              columnId={id}
              popoverContent={DefaultColumnFormatter}
              width={width}
              renderCellValue={() => null}
              interactiveCellId={interactiveCellId}
              isExpandable={true}
              className="ouiDataGridFooterCell ouiDataGridRowCell--controlColumn"
            />
          ))}
          {columns.map(({ id }, i) => {
            const columnType = schema[id] ? schema[id].columnType : null;
            const popoverContent =
              (columnType && popoverContents[columnType]) ||
              DefaultColumnFormatter;

            const width = columnWidths[id] || defaultColumnWidth;
            const columnPosition = i + leadingControlColumns.length;

            return (
              <OuiDataGridCell
                key={`${id}-${rowIndex}`}
                rowIndex={rowIndex}
                visibleRowIndex={visibleRowIndex}
                colIndex={columnPosition}
                columnId={id}
                columnType={columnType}
                popoverContent={popoverContent}
                width={width || undefined}
                renderCellValue={renderCellValue}
                interactiveCellId={interactiveCellId}
                isExpandable={true}
                className="ouiDataGridFooterCell"
              />
            );
          })}
          {trailingControlColumns.map(({ id, width }, i) => {
            const colIndex = i + columns.length + leadingControlColumns.length;

            return (
              <OuiDataGridCell
                key={`${id}-${rowIndex}`}
                rowIndex={rowIndex}
                visibleRowIndex={visibleRowIndex}
                colIndex={colIndex}
                columnId={id}
                popoverContent={DefaultColumnFormatter}
                width={width}
                renderCellValue={() => null}
                interactiveCellId={interactiveCellId}
                isExpandable={true}
                className="ouiDataGridFooterCell ouiDataGridRowCell--controlColumn"
              />
            );
          })}
        </div>
      );
    }
  )
);

OuiDataGridFooterRow.displayName = 'OuiDataGridFooterRow';

export { OuiDataGridFooterRow };
