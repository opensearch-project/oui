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

import React, { InputHTMLAttributes, Ref, FunctionComponent } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';

import {
  OuiFormControlLayout,
  OuiFormControlLayoutProps,
} from '../form_control_layout';

import { OuiValidatableControl } from '../validatable_control';

export type OuiFieldTextProps = InputHTMLAttributes<HTMLInputElement> &
  CommonProps & {
    icon?: OuiFormControlLayoutProps['icon'];
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    readOnly?: boolean;
    inputRef?: Ref<HTMLInputElement>;

    /**
     * Creates an input group with element(s) coming before input.
     * `string` | `ReactElement` or an array of these
     */
    prepend?: OuiFormControlLayoutProps['prepend'];

    /**
     * Creates an input group with element(s) coming after input.
     * `string` | `ReactElement` or an array of these
     */
    append?: OuiFormControlLayoutProps['append'];

    /**
     * Completely removes form control layout wrapper and ignores
     * icon, prepend, and append. Best used inside OuiFormControlLayoutDelimited.
     */
    controlOnly?: boolean;

    /**
     * when `true` creates a shorter height input
     */
    compressed?: boolean;
  };

export const OuiFieldText: FunctionComponent<OuiFieldTextProps> = ({
  id,
  name,
  placeholder,
  value,
  className,
  icon,
  isInvalid,
  inputRef,
  fullWidth = false,
  isLoading,
  compressed,
  prepend,
  append,
  readOnly,
  controlOnly,
  ...rest
}) => {
  const classes = classNames('ouiFieldText', className, {
    'ouiFieldText--withIcon': icon,
    'ouiFieldText--fullWidth': fullWidth,
    'ouiFieldText--compressed': compressed,
    'ouiFieldText--inGroup': prepend || append,
    'ouiFieldText-isLoading': isLoading,
  });

  const control = (
    <OuiValidatableControl isInvalid={isInvalid}>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        className={classes}
        value={value}
        ref={inputRef}
        readOnly={readOnly}
        {...rest}
      />
    </OuiValidatableControl>
  );

  if (controlOnly) return control;

  return (
    <OuiFormControlLayout
      icon={icon}
      fullWidth={fullWidth}
      isLoading={isLoading}
      compressed={compressed}
      readOnly={readOnly}
      prepend={prepend}
      append={append}
      inputId={id}>
      {control}
    </OuiFormControlLayout>
  );
};
