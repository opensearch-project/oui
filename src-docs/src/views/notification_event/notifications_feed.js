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

import React, { useState } from 'react';
import { OuiPanel } from '../../../../src/components/panel';
import { OuiSpacer } from '../../../../src/components/spacer';
import { OuiButton } from '../../../../src/components/button';
import { OuiContextMenuItem } from '../../../../src/components/context_menu';
import { OuiNotificationEvent } from '../../../../src/components/notification/notification_event';

const notificationEventsData = [
  {
    id: 'alert-01',
    type: 'Alert',
    severity: 'Warning',
    iconType: 'logoMaps',
    iconAriaLabel: 'Maps',
    badgeColor: 'warning',
    time: '1 min ago',
    title: '[Maps] Geo Alert',
    messages: [
      'The request completed at 12:32:33 GMT+4',
      'The request completed at 12:32:33 GMT+4',
      'A background request started at 12:32:33 GMT+4',
    ],
    isRead: false,
  },
  {
    id: 'report-01',
    type: 'Report',
    iconType: 'logoKibana',
    iconAriaLabel: 'Kibana',
    time: '3 min ago',
    title: '[Error Monitoring Report] is generated',
    primaryAction: 'Download',
    primaryActionProps: {
      iconType: 'download',
    },
    messages: [
      'The reported was generated at 17:12:16 GMT+4 and due to an error it was was generated again at 17:13:17 GMT+4',
    ],
    isRead: false,
  },
  {
    id: 'news-01',
    type: 'News',
    iconType: 'logoOUI',
    iconAriaLabel: 'Elastic',
    time: '6 min ago',
    badgeColor: 'accent',
    title: 'Search more, spend less',
    messages: [
      'Retain and search more data with searchable snapshots on low-cost object stores + a new cold data tier in 7.11.',
    ],
    isRead: false,
    primaryAction: 'View and go',
  },
  {
    id: 'alert-02',
    type: 'Alert',
    severity: 'Critical',
    iconType: 'logoKibana',
    iconAriaLabel: 'Kibana',
    badgeColor: 'danger',
    time: '8 min ago',
    title: 'Index Threshold Alert',
    messages: [
      '[prod-server-001] is above 300',
      '[prod-server-001] is above 700',
    ],
    isRead: false,
  },
  {
    id: 'background-search-01',
    type: 'Background Search',
    iconType: 'logoKibana',
    iconAriaLabel: 'Kibana',
    time: '10 min ago',
    title: '[Flights] Flight Count and Average Ticket Price',
    messages: ['The request completed at 12:32:33 GMT+4'],
    isRead: false,
  },
];

export default () => {
  const [events, setEvents] = useState(notificationEventsData);

  const onRead = (id, isRead) => {
    const nextState = events.map((event) => {
      return event.id === id ? { ...event, isRead: !isRead } : event;
    });

    setEvents(nextState);
  };

  const onFilterByType = (type) => {
    const nextState = events.filter((event) => type.includes(event.type));

    setEvents(nextState);
  };

  const onOpenContextMenu = (id) => {
    const { isRead, type } = events.find(({ id: eventId }) => eventId === id);

    return [
      <OuiContextMenuItem
        key="contextMenuItemA"
        onClick={() => onRead(id, isRead)}>
        {isRead ? 'Mark as unread' : 'Mark as read'}
      </OuiContextMenuItem>,

      <OuiContextMenuItem
        key="contextMenuItemB"
        onClick={() => onFilterByType(type)}>
        View messages like this
      </OuiContextMenuItem>,

      <OuiContextMenuItem key="contextMenuItemC" onClick={() => {}}>
        Don’t notify me about this
      </OuiContextMenuItem>,
    ];
  };

  const onResetData = () => {
    setEvents(notificationEventsData);
  };

  const notificationEvents = events.map((event) => {
    // we want to make the news title unclickable
    const onClickTitle = event.type === 'News' ? undefined : () => {};

    return (
      <OuiNotificationEvent
        key={event.id}
        id={event.id}
        type={event.type}
        severity={event.severity}
        badgeColor={event.badgeColor}
        iconType={event.iconType}
        iconAriaLabel={event.iconAriaLabel}
        time={event.time}
        title={event.title}
        isRead={event.isRead}
        primaryAction={event.primaryAction}
        messages={event.messages}
        onRead={onRead}
        onOpenContextMenu={onOpenContextMenu}
        onClickPrimaryAction={() => {}}
        onClickTitle={onClickTitle}
      />
    );
  });

  return (
    <>
      <OuiButton size="s" onClick={onResetData}>
        Reset data
      </OuiButton>
      <OuiSpacer />
      <OuiPanel
        role="feed"
        paddingSize="none"
        hasShadow={true}
        style={{ maxWidth: '540px' }}>
        {notificationEvents}
      </OuiPanel>
    </>
  );
};
