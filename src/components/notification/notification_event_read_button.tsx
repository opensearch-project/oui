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

import React, { FunctionComponent } from 'react';
import { OuiButtonIcon, OuiButtonIconProps } from '../button';
import { useOuiI18n } from '../i18n';
import classNames from 'classnames';

export type OuiNotificationEventReadButtonProps = Omit<
  OuiButtonIconProps,
  'iconType' | 'isDisabled' | 'isSelected' | 'size'
> & {
  id: string;
  /**
   * Shows an indicator of the read state of the event
   */
  isRead: boolean;
  /**
   * Applies an `onClick` handler to the `read` indicator.
   */
  onClick: () => void;
  /**
   * A unique, human-friendly name for the event to be used in aria attributes (e.g. "alert-critical-01", "cloud-no-severity-12", etc..).
   */
  eventName: string;
};

export const OuiNotificationEventReadButton: FunctionComponent<OuiNotificationEventReadButtonProps> = ({
  id,
  isRead,
  onClick,
  eventName,
  ...rest
}) => {
  const classesReadState = classNames('ouiNotificationEventReadButton', {
    'ouiNotificationEventReadButton--isRead': isRead,
  });

  const markAsReadAria = useOuiI18n(
    'ouiNotificationEventReadButton.markAsReadAria',
    'Mark {eventName} as read',
    {
      eventName,
    }
  );

  const markAsUnreadAria = useOuiI18n(
    'ouiNotificationEventReadButton.markAsUnreadAria',
    'Mark {eventName} as unread',
    {
      eventName,
    }
  );

  const markAsRead = useOuiI18n(
    'ouiNotificationEventReadButton.markAsRead',
    'Mark as read'
  );

  const markAsUnread = useOuiI18n(
    'ouiNotificationEventReadButton.markAsUnread',
    'Mark as unread'
  );

  const buttonAriaLabel = isRead ? markAsUnreadAria : markAsReadAria;
  const buttonTitle = isRead ? markAsUnread : markAsRead;

  return (
    <OuiButtonIcon
      iconType="dot"
      aria-label={buttonAriaLabel}
      title={buttonTitle}
      className={classesReadState}
      onClick={onClick}
      data-test-subj={`${id}-notificationEventReadButton`}
      {...rest}
    />
  );
};
