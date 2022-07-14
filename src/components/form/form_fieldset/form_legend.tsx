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

import React, { HTMLAttributes, FunctionComponent, ReactNode } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';
import { OuiScreenReaderOnly } from '../../accessibility';

export type OuiFormLegendProps = HTMLAttributes<HTMLLegendElement> &
  CommonProps & {
    /**
     * ReactNode to render as this component's content
     */
    children: ReactNode;
    /**
     * For a hidden legend that is still visible to the screen reader, set to 'hidden'
     */
    display?: 'hidden' | 'visible';
    compressed?: boolean;
  };

export const OuiFormLegend: FunctionComponent<OuiFormLegendProps> = ({
  children,
  className,
  display = 'visible',
  compressed,
  ...rest
}) => {
  const isLegendHidden = display === 'hidden';
  const classes = classNames(
    'ouiFormLegend',
    {
      'ouiFormLegend-isHidden': isLegendHidden,
      'ouiFormLegend--compressed': compressed,
    },
    className
  );

  return (
    <legend className={classes} {...rest}>
      {isLegendHidden ? (
        <OuiScreenReaderOnly>
          <span>{children}</span>
        </OuiScreenReaderOnly>
      ) : (
        children
      )}
    </legend>
  );
};
