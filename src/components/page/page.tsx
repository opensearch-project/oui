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
import { CommonProps, keysOf } from '../common';
import {
  _OuiPageRestrictWidth,
  setPropsForRestrictedPageWidth,
} from './_restrict_width';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'ouiPage--paddingSmall',
  m: 'ouiPage--paddingMedium',
  l: 'ouiPage--paddingLarge',
};

const directionToClassNameMap = {
  row: null,
  column: 'ouiPage--column',
};

export const SIZES = keysOf(paddingSizeToClassNameMap);
export const DIRECTIONS = keysOf(directionToClassNameMap);

export interface OuiPageProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement>,
    _OuiPageRestrictWidth {
  /**
   * Adjust the padding.
   * When using this setting it's best to be consistent throughout all similar usages
   */
  paddingSize?: typeof SIZES[number];
  /**
   * Adds `flex-grow: 1` to the whole page for stretching to fit vertically.
   * Must be wrapped inside a flexbox, preferrably with `min-height: 100vh`
   */
  grow?: boolean;
  /**
   * Changes the `flex-direction` property.
   * Flip to `column` when not including a sidebar.
   */
  direction?: 'row' | 'column';
}

export const OuiPage: FunctionComponent<OuiPageProps> = ({
  children,
  restrictWidth = false,
  style,
  className,
  paddingSize = 'm',
  grow = true,
  direction = 'row',
  ...rest
}) => {
  const { widthClassName, newStyle } = setPropsForRestrictedPageWidth(
    restrictWidth,
    style
  );

  const classes = classNames(
    'ouiPage',
    paddingSizeToClassNameMap[paddingSize],
    directionToClassNameMap[direction],
    {
      'ouiPage--grow': grow,
      [`ouiPage--${widthClassName}`]: widthClassName,
    },
    className
  );

  return (
    <div className={classes} style={newStyle || style} {...rest}>
      {children}
    </div>
  );
};
