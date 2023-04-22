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

import { OuiCode, OuiBreadcrumbs } from '../../../../src/components';
import { BreadcrumbResponsiveMaxCount, BreadcrumbProps } from './props';

import Breadcrumbs from './breadcrumbs';
const breadcrumbsSource = require('./breadcrumbs?raw');
const breadcrumbsHtml = renderToHtml(Breadcrumbs);

import Responsive from './responsive';
const responsiveSource = require('./responsive?raw');
const responsiveHtml = renderToHtml(Responsive);

import Truncate from './truncate';
const truncateSource = require('./truncate?raw');
const truncateHtml = renderToHtml(Truncate);

import Max from './max';
const maxSource = require('./max?raw');
const maxHtml = renderToHtml(Max);

const breadcrumpProps = {
  OuiBreadcrumbs,
  OuiBreadcrumb: BreadcrumbProps,
  OuiBreadcrumbResponsiveMaxCount: BreadcrumbResponsiveMaxCount,
};

export const BreadcrumbsExample = {
  title: 'Breadcrumbs',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: breadcrumbsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: breadcrumbsHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiBreadcrumbs</strong> let the user track their progress
          within and back out of a UX flow. You can provide an{' '}
          <OuiCode>href</OuiCode> prop on any breadcrumb item that you wish to
          make clickable, including the last item, though we recommend the last
          item represent the current page and therefore the link is unnecessary.
          They work well within{' '}
          <Link to="/layout/page">
            <strong>OuiPageContentHeader</strong>
          </Link>{' '}
          but be careful not to use them within an app that also uses{' '}
          <Link to="/layout/header">
            <strong>OuiHeaderBreadcrumbs</strong>
          </Link>
          .
        </p>
      ),
      props: breadcrumpProps,
      snippet: `<OuiBreadcrumbs
  breadcrumbs={[
    {
      text: 'Breadcrumb 1',
      href: '#',
    },
    {
      text: 'Breadcrumb 2',
      href: '#',
    },
  ]}
  aria-label=""
/>
`,
      demo: <Breadcrumbs />,
    },
    {
      title: 'Limit the number of breadcrumbs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: maxSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: maxHtml,
        },
      ],
      text: (
        <>
          <p>
            Use the <OuiCode>max</OuiCode> prop to collapse breadcrumbs beyond a
            certain number. The center breadcrumbs will collpase into a single
            item allowing the user to navigate these items from within a
            popover.
          </p>
        </>
      ),
      props: breadcrumpProps,
      snippet: `<OuiBreadcrumbs
  max={4}
  breadcrumbs={breadcrumbs}
  aria-label=""
/>`,
      demo: <Max />,
    },
    {
      title: 'Truncate each breadcrumb',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: truncateSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: truncateHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiBreadcrumbs</strong> will truncate the full set by
            default, forcing it to a single line and setting a max width on all
            items except for the last. You can turn this off by setting{' '}
            <OuiCode language="ts">{'truncate={false}'}</OuiCode>. You can also
            force truncation on single breadcrumb <strong>item</strong> by
            adding <OuiCode>{'truncate: true'}</OuiCode>.
          </p>
        </>
      ),
      props: breadcrumpProps,
      demo: <Truncate />,
      snippet: [
        `<OuiBreadcrumbs
  truncate={true}
  breadcrumbs={breadcrumbs}
  aria-label=""
/>`,
        `<OuiBreadcrumbs
  truncate={false}
  breadcrumbs={[
    {
      text: 'Breadcrumb',
      truncate: true,
    }
  ]}
  aria-label=""
/>`,
      ],
    },
    {
      title: 'Responsive',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: responsiveSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: responsiveHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiBreadcrumbs</strong> are <OuiCode>responsive</OuiCode> by
            default and will collapse breadcrumbs on narrower screens. Setting{' '}
            <OuiCode language="ts">{'responsive={false}'}</OuiCode> will keep
            all breadcrumbs visible at all screens sizes.
          </p>
          <p>
            Alternatively, you can change number of breadcrumbs that show per
            breakpoint by passing a custom responsive object.
          </p>
        </>
      ),
      props: breadcrumpProps,
      snippet: [
        `<OuiBreadcrumbs
  responsive={false}
  max={null}
  breadcrumbs={breadcrumbs}
  aria-label=""
/>`,
        `<OuiBreadcrumbs
  responsive={{
    xs: 2,
    s: 5,
  }}
  max={null}
  breadcrumbs={breadcrumbs}
  aria-label=""
/>`,
      ],
      demo: <Responsive />,
    },
  ],
};
