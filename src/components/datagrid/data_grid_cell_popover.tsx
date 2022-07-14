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
import React, { JSXElementConstructor, ReactNode, RefCallback } from 'react';
import {
  OuiDataGridColumn,
  OuiDataGridColumnCellAction,
  OuiDataGridColumnCellActionProps,
  OuiDataGridPopoverContent,
} from './data_grid_types';
import { OuiPopover, OuiPopoverFooter } from '../popover';
import { keys } from '../../services';
import { OuiFlexGroup, OuiFlexItem } from '../flex';
import { OuiButtonEmpty, OuiButtonEmptyProps } from '../button/button_empty';
import { OuiDataGridCellValueElementProps } from './data_grid_cell';

interface OuiDataGridCellPopoverProps {
  anchorContent: NonNullable<ReactNode>;
  cellContentProps: OuiDataGridCellValueElementProps;
  cellContentsRef: HTMLDivElement | null;
  closePopover: () => void;
  column?: OuiDataGridColumn;
  panelRefFn: RefCallback<HTMLElement | null>;
  popoverIsOpen: boolean;
  popoverContent: OuiDataGridPopoverContent;
  renderCellValue:
    | JSXElementConstructor<OuiDataGridCellValueElementProps>
    | ((props: OuiDataGridCellValueElementProps) => ReactNode);
  rowIndex: number;
}

export function OuiDataGridCellPopover({
  anchorContent,
  cellContentProps,
  cellContentsRef,
  closePopover,
  column,
  panelRefFn,
  popoverContent: PopoverContent,
  popoverIsOpen,
  renderCellValue,
  rowIndex,
}: OuiDataGridCellPopoverProps) {
  const CellElement = renderCellValue as JSXElementConstructor<
    OuiDataGridCellValueElementProps
  >;
  return (
    <OuiPopover
      hasArrow={false}
      anchorClassName="ouiDataGridRowCell__expand"
      button={anchorContent}
      isOpen={popoverIsOpen}
      panelRef={panelRefFn}
      panelClassName="ouiDataGridRowCell__popover"
      panelPaddingSize="s"
      zIndex={8001}
      display="block"
      closePopover={closePopover}
      onKeyDown={(event) => {
        if (event.key === keys.F2 || event.key === keys.ESCAPE) {
          event.preventDefault();
          event.stopPropagation();
          closePopover();
        }
      }}>
      {popoverIsOpen ? (
        <>
          <PopoverContent cellContentsElement={cellContentsRef!}>
            <CellElement {...cellContentProps} isDetails={true} />
          </PopoverContent>
          {column && column.cellActions && column.cellActions.length ? (
            <OuiPopoverFooter>
              <OuiFlexGroup gutterSize="s">
                {column.cellActions.map(
                  (Action: OuiDataGridColumnCellAction, idx: number) => {
                    const CellButtonElement = Action as JSXElementConstructor<
                      OuiDataGridColumnCellActionProps
                    >;
                    return (
                      <OuiFlexItem key={idx}>
                        <CellButtonElement
                          rowIndex={rowIndex}
                          columnId={column.id}
                          Component={(props: OuiButtonEmptyProps) => (
                            <OuiButtonEmpty {...props} size="s" />
                          )}
                          isExpanded={true}
                          closePopover={closePopover}
                        />
                      </OuiFlexItem>
                    );
                  }
                )}
              </OuiFlexGroup>
            </OuiPopoverFooter>
          ) : null}
        </>
      ) : null}
    </OuiPopover>
  );
}
