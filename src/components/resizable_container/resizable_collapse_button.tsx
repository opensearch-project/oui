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

import { OuiButtonIcon, OuiButtonIconPropsForButton } from '../button';
import { ToggleOptions } from './resizable_panel';
import { OuiResizableContainerProps } from './resizable_container';

export type OuiResizableCollapseButtonProps = Omit<
  OuiButtonIconPropsForButton,
  'iconType'
> & {
  /**
   * Position of the toggle button.
   * Enums based on the `direction` of the OuiResizableContainer
   */
  internalPosition?: ToggleOptions['position'];
  /**
   * Position of the toggle button.
   * Enums based on the `direction` of the OuiResizableContainer
   */
  externalPosition?: 'before' | 'after';
  /**
   * Same direction derived from OuiResizableContainer
   */
  direction?: OuiResizableContainerProps['direction'];
  /**
   *
   */
  isVisible?: boolean;
  isCollapsed?: boolean;
};

export const OuiResizableCollapseButton: FunctionComponent<OuiResizableCollapseButtonProps> = ({
  className,
  externalPosition,
  internalPosition = 'middle',
  direction = 'horizontal',
  isVisible,
  isCollapsed,
  ...rest
}) => {
  const isHorizontal = direction === 'horizontal';

  const classes = classNames(
    'ouiResizableToggleButton',
    `ouiResizableToggleButton--${direction}`,
    `ouiResizableToggleButton--${externalPosition}`,
    `ouiResizableToggleButton--${internalPosition}`,
    {
      'ouiResizableToggleButton-isVisible': isVisible,
      'ouiResizableToggleButton-isCollapsed': isCollapsed,
    },
    className
  );

  // Default to simiple grab icon in case there is no externalPosition specified
  let COLLAPSED_ICON = isHorizontal ? 'grab' : 'grabHorizontal';
  let NOT_COLLAPSED_ICON = isHorizontal ? 'grab' : 'grabHorizontal';

  switch (externalPosition) {
    case 'before':
      COLLAPSED_ICON = isHorizontal ? 'menuLeft' : 'menuUp';
      NOT_COLLAPSED_ICON = isHorizontal ? 'menuRight' : 'menuDown';
      break;
    case 'after':
      COLLAPSED_ICON = isHorizontal ? 'menuRight' : 'menuDown';
      NOT_COLLAPSED_ICON = isHorizontal ? 'menuLeft' : 'menuUp';
      break;
  }

  return (
    <OuiButtonIcon
      display={isCollapsed ? 'empty' : 'fill'}
      color={isCollapsed ? 'text' : 'ghost'}
      {...rest}
      className={classes}
      iconType={isCollapsed ? COLLAPSED_ICON : NOT_COLLAPSED_ICON}
    />
  );
};
