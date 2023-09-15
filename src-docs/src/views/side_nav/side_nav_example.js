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

import { GuideSectionTypes } from '../../components';

import { OuiCode, OuiSideNav, OuiCallOut } from '../../../../src/components';
import { OuiSideNavItem, OuiSideNavHeading } from './props';

import SideNav from './side_nav';
const sideNavSource = require('./side_nav?raw');
const sideNavSnippet = `<OuiSideNav
  mobileTitle="Nav Items"
  toggleOpenOnMobile={toggleOpenOnMobile}
  isOpenOnMobile={isSideNavOpenOnMobile}
  items={[
    {
      name: 'Root',
      id: rootId,
      items: [
        {
          name: 'Button item',
          id: item1Id,
          onClick: () => selectItem(),
        },
        {
          name: 'Anchor item',
          id: item2Id,
          href: '#',
        },
      ]
    }
  ]}
/>`;

import SideNavHeading from './side_nav_heading';
const sideNavHeadingSource = require('./side_nav_heading?raw');
const sideNavHeadingSnippet = `<OuiSideNav
  heading="Nav items"
  toggleOpenOnMobile={toggleOpenOnMobile}
  isOpenOnMobile={isSideNavOpenOnMobile}
  items={[]}
/>
`;

import SideNavComplex from './side_nav_complex';
const sideNavComplexSource = require('./side_nav_complex?raw');
const sideNavComplexSnippet = `<OuiSideNav
  mobileTitle="Nav Items"
  toggleOpenOnMobile={toggleOpenOnMobile}
  isOpenOnMobile={isSideNavOpenOnMobile}
  items={[
    {
      name: 'Elasticsearch',
      icon: <OuiIcon type="logoElasticsearch" />,
      id: '0',
      items: [
        {
          name: 'Data source',
          id: '0.1',
          onClick: () => selectItem('Data source'),
        },
        {
          name: 'Users',
          id: '0.2',
          href: '#',
        },
      ],
    },
    {
      name: 'OpenSearch Dashboards',
      icon: <OuiIcon type="logoOpenSearch" />,
      id: '1',
      items: [
        {
          name: 'Advanced settings',
          id: '1.1',
          onClick: () => selectItem('Advanced settings'),
          items: [
            {
              name: 'General',
              id: '1.1.1',
              onClick: () => selectItem('General'),
            },
            {
              name: 'Timelion',
              id: '1.1.2',
              onClick: () => selectItem('Timelion'),
              items: [
                {
                  name: 'Time Stuff',
                  id: '1.1.2.1',
                  onClick: () => selectItem('Time Stuff'),
                },
                {
                  name: 'Lion Stuff',
                  id: '1.1.2.2',
                  onClick: () => selectItem('Lion Stuff'),
                  isSelected: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ]}
/>
`;

import SideNavForceOpen from './side_nav_force_open';
const sideNavForceOpenSource = require('./side_nav_force_open?raw');
const sideNavForceSnippet = `<OuiSideNav
  mobileTitle="Nav Items"
  toggleOpenOnMobile={toggleOpenOnMobile}
  isOpenOnMobile={isSideNavOpenOnMobile}
  items={[
    {
      name: 'OpenSearch Dashboards',
      id: '1',
      items: [
        {
          name: 'OpenSearch Dashboards',
          id: '1',
          items: [
            {
              name: 'Forced open items',
              id: '0.1',
              onClick: () => selectItem('Forced open items'),
              forceOpen: true,
              items: [
                {
                  name: 'General',
                  id: '0.1.1',
                  onClick: () => selectItem('General'),
                },
                {
                  name: 'Timelion',
                  id: '0.1.2',
                  onClick: () => selectItem('Timelion'),
                },
              ],
            },
            {
              name: 'Closed items',
              id: '1.1',
              onClick: () => selectItem('Closed items'),
              forceOpen: false,
              items: [
                {
                  name: 'General',
                  id: '1.1.1',
                  onClick: () => this.selectItem('General'),
                },
                {
                  name: 'Timelion',
                  id: '1.1.2',
                  onClick: () => selectItem('Timelion'),
                },
              ],
            },
            {
              name: 'Children only',
              id: '1.1',
              items: [
                {
                  name: 'General',
                  id: '1.1.1',
                  onClick: () => this.selectItem('General'),
                },
                {
                  name: 'Timelion',
                  id: '1.1.2',
                  onClick: () => selectItem('Timelion'),
                },
              ],
            },
          ],
        },
      ],
    },
  ]}
/>
`;

import SideNavEmphasis from './side_nav_emphasis';
const sideNavEmphasisSource = require('./side_nav_emphasis?raw');
const sideNavEmphasisSnippet = `<OuiSideNav
  mobileTitle="Nav Items"
  toggleOpenOnMobile={toggleOpenOnMobile}
  isOpenOnMobile={isSideNavOpenOnMobile}
  items={[
    {
      name: 'APM',
      id: '1',
      items: [
        {
          name: 'Services',
          id: '2',
          items: [
            {
              name: 'opbeans-java',
              emphasize: true,
              isOpen: true,
              items: [
                {
                  name: 'Transactions',
                  id: '0.1.1',
                  onClick: () => selectItem('General'),
                },
                {
                  name: 'Errors',
                  id: '0.1.2',
                  onClick: () => selectItem('Timelion'),
                },
              ],
            },
          ],
        },
      ],
    },
  ]}
/>
`;

export const SideNavExample = {
  title: 'Side nav',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiSideNav</strong> is a responsive menu system that usually
            sits on the left side of a page layout. It will expand to the width
            of its container. This is the same menu system used for the OUI
            documentation.
          </p>

          <p>
            Configure the content of a <strong>OuiSideNav</strong> by passing in
            an <OuiCode>items</OuiCode> prop. Refer to the source code for an
            example of this data structure&rsquo;s anatomy.
          </p>

          <OuiCallOut
            iconType="mobile"
            title="The responsive behavior converts the list into an accordion style component with a mobile only button.">
            <p>
              You will need to pass a string to the prop{' '}
              <OuiCode>mobileTitle</OuiCode> to label the mobile button.
            </p>
          </OuiCallOut>
        </>
      ),
      props: {
        OuiSideNav,
        OuiSideNavHeading,
        OuiSideNavItem,
      },
      snippet: sideNavSnippet,
      demo: <SideNav />,
    },
    {
      title: 'Side nav heading',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavHeadingSource,
        },
      ],
      text: (
        <>
          <p>
            Since <strong>OuiSideNav</strong> renders a{' '}
            <OuiCode>{'<nav>'}</OuiCode> section element, it is recommended that
            the element contain a heading. Pass a string or node to the{' '}
            <OuiCode>heading</OuiCode> prop to display within an{' '}
            <OuiCode>{'<h2>'}</OuiCode>. Though you can also adjust this heading
            element with <OuiCode>headingProps.element</OuiCode>.
          </p>

          <p>
            If the heading is visually unnecessary for your application, pass{' '}
            <OuiCode>headingProps.screenReaderOnly</OuiCode> to ensure proper
            accessibility for those using assitive technology.
          </p>

          <OuiCallOut
            iconType="mobile"
            title="When providing a heading, this will then be the default display for the mobile button title."
          />
        </>
      ),
      props: {
        OuiSideNav,
        OuiSideNavHeading,
      },
      snippet: sideNavHeadingSnippet,
      demo: <SideNavHeading />,
    },
    {
      title: 'Complex side nav',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavComplexSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiSideNav</strong> also supports multiple top level
            sections and deeply-nested tree-based data.
          </p>
          <p>
            We recommend being consistent with the use of the root level item
            and whether it is used solely for labelling a section. Intermixing
            linked and non-linked root items will confuse the user. Stay
            consistent throughout your entire application and platform.
          </p>
        </>
      ),
      snippet: sideNavComplexSnippet,
      demo: <SideNavComplex />,
      props: {
        OuiSideNav,
        OuiSideNavItem,
      },
    },
    {
      title: 'Nested item options',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavForceOpenSource,
        },
      ],
      text: (
        <>
          <p>
            Typically, the children of nested items progressively shows as users
            traverse the pages themselves. However, you can bypass this
            functionality and force open items by setting{' '}
            <OuiCode>items[n].forceOpen = true</OuiCode>.
          </p>
          <p>
            Arrow indicators will show only if the item has children but{' '}
            <strong>does not</strong> have an interaction itself. The component
            will then handle the toggling of the displayed children as well.
          </p>
        </>
      ),
      snippet: sideNavForceSnippet,
      props: {
        OuiSideNav,
        OuiSideNavItem,
      },
      demo: <SideNavForceOpen />,
    },
    {
      title: 'Emphasized side nav sections',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavEmphasisSource,
        },
      ],
      text: (
        <>
          <p>
            Adding the <OuiCode>emphasize = true</OuiCode> prop to a{' '}
            <strong>OuiSideNav</strong> item will enhance the visual appearance
            of that section and its nested items. This is helpful for when you
            need to indicate a dynamic navigational item like a user-created
            object.
          </p>
          <OuiCallOut iconType="editorCodeBlock" title="Extra style needed">
            <p>
              The emphasized nav item&apos;s background color extends beyond the
              horizontal bounds of the component to allow it to reach it&apos;s
              parents bounds. Be sure to add{' '}
              <OuiCode language="sass">{'overflow: hidden'}</OuiCode> to
              whichever container you&apos;d like it to stop at.
            </p>
          </OuiCallOut>
        </>
      ),
      snippet: sideNavEmphasisSnippet,
      demo: <SideNavEmphasis />,
      props: {
        OuiSideNav,
        OuiSideNavItem,
      },
    },
  ],
};
