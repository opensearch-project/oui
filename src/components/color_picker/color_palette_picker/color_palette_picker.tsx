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

import { OuiSuperSelect } from '../../form';

import { CommonProps } from '../../common';

import { ColorStop } from '../color_stops';

import { OuiSuperSelectProps } from '../../form/super_select';
import { OuiColorPaletteDisplay } from '../color_palette_display';

export interface OuiColorPalettePickerPaletteTextProps extends CommonProps {
  /**
   *  For storing unique value of item
   */
  value: string;
  /**
   *  The name of your palette
   */
  title: string;
  /**
   * `text`: a text only option (a title is required).
   */
  type: 'text';
  /**
   * Array of color `strings` or an array of #ColorStop. The stops must be numbers in an ordered range.
   */
  palette?: string[] | ColorStop[];
}

export interface OuiColorPalettePickerPaletteFixedProps extends CommonProps {
  /**
   *  For storing unique value of item
   */
  value: string;
  /**
   *  The name of your palette
   */
  title?: string;
  /**
   * `fixed`: individual color blocks
   */
  type: 'fixed';
  /**
   * Array of color `strings` or an array of #ColorStop. The stops must be numbers in an ordered range.
   */
  palette: string[] | ColorStop[];
}

export interface OuiColorPalettePickerPaletteGradientProps extends CommonProps {
  /**
   *  For storing unique value of item
   */
  value: string;
  /**
   *  The name of your palette
   */
  title?: string;
  /**
   * `gradient`: each color fades into the next
   */
  type: 'gradient';
  /**
   * Array of color `strings` or an array of #ColorStop. The stops must be numbers in an ordered range.
   */
  palette: string[] | ColorStop[];
}

export type OuiColorPalettePickerPaletteProps =
  | OuiColorPalettePickerPaletteTextProps
  | OuiColorPalettePickerPaletteFixedProps
  | OuiColorPalettePickerPaletteGradientProps;

export type OuiColorPalettePickerProps<T extends string> = CommonProps &
  Omit<
    OuiSuperSelectProps<T>,
    'options' | 'itemLayoutAlign' | 'hasDividers'
  > & {
    /**
     *  Specify what should be displayed after a selection: a `palette` or `title`
     */
    selectionDisplay?: 'palette' | 'title';

    /**
     * An array of one of the following objects: #OuiColorPalettePickerPaletteText, #OuiColorPalettePickerPaletteFixed, #OuiColorPalettePickerPaletteGradient
     */
    palettes: OuiColorPalettePickerPaletteProps[];
  };

export const OuiColorPalettePicker: FunctionComponent<OuiColorPalettePickerProps<
  string
>> = ({
  className,
  compressed = false,
  disabled,
  fullWidth = false,
  isInvalid = false,
  onChange,
  readOnly = false,
  valueOfSelected,
  palettes,
  append,
  prepend,
  selectionDisplay = 'palette',
  ...rest
}) => {
  const getPalette = ({
    type,
    palette,
  }:
    | OuiColorPalettePickerPaletteFixedProps
    | OuiColorPalettePickerPaletteGradientProps) => {
    // Working around ExclusiveUnion
    return type === 'gradient' ? (
      <OuiColorPaletteDisplay type={type} palette={palette} />
    ) : (
      <OuiColorPaletteDisplay type={type} palette={palette} />
    );
  };

  const paletteOptions = palettes.map(
    (item: OuiColorPalettePickerPaletteProps) => {
      const { type, value, title, palette, ...rest } = item;
      const paletteForDisplay = item.type !== 'text' ? getPalette(item) : null;
      return {
        value: String(value),
        inputDisplay:
          selectionDisplay === 'title' || type === 'text'
            ? title
            : paletteForDisplay,
        dropdownDisplay: (
          <div className="ouiColorPalettePicker__item">
            {title && type !== 'text' && (
              <div className="ouiColorPalettePicker__itemTitle">{title}</div>
            )}
            {type === 'text' ? title : paletteForDisplay}
          </div>
        ),
        ...rest,
      };
    }
  );

  return (
    <OuiSuperSelect
      className={className}
      options={paletteOptions}
      valueOfSelected={valueOfSelected}
      onChange={onChange}
      hasDividers
      isInvalid={isInvalid}
      compressed={compressed}
      disabled={disabled}
      readOnly={readOnly}
      fullWidth={fullWidth}
      append={append}
      prepend={prepend}
      {...rest}
    />
  );
};
