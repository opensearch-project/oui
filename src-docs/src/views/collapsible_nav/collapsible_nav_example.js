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

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiCollapsibleNav,
  OuiText,
  OuiCallOut,
  OuiCollapsibleNavGroup,
  OuiHorizontalRule,
} from '../../../../src/components';

import { collapsibleNavConfig } from './playground';

import CollapsibleNav from './collapsible_nav';
const collapsibleNavSource = require('./collapsible_nav?raw');

import CollapsibleNavGroup from './collapsible_nav_group';
const collapsibleNavGroupSource = require('./collapsible_nav_group?raw');

import CollapsibleNavList from './collapsible_nav_list';
const collapsibleNavListSource = require('./collapsible_nav_list?raw');

import CollapsibleNavAll from './collapsible_nav_all';
const collapsibleNavAllSource = require('./collapsible_nav_all?raw');

export const CollapsibleNavExample = {
  title: 'Collapsible nav',
  intro: (
    <OuiText>
      <p>
        This is a high level component that creates a flyout-style navigational
        pane.
      </p>
    </OuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: collapsibleNavSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiCollapsibleNav</strong> is a custom implementation of{' '}
            <Link to="/layout/flyout">
              <strong>OuiFlyout</strong>
            </Link>
            ; the visibility of which must still be maintained by the consuming
            application. An extra feature that it provides is the ability to{' '}
            <OuiCode>dock</OuiCode> the flyout. This affixes the flyout to the
            window and pushes the body content by adding left side padding.
          </p>
          <OuiCallOut
            iconType="tableOfContents"
            title="Docking is not possible on small screens because it would force less real estate for the page content."
          />
        </>
      ),
      props: { OuiCollapsibleNav },
      demo: <CollapsibleNav />,
      snippet: `<OuiCollapsibleNav
  size={240}
  button={<OuiButton onClick={() => setNavIsOpen(!navIsOpen)}>Toggle nav</OuiButton>}
  isOpen={navIsOpen}
  isDocked={navIsDocked}
  onClose={() => setNavIsOpen(false)}
/>`,
      playground: collapsibleNavConfig,
    },
    {
      title: 'Collapsible nav group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: collapsibleNavGroupSource,
        },
      ],
      text: (
        <>
          <p>
            An <strong>OuiCollapsibleNavGroup</strong> adds some basic borders
            and <OuiCode>background</OuiCode> color of <OuiCode>none</OuiCode>,{' '}
            <OuiCode>light</OuiCode>, or <OuiCode>dark</OuiCode>. Give each
            section a heading by providing an optional <OuiCode>title</OuiCode>{' '}
            and <OuiCode>iconType</OuiCode>. Make the section collapsible (
            <Link to="/layout/accordion">accordion style</Link>) with{' '}
            <OuiCode language="js">isCollapsible=true</OuiCode>.
          </p>
          <p>
            When in <OuiCode>isCollapsible</OuiCode> mode, a{' '}
            <OuiCode>title</OuiCode> and{' '}
            <OuiCode language="ts">initialIsOpen:boolean</OuiCode> is required.
          </p>
        </>
      ),
      props: {
        OuiCollapsibleNavGroup,
      },
      demo: <CollapsibleNavGroup />,
      demoPanelProps: {
        paddingSize: 'none',
      },
      snippet: `<OuiCollapsibleNavGroup
  title="Nav group"
  iconType="logo"
  isCollapsible={true}
  initialIsOpen={true}
  background="none"
/>`,
    },
    {
      title: 'Nav groups with lists and other content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: collapsibleNavListSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiCollapsibleNavGroups</strong> can contain any children.
            They work well with{' '}
            <Link to="/display/list-group">
              <strong>OuiListGroup, OuiPinnableListGroup</strong>
            </Link>{' '}
            and simple{' '}
            <Link to="/navigation/link">
              <strong>OuiText</strong>
            </Link>
            .
          </p>
          <p>Below are a few established patterns to use.</p>
        </>
      ),
      demo: (
        <div>
          <CollapsibleNavList />
          <OuiHorizontalRule margin="none" />
        </div>
      ),
      demoPanelProps: {
        paddingSize: 'none',
      },
      snippet: `<OuiCollapsibleNavGroup
  title="OpenSearch Dashboards"
  iconType="logoOpenSearch"
  isCollapsible={true}
  initialIsOpen={true}>
  <OuiPinnableListGroup
    aria-label="OpenSearch Dashboards"
    listItems={[
      { label: 'Discover' },
      { label: 'Visualize' }
    ]}
    onPinClick={() => {}}
    maxWidth="none"
    color="subdued"
    gutterSize="none"
    size="s"
  />
</OuiCollapsibleNavGroup>`,
    },
    {
      title: 'Full pattern with header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: collapsibleNavAllSource,
        },
      ],
      text: (
        <>
          <h3>Putting it all together</h3>
          <p>
            The button below will launch a full screen example that includes{' '}
            <Link to="/layout/header">
              <strong>OuiHeader</strong>
            </Link>{' '}
            with a toggle button to open an <strong>OuiCollapsibleNav</strong>.
            The contents of which are multiple{' '}
            <strong>OuiCollapsibleNavGroups</strong>
          </p>
          <p>
            This is just a pattern and should be treated as such. Consuming
            applications will need to create the navigation groups according to
            their context and save the states as is appropriate to their data
            store.
          </p>
        </>
      ),
      fullScreen: {
        slug: 'collapsible-nav-all',
        demo: <CollapsibleNavAll />,
      },
    },
  ],
};
