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

import React, { FunctionComponent, ThHTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { resolveWidthAsStyle } from './utils';

export type OuiTableHeaderCellCheckboxScope =
  | 'col'
  | 'row'
  | 'colgroup'
  | 'rowgroup';

export interface OuiTableHeaderCellCheckboxProps {
  width?: string | number;
  scope?: OuiTableHeaderCellCheckboxScope;
}

export const OuiTableHeaderCellCheckbox: FunctionComponent<
  CommonProps &
    ThHTMLAttributes<HTMLTableHeaderCellElement> &
    OuiTableHeaderCellCheckboxProps
> = ({ children, className, scope = 'col', style, width, ...rest }) => {
  const classes = classNames('ouiTableHeaderCellCheckbox', className);
  const styleObj = resolveWidthAsStyle(style, width);

  return (
    <th className={classes} scope={scope} style={styleObj} {...rest}>
      <div className="ouiTableCellContent">{children}</div>
    </th>
  );
};
