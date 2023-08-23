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
  Ref,
  HTMLAttributes,
  ReactNode,
  useState,
} from 'react';

import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { IconType, OuiIcon } from '../icon';

import { OuiText } from '../text';
import { OuiButtonIcon } from '../button';

type Color = 'primary' | 'success' | 'warning' | 'danger';
type Size = 's' | 'm';
type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export type OuiCallOutProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'> & {
    title?: ReactNode;
    iconType?: IconType;
    color?: Color;
    size?: Size;
    heading?: Heading;
    dismissible?: boolean;
  };

const colorToClassNameMap: { [color in Color]: string } = {
  primary: 'ouiCallOut--primary',
  success: 'ouiCallOut--success',
  warning: 'ouiCallOut--warning',
  danger: 'ouiCallOut--danger',
};

export const COLORS = keysOf(colorToClassNameMap);
export const HEADINGS: Heading[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];

const sizeToClassNameMap: { [size in Size]: string } = {
  s: 'ouiCallOut--small',
  m: '',
};

export const OuiCallOut = forwardRef<HTMLDivElement, OuiCallOutProps>(
  (
    {
      title,
      color = 'primary',
      size = 'm',
      iconType,
      children,
      className,
      heading,
      dismissible = false,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const [isCalloutVisible, setIsCalloutVisible] = useState(true);
    const classes = classNames(
      'ouiCallOut',
      colorToClassNameMap[color],
      sizeToClassNameMap[size],
      className
    );

    let headerIcon;

    if (iconType) {
      headerIcon = (
        <OuiIcon
          className="ouiCallOutHeader__icon"
          type={iconType}
          size="m"
          aria-hidden="true"
          color="inherit" // forces the icon to inherit its parent color
        />
      );
    }

    const onClose = () => setIsCalloutVisible(false);

    let dismissibleIcon;
    if (dismissible && color !== 'warning' && color !== 'danger') {
      dismissibleIcon = (
        <OuiButtonIcon
          iconType="cross"
          onClick={onClose}
          className="ouiCallOut__closeIcon"
          aria-label="dismissible_icon"
          data-test-subj="closeCallOutButton"
        />
      );
    }

    let optionalChildren;
    if (children && size === 's') {
      optionalChildren = (
        <OuiText size="xs" color="default">
          {children}
        </OuiText>
      );
    } else if (children) {
      optionalChildren = (
        <OuiText size="s" color="default">
          {children}
        </OuiText>
      );
    }

    const H: any = heading ? `${heading}` : 'span';
    let header;

    if (title) {
      header = (
        <div className="ouiCallOutHeader">
          {headerIcon}
          <H className="ouiCallOutHeader__title">{title}</H>
        </div>
      );
    }

    if (!isCalloutVisible) {
      return <></>;
    }

    return (
      <div className={classes} ref={ref} {...rest}>
        {header}

        {dismissibleIcon}

        {optionalChildren}
      </div>
    );
  }
);
OuiCallOut.displayName = 'OuiCallOut';
