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

import React, { FunctionComponent, TdHTMLAttributes } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

import {
  HorizontalAlignment,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
} from '../../services';

import { resolveWidthAsStyle } from './utils';

export type OuiTableFooterCellProps = CommonProps &
  TdHTMLAttributes<HTMLTableCellElement> & {
    align?: HorizontalAlignment;
    width?: string | number;
  };

export const OuiTableFooterCell: FunctionComponent<OuiTableFooterCellProps> = ({
  children,
  align = LEFT_ALIGNMENT,
  className,
  width,
  style,
  ...rest
}) => {
  const classes = classNames('ouiTableFooterCell', className);
  const contentClasses = classNames('ouiTableCellContent', className, {
    'ouiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
    'ouiTableCellContent--alignCenter': align === CENTER_ALIGNMENT,
  });
  const styleObj = resolveWidthAsStyle(style, width);

  return (
    <td className={classes} style={styleObj} {...rest}>
      <div className={contentClasses}>
        <span className="ouiTableCellContent__text">{children}</span>
      </div>
    </td>
  );
};
