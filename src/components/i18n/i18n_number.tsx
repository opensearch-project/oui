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

import React, { FunctionComponent, ReactChild, ReactElement } from 'react';
import { OuiI18nConsumer } from '../context';
import { ExclusiveUnion } from '../common';

const defaultFormatter = new Intl.NumberFormat('en');
function defaultFormatNumber(value: number) {
  return defaultFormatter.format(value);
}

interface OuiI18nNumberValueShape {
  value: number;
  children?: (x: ReactChild) => ReactElement<any>;
}

interface OuiI18nNumberValuesShape {
  values: number[];
  /**
   * ReactNode to render as this component's content
   */
  children: (x: ReactChild[]) => ReactElement<any>;
}

export type OuiI18nNumberProps = ExclusiveUnion<
  OuiI18nNumberValueShape,
  OuiI18nNumberValuesShape
>;

function hasValues(x: OuiI18nNumberProps): x is OuiI18nNumberValuesShape {
  return x.values != null;
}

const OuiI18nNumber: FunctionComponent<OuiI18nNumberProps> = (props) => (
  <OuiI18nConsumer>
    {(i18nConfig) => {
      const formatNumber = i18nConfig.formatNumber || defaultFormatNumber;

      if (hasValues(props)) {
        return props.children(props.values.map((value) => formatNumber(value)));
      }

      const formattedValue = (formatNumber || defaultFormatNumber)(props.value);
      if (props.children) {
        return props.children(formattedValue);
      } else {
        return formattedValue;
      }
    }}
  </OuiI18nConsumer>
);

export { OuiI18nNumber };
