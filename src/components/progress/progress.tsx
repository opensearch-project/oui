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

import React, {
  FunctionComponent,
  HTMLAttributes,
  ProgressHTMLAttributes,
  ReactNode,
  Fragment,
  CSSProperties,
} from 'react';
import classNames from 'classnames';
import { OuiI18n } from '../i18n';
import { OuiInnerText } from '../inner_text';
import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import { isNil } from '../../services/predicate';

const sizeToClassNameMap = {
  xs: 'ouiProgress--xs',
  s: 'ouiProgress--s',
  m: 'ouiProgress--m',
  l: 'ouiProgress--l',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type OuiProgressSize = keyof typeof sizeToClassNameMap;

export type ProgressColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'subdued'
  | 'accent'
  | 'vis0'
  | 'vis1'
  | 'vis2'
  | 'vis3'
  | 'vis4'
  | 'vis5'
  | 'vis6'
  | 'vis7'
  | 'vis8'
  | 'vis9';

const colorToClassNameMap = {
  primary: 'ouiProgress--primary',
  secondary: 'ouiProgress--secondary',
  success: 'ouiProgress--success',
  warning: 'ouiProgress--warning',
  danger: 'ouiProgress--danger',
  subdued: 'ouiProgress--subdued',
  accent: 'ouiProgress--accent',
  vis0: 'ouiProgress--vis0',
  vis1: 'ouiProgress--vis1',
  vis2: 'ouiProgress--vis2',
  vis3: 'ouiProgress--vis3',
  vis4: 'ouiProgress--vis4',
  vis5: 'ouiProgress--vis5',
  vis6: 'ouiProgress--vis6',
  vis7: 'ouiProgress--vis7',
  vis8: 'ouiProgress--vis8',
  vis9: 'ouiProgress--vis9',
};

export const COLORS = keysOf(colorToClassNameMap);

type NamedColor = keyof typeof colorToClassNameMap;

function isNamedColor(name: string): name is NamedColor {
  return colorToClassNameMap.hasOwnProperty(name);
}

export type OuiProgressColor = keyof typeof colorToClassNameMap;

const dataColorToClassNameMap: { [color in ProgressColor]: string } = {
  primary: 'ouiProgress__data--primary',
  secondary: 'ouiProgress__data--secondary',
  success: 'ouiProgress__data--success',
  warning: 'ouiProgress__data--warning',
  danger: 'ouiProgress__data--danger',
  subdued: 'ouiProgress__data--subdued',
  accent: 'ouiProgress__data--accent',
  vis0: 'ouiProgress__data--vis0',
  vis1: 'ouiProgress__data--vis1',
  vis2: 'ouiProgress__data--vis2',
  vis3: 'ouiProgress__data--vis3',
  vis4: 'ouiProgress__data--vis4',
  vis5: 'ouiProgress__data--vis5',
  vis6: 'ouiProgress__data--vis6',
  vis7: 'ouiProgress__data--vis7',
  vis8: 'ouiProgress__data--vis8',
  vis9: 'ouiProgress__data--vis9',
};

const positionsToClassNameMap = {
  fixed: 'ouiProgress--fixed',
  absolute: 'ouiProgress--absolute',
  static: '',
};

export const POSITIONS = keysOf(positionsToClassNameMap);

export type OuiProgressPosition = keyof typeof positionsToClassNameMap;

export type OuiProgressProps = CommonProps & {
  size?: OuiProgressSize;
  /**
   * One of OUI's color palette, vis colors or a valid CSS color value https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   * **`secondary` color is DEPRECATED, use `success` instead**
   */
  color?: OuiProgressColor | CSSProperties['color'];
  position?: OuiProgressPosition;
};

type Indeterminate = OuiProgressProps & HTMLAttributes<HTMLDivElement>;

type Determinate = OuiProgressProps &
  Omit<ProgressHTMLAttributes<HTMLProgressElement>, 'max'> & {
    max?: number;
    /*
     * If true, will render the percentage, otherwise pass a custom node
     */
    valueText?: boolean | ReactNode;
    label?: ReactNode;
    /**
     * Object of props passed to the <span/> wrapping the determinate progress's label
     */
    labelProps?: HTMLAttributes<HTMLSpanElement>;
  };

export const OuiProgress: FunctionComponent<ExclusiveUnion<
  Determinate,
  Indeterminate
>> = ({
  className,
  color = 'success',
  size = 'm',
  position = 'static',
  max,
  valueText = false,
  label,
  value,
  labelProps,
  ...rest
}) => {
  const determinate = !isNil(max);
  let colorClass = null;
  let dataColorClass = null;
  let optionalCustomStyles: any = null;
  if (color) {
    if (isNamedColor(color)) {
      colorClass = colorToClassNameMap[color];
      dataColorClass = dataColorToClassNameMap[color];
    } else {
      optionalCustomStyles = { color: color };
      colorClass = 'ouiProgress--customColor';
    }
  }
  const classes = classNames(
    'ouiProgress',
    {
      'ouiProgress--indeterminate': !determinate,
      'ouiProgress--native': determinate,
    },
    sizeToClassNameMap[size],
    colorClass,
    positionsToClassNameMap[position],
    className
  );
  const dataClasses = classNames(
    'ouiProgress__data',
    {
      'ouiProgress__data--l': size === 'l',
    },
    dataColorClass
  );
  const labelClasses = classNames(
    'ouiProgress__label',
    labelProps && labelProps.className
  );

  let valueRender: ReactNode;
  if (valueText === true) {
    // valueText is true
    valueRender = (
      <OuiI18n
        token="ouiProgress.valueText"
        default="{value}%"
        values={{
          value,
        }}
      />
    );
  } else if (valueText) {
    // valueText exists
    valueRender = valueText;
  }

  // Because of a Firefox animation issue, indeterminate progress needs to not use <progress />.
  // See https://css-tricks.com/html5-progress-element/

  if (determinate) {
    return (
      <Fragment>
        {label || valueText ? (
          <div className={dataClasses}>
            {label && (
              <OuiInnerText>
                {(ref, innerText) => (
                  <span
                    title={innerText}
                    ref={ref}
                    {...labelProps}
                    className={labelClasses}>
                    {label}
                  </span>
                )}
              </OuiInnerText>
            )}
            {valueRender && (
              <OuiInnerText>
                {(ref, innerText) => (
                  <span
                    title={innerText}
                    ref={ref}
                    style={optionalCustomStyles}
                    className="ouiProgress__valueText">
                    {valueRender}
                  </span>
                )}
              </OuiInnerText>
            )}
          </div>
        ) : undefined}
        <progress
          className={classes}
          style={optionalCustomStyles}
          max={max}
          value={value}
          aria-hidden={label && valueText ? true : false}
          {...(rest as ProgressHTMLAttributes<HTMLProgressElement>)}
        />
      </Fragment>
    );
  } else {
    return (
      <div
        style={optionalCustomStyles}
        className={classes}
        {...(rest as HTMLAttributes<HTMLDivElement>)}
      />
    );
  }
};
