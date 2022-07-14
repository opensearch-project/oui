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
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

const displayToClassNameMap = {
  condensed: 'ouiTabs--condensed',
  default: null,
};

export const DISPLAYS = keysOf(displayToClassNameMap);

export type OuiTabsDisplaySizes = keyof typeof displayToClassNameMap;

const sizeToClassNameMap = {
  s: 'ouiTabs--small',
  m: null,
  l: 'ouiTabs--large',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type OuiTabsSizes = keyof typeof sizeToClassNameMap;

export type OuiTabsProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * ReactNode to render as this component's content
     */
    children?: ReactNode;
    /**
     * Choose `default` or alternative `condensed` display styles
     */
    display?: OuiTabsDisplaySizes;
    /**
     * Evenly stretches each tab to fill the
     * horizontal space
     */
    expand?: boolean;
    size?: OuiTabsSizes;
  };

export type OuiTabRef = HTMLDivElement;

export const OuiTabs = forwardRef<OuiTabRef, PropsWithChildren<OuiTabsProps>>(
  (
    {
      children,
      className,
      display = 'default',
      expand = false,
      size = 'm',
      ...rest
    }: PropsWithChildren<OuiTabsProps>,
    ref
  ) => {
    const classes = classNames(
      'ouiTabs',
      displayToClassNameMap[display],
      sizeToClassNameMap[size],
      {
        'ouiTabs--expand': expand,
      },
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
        {...(children && { role: 'tablist' })}
        {...rest}>
        {children}
      </div>
    );
  }
);

OuiTabs.displayName = 'OuiTabs';
