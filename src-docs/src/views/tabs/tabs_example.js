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
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiTabs,
  OuiTab,
  OuiTabbedContent,
} from '../../../../src/components';
import { tabConfig, tabsConfig } from './playground';

import Tabs from './tabs';
const tabsSource = require('./tabs?raw');
const tabsHtml = renderToHtml(Tabs);

import TabsCondensed from './tabs_condensed';
const tabsCondensedSource = require('./tabs_condensed?raw');
const tabsCondensedHtml = renderToHtml(TabsCondensed);

import TabbedContent from './tabbed_content';
const tabbedContentSource = require('./tabbed_content?raw');
const tabbedContentHtml = renderToHtml(TabbedContent);

import Controlled from './controlled';
const controlledSource = require('./controlled?raw');
const controlledHtml = renderToHtml(Controlled);
const controlledSnippet = `<OuiTabbedContent
  tabs={tabs}
  selectedTab={selectedTab}
  onTabClick={onTabClick}
/>
`;

export const TabsExample = {
  title: 'Tabs',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: tabsHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiTabs</strong> allow a <OuiCode>size</OuiCode> prop. In
          general you should always use the default (medium) size. The small
          size is best for when placing inside popovers or other small
          containers. Reserve using the large size for when using as primary
          page navigation, like inside of{' '}
          <Link to="/layout/page">
            <strong>OuiPageHeader</strong>
          </Link>
          .
        </p>
      ),
      props: {
        OuiTabs,
        OuiTab,
      },
      demo: <Tabs />,
      snippet: [
        `<OuiTabs>
  <OuiTab onClick={onClick}>Example 1</OuiTab>
  <OuiTab onClick={onClick}>Example 2</OuiTab>
</OuiTabs>`,
        `<OuiTabs size="s>
  <OuiTab onClick={onClick}>Example 1</OuiTab>
  <OuiTab onClick={onClick}>Example 2</OuiTab>
</OuiTabs>`,
      ],
    },
    {
      title: 'Condensed tabs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabsCondensedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: tabsCondensedHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiTabs</strong> allow a <OuiCode>display</OuiCode> prop. In
          general you should always use the default display. However, it is
          acceptable to use the alternative <OuiCode>condensed</OuiCode> display
          in situations where it is desirable to display a bolder, more compact
          and borderless tab interface (for use as primary navigation within
          your application or to establish a higher level hierarchy of tabs).
        </p>
      ),
      props: {
        OuiTabs,
      },
      demo: <TabsCondensed />,
      snippet: `<OuiTabs display="condensed">
  <OuiTab onClick={onClick}>Example 1</OuiTab>
  <OuiTab onClick={onClick}>Example 2</OuiTab>
</OuiTabs>`,
    },
    {
      title: 'Tabbed content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabbedContentSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: tabbedContentHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiTabbedContent</strong> makes it easier to associate tabs
          with content based on the selected tab. Use the{' '}
          <OuiCode>initialSelectedTab</OuiCode> prop to specify which tab to
          initially select.
        </p>
      ),
      props: {
        OuiTabbedContent,
      },
      demo: <TabbedContent />,
      snippet: `<OuiTabbedContent
  tabs={[
    {
      id: 'example1',
      name: 'Example 1',
      content: 'Example 1 content.',
    },
    {
      id: 'example2',
      name: 'Example 2',
      content: 'Example 2 content.',
    },
  ]}
/>`,
    },
    {
      title: 'Controlled tabbed content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: controlledSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: controlledHtml,
        },
      ],
      text: (
        <p>
          You can also use the <OuiCode>selectedTab</OuiCode> and{' '}
          <OuiCode>onTabClick</OuiCode> props to take complete control over tab
          selection. This can be useful if you want to change tabs based on user
          interaction with another part of the UI.
        </p>
      ),
      props: {
        OuiTabbedContent,
      },
      snippet: controlledSnippet,
      demo: <Controlled />,
    },
  ],
  playground: [tabConfig, tabsConfig],
};
