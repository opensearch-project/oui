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

import React, { FunctionComponent, ReactNode, useRef } from 'react';
import classNames from 'classnames';

import {
  OuiRadio,
  OuiRadioProps,
  OuiCheckbox,
  OuiCheckboxProps,
} from '../../form';
import { OuiSplitPanel } from '../../panel';
import { _OuiSplitPanelOuterProps } from '../../panel/split_panel';

interface OuiCheckableCardBaseProps {
  id: string;
  label: ReactNode;
  hasShadow?: _OuiSplitPanelOuterProps['hasShadow'];
  hasBorder?: _OuiSplitPanelOuterProps['hasBorder'];
}

// if `checkableType` is left out or set to 'radio', use OuiRadioProps
interface OuiCheckableCardAsRadioProps
  extends Omit<OuiRadioProps, 'compressed'> {
  /**
   * Whether the control is a radio button or checkbox
   */
  checkableType?: 'radio';
}

// if `checkableType` is set to 'checkbox', use OuiCheckboxProps
interface OuiCheckableCardAsCheckboxProps
  extends Omit<OuiCheckboxProps, 'compressed'> {
  checkableType: 'checkbox';
}

export type OuiCheckableCardProps = Omit<
  OuiCheckableCardAsCheckboxProps | OuiCheckableCardAsRadioProps,
  'label' | 'id'
> &
  OuiCheckableCardBaseProps;
export const OuiCheckableCard: FunctionComponent<OuiCheckableCardProps> = ({
  children,
  className,
  checkableType = 'radio',
  label,
  checked,
  disabled,
  hasShadow,
  hasBorder = true,
  ...rest
}) => {
  const { id } = rest;
  const labelEl = useRef<HTMLLabelElement>(null);
  const classes = classNames(
    'ouiCheckableCard',
    {
      'ouiCheckableCard-isChecked': checked,
      'ouiCheckableCard-isDisabled': disabled,
    },
    className
  );

  let checkableElement;
  if (checkableType === 'radio') {
    checkableElement = (
      <OuiRadio
        checked={checked}
        disabled={disabled}
        {...(rest as OuiRadioProps)}
      />
    );
  } else {
    checkableElement = (
      <OuiCheckbox checked={checked} disabled={disabled} {...rest} />
    );
  }

  const labelClasses = classNames('ouiCheckableCard__label', {
    'ouiCheckableCard__label-isDisabled': disabled,
  });

  const onChangeAffordance = () => {
    if (labelEl.current) {
      labelEl.current.click();
    }
  };

  return (
    <OuiSplitPanel.Outer
      responsive={false}
      hasShadow={hasShadow}
      hasBorder={hasBorder}
      direction="row"
      className={classes}>
      <OuiSplitPanel.Inner
        // Bubbles up the change event when clicking on the whole div for extra affordance
        onClick={disabled ? undefined : onChangeAffordance}
        color={checked ? 'primary' : 'subdued'}
        grow={false}>
        {checkableElement}
      </OuiSplitPanel.Inner>
      <OuiSplitPanel.Inner>
        <label
          ref={labelEl}
          className={labelClasses}
          htmlFor={id}
          aria-describedby={children ? `${id}-details` : undefined}>
          {label}
        </label>
        {children && (
          <div id={`${id}-details`} className="ouiCheckableCard__children">
            {children}
          </div>
        )}
      </OuiSplitPanel.Inner>
    </OuiSplitPanel.Outer>
  );
};
