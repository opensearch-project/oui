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
import defaults from 'lodash/defaults';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import { isColorDark, hexToRgb } from '../../services';

import { IconType, OuiIcon, IconSize } from '../icon';
import { OuiTokenMapType, TOKEN_MAP } from './token_map';

type TokenSize = 'xs' | 's' | 'm' | 'l';
type TokenShape = 'circle' | 'square' | 'rectangle';
type TokenFill = 'dark' | 'light' | 'none';
type TokenColor =
  | 'ouiColorVis0'
  | 'ouiColorVis1'
  | 'ouiColorVis2'
  | 'ouiColorVis3'
  | 'ouiColorVis4'
  | 'ouiColorVis5'
  | 'ouiColorVis6'
  | 'ouiColorVis7'
  | 'ouiColorVis8'
  | 'ouiColorVis9'
  | 'gray';

const sizeToClassMap: { [size in TokenSize]: string } = {
  xs: 'ouiToken--xsmall',
  s: 'ouiToken--small',
  m: 'ouiToken--medium',
  l: 'ouiToken--large',
};

export const SIZES = keysOf(sizeToClassMap);

const shapeToClassMap: { [shape in TokenShape]: string } = {
  circle: 'ouiToken--circle',
  square: 'ouiToken--square',
  rectangle: 'ouiToken--rectangle',
};

export const SHAPES = keysOf(shapeToClassMap);

const fillToClassMap: { [fill in TokenFill]: string | null } = {
  none: null,
  light: 'ouiToken--light',
  dark: 'ouiToken--dark',
};

export const FILLS = keysOf(fillToClassMap);

const colorToClassMap: { [color in TokenColor]: string } = {
  ouiColorVis0: 'ouiToken--ouiColorVis0',
  ouiColorVis1: 'ouiToken--ouiColorVis1',
  ouiColorVis2: 'ouiToken--ouiColorVis2',
  ouiColorVis3: 'ouiToken--ouiColorVis3',
  ouiColorVis4: 'ouiToken--ouiColorVis4',
  ouiColorVis5: 'ouiToken--ouiColorVis5',
  ouiColorVis6: 'ouiToken--ouiColorVis6',
  ouiColorVis7: 'ouiToken--ouiColorVis7',
  ouiColorVis8: 'ouiToken--ouiColorVis8',
  ouiColorVis9: 'ouiToken--ouiColorVis9',
  gray: 'ouiToken--gray',
};

export const COLORS = keysOf(colorToClassMap);

export interface TokenProps {
  /**
   * An OUI icon type
   */
  iconType: IconType;
  /**
   * For best results use one of the vis color names (or 'gray').
   * Or supply your own color (can be used with dark or no fill only).
   * Default: `gray`
   */
  color?: TokenColor | string;
  /**
   * Outer shape surrounding the icon
   * Default: `circle`
   */
  shape?: TokenShape;
  /**
   * `light` for lightened color with border, `dark` for solid, or `none`
   * Default: `light`
   */
  fill?: TokenFill;
  /**
   * Size of the token
   */
  size?: TokenSize;
  /**
   * The icon's title. Required for accessibility
   */
  title?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export type OuiTokenProps = CommonProps &
  TokenProps &
  Omit<HTMLAttributes<HTMLSpanElement>, 'title'>;

export const OuiToken: FunctionComponent<OuiTokenProps> = ({
  iconType,
  color,
  fill,
  shape,
  size = 's',
  style = {},
  className,
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...rest
}) => {
  // Set the icon size to the same as the passed size
  // unless they passed `xs` which IconSize doesn't support
  let finalSize: IconSize = size === 'xs' ? 's' : size;

  // When displaying at the small size, the token specific icons
  // should actually be displayed at medium size
  if (
    typeof iconType === 'string' &&
    iconType.indexOf('token') === 0 &&
    size === 's'
  ) {
    finalSize = 'm';
  }

  const currentDisplay = {
    color,
    fill,
    shape,
  };
  let finalDisplay;

  // If the iconType passed is one of the prefab token types,
  // grab its properties
  if (typeof iconType === 'string' && iconType in TOKEN_MAP) {
    const tokenDisplay = TOKEN_MAP[iconType as OuiTokenMapType];
    finalDisplay = defaults(currentDisplay, tokenDisplay);
  } else {
    finalDisplay = currentDisplay;
  }

  const finalColor = finalDisplay.color || 'gray';
  const finalShape = finalDisplay.shape || 'circle';
  let finalFill = finalDisplay.fill || 'light';

  // Color can be a named space via ouiColorVis
  let colorClass;
  if (finalColor in colorToClassMap) {
    colorClass = colorToClassMap[finalColor as TokenColor];
  }
  // Or it can be a string which adds inline styles for the
  else {
    // text color if fill='none' or
    if (finalFill === 'none') {
      style.color = finalColor;
    }
    // full background color if fill='dark' and overrides fill='light' with dark
    else {
      finalFill = 'dark';
      style.backgroundColor = finalColor;
      style.color = isColorDark(...hexToRgb(finalColor))
        ? '#FFFFFF'
        : '#000000';
    }
  }

  const classes = classNames(
    'ouiToken',
    colorClass,
    shapeToClassMap[finalShape],
    fillToClassMap[finalFill],
    sizeToClassMap[size],
    className
  );

  return (
    <span className={classes} style={style} {...rest}>
      <OuiIcon
        type={iconType}
        size={finalSize}
        title={title}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
      />
    </span>
  );
};
