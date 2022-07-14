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
import classNames from 'classnames';
import { CommonProps } from '../../common';

import {
  OuiPanel,
  PanelPaddingSize,
  _OuiPanelProps,
  _OuiPanelDivlike,
} from '../../panel/panel';
import { HTMLAttributes } from 'enzyme';

export type OuiPageContentVerticalPositions = 'center';
export type OuiPageContentHorizontalPositions = 'center';

const verticalPositionToClassNameMap: {
  [position in OuiPageContentVerticalPositions]: string | null;
} = {
  center: 'ouiPageContent--verticalCenter',
};

const horizontalPositionToClassNameMap: {
  [position in OuiPageContentHorizontalPositions]: string | null;
} = {
  center: 'ouiPageContent--horizontalCenter',
};

export type OuiPageContentProps = CommonProps &
  // Use only the div properties of OuiPanel (not button)
  _OuiPanelProps &
  Omit<_OuiPanelDivlike, 'onClick' | 'role'> & {
    /**
     * **DEPRECATED: use `paddingSize` instead.**
     */
    panelPaddingSize?: PanelPaddingSize;
    verticalPosition?: OuiPageContentVerticalPositions;
    horizontalPosition?: OuiPageContentHorizontalPositions;
    /**
     * There should only be one OuiPageContent per page and should contain the main contents.
     * If this is untrue, set role = `null`, or change it to match your needed aria role
     */
    role?: HTMLAttributes['role'] | null;
  };

export const OuiPageContent: FunctionComponent<OuiPageContentProps> = ({
  verticalPosition,
  horizontalPosition,
  panelPaddingSize,
  paddingSize = 'l',
  borderRadius,
  children,
  className,
  role: _role = 'main',
  ...rest
}) => {
  const role = _role === null ? undefined : _role;

  const borderRadiusClass =
    borderRadius === 'none' ? 'ouiPageContent--borderRadiusNone' : '';

  const classes = classNames(
    'ouiPageContent',
    borderRadiusClass,
    verticalPosition ? verticalPositionToClassNameMap[verticalPosition] : null,
    horizontalPosition
      ? horizontalPositionToClassNameMap[horizontalPosition]
      : null,
    className
  );

  return (
    <OuiPanel
      className={classes}
      paddingSize={panelPaddingSize ?? paddingSize}
      borderRadius={borderRadius}
      role={role}
      {...rest}>
      {children}
    </OuiPanel>
  );
};
