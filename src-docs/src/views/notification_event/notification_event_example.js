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

import React, { Fragment } from 'react';
import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';
import { Link } from 'react-router-dom';
import { OuiNotificationEventMeta } from '../../../../src/components/notification/notification_event_meta';
import {
  OuiNotificationEvent,
  OuiText,
  OuiContextMenuItem,
  OuiSpacer,
  OuiCode,
  OuiAccordion,
  OuiCodeBlock,
  OuiButtonEmpty as OuiPrimaryActionProps,
} from '../../../../src/components';
import NotificationEventPropsMethods from './notification_event_props_methods';

import NotificationEvent from './notification_event';
const notificationEventSource = require('./notification_event?raw');
const notificationEventHtml = renderToHtml(NotificationEvent);

import NotificationEventFlexible from './notification_event_flexible';
const notificationEventFlexibleSource = require('./notification_event_flexible?raw');
const notificationEventFlexibleHtml = renderToHtml(NotificationEventFlexible);

import NotificationsFeed from './notifications_feed';
const notificationsFeedSource = require('./notifications_feed?raw');
const notificationsFeedHtml = renderToHtml(NotificationsFeed);

const notificationEventSnippet = `<OuiNotificationEvent
  id={id}
  type="Alert"
  time={time}
  title={title}
  isRead={isRead}
  primaryAction={primaryAction}
  messages={messages}
  onRead={onRead}
  onOpenContextMenu={onOpenContextMenu}
  onClickPrimaryAction={onClickPrimaryAction}
  onClickTitle={onClickTitle}
/>`;

const notificationEventFeedSnippet = `// we're looping through an array of objects to render multiple OuiNotificationEvent
const notificationEvents = events.map((event) => (
  <OuiNotificationEvent
    key={event.id}
    id={event.id}
    type={event.type}
    iconType={event.iconType}
    iconAriaLabel={event.iconAriaLabel}
    time={event.time}
    title={event.title}
    isRead={event.isRead}
    primaryAction={event.primaryAction}
    messages={event.messages}
    onRead={onRead}
    onOpenContextMenu={onOpenContextMenu}
    onClickPrimaryAction={onClickPrimaryAction}
    onClickTitle={onClickTitle}
  />
));

// the multiple OuiNotificationEvent should live inside the same container
<div>
 {notificationEvents}
</div>
`;

export const NotificationEventExample = {
  title: 'Notification event',
  beta: false,
  isNew: false,
  intro: (
    <OuiText>
      <p>
        Use <strong>OuiNotificationEvent</strong> to display notifications about
        new events in your product like alerts, support, or news. This component
        is meant to live inside a{' '}
        <strong>
          <Link to="/layout/flyout/">OuiFlyout</Link>
        </strong>{' '}
        so that users can quickly be informed or take action.
      </p>
    </OuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: notificationEventSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: notificationEventHtml,
        },
      ],
      props: {
        OuiNotificationEvent,
        OuiNotificationEventMeta,
        OuiContextMenuItem,
        OuiPrimaryActionProps,
      },
      snippet: notificationEventSnippet,
      demo: <NotificationEvent />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: notificationEventFlexibleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: notificationEventFlexibleHtml,
        },
      ],
      title: 'A flexible component',
      text: (
        <>
          <OuiText>
            <p>
              The <strong>OuiNotificationEvent</strong> takes into account that
              an event can be purely informative or actionable. It is flexible
              and adapts the design according to the props passed.
            </p>
          </OuiText>
          <OuiSpacer />
          <NotificationEventPropsMethods />
          <OuiSpacer size="xs" />
          <OuiAccordion
            id="propsSnippet"
            buttonContent={<small>Code snippet</small>}>
            <OuiSpacer size="xs" />
            <OuiCodeBlock language="ts" isCopyable paddingSize="s">
              {notificationEventSnippet}
            </OuiCodeBlock>
          </OuiAccordion>
          <OuiSpacer />
          <OuiText>
            <ul style={{ listStyleType: 'upper-alpha' }}>
              <li>
                <OuiCode>isRead</OuiCode>: Shows a button or icon that indicates
                the current <OuiCode>isRead</OuiCode> state of the event. Use{' '}
                <OuiCode>onRead</OuiCode> to allow users to toggle between read
                and unread states.
              </li>
              <li>
                <OuiCode>type</OuiCode> (required): Shows inside a badge
                denoting what type of event it is. Use in conjunction with{' '}
                <OuiCode>severity</OuiCode> and <OuiCode>badgeColor</OuiCode> to
                indicate the level of urgency.
              </li>
              <li>
                <OuiCode>time</OuiCode> (required): Indicates the time the event
                was received. It is recommended to display a relative time
                format like &apos;2 hours ago&apos;.
              </li>
              <li>
                <OuiCode>onContextMenu</OuiCode>: Use this prop when you have
                multiple events and you need to add individual actions to each
                event. You can add filters based on the event type or a more
                descriptive read/unread actions as an alternative to the read
                indicator.
              </li>
              <li>
                <OuiCode>title</OuiCode> (required): The title of the
                notification event. It should be descriptive enough so that
                users don&apos;t need to navigate away. But use it in
                conjunction with an <OuiCode>onClickTitle</OuiCode> to direct
                users to the respective app in case they need more information
                about the notification.
              </li>
              <li>
                <OuiCode>messages</OuiCode>: Provides more details about the
                event. You can provide a single message or multiple messages if
                the event executes in various steps.
              </li>
              <li>
                <OuiCode>primaryAction</OuiCode>: Use this prop in conjunction
                with <OuiCode>onClickPrimaryAction</OuiCode> to provide a call
                to action, like download a report or link to a page where an
                action is required. Most of the time, the clickable title is
                enough.
              </li>
            </ul>
          </OuiText>
          <OuiSpacer />
          <OuiText>
            <p>
              The following demo shows how you can combine different props to
              create different types of events like a report, alert, or simply
              news.
            </p>
          </OuiText>
        </>
      ),
      props: {
        OuiNotificationEvent,
        OuiNotificationEventMeta,
        OuiContextMenuItem,
        OuiPrimaryActionProps,
      },
      snippet: notificationEventSnippet,
      demo: <NotificationEventFlexible />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: notificationsFeedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: notificationsFeedHtml,
        },
      ],
      title: 'Notifications feed',
      text: (
        <p>
          You can create a notifications feed by rendering multiple{' '}
          <strong>OuiNotificationEvent</strong>. These components should live
          inside a container without other components on the same level. This
          way, we ensure that feed styles are applied correctly. Consuming
          applications should implement all the logic to filter and save
          read/unread states.
        </p>
      ),
      props: {
        OuiNotificationEvent,
        OuiNotificationEventMeta,
        OuiContextMenuItem,
        OuiPrimaryActionProps,
      },
      snippet: notificationEventFeedSnippet,
      demo: <NotificationsFeed />,
    },
  ],
};
