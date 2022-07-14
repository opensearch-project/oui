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
import React, { JSXElementConstructor, useMemo } from 'react';
import {
  OuiDataGridColumn,
  OuiDataGridColumnCellAction,
  OuiDataGridColumnCellActionProps,
} from './data_grid_types';
import classNames from 'classnames';
import { OuiI18n } from '../i18n';
import { OuiButtonIcon, OuiButtonIconProps } from '../button/button_icon';

export const OuiDataGridCellButtons = ({
  popoverIsOpen,
  closePopover,
  onExpandClick,
  column,
  rowIndex,
}: {
  popoverIsOpen: boolean;
  closePopover: () => void;
  onExpandClick: () => void;
  column?: OuiDataGridColumn;
  rowIndex: number;
}) => {
  const buttonIconClasses = classNames('ouiDataGridRowCell__expandButtonIcon', {
    'ouiDataGridRowCell__expandButtonIcon-isActive': popoverIsOpen,
  });
  const buttonClasses = classNames('ouiDataGridRowCell__expandButton', {
    'ouiDataGridRowCell__expandButton-isActive': popoverIsOpen,
  });
  const expandButton = (
    <OuiI18n
      key={'expand'}
      token="ouiDataGridCellButtons.expandButtonTitle"
      default="Click or hit enter to interact with cell content">
      {(expandButtonTitle: string) => (
        <OuiButtonIcon
          display="fill"
          className={buttonIconClasses}
          color="primary"
          iconSize="s"
          iconType="expandMini"
          aria-hidden
          onClick={onExpandClick}
          title={expandButtonTitle}
        />
      )}
    </OuiI18n>
  );
  const additionalButtons = useMemo(() => {
    const ButtonComponent = (props: OuiButtonIconProps) => (
      <OuiButtonIcon
        {...props}
        aria-hidden
        className="ouiDataGridRowCell__actionButtonIcon"
        iconSize="s"
      />
    );
    return column && Array.isArray(column.cellActions)
      ? column.cellActions.map(
          (Action: OuiDataGridColumnCellAction, idx: number) => {
            // React is more permissible than the TS types indicate
            const CellButtonElement = Action as JSXElementConstructor<
              OuiDataGridColumnCellActionProps
            >;
            return (
              <CellButtonElement
                key={idx}
                rowIndex={rowIndex}
                columnId={column.id}
                Component={ButtonComponent}
                isExpanded={false}
                closePopover={closePopover}
              />
            );
          }
        )
      : [];
  }, [column, rowIndex, closePopover]);

  return (
    <div className={buttonClasses}>{[...additionalButtons, expandButton]}</div>
  );
};
