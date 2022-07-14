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

import { OuiIcon, IconColor } from '../icon';

import { OuiFlexGroup, OuiFlexItem } from '../flex';

const sizeToClassNameMap = {
  xs: 'ouiHealth--textSizeXS',
  s: 'ouiHealth--textSizeS',
  m: 'ouiHealth--textSizeM',
  inherit: 'ouiHealth--textSizeInherit',
};

export const TEXT_SIZES = keysOf(sizeToClassNameMap);

export type OuiHealthProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Sets the color of the dot icon.
     * It accepts any `IconColor`: `default`, `primary`, `success`, `accent`, `warning`, `danger`, `text`,
     * `subdued` or `ghost`; or any valid CSS color value as a `string`
     * **`secondary` color is DEPRECATED, use `success` instead**
     */
    color?: IconColor;
    /**
     * Matches the text scales of OuiText.
     * The `inherit` style will get its font size from the parent element
     */
    textSize?: typeof TEXT_SIZES[number];
  };

export const OuiHealth: FunctionComponent<OuiHealthProps> = ({
  children,
  className,
  color,
  textSize = 's',
  ...rest
}) => {
  const classes = classNames(
    'ouiHealth',
    textSize ? sizeToClassNameMap[textSize] : null,
    className
  );

  return (
    <div className={classes} {...rest}>
      <OuiFlexGroup gutterSize="xs" alignItems="center" responsive={false}>
        <OuiFlexItem grow={false}>
          <OuiIcon type="dot" color={color} />
        </OuiFlexItem>
        <OuiFlexItem grow={false}>{children}</OuiFlexItem>
      </OuiFlexGroup>
    </div>
  );
};
