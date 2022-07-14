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

import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import { ExclusiveUnion, keysOf } from '../../common';
import { ColorStop } from '../color_stops';
import {
  OuiColorPaletteDisplayFixed,
  OuiColorPaletteDisplayFixedProps,
} from './color_palette_display_fixed';
import {
  OuiColorPaletteDisplayGradient,
  OuiColorPaletteDisplayGradientProps,
} from './color_palette_display_gradient';

const sizeToClassNameMap = {
  xs: 'ouiColorPaletteDisplay--sizeExtraSmall',
  s: 'ouiColorPaletteDisplay--sizeSmall',
  m: 'ouiColorPaletteDisplay--sizeMedium',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type OuiColorPaletteDisplaySize = keyof typeof sizeToClassNameMap;

export interface OuiColorPaletteDisplayShared {
  /**
   * Array of color `strings` or an array of #ColorStop. The stops must be numbers in an ordered range.
   */
  palette: string[] | ColorStop[];
}

interface DisplayGradient extends OuiColorPaletteDisplayGradientProps {
  /**
   *   Specify the type of palette.
   *  `gradient`: each color fades into the next.
   */
  type: 'gradient';
}

interface DisplayFixed extends OuiColorPaletteDisplayFixedProps {
  /**
   *  `fixed`: individual color blocks.
   */
  type?: 'fixed';
}

export type OuiColorPaletteDisplayProps = {
  /**
   * Height of the palette display
   */
  size?: OuiColorPaletteDisplaySize;
} & ExclusiveUnion<DisplayFixed, DisplayGradient>;

export const OuiColorPaletteDisplay: FunctionComponent<OuiColorPaletteDisplayProps> = ({
  type = 'fixed',
  palette,
  className,
  size = 's',
  ...rest
}) => {
  const classes = classnames(
    'ouiColorPaletteDisplay',
    className,
    sizeToClassNameMap[size]
  );

  return (
    <>
      {type === 'fixed' ? (
        <OuiColorPaletteDisplayFixed
          className={classes}
          palette={palette}
          {...rest}
        />
      ) : (
        <OuiColorPaletteDisplayGradient
          className={classes}
          palette={palette}
          {...rest}
        />
      )}
    </>
  );
};
