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
  ReactNode,
  HTMLAttributes,
  FormHTMLAttributes,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { OuiCallOut } from '../call_out';
import { OuiI18n } from '../i18n';
import { CommonProps, ExclusiveUnion } from '../common';

export type OuiFormProps = CommonProps &
  ExclusiveUnion<
    { component: 'form' } & FormHTMLAttributes<HTMLFormElement>,
    { component?: 'div' } & HTMLAttributes<HTMLDivElement>
  > & {
    isInvalid?: boolean;
    /**
     * Which HTML element to render `div` or `form`
     */
    component?: 'form' | 'div';
    error?: ReactNode | ReactNode[];
    /**
     * Where to display the callout with the list of errors
     */
    invalidCallout?: 'above' | 'none';
  };

export const OuiForm: FunctionComponent<OuiFormProps> = ({
  children,
  className,
  isInvalid,
  error,
  component = 'div',
  invalidCallout = 'above',
  ...rest
}) => {
  const handleFocus = useCallback((node) => {
    node?.focus();
  }, []);

  const classes = classNames('ouiForm', className);

  let optionalErrors: JSX.Element | null = null;

  if (error) {
    const errorTexts = Array.isArray(error) ? error : [error];
    optionalErrors = (
      <ul>
        {errorTexts.map((error, index) => (
          <li className="ouiForm__error" key={index}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  let optionalErrorAlert;

  if (isInvalid && invalidCallout === 'above') {
    optionalErrorAlert = (
      <OuiI18n
        token="ouiForm.addressFormErrors"
        default="Please address the highlighted errors.">
        {(addressFormErrors: string) => (
          <OuiCallOut
            tabIndex={-1}
            ref={handleFocus}
            className="ouiForm__errors"
            title={addressFormErrors}
            color="danger"
            role="alert"
            aria-live="assertive">
            {optionalErrors}
          </OuiCallOut>
        )}
      </OuiI18n>
    );
  }

  const Element = component;

  return (
    <Element className={classes} {...(rest as HTMLAttributes<HTMLElement>)}>
      {optionalErrorAlert}
      {children}
    </Element>
  );
};
