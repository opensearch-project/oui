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

import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

export type FlexGridGutterSize = keyof typeof gutterSizeToClassNameMap;
export type FlexGridColumns = 0 | 1 | 2 | 3 | 4;
export type FlexGridDirection = keyof typeof directionToClassNameMap;

export interface OuiFlexGridProps {
  /**
   * ReactNode to render as this component's content
   */
  children?: ReactNode;
  /**
   * Number of columns `1-4`, pass `0` for normal display
   */
  columns?: FlexGridColumns;
  /**
   * Flex layouts default to left-right then top-down (`row`).
   * Change this prop to `column` to create a top-down then left-right display.
   * Only works with column count of `1-4`.
   */
  direction?: FlexGridDirection;
  /**
   * Space between flex items
   */
  gutterSize?: FlexGridGutterSize;
  /**
   * Force each item to be display block on smaller screens
   */
  responsive?: boolean;

  /**
   * The tag to render
   */
  component?: keyof JSX.IntrinsicElements;
}

const directionToClassNameMap = {
  row: null,
  column: 'ouiFlexGrid--directionColumn',
};

export const DIRECTIONS = keysOf(directionToClassNameMap);

const gutterSizeToClassNameMap = {
  none: 'ouiFlexGrid--gutterNone',
  s: 'ouiFlexGrid--gutterSmall',
  m: 'ouiFlexGrid--gutterMedium',
  l: 'ouiFlexGrid--gutterLarge',
  xl: 'ouiFlexGrid--gutterXLarge',
};

export const GUTTER_SIZES: FlexGridGutterSize[] = keysOf(
  gutterSizeToClassNameMap
);

const columnsToClassNameMap = {
  0: 'ouiFlexGrid--wrap',
  1: 'ouiFlexGrid--single',
  2: 'ouiFlexGrid--halves',
  3: 'ouiFlexGrid--thirds',
  4: 'ouiFlexGrid--fourths',
};

export const COLUMNS = Object.keys(
  columnsToClassNameMap
).map((columns: string) => parseInt(columns, 10)) as FlexGridColumns[];

export const OuiFlexGrid: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement> & OuiFlexGridProps
> = ({
  children,
  className,
  gutterSize = 'l',
  direction = 'row',
  responsive = true,
  columns = 0,
  component: Component = 'div',
  ...rest
}) => {
  const classes = classNames(
    'ouiFlexGrid',
    gutterSize ? gutterSizeToClassNameMap[gutterSize] : undefined,
    columns != null ? columnsToClassNameMap[columns] : undefined,
    direction ? directionToClassNameMap[direction] : undefined,
    {
      'ouiFlexGrid--responsive': responsive,
    },
    className
  );

  return (
    // @ts-ignore difficult to verify `rest` applies to `Component`
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};
