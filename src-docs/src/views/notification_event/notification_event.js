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
import { OuiContextMenuItem } from '../../../../src/components/context_menu';
import { OuiNotificationEvent } from '../../../../src/components/notification/notification_event';

export default () => {
  const [isRead, setIsRead] = useState(false);

  const onRead = (id, isRead) => {
    setIsRead(!isRead);
  };

  const onOpenContextMenu = (id) => {
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

  return (
    <OuiPanel paddingSize="none" hasShadow={true} style={{ maxWidth: '540px' }}>
      <OuiNotificationEvent
        id="report"
        type="Report"
        time="1 min ago"
        title="[Error Monitoring Report] is generated"
        primaryAction="Download"
        primaryActionProps={{
          iconType: 'download',
        }}
        messages={['The reported was generated at 17:12:16 GMT+4']}
        isRead={isRead}
        onRead={onRead}
        onOpenContextMenu={onOpenContextMenu}
        onClickPrimaryAction={() => {}}
        onClickTitle={() => {}}
      />
    </OuiPanel>
  );
};
