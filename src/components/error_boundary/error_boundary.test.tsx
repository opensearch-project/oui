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
import { mount } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../test';

import { OuiErrorBoundary } from './error_boundary';

const GoodComponent = () => <div>No error</div>;

const errorMessage =
  "I'm here to kick butt and chew bubblegum.\n\nAnd I'm all out of gum.";

const BadComponent = () => {
  throw new Error(errorMessage);
};

describe('OuiErrorBoundary', () => {
  test('is rendered without an error', () => {
    const component = takeMountedSnapshot(
      mount(
        <OuiErrorBoundary {...requiredProps}>
          <GoodComponent />
        </OuiErrorBoundary>
      )
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with an error', () => {
    // Prevent the React boundary error from appearing in the terminal.
    const consoleError = console.error;
    console.error = jest.fn();

    // Because the error contains the stack trace, it's non-deterministic. So we'll just check that
    // it contains our error message.
    const errorText = mount(
      <OuiErrorBoundary {...requiredProps}>
        <BadComponent />
      </OuiErrorBoundary>
    ).text();

    expect(errorText).toContain(errorMessage);

    console.error = consoleError;
  });
});
