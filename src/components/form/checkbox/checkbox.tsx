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
  Component,
  ChangeEventHandler,
  ReactNode,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { keysOf, CommonProps } from '../../common';

const typeToClassNameMap = {
  inList: 'ouiCheckbox--inList',
};

export const TYPES = keysOf(typeToClassNameMap);

export type OuiCheckboxType = keyof typeof typeToClassNameMap;

export interface OuiCheckboxProps
  extends CommonProps,
    InputHTMLAttributes<HTMLInputElement> {
  id: string;
  checked?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>; // overriding to make it required
  inputRef?: (element: HTMLInputElement) => void;
  label?: ReactNode;
  type?: OuiCheckboxType;
  disabled?: boolean;
  /**
   * when `true` creates a shorter height checkbox row
   */
  compressed?: boolean;
  indeterminate?: boolean;
  /**
   * Object of props passed to the <label/>
   */
  labelProps?: CommonProps & LabelHTMLAttributes<HTMLLabelElement>;
}

export class OuiCheckbox extends Component<OuiCheckboxProps> {
  static defaultProps = {
    checked: false,
    disabled: false,
    indeterminate: false,
    compressed: false,
  };

  inputRef?: HTMLInputElement = undefined;

  componentDidMount() {
    this.invalidateIndeterminate();
  }

  componentDidUpdate() {
    this.invalidateIndeterminate();
  }

  render() {
    const {
      className,
      id,
      checked,
      label,
      onChange,
      type,
      disabled,
      compressed,
      indeterminate,
      inputRef,
      labelProps,
      ...rest
    } = this.props;

    const classes = classNames(
      'ouiCheckbox',
      type && typeToClassNameMap[type],
      {
        'ouiCheckbox--noLabel': !label,
        'ouiCheckbox--compressed': compressed,
      },
      className
    );
    const labelClasses = classNames(
      'ouiCheckbox__label',
      labelProps?.className
    );
    let optionalLabel;

    if (label) {
      optionalLabel = (
        <label {...labelProps} className={labelClasses} htmlFor={id}>
          {label}
        </label>
      );
    }

    return (
      <div className={classes}>
        <input
          className="ouiCheckbox__input"
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          ref={this.setInputRef}
          {...rest}
        />

        <div className="ouiCheckbox__square" />

        {optionalLabel}
      </div>
    );
  }

  setInputRef = (input: HTMLInputElement) => {
    this.inputRef = input;

    if (this.props.inputRef) {
      this.props.inputRef(input);
    }

    this.invalidateIndeterminate();
  };

  invalidateIndeterminate() {
    if (this.inputRef) {
      this.inputRef.indeterminate = this.props.indeterminate!;
    }
  }
}
