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
import { OuiCheckbox, OuiCheckboxProps } from './checkbox';

export interface OuiCheckboxGroupOption
  extends Omit<OuiCheckboxProps, 'checked' | 'onChange'> {
  id: string;
}

export interface OuiCheckboxGroupIdToSelectedMap {
  [id: string]: boolean;
}

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

export type OuiCheckboxGroupProps = CommonProps & {
  options: OuiCheckboxGroupOption[];
  idToSelectedMap: OuiCheckboxGroupIdToSelectedMap;
  onChange: (optionId: string) => void;
  /**
   * Tightens up the spacing between checkbox rows and sends down the
   * compressed prop to the checkbox itself
   */
  compressed?: boolean;
  disabled?: boolean;
} & ExclusiveUnion<AsDivProps, WithLegendProps>;

export const OuiCheckboxGroup: FunctionComponent<OuiCheckboxGroupProps> = ({
  options = [],
  idToSelectedMap = {},
  onChange,
  className,
  disabled,
  compressed,
  legend,
  ...rest
}) => {
  const checkboxes = options.map((option, index) => {
    const {
      disabled: isOptionDisabled,
      className: optionClass,
      ...optionRest
    } = option;
    return (
      <OuiCheckbox
        className={classNames('ouiCheckboxGroup__item', optionClass)}
        key={index}
        checked={idToSelectedMap[option.id]}
        disabled={disabled || isOptionDisabled}
        onChange={onChange.bind(null, option.id)}
        compressed={compressed}
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
        {checkboxes}
      </OuiFormFieldset>
    );
  }

  return (
    <div className={className} {...(rest as HTMLAttributes<HTMLDivElement>)}>
      {checkboxes}
    </div>
  );
};
