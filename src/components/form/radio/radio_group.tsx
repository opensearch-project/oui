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

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion } from '../../common';

import {
  OuiFormFieldsetProps,
  OuiFormLegendProps,
  OuiFormFieldset,
} from '../form_fieldset';
import { OuiRadio, OuiRadioProps } from './radio';

export interface OuiRadioGroupOption
  extends Omit<OuiRadioProps, 'checked' | 'onChange'> {
  id: string;
}

export type OuiRadioGroupChangeCallback = (id: string, value?: string) => void;

// Must omit inherit `onChange` properties or else TS complains when applying to the OuiRadio
type AsDivProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;
type WithLegendProps = Omit<OuiFormFieldsetProps, 'onChange'> & {
  /**
   * If the individual labels for each radio do not provide a sufficient description, add a legend.
   * Wraps the group in a `OuiFormFieldset` which adds an `OuiLegend` for titling the whole group.
   * Accepts an `OuiFormLegendProps` shape.
   */
  legend?: OuiFormLegendProps;
};

export type OuiRadioGroupProps = CommonProps & {
  disabled?: boolean;
  /**
   * Tightens up the spacing between radio rows and sends down the
   * compressed prop to the radio itself
   */
  compressed?: boolean;
  name?: string;
  options: OuiRadioGroupOption[];
  idSelected?: string;
  onChange: OuiRadioGroupChangeCallback;
} & ExclusiveUnion<AsDivProps, WithLegendProps>;

export const OuiRadioGroup: FunctionComponent<OuiRadioGroupProps> = ({
  options = [],
  idSelected,
  onChange,
  name,
  className,
  disabled,
  compressed,
  legend,
  ...rest
}) => {
  const radios = options.map((option, index) => {
    const {
      disabled: isOptionDisabled,
      className: optionClass,
      id,
      label,
      ...optionRest
    } = option;
    return (
      <OuiRadio
        className={classNames('ouiRadioGroup__item', optionClass)}
        key={index}
        name={name}
        checked={id === idSelected}
        disabled={disabled || isOptionDisabled}
        onChange={onChange.bind(null, id, option.value)}
        compressed={compressed}
        id={id}
        label={label}
        {...optionRest}
      />
    );
  });

  if (!!legend) {
    // Be sure to pass down the compressed option to the legend
    legend.compressed = compressed;

    return (
      <OuiFormFieldset
        className={className}
        legend={legend}
        {...(rest as OuiFormFieldsetProps)}>
        {radios}
      </OuiFormFieldset>
    );
  }

  return (
    <div className={className} {...(rest as HTMLAttributes<HTMLDivElement>)}>
      {radios}
    </div>
  );
};

// @internal
export type OuiCompressedRadioGroupProps = CommonProps & {
  disabled?: boolean;
  name?: string;
  options: OuiRadioGroupOption[];
  idSelected?: string;
  onChange: OuiRadioGroupChangeCallback;
} & ExclusiveUnion<AsDivProps, WithLegendProps>;

// @internal
export const OuiCompressedRadioGroup: FunctionComponent<OuiCompressedRadioGroupProps> = (
  props
) => <OuiRadioGroup {...props} compressed />;
