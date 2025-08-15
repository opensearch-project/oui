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
import { OuiNotificationEventMeta } from './notification_event_meta';
import { OuiContextMenuItem } from '../context_menu';

describe('OuiNotificationEventMeta', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiNotificationEventMeta
        id="id"
        type="Alert"
        time={<span>2 min ago</span>}
        eventName="eventName"
      />
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    test('severity is rendered', () => {
      const { container } = render(
        <OuiNotificationEventMeta
          id="id"
          type="Alert"
          time={<span>2 min ago</span>}
          severity="severity"
          eventName="eventName"
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('badgeColor is rendered', () => {
      const { container } = render(
        <OuiNotificationEventMeta
          id="id"
          type="Alert"
          time={<span>2 min ago</span>}
          eventName="eventName"
          badgeColor="success"
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('logoCloud is rendered', () => {
      const { container } = render(
        <OuiNotificationEventMeta
          id="id"
          type="Alert"
          time={<span>2 min ago</span>}
          iconType="logoCloud"
          eventName="eventName"
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('contextMenuItems are rendered', () => {
      const contextMenuItems = [
        <OuiContextMenuItem key="contextMenuItemA">
          Mark as read
        </OuiContextMenuItem>,
        <OuiContextMenuItem key="contextMenuItemB">
          View messages like this
        </OuiContextMenuItem>,
        <OuiContextMenuItem key="contextMenuItemC">
          Don&apos;t notify me about this
        </OuiContextMenuItem>,
      ];

      render(
        <OuiNotificationEventMeta
          id="id"
          type="Alert"
          time={<span>2 min ago</span>}
          iconType="logoCloud"
          eventName="eventName"
          onOpenContextMenu={() => contextMenuItems}
        />
      );

      // Initially, context menu items should not be visible
      expect(screen.queryByText('Mark as read')).not.toBeInTheDocument();

      // Click the button to open the context menu
      act(() => {
        fireEvent.click(screen.getByTestId('id-notificationEventMetaButton'));
      });

      // Now the context menu items should be visible
      expect(screen.getByText('Mark as read')).toBeInTheDocument();
      expect(screen.getByText('View messages like this')).toBeInTheDocument();
      expect(
        screen.getByText("Don't notify me about this")
      ).toBeInTheDocument();

      // Take a snapshot of the entire container which should include the portal
      expect(document.body).toMatchSnapshot();
    });
  });
});
