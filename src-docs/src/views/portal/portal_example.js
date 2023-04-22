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

import { OuiCode, OuiPortal } from '../../../../src/components';

import { Portal } from './portal';
const portalSource = require('./portal?raw');
const portalHtml = renderToHtml(Portal);

import { PortalInsert } from './portal_insert';
const portalInsertSource = require('./portal_insert?raw');
const portalInsertHtml = renderToHtml(PortalInsert);

export const PortalExample = {
  title: 'Portal',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: portalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: portalHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiPortal</strong> allows you to append its contained children
          onto the document body. It is useful for moving fixed elements like
          modals, tooltips or toasts when you are worried about a z-index or
          overflow conflict.
        </p>
      ),
      components: { OuiPortal },
      demo: <Portal />,
    },
    {
      title: 'Inserting portals',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: portalInsertSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: portalInsertHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            There is an optional <OuiCode>insert</OuiCode> prop that can specify
            the portal&apos;s location in the DOM. When used, it is important to
            consider how the location relates to the component lifecycle, as it
            could be removed from the DOM by another component update.
          </p>
          <p>
            <OuiCode>insert</OuiCode> is an object with two key-value pairs:{' '}
            <OuiCode>sibling</OuiCode> and <OuiCode>position</OuiCode>.
            <OuiCode>sibling</OuiCode> is the React node or HTMLElement to
            insert the portal next to, and <OuiCode>position</OuiCode> specifies
            the portal&apos;s relative position, either{' '}
            <OuiCode>before</OuiCode> or
            <OuiCode>after</OuiCode>.
          </p>
        </React.Fragment>
      ),
      props: { OuiPortal },
      demo: <PortalInsert />,
    },
  ],
};
