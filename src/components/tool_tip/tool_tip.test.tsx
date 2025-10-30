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
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { requiredProps } from '../../test';
import { OuiToolTip } from './tool_tip';

describe('OuiToolTip', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiToolTip title="title" id="id" content="content" {...requiredProps}>
        <button>Trigger</button>
      </OuiToolTip>
    );

    expect(container).toMatchSnapshot();
  });

  test('shows tooltip on focus', () => {
    jest.useFakeTimers();

    render(
      <OuiToolTip title="title" id="id" content="content" {...requiredProps}>
        <button data-test-subj="trigger">Trigger</button>
      </OuiToolTip>
    );

    // Initially tooltip should not be visible
    expect(screen.queryByText('title')).not.toBeInTheDocument();

    // Focus the trigger button
    act(() => {
      fireEvent.focus(screen.getByTestId('trigger'));
    });

    // Advance timers to trigger the tooltip display
    act(() => {
      jest.advanceTimersByTime(260); // wait for showToolTip setTimeout
    });

    // Now the tooltip should be visible
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();

    // Take a snapshot of the body which should include the portal
    expect(document.body).toMatchSnapshot();

    jest.useRealTimers();
  });

  test('display prop renders block', () => {
    const { container } = render(
      <OuiToolTip
        title="title"
        id="id"
        content="content"
        {...requiredProps}
        display="block">
        <button>Trigger</button>
      </OuiToolTip>
    );

    expect(container).toMatchSnapshot();
  });
});
