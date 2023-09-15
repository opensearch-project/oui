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

import { OuiCode, OuiLink } from '../../../../src/components';

import linkConfig from './playground';

import Link from './link';
import { LinkDisable } from './link_disable';
import { LinkValidation } from './link_validation';

const linkSource = require('./link?raw');
const linkHtml = renderToHtml(Link);

const linkDisableSource = require('./link_disable?raw');
const linkDisableHtml = renderToHtml(LinkDisable);

const linkValidationSource = require('./link_validation?raw');
const linkValidationHtml = renderToHtml(LinkValidation);

const linkSnippet = [
  `<OuiLink href="https://oui.opensearch.org/latest/"><!-- Link text --></OuiLink>
`,
  `<OuiLink href="https://oui.opensearch.org/latest/" color="success">
  <!-- Colored link text -->
</OuiLink>
`,
];

export const LinkExample = {
  title: 'Link',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: linkHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiLink</strong> will apply the correct styling onto links and
          make sure they are accessible. Links can be passed a color. Note that
          the <OuiCode>ghost</OuiCode> type should only be used on dark
          backgrounds (regardless of theming). It will always create a white
          link.
        </p>
      ),
      props: { OuiLink },
      snippet: linkSnippet,
      demo: <Link />,
    },
    {
      title: 'Disabled links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linkDisableSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: linkDisableHtml,
        },
      ],
      text: (
        <p>
          When an <strong>OuiLink</strong> is passed an{' '}
          <OuiCode>onClick</OuiCode> method, and is not passed an{' '}
          <OuiCode>href</OuiCode>, it can optionally be set to
          <OuiCode>disabled</OuiCode> which disables the click behavior, and
          removes the link styling.
        </p>
      ),
      props: { OuiLink },
      demo: <LinkDisable />,
    },
    {
      title: 'Link validation',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: linkValidationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: linkValidationHtml,
        },
      ],
      text: (
        <p>
          To make links more secure for users, <strong>OuiLink</strong> and
          other components that accept an <OuiCode>href</OuiCode> prop become
          disabled if that <OuiCode>href</OuiCode> uses the{' '}
          <OuiCode>javascript:</OuiCode> protocol. This helps protect consuming
          applications from cross-site scripting (XSS) attacks and mirrors
          React&apos;s{' '}
          <OuiLink
            href="https://github.com/facebook/react/blob/940f48b999a3131e77b2545bd7ae252ef27ae6d1/packages/react-dom/src/shared/sanitizeURL.js#L37"
            target="_blank">
            planned behavior
          </OuiLink>{' '}
          to prevent rendering of <OuiCode>javascript:</OuiCode> links.
        </p>
      ),
      demo: <LinkValidation />,
    },
  ],
  playground: linkConfig,
};
