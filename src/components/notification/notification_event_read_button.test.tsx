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
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { OuiNotificationEventReadButton } from './notification_event_read_button';

describe('OuiNotificationEventReadButton', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiNotificationEventReadButton
        id="id"
        eventName="eventName"
        isRead={true}
        onClick={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('renders isRead to false', () => {
    const { container } = render(
      <OuiNotificationEventReadButton
        id="id"
        eventName="eventName"
        isRead={false}
        onClick={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('onClick fires for buttons', async () => {
    const handler = jest.fn();
    render(
      <OuiNotificationEventReadButton
        id="id"
        eventName="eventName"
        isRead={false}
        onClick={handler}
      />
    );

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole('button'));
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
