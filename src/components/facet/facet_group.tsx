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
import { OuiFlexGroup } from '../flex';

type FacetGroupLayout = 'vertical' | 'horizontal';

const layoutToClassNameMap: { [layout in FacetGroupLayout]: string } = {
  vertical: 'ouiFacetGroup--vertical',
  horizontal: 'ouiFacetGroup--horizontal',
};

export const LAYOUTS = keysOf(layoutToClassNameMap);

type FacetGroupGutterSize = 'none' | 's' | 'm' | 'l';

const gutterSizeToClassNameMap: {
  [gutterSize in FacetGroupGutterSize]: string;
} = {
  none: 'ouiFacetGroup--gutterNone',
  s: 'ouiFacetGroup--gutterSmall',
  m: 'ouiFacetGroup--gutterMedium',
  l: 'ouiFacetGroup--gutterLarge',
};

export const GUTTER_SIZES = keysOf(gutterSizeToClassNameMap);

export type OuiFacetGroupProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * Vertically in a column, or horizontally in one wrapping line
     */
    layout?: FacetGroupLayout;
    /**
     * Distance between facet buttons.
     * Horizontal layout always adds more distance horizontally between buttons.
     */
    gutterSize?: FacetGroupGutterSize;
  };

export const OuiFacetGroup: FunctionComponent<OuiFacetGroupProps> = ({
  children,
  className,
  layout = 'vertical',
  gutterSize = 'm',
  ...rest
}) => {
  const classes = classNames(
    'ouiFacetGroup',
    layoutToClassNameMap[layout],
    gutterSizeToClassNameMap[gutterSize],
    className
  );
  const direction = layout === 'vertical' ? 'column' : 'row';
  const wrap = layout === 'vertical' ? false : true;

  return (
    <OuiFlexGroup
      className={classes}
      direction={direction}
      wrap={wrap}
      gutterSize="none"
      {...rest}>
      {children}
    </OuiFlexGroup>
  );
};
