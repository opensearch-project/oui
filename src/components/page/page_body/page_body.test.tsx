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

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { OuiPageBody } from './page_body';

describe('OuiPageBody', () => {
  test('is rendered', () => {
    const component = render(<OuiPageBody {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('panelled', () => {
    test('can be set to true', () => {
      const component = render(<OuiPageBody panelled={true} />);

      expect(component).toMatchSnapshot();
    });

    test('also accepts panelProps', () => {
      const component = render(
        <OuiPageBody panelled={true} panelProps={{ color: 'subdued' }} />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const component = render(
        <OuiPageBody {...requiredProps} restrictWidth={true} />
      );

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const component = render(
        <OuiPageBody {...requiredProps} restrictWidth={1024} />
      );

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom value and measurement', () => {
      const component = render(
        <OuiPageBody {...requiredProps} restrictWidth="24rem" />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
