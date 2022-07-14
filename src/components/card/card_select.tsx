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

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import {
  OuiButtonEmpty,
  OuiButtonEmptyColor,
  OuiButtonEmptyProps,
} from '../button/button_empty';

import { OuiI18n } from '../i18n';

export type OuiCardSelectProps = OuiButtonEmptyProps & {
  /**
   * Is in the selected state
   */
  isSelected?: boolean;
  isDisabled?: boolean;
};

export const OuiCardSelect: FunctionComponent<OuiCardSelectProps> = ({
  className,
  isSelected = false,
  isDisabled,
  color,
  children,
  ...rest
}) => {
  const child = ouiCardSelectableText(isSelected, isDisabled, children);

  const selectClasses = classNames(
    'ouiCardSelect',
    `ouiCardSelect--${ouiCardSelectableColor(color, isSelected)}`,
    className
  );

  return (
    <OuiButtonEmpty
      className={selectClasses}
      color={color || 'text'}
      size="xs"
      isDisabled={isDisabled}
      iconType={isSelected ? 'check' : undefined}
      role="switch"
      aria-checked={isSelected}
      {...rest}>
      {child}
    </OuiButtonEmpty>
  );
};

function ouiCardSelectableText(
  isSelected: boolean | undefined,
  isDisabled: boolean | undefined,
  children: ReactNode
): ReactNode {
  if (children) {
    return children;
  }

  let text;

  if (isSelected) {
    text = <OuiI18n token="ouiCardSelect.selected" default="Selected" />;
  } else if (isDisabled) {
    text = <OuiI18n token="ouiCardSelect.unavailable" default="Unavailable" />;
  } else {
    text = <OuiI18n token="ouiCardSelect.select" default="Select" />;
  }

  return text;
}

export function ouiCardSelectableColor(
  color: OuiButtonEmptyColor | undefined,
  isSelected: boolean | undefined
): string {
  let calculatedColor;
  if (color) {
    calculatedColor = color;
  } else if (isSelected) {
    calculatedColor = 'success';
  } else {
    calculatedColor = 'text';
  }

  return calculatedColor;
}
