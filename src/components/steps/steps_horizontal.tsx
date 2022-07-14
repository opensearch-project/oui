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
import React, { FunctionComponent, OlHTMLAttributes } from 'react';
import { CommonProps } from '../common';
import { OuiStepHorizontal, OuiStepHorizontalProps } from './step_horizontal';

export interface OuiStepsHorizontalProps
  extends OlHTMLAttributes<HTMLOListElement>,
    CommonProps {
  /**
   * An array of `OuiStepHorizontal` objects excluding the `step` prop
   */
  steps: Array<Omit<OuiStepHorizontalProps, 'step'>>;
}

export const OuiStepsHorizontal: FunctionComponent<OuiStepsHorizontalProps> = ({
  className,
  steps,
  ...rest
}) => {
  const classes = classNames('ouiStepsHorizontal', className);

  return (
    <ol className={classes} {...rest}>
      {steps.map((stepProps, index) => {
        const isCurrent = stepProps.isSelected
          ? { 'aria-current': 'step' as const }
          : {};

        return (
          <li key={index} className="ouiStepHorizontal__item" {...isCurrent}>
            <OuiStepHorizontal step={index + 1} {...stepProps} />
          </li>
        );
      })}
    </ol>
  );
};
