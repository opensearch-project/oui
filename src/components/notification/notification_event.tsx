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

import React, { FunctionComponent, ReactElement, createElement } from 'react';
import classNames from 'classnames';
import {
  OuiNotificationEventMeta,
  OuiNotificationEventMetaProps,
} from './notification_event_meta';
import {
  OuiNotificationEventMessages,
  OuiNotificationEventMessagesProps,
} from './notification_event_messages';
import {
  OuiNotificationEventReadButton,
  OuiNotificationEventReadButtonProps,
} from './notification_event_read_button';
import { OuiButtonEmpty, OuiButtonEmptyProps } from '../button';
import { OuiLink } from '../link';
import { OuiContextMenuItem, OuiContextMenuItemProps } from '../context_menu';
import { htmlIdGenerator } from '../../services';
import { OuiNotificationEventReadIcon } from './notification_event_read_icon';

export type OuiNotificationHeadingLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type OuiNotificationEventProps = Omit<
  OuiNotificationEventMetaProps,
  'onOpenContextMenu' | 'onRead' | 'eventName' | 'id'
> &
  Omit<
    OuiNotificationEventReadButtonProps,
    'onClick' | 'color' | 'eventName' | 'isRead' | 'id'
  > & {
    /**
     * A unique identifier
     */
    id: string;
    /**
     * The title of the event.
     */
    title: string;
    /**
     * The heading level of the title.
     */
    headingLevel?: OuiNotificationHeadingLevel;
    /**
     * Returns the `id` and applies an `onClick` handler to the title.
     */
    onClickTitle?: (id: string) => void;
    /**
     * The label of the primary action
     */
    primaryAction?: string;
    /**
     * Apply more props to the `primaryAction` button. See #OuiPrimaryActionProps.
     */
    primaryActionProps?: OuiButtonEmptyProps;
    /**
     * Returns the `id` and applies an `onClick` handler to the `primaryAction`.
     */
    onClickPrimaryAction?: (id: string) => void;
    /**
     * Notification messages as an array of strings. More than one message wraps in an accordion.
     */
    messages: OuiNotificationEventMessagesProps['messages'];
    /**
     * Shows an indicator of the read state of the event. Leave as `undefined` to hide the indicator.
     */
    isRead?: boolean | undefined;
    /**
     * Returns the `id` and `isRead` state. Applies an `onClick` handler to the `read` indicator.
     */
    onRead?: (id: string, isRead: boolean) => void;
    /**
     * Provided the `id` of the event must return an array of #OuiContextMenuItem elements.
     */
    onOpenContextMenu?: (
      id: string
    ) => Array<
      ReactElement<OuiContextMenuItemProps, typeof OuiContextMenuItem>
    >;
  };

export const OuiNotificationEvent: FunctionComponent<OuiNotificationEventProps> = ({
  id,
  type,
  severity,
  badgeColor,
  iconType,
  iconAriaLabel,
  time,
  title,
  isRead,
  primaryAction,
  primaryActionProps,
  messages,
  onRead,
  onOpenContextMenu,
  onClickTitle,
  onClickPrimaryAction,
  headingLevel = 'h2',
}) => {
  const classes = classNames('ouiNotificationEvent', {
    'ouiNotificationEvent--withReadState': typeof isRead === 'boolean',
  });

  const classesTitle = classNames('ouiNotificationEvent__title', {
    'ouiNotificationEvent__title--isRead': isRead,
  });

  const randomHeadingId = htmlIdGenerator()();

  const titleProps = {
    id: randomHeadingId,
    className: classesTitle,
    'data-test-subj': `${id}-notificationEventTitle`,
  };

  return (
    <article aria-labelledby={randomHeadingId} className={classes} key={id}>
      {typeof isRead === 'boolean' && (
        <div className="ouiNotificationEvent__readButton">
          {!!onRead ? (
            <OuiNotificationEventReadButton
              isRead={isRead}
              onClick={() => onRead(id, isRead)}
              eventName={title}
              id={id}
            />
          ) : (
            <OuiNotificationEventReadIcon
              id={id}
              isRead={isRead}
              eventName={title}
            />
          )}
        </div>
      )}

      <div className="ouiNotificationEvent__content">
        <OuiNotificationEventMeta
          id={id}
          type={type}
          severity={severity}
          badgeColor={badgeColor}
          iconType={iconType}
          iconAriaLabel={iconAriaLabel}
          time={time}
          onOpenContextMenu={
            onOpenContextMenu ? () => onOpenContextMenu(id) : undefined
          }
          eventName={title}
        />

        {onClickTitle ? (
          <OuiLink onClick={() => onClickTitle(id)} {...titleProps}>
            {createElement(headingLevel, null, title)}
          </OuiLink>
        ) : (
          createElement(headingLevel, titleProps, title)
        )}

        <OuiNotificationEventMessages messages={messages} eventName={title} />

        {onClickPrimaryAction && primaryAction && (
          <div className="ouiNotificationEvent__primaryAction">
            <OuiButtonEmpty
              flush="left"
              size="s"
              {...primaryActionProps}
              onClick={() => onClickPrimaryAction?.(id)}
              data-test-subj={`${id}-notificationEventPrimaryAction`}>
              {primaryAction}
            </OuiButtonEmpty>
          </div>
        )}
      </div>
    </article>
  );
};
