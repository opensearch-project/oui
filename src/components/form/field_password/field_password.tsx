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
  InputHTMLAttributes,
  FunctionComponent,
  useState,
  Ref,
} from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';

import {
  OuiFormControlLayout,
  OuiFormControlLayoutProps,
} from '../form_control_layout';

import { OuiValidatableControl } from '../validatable_control';
import { OuiButtonIcon, OuiButtonIconPropsForButton } from '../../button';
import { useOuiI18n } from '../../i18n';
import { useCombinedRefs } from '../../../services';

export type OuiFieldPasswordProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value'
> &
  CommonProps & {
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    compressed?: boolean;
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
    value?: string | number;

    /**
     * Change the `type` of input for manually handling obfuscation.
     * The `dual` option adds the ability to toggle the obfuscation of the input by
     * adding an icon button as the first `append` element
     */
    type?: 'password' | 'text' | 'dual';

    /**
     * Additional props to apply to the dual toggle. Extends OuiButtonIcon
     */
    dualToggleProps?: Partial<OuiButtonIconPropsForButton>;
  };

export const OuiFieldPassword: FunctionComponent<OuiFieldPasswordProps> = ({
  className,
  id,
  name,
  placeholder,
  value,
  isInvalid,
  fullWidth,
  isLoading,
  compressed,
  inputRef: _inputRef,
  prepend,
  append,
  type = 'password',
  dualToggleProps,
  ...rest
}) => {
  // Set the initial input type to `password` if they want dual
  const [inputType, setInputType] = useState(
    type === 'dual' ? 'password' : type
  );

  // Setup toggle aria-label
  const [showPasswordLabel, maskPasswordLabel] = useOuiI18n(
    ['ouiFieldPassword.showPassword', 'ouiFieldPassword.maskPassword'],
    [
      'Show password as plain text. Note: this will visually expose your password on the screen.',
      'Mask password',
    ]
  );

  // Setup the inputRef to auto-focus when toggling visibility
  const [inputRef, _setInputRef] = useState<HTMLInputElement | null>(null);
  const setInputRef = useCombinedRefs([_setInputRef, _inputRef]);

  const handleToggle = (
    event: React.MouseEvent<HTMLButtonElement>,
    isVisible: boolean
  ) => {
    setInputType(isVisible ? 'password' : 'text');
    if (inputRef) {
      inputRef.focus();
    }

    if (dualToggleProps && dualToggleProps.onClick) {
      dualToggleProps.onClick(event);
    }
  };

  // Convert any `append` elements to an array so the visibility
  // toggle can be added to it
  let appends = Array.isArray(append) ? append : [];
  if (append && !Array.isArray(append)) appends.push(append);
  // Add a toggling button to switch between `password` and `input` if consumer wants `dual`
  // https://www.w3schools.com/howto/howto_js_toggle_password.asp
  if (type === 'dual') {
    const isVisible = inputType === 'text';

    const visibilityToggle = (
      <OuiButtonIcon
        iconType={isVisible ? 'eyeClosed' : 'eye'}
        aria-label={isVisible ? maskPasswordLabel : showPasswordLabel}
        title={isVisible ? maskPasswordLabel : showPasswordLabel}
        disabled={rest.disabled}
        {...dualToggleProps}
        onClick={(e) => handleToggle(e, isVisible)}
      />
    );
    appends = [...appends, visibilityToggle];
  }

  const finalAppend = appends.length ? appends : undefined;

  const classes = classNames(
    'ouiFieldPassword',
    {
      'ouiFieldPassword--fullWidth': fullWidth,
      'ouiFieldPassword--compressed': compressed,
      'ouiFieldPassword-isLoading': isLoading,
      'ouiFieldPassword--inGroup': prepend || finalAppend,
      'ouiFieldPassword--withToggle': type === 'dual',
    },
    className
  );

  return (
    <OuiFormControlLayout
      icon="lock"
      fullWidth={fullWidth}
      isLoading={isLoading}
      compressed={compressed}
      prepend={prepend}
      append={finalAppend}>
      <OuiValidatableControl isInvalid={isInvalid}>
        <input
          type={inputType}
          id={id}
          name={name}
          placeholder={placeholder}
          className={classes}
          value={value}
          ref={setInputRef}
          {...rest}
          spellCheck="false"
        />
      </OuiValidatableControl>
    </OuiFormControlLayout>
  );
};

OuiFieldPassword.defaultProps = {
  value: undefined,
  fullWidth: false,
  isLoading: false,
  compressed: false,
};

// @internal
export type OuiCompressedFieldPasswordProps = Omit<
  OuiFieldPasswordProps,
  'compressed'
>;

// @internal
export const OuiCompressedFieldPassword: FunctionComponent<OuiFieldPasswordProps> = (
  props
) => <OuiFieldPassword {...props} compressed />;
