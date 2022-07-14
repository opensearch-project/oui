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

import React, { Fragment, FunctionComponent } from 'react';
import classNames from 'classnames';

import { OuiI18n } from '../i18n';
import { OuiNotificationBadge } from '../badge/notification_badge';
import { OuiButtonEmpty, OuiButtonEmptyProps } from '../button/button_empty';

import { useInnerText } from '../inner_text';

export type OuiFilterButtonProps = OuiButtonEmptyProps & {
  /**
   * Bolds the button if true
   */
  hasActiveFilters?: boolean;
  /**
   * Pass the total number of filters available and it will
   * add a subdued notification badge showing the number
   */
  numFilters?: number;
  /**
   * Pass the number of selected filters and it will
   * add a bright notification badge showing the number
   */
  numActiveFilters?: number;
  /**
   * Applies a visual state to the button useful when using with a popover.
   */
  isSelected?: boolean;
  /**
   * Should the button grow to fill its container, best used for dropdown buttons
   */
  grow?: boolean;
  /**
   * Remove border after button, good for opposite filters
   */
  withNext?: boolean;
  /**
   * _DEPRECATED: use `withNext`_
   * Remove border after button, good for opposite filters
   */
  noDivider?: boolean;
};

export const OuiFilterButton: FunctionComponent<OuiFilterButtonProps> = ({
  children,
  className,
  iconType,
  iconSide = 'right',
  color = 'text',
  hasActiveFilters,
  numFilters,
  numActiveFilters,
  isDisabled,
  isSelected,
  type = 'button',
  grow = true,
  noDivider,
  withNext,
  textProps,
  ...rest
}) => {
  // != instead of !== to allow for null and undefined
  const numFiltersDefined = numFilters != null;

  const classes = classNames(
    'ouiFilterButton',
    {
      'ouiFilterButton-isSelected': isSelected,
      'ouiFilterButton-hasActiveFilters': hasActiveFilters,
      'ouiFilterButton-hasNotification': numFiltersDefined,
      'ouiFilterButton--hasIcon': iconType,
      'ouiFilterButton--noGrow': !grow,
      'ouiFilterButton--withNext': noDivider || withNext,
    },
    className
  );

  const buttonTextClassNames = classNames(
    // 'ouiFilterButton__textShift',
    {
      'ouiFilterButton__text-hasNotification':
        numFiltersDefined || numActiveFilters,
    },
    textProps && textProps.className
  );

  let dataText;
  if (typeof children === 'string') {
    dataText = children;
  }

  const [ref, innerText] = useInnerText();
  const buttonContents = (
    <Fragment>
      <span
        ref={ref}
        className="ouiFilterButton__textShift"
        data-text={dataText || innerText}
        title={dataText || innerText}>
        {children}
      </span>

      {(numFiltersDefined || numActiveFilters) && (
        <OuiI18n
          token="ouiFilterButton.filterBadge"
          values={{
            count: numActiveFilters || numFilters,
            hasActiveFilters: hasActiveFilters ? 'active' : 'available',
          }}
          default="{count} {hasActiveFilters} filters">
          {(filterBadge: string) => {
            return (
              <OuiNotificationBadge
                className="ouiFilterButton__notification"
                size="m"
                aria-label={filterBadge}
                color={isDisabled || !hasActiveFilters ? 'subdued' : 'accent'}>
                {numActiveFilters || numFilters}
              </OuiNotificationBadge>
            );
          }}
        </OuiI18n>
      )}
    </Fragment>
  );

  return (
    <OuiButtonEmpty
      className={classes}
      color={color}
      isDisabled={isDisabled}
      iconSide={iconSide}
      iconType={iconType}
      type={type}
      textProps={{ ...textProps, className: buttonTextClassNames }}
      {...rest}>
      {buttonContents}
    </OuiButtonEmpty>
  );
};
