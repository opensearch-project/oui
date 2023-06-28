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
import lightColors from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_colors.scss';

import {
  OuiHeader,
  OuiHeaderAlert,
  OuiHeaderBreadcrumbs,
  OuiHeaderSection,
  OuiHeaderSectionItem,
  OuiHeaderSectionItemButton,
  OuiHeaderLogo,
  OuiCode,
} from '../../../../src/components';

import { OuiHeaderSectionsProp } from './props';

import Header from './header';
const headerSource = require('!!raw-loader!./header');

import HeaderSections from './header_sections';
const headerSectionsSource = require('!!raw-loader!./header_sections');

import HeaderAlert from './header_alert';
const headerAlertSource = require('!!raw-loader!./header_alert');

import HeaderDark from './header_dark';
const headerDarkSource = require('!!raw-loader!./header_dark');

import HeaderStacked from './header_stacked';
const headerStackedSource = require('!!raw-loader!./header_stacked');

import HeaderOpenSearchPattern from './header_opensearch_pattern';
const headerOpenSearchPatternSource = require('!!raw-loader!./header_opensearch_pattern');

const headerSnippet = `<OuiHeader>
  <OuiHeaderSection grow={false}>
    <OuiHeaderSectionItem border="right">
      <!-- HeaderSectionItem content -->
    </OuiHeaderSectionItem>
  </OuiHeaderSection>

  <!-- You can render breadcrumbs here using OuiHeaderBreadcrumbs -->

  <OuiHeaderSection side="right">
    <OuiHeaderSectionItem>
      <!-- HeaderSectionItem content -->
    </OuiHeaderSectionItem>
  </OuiHeaderSection>
</OuiHeader>
`;

const headerSectionsSnippet = `<OuiHeader
  sections={[
    {
      items: [...],
      borders: 'right',
      breadcrumbs: [...],
    },
    {
      items: [...],
      borders: 'none',
    },
    {
      items: [...],
    },
  ]}
/>`;

const headerAlertSnippet = `<OuiHeader>
  <OuiHeaderSection grow={false}>
    <OuiHeaderSectionItem>
      <!-- HeaderSectionItem content -->
    </OuiHeaderSectionItem>
  </OuiHeaderSection>

  <OuiHeaderSection side="right">
    <OuiHeaderSectionItem>
      <!-- Button to trigger portal content like a OuiPopover or a OuiFlyout -->
      <OuiHeaderSectionItemButton
        aria-controls={portalContentId}
        aria-expanded={isPortalContentVisible}
        aria-label="Open portal content"
        onClick={showPortalContent}
        notification={showNotification}
      >
        <OuiIcon type="bell" />
      </OuiHeaderSectionItemButton>
    </OuiHeaderSectionItem>
  </OuiHeaderSection>
</OuiHeader>`;

export const HeaderExample = {
  title: 'Header',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerSource,
        },
      ],
      text: (
        <>
          <p>
            The header is made up of <strong>many</strong> individual components
            starting with <strong>OuiHeader</strong> as the container. You can
            manually configure your header with the following related
            components:
          </p>
          <ul>
            <li>
              <strong>OuiHeaderSection</strong>: Left/right containers with flex
              properties.
            </li>
            <li>
              <strong>OuiHeaderSectionItem</strong>: Containers for individual
              header items as flex items.
            </li>
            <li>
              <strong>OuiHeaderSectionItemButton</strong>: Specialized button
              that extends{' '}
              <Link to="/navigation/button#empty-button">
                <strong>OuiButtonEmpty</strong>
              </Link>{' '}
              but styled to fit the height of the header with additional{' '}
              <OuiCode>notification</OuiCode> props.
            </li>
            <li>
              <strong>OuiHeaderLogo</strong>: A helpful component for creating a
              linked logo that fits within the header sizing.
            </li>
            <li>
              <strong>OuiHeaderBreadcrumbs</strong>: A set of{' '}
              <Link to="/navigation/breadcrumbs">
                <strong>OuiBreadcrumbs</strong>
              </Link>{' '}
              specifically stylized to fit inside the header.
            </li>
          </ul>
        </>
      ),
      props: {
        OuiHeader,
        OuiHeaderSection,
        OuiHeaderSectionItem,
        OuiHeaderSectionItemButton,
        OuiHeaderLogo,
        OuiHeaderBreadcrumbs,
        OuiHeaderSectionsProp,
      },
      snippet: headerSnippet,
      demo: <Header />,
      demoPanelProps: {
        color: 'subdued',
      },
    },
    {
      title: 'Sections',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerSectionsSource,
        },
      ],
      text: (
        <>
          <p>
            Alternatively, you can pass an array of objects to the{' '}
            <OuiCode>sections</OuiCode> prop that takes a key of{' '}
            <OuiCode>items</OuiCode> (array of children to wrap in an{' '}
            <strong>OuiHeaderSectionItem</strong>) and/or{' '}
            <OuiCode>breadcrumbs</OuiCode> (array of{' '}
            <Link to="/navigation/breadcrumbs">breadcrumb</Link> objects). Each
            item in the array will be wrapped in an{' '}
            <strong>OuiHeaderSection</strong>.
          </p>
          <p>
            <strong>Note:</strong> Passing <OuiCode>sections</OuiCode> and{' '}
            <OuiCode>children</OuiCode> will disregard the{' '}
            <OuiCode>children</OuiCode> as it is not easily interpreted at what
            location the children should be placed.
          </p>
        </>
      ),
      props: {
        OuiHeader,
        OuiHeaderSectionsProp,
        OuiHeaderSection,
        OuiHeaderSectionItem,
      },
      snippet: headerSectionsSnippet,
      demo: <HeaderSections />,
      demoPanelProps: {
        color: 'subdued',
      },
    },
    {
      title: 'Dark theme',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerDarkSource,
        },
      ],
      text: (
        <p>
          To make site-wide navigation more prominent,{' '}
          <strong>OuiHeader</strong> supports reversing the colors to dark theme
          with <OuiCode language="js">{'theme="dark"'}</OuiCode>. However, it
          only supports a <strong>limited set of children</strong> that will
          also shift their theme. These components include{' '}
          <strong>OuiHeaderLogo, OuiHeaderLink(s),</strong>{' '}
          <strong>OuiHeaderSectionItemButton</strong> and{' '}
          <strong>OuiSelectableTemplateSitewide</strong>. Any other content may
          not render correctly without custom configurations.
        </p>
      ),
      snippet: '<OuiHeader theme="dark" />',
      demo: <HeaderDark theme={lightColors} />,
      demoPanelProps: {
        color: 'subdued',
      },
    },
    {
      title: 'Portal content in the header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerAlertSource,
        },
      ],
      text: (
        <>
          <p>
            Use an <strong>OuiHeaderSectionItemButton</strong> to display
            additional information in <Link to="/layout/popover">popovers</Link>{' '}
            or <Link to="/layout/flyout">flyouts</Link>, such as a user profile
            or news feed. When using{' '}
            <Link to="/layout/flyout">
              <strong>OuiFlyout</strong>
            </Link>
            , be sure to wrap it in a{' '}
            <Link to="/utilities/portal">
              <strong>OuiPortal</strong>
            </Link>
            . When using an{' '}
            <Link to="/layout/popover">
              <strong>OuiPopover</strong>
            </Link>{' '}
            in conjunction with a <strong>fixed</strong> header, be sure to add
            the <OuiCode>repositionOnScroll</OuiCode> prop to the popover.
          </p>
          <p>
            The example below shows how to incorporate{' '}
            <strong>OuiHeaderAlert</strong> components to show a list of updates
            inside a{' '}
            <Link to="/layout/flyout">
              <strong>OuiFlyout</strong>
            </Link>{' '}
            and a{' '}
            <Link to="/layout/popover">
              <strong>OuiPopover</strong>
            </Link>{' '}
            .
          </p>
        </>
      ),
      props: {
        OuiHeaderAlert,
        OuiHeaderSectionItemButton,
      },
      snippet: headerAlertSnippet,
      demo: <HeaderAlert />,
      demoPanelProps: {
        color: 'subdued',
      },
    },
    {
      title: 'Stacked headers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerStackedSource,
        },
      ],
      text: (
        <p>
          Stacking multiple headers provides a great way to separate global
          navigation concerns. However, the{' '}
          <OuiCode language="ts">{'position="fixed"'}</OuiCode> option will not
          be aware of the number of headers. If you do need fixed{' '}
          <strong>and</strong> stacked headers, you will need to apply the SASS
          helper mixin and pass in the correct height to afford for.
        </p>
      ),
      snippet: [
        `<OuiHeader theme="dark" position="fixed" />
<OuiHeader position="fixed" />`,
        '@include ouiHeaderAffordForFixed($ouiHeaderHeightCompensation * 2);',
      ],
      demo: <HeaderStacked />,
      demoPanelProps: {
        color: 'subdued',
      },
    },
    {
      title: 'The OpenSearch navigation pattern',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerOpenSearchPatternSource,
        },
      ],
      text: (
        <>
          <h3>Putting it all together</h3>
          <p>
            The button below will launch a full screen example that includes two{' '}
            <strong>OuiHeaders</strong> with all the appropriate navigation
            pieces including{' '}
            <Link to="/navigation/collapsible-nav">
              <strong>OuiCollapsibleNav</strong>,
            </Link>{' '}
            <strong>OuiHeaderAlerts</strong>, user menu, deployment switcher,
            space selector, <strong>OuiHeaderBreadcrumbs</strong> and{' '}
            <strong>OuiHeaderLinks</strong> for app menu items.
          </p>
          <p>
            This is just a pattern and should be treated as such. Consuming
            applications will need to recreate the pattern according to their
            context and save the states as is appropriate to their data store.
          </p>
        </>
      ),
      fullScreen: {
        slug: 'opensearch-pattern',
        demo: <HeaderOpenSearchPattern theme={lightColors} />,
      },
    },
  ],
};
