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
  FunctionComponent,
  ReactElement,
  cloneElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { OuiText } from '../../text';
import {
  OuiFormControlLayout,
  OuiFormControlLayoutProps,
} from './form_control_layout';

export type OuiFormControlLayoutDelimitedProps = Partial<
  OuiFormControlLayoutProps
> & {
  /**
   * Left side control
   */
  startControl: ReactElement;
  /**
   * Right side control
   */
  endControl: ReactElement;
  /**
   * The center content. Accepts a string to be wrapped in a subdued OuiText
   * or a single ReactElement
   */
  delimiter?: ReactNode;
  className?: string;
};

export const OuiFormControlLayoutDelimited: FunctionComponent<OuiFormControlLayoutDelimitedProps> = ({
  startControl,
  endControl,
  delimiter = '→',
  className,
  ...rest
}) => {
  const classes = classNames('ouiFormControlLayoutDelimited', className);

  return (
    <OuiFormControlLayout className={classes} {...rest}>
      {addClassesToControl(startControl)}
      <OuiText
        className="ouiFormControlLayoutDelimited__delimeter"
        size="s"
        color="subdued">
        {delimiter}
      </OuiText>
      {addClassesToControl(endControl)}
    </OuiFormControlLayout>
  );
};

function addClassesToControl(control: ReactElement) {
  return cloneElement(control, {
    className: classNames(
      control.props.className,
      'ouiFormControlLayoutDelimited__input'
    ),
  });
}
