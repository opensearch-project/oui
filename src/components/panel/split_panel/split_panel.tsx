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

import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { OuiPanel, _OuiPanelProps } from '../panel';
import { OuiBreakpointSize } from '../../../services/breakpoint';
import { useIsWithinBreakpoints } from '../../../services/hooks';

export type _OuiSplitPanelInnerProps = HTMLAttributes<HTMLDivElement> &
  Omit<_OuiPanelProps, 'hasShadow' | 'hasBorder' | 'borderRadius'>;

/**
 * Consumed via `OuiSplitPanel.Inner`.
 * Extends most `OuiPanelProps`.
 */
export const _OuiSplitPanelInner: FunctionComponent<_OuiSplitPanelInnerProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('ouiSplitPanel__inner', className);

  const panelProps: _OuiPanelProps = {
    hasShadow: false,
    color: 'transparent',
    borderRadius: 'none',
    hasBorder: false,
  };

  return (
    <OuiPanel
      element="div"
      className={classes}
      {...panelProps}
      {...(rest as _OuiPanelProps)}>
      {children}
    </OuiPanel>
  );
};

export type _OuiSplitPanelOuterProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Any number of _OuiSplitPanelInner components
   */
  children?: ReactNode;
  /**
   * Changes the flex-direction
   */
  direction?: 'column' | 'row';
  /**
   * Stacks row display on small screens.
   * Remove completely with `false` or provide your own list of breakpoint sizes to stack on.
   */
  responsive?: false | OuiBreakpointSize[];
} & Omit<_OuiPanelProps, 'paddingSize'>;

/**
 * Consumed via `OuiSplitPanel.Outer`.
 * Extends most `OuiPanelProps`.
 */
export const _OuiSplitPanelOuter: FunctionComponent<_OuiSplitPanelOuterProps> = ({
  children,
  className,
  direction = 'column',
  responsive = ['xs', 's'],
  ...rest
}) => {
  const isResponsive = useIsWithinBreakpoints(
    responsive as OuiBreakpointSize[],
    !!responsive
  );

  const classes = classNames(
    'ouiSplitPanel',
    {
      'ouiSplitPanel--row': direction === 'row',
      'ouiSplitPanel-isResponsive': isResponsive,
    },
    className
  );

  return (
    <OuiPanel
      paddingSize="none"
      grow={false}
      className={classes}
      {...(rest as _OuiPanelProps)}>
      {children}
    </OuiPanel>
  );
};

export const OuiSplitPanel = {
  Outer: _OuiSplitPanelOuter,
  Inner: _OuiSplitPanelInner,
};
