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
import { useOuiI18n } from '../i18n';
import classNames from 'classnames';
import { OuiIcon, OuiIconProps } from '../icon';

export type OuiNotificationEventReadIconProps = Omit<
  OuiIconProps,
  'type' | 'color' | 'size'
> & {
  id: string;
  /**
   * Shows an indicator of the read state of the event
   */
  isRead: boolean;
  /**
   * A unique, human-friendly name for the event to be used in aria attributes (e.g. "alert-critical-01", "cloud-no-severity-12", etc..).
   */
  eventName: string;
};

export const OuiNotificationEventReadIcon: FunctionComponent<OuiNotificationEventReadIconProps> = ({
  id,
  isRead,
  eventName,
  ...rest
}) => {
  const classesReadState = classNames('ouiNotificationEventReadIcon', {
    'ouiNotificationEventReadIcon--isRead': isRead,
  });

  const readAria = useOuiI18n(
    'ouiNotificationEventReadIcon.readAria',
    '{eventName} is read',
    {
      eventName,
    }
  );

  const unreadAria = useOuiI18n(
    'ouiNotificationEventReadIcon.unreadAria',
    '{eventName} is unread',
    {
      eventName,
    }
  );
  const readTitle = useOuiI18n('ouiNotificationEventReadIcon.read', 'Read');
  const unreadTitle = useOuiI18n(
    'ouiNotificationEventReadIcon.unread',
    'Unread'
  );

  const iconAriaLabel = isRead ? readAria : unreadAria;
  const iconTitle = isRead ? readTitle : unreadTitle;

  return (
    <div className={classesReadState}>
      <OuiIcon
        type="dot"
        aria-label={iconAriaLabel}
        title={iconTitle}
        color="primary"
        data-test-subj={`${id}-notificationEventReadIcon`}
        {...rest}
      />
    </div>
  );
};
