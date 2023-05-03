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
  OuiHeaderLinks,
  OuiHeaderLink,
} from '../../../../src/components';

import { OuiHeaderSectionsProp } from './props';

import Header from './header';
const headerSource = require('!!raw-loader!./header');

import HeaderSections from './header_sections';
const headerSectionsSource = require('!!raw-loader!./header_sections');

import HeaderPosition from './header_position';
const headerPositionSource = require('!!raw-loader!./header_position');

import HeaderAlert from './header_alert';
const headerAlertSource = require('!!raw-loader!./header_alert');

import HeaderAnimate from './header_animate';
const headerAnimateSource = require('!!raw-loader!./header_animate');

import HeaderLinks from './header_links';
const headerLinksSource = require('!!raw-loader!./header_links');

import HeaderDark from './header_dark';
const headerDarkSource = require('!!raw-loader!./header_dark');

import HeaderStacked from './header_stacked';
const headerStackedSource = require('!!raw-loader!./header_stacked');

import HeaderElasticPattern from './header_elastic_pattern';
const headerElasticPatternSource = require('!!raw-loader!./header_elastic_pattern');

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

const headerLinksSnippet = `<OuiHeader>
  <OuiHeaderSectionItem border="right">
    <OuiHeaderLogo
      iconType="iconName"
      href=""
    />
  </OuiHeaderSectionItem>

  <OuiHeaderLinks>
    <OuiHeaderLink href="" isActive>
      <!-- First link -->
    </OuiHeaderLink>

    <OuiHeaderLink href="">
      <!-- Second link -->
    </OuiHeaderLink>
  </OuiHeaderLinks>
</OuiHeader>`;

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

const headerAnimateSnippet = `const bellRef = useRef();

// wrapping the 'ouiAnimate' methods to make them available through this component's 'ref'
const ouiAnimate = useCallback(() => {
  bellRef.current?.ouiAnimate();
}, []);

// we're using the useImperativeHandle which allows the child to expose a function to the parent
useImperativeHandle(
  ref,
  () => ({
    ouiAnimate,
  }),
  [ouiAnimate]
);

const bellButton = (
  <OuiHeaderSectionItemButton
    ref={bellRef}
    aria-label={ariaLabel}
    notification={notification}>
    <OuiIcon type="bell" />
  </OuiHeaderSectionItemButton>
);`;

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
      title: 'Header links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerLinksSource,
        },
      ],
      text: (
        <>
          <p>
            In addition to the components mentioned prior, which lend themselves
            to more application style navigation patterns,{' '}
            <strong>OuiHeaderLinks</strong> and <strong>OuiHeaderLink</strong>{' '}
            supply the ability to inline a list of navigational or menu style
            links.
          </p>
          <p>
            <strong>OuiHeaderLinks</strong> comes with responsive functionality
            built-in which will convert the inline list of links to a popover
            list triggered by a <strong>OuiHeaderSectionItemButton</strong>. You
            can adjust at which breakpoints to switch to the popover display by
            passing your own array of named breakpoints to{' '}
            <OuiCode>popoverBreakpoints</OuiCode>.
          </p>
        </>
      ),
      props: {
        OuiHeaderLinks,
        OuiHeaderLink,
      },
      snippet: headerLinksSnippet,
      demo: <HeaderLinks />,
      demoPanelProps: {
        color: 'subdued',
      },
    },
    {
      title: 'Fixed header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerPositionSource,
        },
      ],
      text: (
        <>
          <p>
            Most consumers need a header that does not scroll away with the page
            contents. You can apply this display by applying the property{' '}
            <OuiCode language="ts">{'position="fixed"'}</OuiCode>. This will
            also add a class of <OuiCode>.ouiBody--headerIsFixed</OuiCode> to
            the window body.
          </p>
          <p>
            You will then need to apply your own padding to this body class to
            afford for the header height. OUI supplies a helper mixin that also
            accounts for this height in flyouts and the collapsible nav. Simply
            add{' '}
            <OuiCode language="sass">@include ouiHeaderAffordForFixed;</OuiCode>{' '}
            anywhere in your SASS.
          </p>
        </>
      ),
      snippet: [
        '<OuiHeader position="fixed" />',
        '@include ouiHeaderAffordForFixed;',
      ],
      demo: <HeaderPosition />,
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
      title: 'Header notifications',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerAnimateSource,
        },
      ],
      text: (
        <>
          <p>
            To alert or notify users about the additional information they are
            receiving, use the <strong>OuiHeaderSectionItemButton</strong>{' '}
            <OuiCode>notification</OuiCode> prop. You can pass a{' '}
            <OuiCode>node</OuiCode> that will render inside a{' '}
            <strong>OuiBadgeNotification</strong> or pass{' '}
            <OuiCode>true</OuiCode> to render a simple dot. You can also animate
            the button by calling the <OuiCode>ouiAnimate()</OuiCode> method on
            the <strong>OuiHeaderSectionItemButton</strong>{' '}
            <OuiCode>ref</OuiCode>.
          </p>
        </>
      ),
      props: {
        OuiHeaderSectionItemButton,
      },
      snippet: headerAnimateSnippet,
      demo: <HeaderAnimate />,
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
          code: headerElasticPatternSource,
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
        demo: <HeaderElasticPattern theme={lightColors} />,
      },
    },
  ],
};
