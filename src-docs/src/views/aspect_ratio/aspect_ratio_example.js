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

import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import {
  OuiLink,
  OuiCallOut,
  OuiAspectRatio,
  OuiSpacer,
} from '../../../../src/components';
import aspectRatioConfig from './playground';

import AspectRatio from './aspect_ratio';
const aspectRatioSource = require('./aspect_ratio?raw');
const aspectRatioHtml = renderToHtml(AspectRatio);

const aspectRatioSnippet = `<OuiAspectRatio width={16} height={9}>
  <!-- Embed goes here -->
</OuiAspectRatio>`;

export const AspectRatioExample = {
  title: 'Aspect ratio',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: aspectRatioSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: aspectRatioHtml,
        },
      ],
      text: (
        <Fragment>
          <OuiCallOut
            size="s"
            color="warning"
            title="In some cases, aspect ratio sizing may not be supported by the embed. This component will only work with ones that do, like YouTube."
          />
          <OuiSpacer />
          <p>
            <strong>OuiAspectRatio</strong> provides a way to responsively
            resize a single block level child element to a specificied ratio.
            This is useful for things like YouTube iframes or other embeds that
            initially have a fixed size. If you need something similar for
            images, take a look at CSS&apos;s{' '}
            <OuiLink href="https://www.w3schools.com/css/css3_object-fit.asp">
              object-fit property
            </OuiLink>
            .
          </p>
        </Fragment>
      ),
      props: { OuiAspectRatio },
      demo: <AspectRatio />,
      snippet: aspectRatioSnippet,
    },
  ],
  playground: aspectRatioConfig,
};
