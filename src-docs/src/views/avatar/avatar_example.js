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

import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { OuiAvatar, OuiCode } from '../../../../src/components';
import avatarConfig from './playground';

import Avatar from './avatar';
const avatarSource = require('./avatar?raw');
const avatarHtml = renderToHtml(Avatar);
const avatarSnippet = [
  `<OuiAvatar name="Raphael" />
`,
  `<OuiAvatar size="s" name="Cat" imageUrl="https://source.unsplash.com/64x64/?cat" />
`,
  '<OuiAvatar name="Leonardo" color="#BD10E0" />',
];

import AvatarInitials from './avatar_initials';
const avatarInitialsSource = require('./avatar_initials?raw');
const avatarInitialsHtml = renderToHtml(AvatarInitials);
const avatarInitialsSnippet = [
  `<OuiAvatar name="OpenSearch Dashboards" initialsLength={2}/>
`,
  `<OuiAvatar name="Undefined" initials="?" />
`,
  `<OuiAvatar name="Engineering User" initials="En" initialsLength={2} />
`,
];

import AvatarTypes from './avatar_type';
const avatarTypesSource = require('./avatar_type?raw');
const avatarTypesHtml = renderToHtml(AvatarTypes);
const avatarTypesSnippet = [
  `<OuiAvatar type="space" name="Engineering Space" />
`,
];

import AvatarIcons from './avatar_icon';
const avatarIconsSource = require('./avatar_icon?raw');
const avatarIconsHtml = renderToHtml(AvatarIcons);
const avatarIconsSnippet = [
  `<OuiAvatar name="Management" iconType="managementApp" />
`,
  `<OuiAvatar name="Management" iconType="managementApp" color="#FAFBFD" iconColor={null} />
`,
  `<OuiAvatar name="Management" iconType="managementApp" iconSize="l" />
`,
];

import AvatarDisabled from './avatar_disabled';
const avatarDisabledSource = require('./avatar_disabled?raw');
const avatarDisabledHtml = renderToHtml(AvatarDisabled);
const avatarDisabledSnippet = [
  `<OuiAvatar isDisabled={true} name="Avatar" />
`,
];

export const AvatarExample = {
  title: 'Avatar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: avatarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: avatarHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <strong>OuiAvatar</strong> component typically creates a user
            icon. It will accept <OuiCode>name</OuiCode> (required) and{' '}
            <OuiCode>image</OuiCode> props and will configure the display and
            accessibility as needed. By default, the background colors come from
            the set of colors used for visualizations. Otherwise you can pass a
            hex value to the <OuiCode>color</OuiCode> prop.
          </p>
        </div>
      ),
      props: { OuiAvatar },
      snippet: avatarSnippet,
      demo: <Avatar />,
    },
    {
      title: 'Initials',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: avatarInitialsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: avatarInitialsHtml,
        },
      ],
      text: (
        <div>
          <p>
            The initials displayed in the avatar try to be smart based on the
            name prop. If the name contains spaces, it will display the first
            character of each word,{' '}
            <strong>always maxing out at 2 characters</strong>. You can
            customize this by passing a combination of{' '}
            <OuiCode>initialsLength</OuiCode> and/or <OuiCode>initials</OuiCode>{' '}
            props. However, the avatar will still always max out at 2
            characters.
          </p>
        </div>
      ),
      snippet: avatarInitialsSnippet,
      demo: <AvatarInitials />,
      props: { OuiAvatar },
    },
    {
      title: 'Types',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: avatarTypesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: avatarTypesHtml,
        },
      ],
      text: (
        <div>
          <p>
            The avatar <OuiCode>type</OuiCode>, which primarily defines the
            shape, is keyworded and can be{' '}
            <OuiCode language="js">&quot;user&quot;</OuiCode> (default) or{' '}
            <OuiCode language="js">&quot;space&quot;</OuiCode> (for workspaces).
          </p>
        </div>
      ),
      snippet: avatarTypesSnippet,
      demo: <AvatarTypes />,
      props: { OuiAvatar },
    },
    {
      title: 'Icons',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: avatarIconsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: avatarIconsHtml,
        },
      ],
      text: (
        <div>
          <p>
            Icons can also be displayed instead of initials or images. When
            simply passing an <OuiCode>iconType</OuiCode>, it will both size and
            color appropriately based on the other <strong>OuiAvatar</strong>{' '}
            props. To customize these specifically, pass{' '}
            <OuiCode>iconSize</OuiCode> and <OuiCode>iconColor</OuiCode>.
          </p>
          <p>
            If your icon has multiples or custom colors like a logo, you can
            keep the default <OuiCode>iconColor</OuiCode> by passing{' '}
            <OuiCode>null</OuiCode>. Otherwise it will get the appropriate
            contrast acceptable variant. Just ensure that you also are providing
            an accesible background color to match that of the icon&apos;s
            color.
          </p>
        </div>
      ),
      snippet: avatarIconsSnippet,
      demo: <AvatarIcons />,
      props: { OuiAvatar },
    },
    {
      title: 'Disabled',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: avatarDisabledSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: avatarDisabledHtml,
        },
      ],
      text: (
        <div>
          <p>
            While <strong>OuiAvatar</strong> doesn&apos;t accept any interactive
            behaviors itself, you can create a visually presented disabled
            avatar by adding <OuiCode>isDisabled</OuiCode> when placed within a
            disabled element.
          </p>
        </div>
      ),
      snippet: avatarDisabledSnippet,
      demo: <AvatarDisabled />,
      props: { OuiAvatar },
    },
  ],
  playground: avatarConfig,
};
