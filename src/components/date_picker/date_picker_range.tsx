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
  FunctionComponent,
  ReactNode,
  cloneElement,
  ReactElement,
} from 'react';
import classNames from 'classnames';

import { OuiText } from '../text';
import { IconType } from '../icon';
import { CommonProps } from '../common';
import { OuiDatePickerProps } from './date_picker';

export type OuiDatePickerRangeProps = CommonProps & {
  /**
   * Including any children will replace all innards with the provided children
   */
  children?: ReactNode;

  /**
   * The end date `OuiDatePicker` element
   */
  endDateControl: ReactNode;
  fullWidth?: boolean;

  /**
   * Pass either an icon type or set to `false` to remove icon entirely
   */
  iconType?: boolean | IconType;

  /**
   * Won't apply any additional props to start and end date components
   */
  isCustom?: boolean;
  readOnly?: boolean;

  /**
   * The start date `OuiDatePicker` element
   */
  startDateControl: ReactNode;

  /**
   * when `true` creates a shorter input
   */
  compressed?: boolean;
};

export const OuiDatePickerRange: FunctionComponent<OuiDatePickerRangeProps> = ({
  children,
  className,
  startDateControl,
  endDateControl,
  iconType = true,
  fullWidth,
  isCustom,
  readOnly,
  compressed,
  ...rest
}) => {
  const classes = classNames(
    'ouiDatePickerRange',
    {
      'ouiDatePickerRange--fullWidth': fullWidth,
      'ouiDatePickerRange--readOnly': readOnly,
      'ouiDatePickerRange--compressed': compressed,
    },
    className
  );

  let startControl = startDateControl;
  let endControl = endDateControl;

  if (!isCustom) {
    startControl = cloneElement(
      startDateControl as ReactElement<OuiDatePickerProps>,
      {
        fullWidth: fullWidth,
        readOnly: readOnly,
        iconType: typeof iconType === 'boolean' ? undefined : iconType,
        showIcon: !!iconType,
      }
    );

    endControl = cloneElement(
      endDateControl as ReactElement<OuiDatePickerProps>,
      {
        showIcon: false,
        fullWidth: fullWidth,
        readOnly: readOnly,
        popoverPlacement: 'bottom-end',
      }
    );
  }

  return (
    <div className={classes} {...rest}>
      {children ? (
        children
      ) : (
        <Fragment>
          {startControl}
          <OuiText
            className="ouiDatePickerRange__delimeter"
            size="s"
            color="subdued">
            →
          </OuiText>
          {endControl}
        </Fragment>
      )}
    </div>
  );
};
