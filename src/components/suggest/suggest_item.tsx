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
  ButtonHTMLAttributes,
} from 'react';
import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import classNames from 'classnames';
import { OuiIcon, IconType } from '../icon';

interface Type {
  iconType: IconType;
  color: string | keyof typeof colorToClassNameMap;
}

interface OuiSuggestItemPropsBase {
  /**
   * Takes 'iconType' for OuiIcon and 'color'. 'color' can be tint1 through tint9.
   */
  type: Type;

  /**
   * Label or primary text.
   */
  label: string;

  /**
   * Description or secondary text (optional).
   */
  description?: string;

  /**
   * Label display is 'fixed' by default. Label will increase its width beyond 50% if needed with 'expand'.
   */
  labelDisplay?: keyof typeof labelDisplayToClassMap;

  /**
   * Width of 'label' when 'labelDisplay' is set to 'fixed'.
   * Accepts multiples of 10, from 20 to 90. Defaults to 50.
   */
  labelWidth?: LabelWidthSize;

  /**
   * Set the way in which 'description' is displayed, defaults to 'truncate'.
   */
  descriptionDisplay?: keyof typeof descriptionDisplayToClassMap;
}

type PropsForDiv = Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>;
type PropsForButton = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

export type OuiSuggestItemProps = CommonProps &
  OuiSuggestItemPropsBase &
  ExclusiveUnion<PropsForDiv, PropsForButton>;

interface ColorToClassMap {
  tint0: string;
  tint1: string;
  tint2: string;
  tint3: string;
  tint4: string;
  tint5: string;
  tint6: string;
  tint7: string;
  tint8: string;
  tint9: string;
  tint10: string;
  [key: string]: string;
}

type LabelWidthSize = '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90';

const colorToClassNameMap: ColorToClassMap = {
  tint0: 'ouiSuggestItem__type--tint0',
  tint1: 'ouiSuggestItem__type--tint1',
  tint2: 'ouiSuggestItem__type--tint2',
  tint3: 'ouiSuggestItem__type--tint3',
  tint4: 'ouiSuggestItem__type--tint4',
  tint5: 'ouiSuggestItem__type--tint5',
  tint6: 'ouiSuggestItem__type--tint6',
  tint7: 'ouiSuggestItem__type--tint7',
  tint8: 'ouiSuggestItem__type--tint8',
  tint9: 'ouiSuggestItem__type--tint9',
  tint10: 'ouiSuggestItem__type--tint10',
};

export const COLORS = keysOf(colorToClassNameMap);

const labelDisplayToClassMap = {
  fixed: 'ouiSuggestItem__labelDisplay--fixed',
  expand: 'ouiSuggestItem__labelDisplay--expand',
};

const descriptionDisplayToClassMap = {
  truncate: 'ouiSuggestItem__description--truncate',
  wrap: 'ouiSuggestItem__description--wrap',
};

export const DISPLAYS = keysOf(labelDisplayToClassMap);

export const OuiSuggestItem: FunctionComponent<OuiSuggestItemProps> = ({
  className,
  label,
  type,
  labelDisplay = 'fixed',
  labelWidth = '50',
  description,
  descriptionDisplay = 'truncate',
  onClick,
  ...rest
}) => {
  const classes = classNames(
    'ouiSuggestItem',
    {
      'ouiSuggestItem-isClickable': onClick,
    },
    className
  );

  let colorClass = '';

  const labelDisplayCalculated = !description ? 'expand' : labelDisplay;

  const labelClassNames = classNames(
    'ouiSuggestItem__label',
    labelDisplayToClassMap[labelDisplayCalculated],
    {
      [`ouiSuggestItem__label--width${labelWidth}`]: labelDisplay === 'fixed',
    }
  );

  const descriptionClassNames = classNames(
    'ouiSuggestItem__description',
    descriptionDisplayToClassMap[descriptionDisplay]
  );

  if (type && type.color) {
    if (COLORS.indexOf(type.color as string) > -1) {
      colorClass = colorToClassNameMap[type.color];
    }
  }

  const innerContent = (
    <React.Fragment>
      <span className={`ouiSuggestItem__type ${colorClass}`}>
        <OuiIcon
          type={type.iconType}
          color="inherit" // forces the icon to inherit its parent color
        />
      </span>
      <span className={labelClassNames}>{label}</span>
      {description && (
        <span className={descriptionClassNames}>{description}</span>
      )}
    </React.Fragment>
  );

  if (onClick) {
    return (
      <button
        className={classes}
        onClick={onClick}
        {...(rest as PropsForButton)}>
        {innerContent}
      </button>
    );
  } else {
    return (
      <div className={classes} {...(rest as PropsForDiv)}>
        {innerContent}
      </div>
    );
  }
};
