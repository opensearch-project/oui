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

import React, { PropsWithChildren, ComponentType, ComponentProps } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../../common';
import {
  _OuiPageRestrictWidth,
  setPropsForRestrictedPageWidth,
} from '../_restrict_width';
import { OuiPanel, OuiPanelProps } from '../../panel';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'ouiPageBody--paddingSmall',
  m: 'ouiPageBody--paddingMedium',
  l: 'ouiPageBody--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

type ComponentTypes = keyof JSX.IntrinsicElements | ComponentType<any>;

export type OuiPageBodyProps<T extends ComponentTypes = 'main'> = CommonProps &
  ComponentProps<T> &
  _OuiPageRestrictWidth & {
    /**
     * Sets the HTML element for `OuiPageBody`.
     */
    component?: T;
    /**
     * Uses an OuiPanel as the main component instead of a plain div
     */
    panelled?: boolean;
    /**
     * Extends any extra OuiPanel props if `panelled=true`
     */
    panelProps?: Omit<OuiPanelProps, 'paddingSize'>;
    /**
     * Adjusts the padding
     */
    paddingSize?: typeof PADDING_SIZES[number];
  };

export const OuiPageBody = <T extends ComponentTypes>({
  children,
  restrictWidth = false,
  style,
  className,
  component: Component = 'div' as T,
  panelled,
  panelProps,
  paddingSize,
  borderRadius = 'none',
  ...rest
}: PropsWithChildren<OuiPageBodyProps<T>>) => {
  const { widthClassName, newStyle } = setPropsForRestrictedPageWidth(
    restrictWidth,
    style
  );

  const nonBreakingDefaultPadding = panelled ? 'l' : 'none';
  paddingSize = paddingSize || nonBreakingDefaultPadding;

  const borderRadiusClass =
    borderRadius === 'none' ? 'ouiPageBody--borderRadiusNone' : '';

  const classes = classNames(
    'ouiPageBody',
    borderRadiusClass,
    // This may duplicate the padding styles from OuiPanel, but allows for some nested configurations in the CSS
    paddingSizeToClassNameMap[paddingSize as typeof PADDING_SIZES[number]],
    {
      [`ouiPageBody--${widthClassName}`]: widthClassName,
    },
    className
  );

  return panelled ? (
    <OuiPanel
      className={classes}
      style={newStyle || style}
      borderRadius={borderRadius}
      paddingSize={paddingSize}
      {...panelProps}
      {...rest}>
      {children}
    </OuiPanel>
  ) : (
    <Component className={classes} style={newStyle || style} {...rest}>
      {children}
    </Component>
  );
};
