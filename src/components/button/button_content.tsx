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

import React, { HTMLAttributes, FunctionComponent, Ref } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import { OuiLoadingSpinner } from '../loading';
import { OuiIcon, IconType } from '../icon';

export type ButtonContentIconSide = 'left' | 'right';

const iconSideToClassNameMap: {
  [side in ButtonContentIconSide]: string | null;
} = {
  left: null,
  right: 'ouiButtonContent--iconRight',
};

export const ICON_SIDES = keysOf(iconSideToClassNameMap);

export type OuiButtonContentType = HTMLAttributes<HTMLSpanElement>;

/**
 * *INTERNAL ONLY*
 * This component is simply a helper component for reuse within other button components
 */
export interface OuiButtonContentProps extends CommonProps {
  /**
   * Any `type` accepted by OuiIcon
   */
  iconType?: IconType;
  /**
   * Can only be one side `left` or `right`
   */
  iconSide?: ButtonContentIconSide;
  isLoading?: boolean;
  /**
   * Object of props passed to the <span/> wrapping the content's text/children only (not icon)
   */
  textProps?: HTMLAttributes<HTMLSpanElement> &
    CommonProps & {
      ref?: Ref<HTMLSpanElement>;
      'data-text'?: string;
    };
  iconSize?: 's' | 'm';
}

export const OuiButtonContent: FunctionComponent<
  OuiButtonContentType & OuiButtonContentProps
> = ({
  children,
  textProps,
  isLoading = false,
  iconType,
  iconSize = 'm',
  iconSide = 'left',
  ...contentProps
}) => {
  // Add an icon to the button if one exists.
  let buttonIcon;

  if (isLoading) {
    buttonIcon = (
      <OuiLoadingSpinner className="ouiButtonContent__spinner" size="m" />
    );
  } else if (iconType) {
    buttonIcon = (
      <OuiIcon
        className="ouiButtonContent__icon"
        type={iconType}
        size={iconSize}
        color="inherit" // forces the icon to inherit its parent color
      />
    );
  }

  const contentClassNames = classNames(
    'ouiButtonContent',
    iconSide ? iconSideToClassNameMap[iconSide] : null,
    contentProps && contentProps.className
  );

  return (
    <span {...contentProps} className={contentClassNames}>
      {buttonIcon}
      <span {...textProps}>{children}</span>
    </span>
  );
};
