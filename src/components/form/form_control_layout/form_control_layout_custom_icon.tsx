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
  ButtonHTMLAttributes,
  FunctionComponent,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { OuiIcon, OuiIconProps, IconType } from '../../icon';
import { CommonProps, ExclusiveUnion } from '../../common';

export type OuiFormControlLayoutCustomIconProps = CommonProps &
  ExclusiveUnion<
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    HTMLAttributes<HTMLSpanElement>
  > & {
    type: IconType;
    size?: OuiIconProps['size'];
    iconRef?:
      | string
      | ((el: HTMLButtonElement | HTMLSpanElement | null) => void);
  };

export const OuiFormControlLayoutCustomIcon: FunctionComponent<OuiFormControlLayoutCustomIconProps> = ({
  className,
  onClick,
  type,
  iconRef,
  size,
  ...rest
}) => {
  const classes = classNames('ouiFormControlLayoutCustomIcon', className, {
    'ouiFormControlLayoutCustomIcon--clickable': onClick,
  });

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classes}
        ref={iconRef}
        {...rest}>
        <OuiIcon
          className="ouiFormControlLayoutCustomIcon__icon"
          aria-hidden="true"
          size={size}
          type={type}
        />
      </button>
    );
  }

  return (
    <span className={classes} ref={iconRef} {...rest}>
      <OuiIcon
        className="ouiFormControlLayoutCustomIcon__icon"
        aria-hidden="true"
        size={size}
        type={type}
      />
    </span>
  );
};
