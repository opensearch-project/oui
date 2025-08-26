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
import { OuiNotificationEvent } from './notification_event';
import { OuiContextMenuItem } from '../context_menu';

describe('OuiNotificationEvent', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiNotificationEvent
        id="id"
        type="Alert"
        time="1 min ago"
        title="title"
        messages={['message']}
      />
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    test('multiple messages are rendered', () => {
      const { container } = render(
        <OuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          title="title"
          messages={['message 1', 'message 2', 'message 3']}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('isRead is rendered', () => {
      const { container } = render(
        <OuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          isRead={true}
          onRead={() => {}}
          title="title"
          messages={['message']}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('severity is rendered', () => {
      const { container } = render(
        <OuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          severity="severity"
          title="title"
          messages={['message']}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('badgeColor is rendered', () => {
      const { container } = render(
        <OuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          badgeColor="warning"
          title="title"
          messages={['message']}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('iconType is rendered', () => {
      const { container } = render(
        <OuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          iconType="logoCloud"
          title="title"
          messages={['message']}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('headingLevel is rendered', () => {
      const { container } = render(
        <OuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          title="title"
          headingLevel="h4"
          messages={['message']}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('iconAriaLabel is rendered', () => {
      const { container } = render(
        <OuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          title="title"
          iconType="logoCloud"
          iconAriaLabel="my icon aria label"
          messages={['message']}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('primaryAction is rendered', () => {
      const { container } = render(
        <OuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          title="title"
          primaryAction="primaryAction label"
          onClickPrimaryAction={() => {}}
          messages={['message']}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('primaryActionProps is rendered', () => {
      const { container } = render(
        <OuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          title="title"
          primaryAction="primaryAction"
          primaryActionProps={{ iconType: 'download' }}
          onClickPrimaryAction={() => {}}
          messages={['message']}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('contextMenuItems are rendered', () => {
      const onOpenContextMenu = (id: string) => {
        return [
          <OuiContextMenuItem key="contextMenuItemA">
            Context menu 1 for id: {id}
          </OuiContextMenuItem>,
          <OuiContextMenuItem key="contextMenuItemB">
            Context menu 2 for id: {id}
          </OuiContextMenuItem>,
          <OuiContextMenuItem key="contextMenuItemC">
            Context menu 3 for id: {id}
          </OuiContextMenuItem>,
        ];
      };

      render(
        <OuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          title="title"
          messages={['message']}
          onOpenContextMenu={onOpenContextMenu}
        />
      );

      // Initially, context menu items should not be visible
      expect(
        screen.queryByText('Context menu 1 for id: id')
      ).not.toBeInTheDocument();

      // Click the button to open the context menu
      act(() => {
        fireEvent.click(screen.getByTestId('id-notificationEventMetaButton'));
      });

      // Now the context menu items should be visible
      expect(screen.getByText('Context menu 1 for id: id')).toBeInTheDocument();
      expect(screen.getByText('Context menu 2 for id: id')).toBeInTheDocument();
      expect(screen.getByText('Context menu 3 for id: id')).toBeInTheDocument();

      // Take a snapshot of the entire body which should include the portal
      expect(document.body).toMatchSnapshot();
    });
  });

  describe('behavior', () => {
    it('triggers the onRead callback', () => {
      const onRead = jest.fn();

      render(
        <OuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          isRead={true}
          onRead={onRead}
          title="title"
          messages={['message']}
        />
      );

      act(() => {
        fireEvent.click(screen.getByTestId('id-notificationEventReadButton'));
      });

      expect(onRead).toHaveBeenCalledTimes(1);
    });

    it('triggers the onClickPrimaryAction callback', () => {
      const onClickPrimaryAction = jest.fn();

      render(
        <OuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          isRead={true}
          onRead={() => {}}
          onClickPrimaryAction={onClickPrimaryAction}
          primaryAction="primary action label"
          title="title"
          messages={['message']}
        />
      );

      act(() => {
        fireEvent.click(
          screen.getByTestId('id-notificationEventPrimaryAction')
        );
      });

      expect(onClickPrimaryAction).toHaveBeenCalledTimes(1);
    });

    it('triggers the onClickTitle callback', () => {
      const onClickTitle = jest.fn();

      render(
        <OuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          onClickTitle={onClickTitle}
          title="title"
          messages={['message']}
        />
      );

      act(() => {
        fireEvent.click(screen.getByTestId('id-notificationEventTitle'));
      });

      expect(onClickTitle).toHaveBeenCalledTimes(1);
    });
  });
});
