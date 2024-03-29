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

import { OuiHeaderAlert } from './header_alert';

describe('OuiHeaderAlert', () => {
  test('is rendered', () => {
    const component = render(
      <OuiHeaderAlert {...requiredProps} title="title" date="date" />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders action', () => {
    const action = <button>Quietly take to the ship</button>;
    const component = render(
      <OuiHeaderAlert
        {...requiredProps}
        title="title"
        date="date"
        action={action}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders title as an element', () => {
    const title = <h2>Circumambulate the city</h2>;
    const component = render(
      <OuiHeaderAlert {...requiredProps} date="date" title={title} />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders date as an element', () => {
    const date = <h2>October 18, 1851</h2>;
    const component = render(
      <OuiHeaderAlert {...requiredProps} title="shazm" date={date} />
    );

    expect(component).toMatchSnapshot();
  });
});
