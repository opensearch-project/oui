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

import React, { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

const titleSizeToClassNameMap = {
  xxxs: 'ouiTitle--xxxsmall',
  xxs: 'ouiTitle--xxsmall',
  xs: 'ouiTitle--xsmall',
  s: 'ouiTitle--small',
  m: 'ouiTitle--medium',
  l: 'ouiTitle--large',
};

export const TITLE_SIZES = keysOf(titleSizeToClassNameMap);
export type OuiTitleSize = keyof typeof titleSizeToClassNameMap;

const textTransformToClassNameMap = {
  uppercase: 'ouiTitle--uppercase',
};

export const TEXT_TRANSFORM = keysOf(textTransformToClassNameMap);
export type OuiTitleTextTransform = keyof typeof textTransformToClassNameMap;

export type OuiTitleProps = CommonProps & {
  /**
   * ReactElement to render as this component's content
   */
  children: ReactElement<any>;
  size?: OuiTitleSize;
  textTransform?: OuiTitleTextTransform;
  id?: string;
};

export const OuiTitle: FunctionComponent<OuiTitleProps> = ({
  size = 'm',
  children,
  className,
  textTransform,
  ...rest
}) => {
  const classes = classNames(
    'ouiTitle',
    titleSizeToClassNameMap[size],
    textTransform ? textTransformToClassNameMap[textTransform] : undefined,
    className,
    children.props.className
  );

  const props = {
    className: classes,
    ...rest,
  };

  return React.cloneElement(children, props);
};
