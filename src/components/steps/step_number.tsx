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
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { OuiScreenReaderOnly } from '../accessibility';
import { CommonProps, keysOf } from '../common';
import { OuiIcon } from '../icon';
import { OuiStepProps } from './step';
import {
  useI18nCompleteStep,
  useI18nDisabledStep,
  useI18nErrorsStep,
  useI18nIncompleteStep,
  useI18nStep,
  useI18nWarningStep,
  useI18nLoadingStep,
} from './step_strings';
import { OuiLoadingSpinner } from '../loading';

const statusToClassNameMap = {
  incomplete: 'ouiStepNumber--incomplete',
  disabled: 'ouiStepNumber--disabled',
  loading: 'ouiStepNumber--loading',
  warning: 'ouiStepNumber--warning',
  danger: 'ouiStepNumber--danger',
  complete: 'ouiStepNumber--complete',
};

export const STATUS = keysOf(statusToClassNameMap);
export type OuiStepStatus = typeof STATUS[number];

export interface OuiStepNumberProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * May replace the number provided in props.number with alternate styling
   */
  status?: OuiStepStatus;
  number?: number;
  /**
   * Uses a border and removes the step number.
   */
  isHollow?: boolean;
  /**
   * Title sizing equivalent to OuiTitle, but only `m`, `s` and `xs`. Defaults to `s`
   */
  titleSize?: OuiStepProps['titleSize'];
}

export const OuiStepNumber: FunctionComponent<OuiStepNumberProps> = ({
  className,
  status,
  number,
  isHollow,
  titleSize,
  ...rest
}) => {
  const stepAriaLabel = useI18nStep({ number });
  const completeAriaLabel = useI18nCompleteStep({ number });
  const warningAriaLabel = useI18nWarningStep({ number });
  const errorsAriaLabel = useI18nErrorsStep({ number });
  const incompleteAriaLabel = useI18nIncompleteStep({ number });
  const disabledAriaLabel = useI18nDisabledStep({ number });
  const loadingAriaLabel = useI18nLoadingStep({ number });

  const classes = classNames(
    'ouiStepNumber',
    status ? statusToClassNameMap[status] : undefined,
    { 'ouiStepNumber-isHollow': isHollow },
    className
  );

  const iconSize = titleSize === 'xs' ? 's' : 'm';
  let screenReaderText = stepAriaLabel;
  if (status === 'incomplete') screenReaderText = incompleteAriaLabel;
  else if (status === 'disabled') screenReaderText = disabledAriaLabel;
  else if (status === 'loading') screenReaderText = loadingAriaLabel;

  let numberOrIcon = (
    <>
      <OuiScreenReaderOnly>
        <span>{screenReaderText}</span>
      </OuiScreenReaderOnly>
      <span className="ouiStepNumber__number" aria-hidden="true">
        {number}
      </span>
    </>
  );

  if (status === 'complete') {
    numberOrIcon = (
      <OuiIcon
        type="check"
        className="ouiStepNumber__icon"
        size={iconSize}
        aria-label={completeAriaLabel}
      />
    );
  } else if (status === 'warning') {
    numberOrIcon = (
      <OuiIcon
        type="alert"
        className="ouiStepNumber__icon"
        size={iconSize}
        aria-label={warningAriaLabel}
      />
    );
  } else if (status === 'danger') {
    numberOrIcon = (
      <OuiIcon
        type="cross"
        className="ouiStepNumber__icon"
        size={iconSize}
        aria-label={errorsAriaLabel}
      />
    );
  } else if (status === 'loading') {
    numberOrIcon = (
      <>
        <OuiScreenReaderOnly>
          <span>{screenReaderText}</span>
        </OuiScreenReaderOnly>
        <OuiLoadingSpinner
          className="ouiStepNumber__loader"
          size={iconSize === 's' ? 'l' : 'xl'}
        />
      </>
    );
  }

  return (
    <span className={classes} {...rest}>
      {numberOrIcon}
    </span>
  );
};
