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
  ThHTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { OuiScreenReaderOnly } from '../accessibility';
import { CommonProps, NoArgCallback } from '../common';
import { OuiIcon } from '../icon';
import { resolveWidthAsStyle } from './utils';
import { OuiInnerText } from '../inner_text';

import {
  HorizontalAlignment,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
} from '../../services';
import { OuiI18n } from '../i18n';

export type TableHeaderCellScope = 'col' | 'row' | 'colgroup' | 'rowgroup';

export type OuiTableHeaderCellProps = CommonProps &
  Omit<ThHTMLAttributes<HTMLTableHeaderCellElement>, 'align' | 'scope'> & {
    align?: HorizontalAlignment;
    /**
     * _DEPRECATED: use `mobileOptions.show = false`_ Indicates if the
     * column should not show for mobile users (typically hidden because a
     * custom mobile header utilizes the column's contents)
     */
    hideForMobile?: boolean;
    /**
     * _DEPRECATED: use `mobileOptions.only = true`_ Indicates if the
     * column was created to be the row's heading in mobile view (this
     * column will be hidden at larger screens)
     */
    isMobileHeader?: boolean;
    isSortAscending?: boolean;
    isSorted?: boolean;
    /**
     * Mobile options for displaying differently at small screens
     */
    mobileOptions?: {
      /**
       * If false, will not render the column at all for mobile
       */
      show?: boolean;
      /**
       * Only show for mobile? If true, will not render the column at all
       * for desktop
       */
      only?: boolean;
    };
    onSort?: NoArgCallback<void>;
    scope?: TableHeaderCellScope;
    width?: string | number;
    description?: string;
    /**
     * Shows the sort indicator but removes the button
     */
    readOnly?: boolean;
  };

const CellContents = ({
  className,
  description,
  children,
  isSorted,
  isSortAscending,
  showSortMsg,
}: {
  className: string;
  description: OuiTableHeaderCellProps['description'];
  children: OuiTableHeaderCellProps['children'];
  isSorted: OuiTableHeaderCellProps['isSorted'];
  isSortAscending?: OuiTableHeaderCellProps['isSortAscending'];
  showSortMsg: boolean;
}) => {
  return (
    <span className={className}>
      <OuiInnerText>
        {(ref, innerText) => (
          <OuiI18n
            token="ouiTableHeaderCell.titleTextWithDesc"
            default="{innerText}; {description}"
            values={{ innerText, description }}>
            {(titleTextWithDesc: string) => (
              <span
                title={description ? titleTextWithDesc : innerText}
                ref={ref}
                className="ouiTableCellContent__text">
                {children}
              </span>
            )}
          </OuiI18n>
        )}
      </OuiInnerText>
      {description && (
        <OuiScreenReaderOnly>
          <span>{description}</span>
        </OuiScreenReaderOnly>
      )}
      {showSortMsg && isSorted && (
        <OuiIcon
          className="ouiTableSortIcon"
          type={isSortAscending ? 'sortUp' : 'sortDown'}
          size="m"
        />
      )}
    </span>
  );
};

export const OuiTableHeaderCell: FunctionComponent<OuiTableHeaderCellProps> = ({
  children,
  align = LEFT_ALIGNMENT,
  onSort,
  isSorted,
  isSortAscending,
  className,
  scope = 'col',
  mobileOptions = {
    show: true,
  },
  width,
  style,
  readOnly,
  // Soon to be deprecated for {...mobileOptions}
  isMobileHeader,
  hideForMobile,
  description,
  ...rest
}) => {
  const classes = classNames('ouiTableHeaderCell', className, {
    'ouiTableHeaderCell--hideForDesktop': mobileOptions.only || isMobileHeader,
    'ouiTableHeaderCell--hideForMobile': !mobileOptions.show || hideForMobile,
  });

  const contentClasses = classNames('ouiTableCellContent', className, {
    'ouiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
    'ouiTableCellContent--alignCenter': align === CENTER_ALIGNMENT,
  });

  const styleObj = resolveWidthAsStyle(style, width);

  const CellComponent = children ? 'th' : 'td';

  if (onSort || isSorted) {
    const buttonClasses = classNames('ouiTableHeaderButton', {
      'ouiTableHeaderButton-isSorted': isSorted,
    });

    let ariaSortValue: HTMLAttributes<any>['aria-sort'] = 'none';
    if (isSorted) {
      ariaSortValue = isSortAscending ? 'ascending' : 'descending';
    }

    const cellContents = (
      <CellContents
        className={contentClasses}
        description={description}
        showSortMsg={true}
        children={children}
        isSorted={isSorted}
        isSortAscending={isSortAscending}
      />
    );

    return (
      <CellComponent
        className={classes}
        scope={scope}
        role="columnheader"
        aria-sort={ariaSortValue}
        aria-live="polite"
        style={styleObj}
        {...rest}>
        {onSort && !readOnly ? (
          <button
            type="button"
            className={buttonClasses}
            onClick={onSort}
            data-test-subj="tableHeaderSortButton">
            {cellContents}
          </button>
        ) : (
          cellContents
        )}
      </CellComponent>
    );
  }

  return (
    <CellComponent
      className={classes}
      scope={scope}
      role="columnheader"
      style={styleObj}
      {...rest}>
      <CellContents
        className={contentClasses}
        description={description}
        showSortMsg={false}
        children={children}
        isSorted={isSorted}
        isSortAscending={isSortAscending}
      />
    </CellComponent>
  );
};
