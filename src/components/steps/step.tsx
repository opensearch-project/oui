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
  createElement,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
} from 'react';
import { CommonProps } from '../common';
import { OuiTitle, OuiTitleProps, OuiTitleSize } from '../title';
import { OuiStepNumber, OuiStepStatus } from './step_number';

export interface OuiStepInterface {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  /**
   * The HTML tag used for the title
   */
  headingElement?: string;
  /**
   * The number of the step in the list of steps
   */
  step?: number;
  title: string;
  /**
   * May replace the number provided in props.step with alternate styling.
   */
  status?: OuiStepStatus;
  /**
   * Title sizing equivalent to OuiTitle, but only `m`, `s` and `xs`. Defaults to `s`
   */
  titleSize?: Exclude<OuiTitleProps['size'], 'xxxs' | 'xxs' | 'l'>;
}

export type OuiStepProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> &
  OuiStepInterface;

export const OuiStep: FunctionComponent<OuiStepProps> = ({
  className,
  children,
  headingElement = 'p',
  step = 1,
  title,
  titleSize = 's',
  status,
  ...rest
}) => {
  const classes = classNames(
    'ouiStep',
    {
      'ouiStep--small': titleSize === 'xs',
      'ouiStep-isDisabled': status === 'disabled',
    },
    className
  );
  const numberClasses = classNames('ouiStep__circle', {
    'ouiStepNumber--small': titleSize === 'xs',
  });

  return (
    <div className={classes} {...rest}>
      <div className="ouiStep__titleWrapper">
        <OuiStepNumber
          className={numberClasses}
          number={step}
          status={status}
          titleSize={titleSize}
          isHollow={status === 'incomplete'}
        />
        <OuiTitle size={titleSize as OuiTitleSize} className="ouiStep__title">
          {createElement(headingElement, null, title)}
        </OuiTitle>
      </div>

      <div className="ouiStep__content">{children}</div>
    </div>
  );
};
