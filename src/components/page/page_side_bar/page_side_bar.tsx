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

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../../common';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'ouiPageSideBar--paddingSmall',
  m: 'ouiPageSideBar--paddingMedium',
  l: 'ouiPageSideBar--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export interface OuiPageSideBarProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Adds `position: sticky` and affords for any fixed position headers
   */
  sticky?: boolean;
  /**
   * Adds padding around the children
   */
  paddingSize?: typeof PADDING_SIZES[number];
}

export const OuiPageSideBar: FunctionComponent<OuiPageSideBarProps> = ({
  children,
  className,
  sticky,
  paddingSize = 'none',
  ...rest
}) => {
  const classes = classNames(
    'ouiPageSideBar',
    paddingSizeToClassNameMap[paddingSize],
    {
      'ouiPageSideBar--sticky': sticky,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
