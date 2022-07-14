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
  SelectHTMLAttributes,
  OptionHTMLAttributes,
  Ref,
  FunctionComponent,
} from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';
import {
  OuiFormControlLayout,
  OuiFormControlLayoutProps,
} from '../form_control_layout';
import { OuiValidatableControl } from '../validatable_control';
import { OuiFormControlLayoutIconsProps } from '../form_control_layout/form_control_layout_icons';

export interface OuiSelectOption
  extends OptionHTMLAttributes<HTMLOptionElement> {
  text: React.ReactNode;
}

export type OuiSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'value'
> &
  CommonProps & {
    options?: OuiSelectOption[];
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;

    /**
     * Simulates no selection by creating an empty, selected, hidden first option
     */
    hasNoInitialSelection?: boolean;
    inputRef?: Ref<HTMLSelectElement>;
    value?: string | number;

    /**
     * when `true` creates a shorter height input
     */
    compressed?: boolean;

    /**
     * Creates an input group with element(s) coming before select.
     * `string` | `ReactElement` or an array of these
     */
    prepend?: OuiFormControlLayoutProps['prepend'];
    /**
     * Creates an input group with element(s) coming after select.
     * `string` | `ReactElement` or an array of these
     */
    append?: OuiFormControlLayoutProps['append'];
  };

export const OuiSelect: FunctionComponent<OuiSelectProps> = ({
  className,
  options = [],
  id,
  name,
  inputRef,
  isInvalid,
  fullWidth = false,
  isLoading = false,
  hasNoInitialSelection = false,
  defaultValue,
  compressed = false,
  value: _value,
  prepend,
  append,
  onMouseUp,
  ...rest
}) => {
  // if this is injecting an empty option for `hasNoInitialSelection` then
  // value needs to fallback to an empty string to interact properly with `defaultValue`
  const value = hasNoInitialSelection ? _value ?? '' : _value;

  const handleMouseUp = (e: React.MouseEvent<HTMLSelectElement>) => {
    // Normalizes cross-browser mouse eventing by preventing propagation,
    // notably for use in conjunction with OuiOutsideClickDetector.
    // See https://github.com/elastic/eui/pull/1926 for full discussion on
    // rationale and alternatives should this intervention become problematic.
    e.nativeEvent.stopImmediatePropagation();
    if (onMouseUp) onMouseUp(e);
  };

  const classes = classNames(
    'ouiSelect',
    {
      'ouiSelect--fullWidth': fullWidth,
      'ouiSelect--compressed': compressed,
      'ouiSelect--inGroup': prepend || append,
      'ouiSelect-isLoading': isLoading,
    },
    className
  );

  let emptyOptionNode;
  if (hasNoInitialSelection) {
    emptyOptionNode = (
      <option value="" disabled hidden style={{ display: 'none' }}>
        &nbsp;
      </option>
    );
  }

  // React HTML input can not have both value and defaultValue properties.
  // https://reactjs.org/docs/uncontrolled-components.html#default-values
  let selectDefaultValue;
  if (value == null) {
    selectDefaultValue = defaultValue || '';
  }

  const icon: OuiFormControlLayoutIconsProps['icon'] = {
    type: 'arrowDown',
    side: 'right',
  };

  return (
    <OuiFormControlLayout
      icon={icon}
      fullWidth={fullWidth}
      isLoading={isLoading}
      compressed={compressed}
      prepend={prepend}
      append={append}
      inputId={id}>
      <OuiValidatableControl isInvalid={isInvalid}>
        <select
          id={id}
          name={name}
          className={classes}
          ref={inputRef}
          defaultValue={selectDefaultValue}
          value={value}
          onMouseUp={handleMouseUp}
          {...rest}>
          {emptyOptionNode}
          {options.map((option, index) => {
            const { text, ...rest } = option;
            return (
              <option {...rest} key={index}>
                {text}
              </option>
            );
          })}
        </select>
      </OuiValidatableControl>
    </OuiFormControlLayout>
  );
};
