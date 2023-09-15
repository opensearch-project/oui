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

import { OuiCode } from '../../../../src/components';

import { OuiOverlayMaskProps } from './props';

import OverlayMask from './overlay_mask';
const overlayMaskSource = require('./overlay_mask?raw');
const overlayMaskHtml = renderToHtml(OverlayMask);

import OverlayMaskHeader from './overlay_mask_header';
const overlayMaskHeaderSource = require('./overlay_mask_header?raw');
const overlayMaskHeaderHtml = renderToHtml(OverlayMaskHeader);

export const OverlayMaskExample = {
  title: 'Overlay mask',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: overlayMaskSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: overlayMaskHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>OuiOverlayMask</strong> is simply a display component used
            to obscure the main content to bring attention to its children or
            other content. It is best used in conjunction with hyper-focus
            content areas like <Link to="/layout/modal">modals</Link> and{' '}
            <Link to="/layout/flyout">flyouts</Link>.
          </p>
          <p>
            There are{' '}
            <a href="https://www.nngroup.com/articles/overuse-of-overlays/">
              many considerations
            </a>{' '}
            to make before choosing to use an overlay. At the very least, you
            must provide a visible button to close the overlay. You can also
            pass an <OuiCode>onClick</OuiCode> handler to handle closing the
            overlay.
          </p>
        </div>
      ),
      props: { OuiOverlayMask: OuiOverlayMaskProps },
      snippet: `<OuiOverlayMask onClick={() => {}}>
  <!-- Content goes here -->
</OuiOverlayMask>`,
      demo: <OverlayMask />,
    },
    {
      title: 'Masks with header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: overlayMaskHeaderSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: overlayMaskHeaderHtml,
        },
      ],
      text: (
        <div>
          <p>
            Managing z-index levels of multiple portal-positioned components and
            their different contexts is complicated from within the library.{' '}
            <strong>OuiOverlayMask</strong> gives you control over whether it
            should appear below or above an{' '}
            <Link to="/layout/header">
              <strong>OuiHeader</strong>
            </Link>{' '}
            by providing the <OuiCode>headerZindexLocation</OuiCode> prop. By
            default this is set to <OuiCode>{'"above"'}</OuiCode> for common
            cases like with{' '}
            <Link to="/layout/modal">
              <strong>OuiModal</strong>
            </Link>{' '}
            where the header should be obscured. However, a component like{' '}
            <Link to="/layout/flyout">
              <strong>OuiFlyout</strong>
            </Link>{' '}
            which utilizes the overlay mask but should keep the header visible
            needs to change this prop to <OuiCode>{'"below"'}</OuiCode>.
          </p>
        </div>
      ),
      props: { OuiOverlayMask: OuiOverlayMaskProps },
      snippet: `<OuiOverlayMask onClick={toggleFlyOut} headerZindexLocation="below" />
<OuiFlyout onClose={toggleFlyOut}></OuiFlyout>`,
      demo: <OverlayMaskHeader />,
    },
  ],
};
