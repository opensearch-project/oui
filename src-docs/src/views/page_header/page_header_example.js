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
  OuiPageHeader,
  OuiPageHeaderSection,
} from '../../../../src/components';

import { pageHeaderConfig } from './playground';

import PageHeader from './page_header';
const pageHeaderSource = require('./page_header?raw');

import PageHeaderTabs from './page_header_tabs';
const pageHeaderTabsSource = require('./page_header_tabs?raw');

import PageHeaderCustom from './page_header_custom';
import { OuiText } from '../../../../src/components/text';
const pageHeaderCustomSource = require('./page_header_custom?raw');

export const PageHeaderExample = {
  title: 'Page header',
  intro: (
    <OuiText>
      <p>
        While the <strong>OuiPageHeader</strong> component can be placed
        anywhere within your page layout, we recommend using it within the{' '}
        <Link to="/layout/page">
          <strong>OuiPageTemplate</strong>
        </Link>{' '}
        component by passing the configuration props as its{' '}
        <OuiCode>pageHeader</OuiCode>.
      </p>
    </OuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageHeaderSource,
        },
      ],
      playground: pageHeaderConfig,
      text: (
        <>
          <p>
            <strong>OuiPageHeader</strong> provides props for opinionated,
            consistent formatting of your header. Any combination of{' '}
            <OuiCode>pageTitle</OuiCode>, <OuiCode>description</OuiCode>,{' '}
            <OuiCode>tabs</OuiCode>, or any <OuiCode>children</OuiCode> will
            adjust the layout as needed.
          </p>
          <p>
            An additional prop <OuiCode>rightSideItems</OuiCode> allows for a
            simple <strong>array of nodes</strong> which will layout in a
            flexbox row. This is commonly used for adding multiple buttons, of
            which, at least one should be primary (or{' '}
            <OuiCode language="ts">{'fill="true"'}</OuiCode>). These items are
            also displayed in <strong>reverse order</strong> so that the first
            and primary array item will be displayed on the far right.
          </p>
          <p>
            You can further adjust the display of these content types by
            utilizing <OuiCode>alignItems</OuiCode> for adjusting the vertical
            alignment of the two sides, and <OuiCode>responsiveOrder</OuiCode>{' '}
            to determine which content side to display first on smaller screens.
          </p>
        </>
      ),
      demo: <PageHeader />,
      props: { OuiPageHeader },
      snippet: `<OuiPageHeader
  pageTitle="Page title"
  tabs={[
    { label:"Tab 1", isSelected: true },
    { label:"Tab 2" }
  ]}
  description="Example of a description."
  rightSideItems={[
    <OuiButton fill>Button 1</OuiButton>,
    <OuiButton>Button 2</OuiButton>
  ]}
/>`,
    },
    {
      title: 'Tabs in the page header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageHeaderTabsSource,
        },
      ],
      text: (
        <>
          <p>
            When supplying <OuiCode>tabs</OuiCode> without a{' '}
            <OuiCode>pageTitle</OuiCode>, <strong>OuiPageHeader</strong> will
            promote those tabs as if they are the page title. This means that
            any <OuiCode>description</OuiCode> or <OuiCode>children</OuiCode>{' '}
            will sit <strong>below</strong> the tabs.
          </p>
        </>
      ),
      demo: <PageHeaderTabs />,
      props: { OuiPageHeader },
      snippet: `<OuiPageHeader
  tabs={[
    { label:"Tab 1", isSelected: true },
    { label:"Tab 2" }
  ]}
  description="Example of a description."
/>`,
    },
    {
      title: 'Customizing the page header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageHeaderCustomSource,
        },
      ],
      text: (
        <>
          <p>
            The page header content props are helpful props to push content into
            established Elastic page layout patterns. They are completely
            optional and by design, inflexible. If you need a layout that does
            not match these patterns you can pass in your own{' '}
            <OuiCode>children</OuiCode> utilizing the{' '}
            <strong>OuiPageHeaderSection</strong> components.
          </p>
        </>
      ),
      demo: <PageHeaderCustom />,
      props: { OuiPageHeader, OuiPageHeaderSection },
    },
  ],
};
