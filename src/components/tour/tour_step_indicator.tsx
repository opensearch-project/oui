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

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

import { OuiIcon } from '../icon';
import { OuiI18n } from '../i18n';

const statusToClassNameMap = {
  complete: 'ouiTourStepIndicator--complete',
  incomplete: 'ouiTourStepIndicator--incomplete',
  active: 'ouiTourStepIndicator--active',
};

export const STATUS = keysOf(statusToClassNameMap);

export type OuiTourStepStatus = keyof typeof statusToClassNameMap;

export interface OuiTourStepIndicatorProps
  extends CommonProps,
    HTMLAttributes<HTMLLIElement> {
  number: number;
  status: OuiTourStepStatus;
}

export const OuiTourStepIndicator: FunctionComponent<OuiTourStepIndicatorProps> = ({
  className,
  number,
  status,
  ...rest
}) => {
  const classes = classNames(
    'ouiTourStepIndicator',
    status ? statusToClassNameMap[status] : undefined,
    className
  );

  let indicatorIcon: ReactNode;
  if (status === 'active') {
    indicatorIcon = (
      <OuiI18n token="ouiTourStepIndicator.isActive" default="active">
        {(isActive: string) => (
          <OuiIcon
            type="dot"
            className="ouiStepNumber__icon"
            aria-label={isActive}
            color="success"
            aria-current="step"
          />
        )}
      </OuiI18n>
    );
  } else if (status === 'complete') {
    indicatorIcon = (
      <OuiI18n token="ouiTourStepIndicator.isComplete" default="complete">
        {(isComplete: string) => (
          <OuiIcon
            type="dot"
            className="ouiStepNumber__icon"
            aria-label={isComplete}
            color="subdued"
          />
        )}
      </OuiI18n>
    );
  } else if (status === 'incomplete') {
    indicatorIcon = (
      <OuiI18n token="ouiTourStepIndicator.isIncomplete" default="incomplete">
        {(isIncomplete: string) => (
          <OuiIcon
            type="dot"
            className="ouiStepNumber__icon"
            aria-label={isIncomplete}
            color="subdued"
          />
        )}
      </OuiI18n>
    );
  }

  return (
    <OuiI18n
      token="ouiTourStepIndicator.ariaLabel"
      default="Step {number} {status}"
      values={{ status, number }}>
      {(ariaLabel: string) => (
        <li className={classes} aria-label={ariaLabel} {...rest}>
          {indicatorIcon}
        </li>
      )}
    </OuiI18n>
  );
};
