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

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiBadge,
  OuiCode,
  OuiBetaBadge,
  OuiNotificationBadge,
  OuiBadgeGroup,
  OuiCallOut,
} from '../../../../src/components';
import {
  badgeConfig,
  betaBadgeConfig,
  notificationBadgeConfig,
} from './playground';

import Badge from './badge';

const badgeSource = require('./badge?raw');
const badgeHtml = renderToHtml(Badge);
const badgeSnippet = [
  `<OuiBadge>Default</OuiBadge>
`,
  `<OuiBadge color="hollow">Hollow</OuiBadge>
`,
  `<OuiBadge color="primary">Primary</OuiBadge>
`,
  `<OuiBadge color="#BADA55">Custom</OuiBadge>
`,
  `<OuiBadge color="success" isDisabled>Disabled</OuiBadge>
`,
];

import BadgeWithIcon from './badge_with_icon';
const badgeWithIconSource = require('./badge_with_icon?raw');
const badgeWithIconHtml = renderToHtml(BadgeWithIcon);
const badgeWithIconSnippet = `<OuiBadge color="hollow" iconType="cross" iconSide="right">Label</OuiBadge>
`;

import BadgeButton from './badge_button';
const badgeButtonSource = require('./badge_button?raw');
const badgeButtonHtml = renderToHtml(BadgeButton);
const badgeButtonSnippet = [
  `<OuiBadge
  color="primary"
  onClick={onBadgeClick}
  onClickAriaLabel="Aria label applied to text button"
>
  Clickable text
</OuiBadge>`,
  `<OuiBadge
  iconType="cross"
  iconSide="right"
  color="hollow"
  iconOnClick={onBadgeIconClick}
  iconOnClickAriaLabel="Aria label applied to icon button"
>
  Text with clickable icon
</OuiBadge>`,
  `<OuiBadge
  iconType="cross"
  iconSide="right"
  color="success"
  onClick={onBadgeClick}
  onClickAriaLabel="Aria label applied to text button"
  iconOnClick={onBadgeIconClick}
  iconOnClickAriaLabel="Aria label applied to icon button"
>
  Clickable text with clickable icon
</OuiBadge>`,
];

import BadgeHealth from './badge_health';
const badgeHealthSource = require('./badge_health?raw');
const badgeHealthHtml = renderToHtml(BadgeHealth);
const badgeHealthSnippet = [
  `<OuiBadge color="success">Healthy</OuiBadge>
`,
  `<OuiBadge color="warning">Warning</OuiBadge>
`,
  `<OuiBadge color="danger">Critical</OuiBadge>
`,
];

import BadgeHref from './badge_href';
const badgeHrefSource = require('./badge_href?raw');
const badgeHrefHtml = renderToHtml(BadgeHref);
const badgeHrefSnippet = [
  '<OuiBadge href="https://oui.opensearch.org/latest/" />',
];

import BadgeTruncate from './badge_truncate';
const badgeTruncateSource = require('./badge_truncate?raw');
const badgeTruncateHtml = renderToHtml(BadgeTruncate);
const badgeTruncateSnippet = [
  `<OuiBadgeGroup gutterSize="s">
  <OuiBadge />
  <OuiBadge />
</OuiBadgeGroup>`,
];

import BetaBadge from './beta_badge';
const betaBadgeSource = require('./beta_badge?raw');
const betaBadgeHtml = renderToHtml(BetaBadge);
const betaBadgeSnippet = [
  `<OuiBetaBadge label="Beta" />
`,
  `<OuiBetaBadge label="Lab" tooltipContent="Describe why this is considered beta." />
`,
  `<OuiBetaBadge label="Lab" iconType="beaker" />
`,
];

import NotificationBadge from './notification_badge';
const notificationBadgeSource = require('./notification_badge?raw');
const notificationBadgeHtml = renderToHtml(NotificationBadge);
const notificationBadgeSnippet = `<OuiNotificationBadge>3</OuiNotificationBadge>
`;

export const BadgeExample = {
  title: 'Badge',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiBadges</strong> are used to focus on important bits of
          information. Although they will automatically space themselves if you
          use them in a repetitive fashion it is good form to wrap them using a{' '}
          <strong>OuiBadgeGroup</strong> so that they will wrap when width is
          constrained (as seen below).
        </p>
      ),
      props: { OuiBadge },
      snippet: badgeSnippet,
      demo: <Badge />,
    },
    {
      title: 'Badge with Icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeWithIconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeWithIconHtml,
        },
      ],
      text: <p>Badges can use icons on the left and right (default) sides.</p>,
      snippet: badgeWithIconSnippet,
      demo: <BadgeWithIcon />,
    },
    {
      title: 'Badge with onClick events',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeButtonSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeButtonHtml,
        },
      ],
      text: (
        <div>
          <p>
            Badges can have <OuiCode>onClick</OuiCode> events applied to the
            badge itself or the icon within the badge. The latter option is
            useful for when you might use badges in other components (like a tag
            system with autocomplete where you need close events).
          </p>
          <OuiCallOut title="onClick with iconOnClick">
            <p>
              When providing both these click handlers,{' '}
              <strong>OuiBadge</strong> must alter the contents so that it does
              not contain nested button tags. Please make note that if you
              provide props other than those explicit to{' '}
              <strong>OuiBadge</strong>, they will always be applied to the main{' '}
              <OuiCode>button</OuiCode> tag which may be inside of the outer
              most tag.
            </p>
          </OuiCallOut>
        </div>
      ),
      snippet: badgeButtonSnippet,
      demo: <BadgeButton />,
    },
    {
      title: 'Badge for health status',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeHealthSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeHealthHtml,
        },
      ],
      text: (
        <div>
          <p>
            Badges can work as health status indicators in places where there
            are a lot of repeated statuses, e.g. in tables.
          </p>
        </div>
      ),
      snippet: badgeHealthSnippet,
      demo: <BadgeHealth />,
    },
    {
      title: 'Badge with href',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeHrefSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeHrefHtml,
        },
      ],
      text: (
        <div>
          <p>
            Badges can also be made to render anchor tags by passing an{' '}
            <OuiCode>href</OuiCode>.
          </p>
        </div>
      ),
      snippet: badgeHrefSnippet,
      demo: <BadgeHref />,
    },
    {
      title: 'Badge groups and truncation',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeTruncateSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeTruncateHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Badges, like buttons, will only every be a single line of text. This
            means text will not wrap, but be truncated if the badge&apos;s width
            reaches that of its parent&apos;s.
          </p>
          <p>
            For this reason, badges also auto-apply the inner text of the badge
            to the <OuiCode>title</OuiCode> attribute of the element to provide
            default browser tooltips with the full badge text.
          </p>
          <p>
            To ensure proper wrapping, truncation and spacing of multiple
            badges, it is advisable to wrap them in a{' '}
            <strong>OuiBadgeGroup</strong>.
          </p>
        </Fragment>
      ),
      props: { OuiBadgeGroup },
      demo: <BadgeTruncate />,
      snippet: badgeTruncateSnippet,
    },
    {
      title: 'Beta badge type',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: betaBadgeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: betaBadgeHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <strong>OuiBetaBadge</strong> was created specifically to call
            out modules that are not in GA. Generally the labels used are
            &quot;Beta&quot; or &quot;Lab&quot;. They require an extra{' '}
            <OuiCode>tooltipContent</OuiCode> to describe the purpose of the
            badge. You can pass an optional <OuiCode>title</OuiCode> prop to
            populate the tooltip title or html title attribute but by default it
            will use the <OuiCode>label</OuiCode>.
          </p>
          <p>
            If you pass in an <OuiCode>iconType</OuiCode>, only the icon will be
            used in the badge itself and the label will be applied as the title.
            Only use an icon when attaching the beta badge to small components.
            Beta badges can also be made clickable by passing{' '}
            <OuiCode>href</OuiCode> or <OuiCode>onClick</OuiCode> as needed.
          </p>
          <p>
            They can also be used in conjunction with{' '}
            <Link to="/display/card">
              <strong>OuiCards</strong>
            </Link>{' '}
            and{' '}
            <Link to="/navigation/key-pad-menu">
              <strong>OuiKeyPadMenuItems</strong>
            </Link>
            .
          </p>
        </div>
      ),
      props: { OuiBetaBadge },
      snippet: betaBadgeSnippet,
      demo: <BetaBadge />,
    },
    {
      title: 'Notification badge type',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: notificationBadgeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: notificationBadgeHtml,
        },
      ],
      text: (
        <p>
          Used to showcase the number of notifications, alerts, or hidden
          selections. This badge type is commonly used in the{' '}
          <Link to="/layout/header">
            <strong>OuiHeader</strong>
          </Link>{' '}
          and{' '}
          <Link to="/forms/filter-group">
            <strong>OuiFilterButton</strong>
          </Link>{' '}
          components.
        </p>
      ),
      props: { OuiNotificationBadge },
      snippet: notificationBadgeSnippet,
      demo: <NotificationBadge />,
    },
  ],
  playground: [badgeConfig, betaBadgeConfig, notificationBadgeConfig],
};
