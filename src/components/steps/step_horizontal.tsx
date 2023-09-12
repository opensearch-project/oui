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

import classNames from 'classnames';
import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  MouseEvent as ReactMouseEvent,
  MouseEventHandler,
} from 'react';
import { CommonProps } from '../common';
import { OuiStepNumber, OuiStepStatus } from './step_number';
import {
  useI18nCompleteStep,
  useI18nDisabledStep,
  useI18nIncompleteStep,
  useI18nStep,
  useI18nWarningStep,
} from './step_strings';

export interface OuiStepHorizontalProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    CommonProps {
  /**
   * Adds to the line before the indicator for showing current progress
   */
  isSelected?: boolean;
  /**
   * Adds to the line after the indicator for showing current progress
   */
  isComplete?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  /**
   * Makes the whole step button disabled.
   */
  disabled?: boolean;
  /**
   * The number of the step in the list of steps
   */
  step?: number;
  title?: string;
  /**
   * Visual representation of the step number indicator.
   * May replace the number provided in props.step with alternate styling.
   * The `isSelected`, `isComplete`, and `disabled` props will override these.
   */
  status?: OuiStepStatus;
}

export const OuiStepHorizontal: FunctionComponent<OuiStepHorizontalProps> = ({
  className,
  step = 1,
  title,
  isSelected,
  isComplete,
  onClick,
  disabled,
  status,
  ...rest
}) => {
  const buttonTitle = useI18nStep({ number: step, title });
  const completeTitle = useI18nCompleteStep({ number: step, title });
  const disabledTitle = useI18nDisabledStep({ number: step, title });
  const incompleteTitle = useI18nIncompleteStep({ number: step, title });
  const warningTitle = useI18nWarningStep({ number: step, title });

  const classes = classNames('ouiStepHorizontal', className, {
    'ouiStepHorizontal-isSelected': isSelected,
    'ouiStepHorizontal-isComplete': isComplete,
    'ouiStepHorizontal-isIncomplete': !isSelected && !isComplete,
    'ouiStepHorizontal-isDisabled': disabled,
  });

  if (disabled) status = 'disabled';
  else if (isComplete) status = 'complete';
  else if (isSelected) status = status;
  else if (!status) status = 'incomplete';

  let stepTitle = buttonTitle;
  if (status === 'disabled') stepTitle = disabledTitle;
  if (status === 'complete') stepTitle = completeTitle;
  if (status === 'incomplete') stepTitle = incompleteTitle;
  if (status === 'warning') stepTitle = warningTitle;

  const onStepClick = (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!disabled) onClick(event);
  };

  return (
    <button
      className={classes}
      title={stepTitle}
      onClick={onStepClick}
      disabled={disabled}
      {...rest}>
      <OuiStepNumber
        className="ouiStepHorizontal__number"
        status={status}
        number={step}
      />

      <span className="ouiStepHorizontal__title">{title}</span>
    </button>
  );
};
