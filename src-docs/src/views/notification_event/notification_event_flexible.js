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
import { OuiButtonGroup } from '../../../../src/components/button';
import { OuiContextMenuItem } from '../../../../src/components/context_menu';
import { OuiNotificationEvent } from '../../../../src/components/notification/notification_event';

const notificationEventsData = [
  {
    id: 'report',
    type: 'Report',
    iconType: 'logoKibana',
    iconAriaLabel: 'Kibana',
    time: '1 min ago',
    title: '[Error Monitoring Report] is generated',
    primaryAction: 'Download',
    primaryActionProps: {
      iconType: 'download',
    },
    messages: ['The reported was generated at 17:12:16 GMT+4'],
    isRead: false,
  },
  {
    id: 'alert',
    type: 'Alert',
    iconType: 'logoMaps',
    severity: 'Warning',
    iconAriaLabel: 'Maps',
    badgeColor: 'warning',
    time: '2 min ago',
    title: '[Maps] Geo Alert',
    messages: [
      'The request completed at 12:32:33 GMT+4',
      'The request completed at 12:32:33 GMT+4',
      'A background request started at 12:32:33 GMT+4',
    ],
    isRead: false,
  },

  {
    id: 'news',
    type: 'News',
    iconType: 'logoOUI',
    iconAriaLabel: 'Elastic',
    time: '3 min ago',
    badgeColor: 'accent',
    title: 'Search more, spend less',
    messages: [
      'Retain and search more data with searchable snapshots on low-cost object stores + a new cold data tier in 7.11.',
    ],
    isRead: false,
    primaryAction: 'View and go',
  },
];

export default () => {
  const [event, setEvent] = useState(notificationEventsData[0]);

  const onRead = (id, isRead) => {
    const nextState = { ...event, isRead: !isRead };

    setEvent(nextState);
  };

  const onOpenContextMenu = (id) => {
    const { isRead } = event;

    return [
      <OuiContextMenuItem
        key="contextMenuItemA"
        onClick={() => onRead(id, isRead)}>
        {isRead ? 'Mark as unread' : 'Mark as read'}
      </OuiContextMenuItem>,

      <OuiContextMenuItem key="contextMenuItemB" onClick={() => {}}>
        View messages like this
      </OuiContextMenuItem>,

      <OuiContextMenuItem key="contextMenuItemC" onClick={() => {}}>
        Don’t notify me about this
      </OuiContextMenuItem>,
    ];
  };

  const [toggleIdSelected, setToggleIdSelected] = useState('reportButton');

  const toggleButtons = [
    {
      id: 'reportButton',
      label: 'Report',
    },
    {
      id: 'alertButton',
      label: 'Alert',
    },
    {
      id: 'newsButton',
      label: 'News',
    },
  ];

  const onChangeButtonGroup = (optionId) => {
    setToggleIdSelected(optionId);
    const eventId = optionId.replace('Button', '');
    const event = notificationEventsData.find((event) => event.id === eventId);
    setEvent(event);
  };

  return (
    <>
      <OuiButtonGroup
        legend="Pick an example"
        options={toggleButtons}
        onChange={onChangeButtonGroup}
        idSelected={toggleIdSelected}
        type="single"
        color="primary"
      />
      <OuiSpacer />
      <OuiPanel
        paddingSize="none"
        hasShadow={true}
        style={{ maxWidth: '540px' }}>
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
          primaryActionProps={event.primaryActionProps}
          messages={event.messages}
          onRead={onRead}
          onOpenContextMenu={onOpenContextMenu}
          onClickPrimaryAction={() => {}}
          onClickTitle={event.id !== 'news' ? () => {} : undefined}
        />
      </OuiPanel>
    </>
  );
};
