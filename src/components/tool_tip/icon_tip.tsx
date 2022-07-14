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

import { PropsOf } from '../common';
import { OuiIcon, IconSize, IconType } from '../icon';
import { OuiToolTip, OuiToolTipProps } from './tool_tip';

export interface OuiIconTipProps {
  /**
   * The icon color.
   */
  color?: string;
  /**
   * The icon type.
   */
  type?: IconType;
  /**
   * The icon size.
   */
  size?: IconSize;
  /**
   * Explain what this icon means for screen readers.
   */
  'aria-label'?: string;

  /**
   * Pass certain props down to `OuiIcon`
   */
  // OuiIconTip's `type` is passed to OuiIcon, so we want to exclude `type` from
  // iconProps; however, due to TS's bivariant function arguments `type` could be
  // passed without any error/feedback so we explicitly set it to `never` type
  iconProps?: Omit<PropsOf<OuiIcon>, 'type'> & { type?: never };
}

type Props = Omit<OuiToolTipProps, 'children' | 'delay' | 'position'> &
  OuiIconTipProps & {
    // This are copied from OuiToolTipProps, but made optional. Defaults
    // are applied below.
    delay?: OuiToolTipProps['delay'];
    position?: OuiToolTipProps['position'];
  };

export const OuiIconTip: FunctionComponent<Props> = ({
  type = 'questionInCircle',
  'aria-label': ariaLabel = 'Info',
  color,
  size,
  iconProps,
  position = 'top',
  delay = 'regular',
  ...rest
}) => (
  <OuiToolTip position={position} delay={delay} {...rest}>
    <OuiIcon
      tabIndex={0}
      type={type}
      color={color}
      size={size}
      aria-label={ariaLabel}
      {...iconProps}
    />
  </OuiToolTip>
);
