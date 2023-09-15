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

import { OuiHealth, OuiCode } from '../../../../src/components';
import healthConfig from './playground';

import Health from './health';
const healthSource = require('./health?raw');
const healthHtml = renderToHtml(Health);
const healthSnippet = [
  '<OuiHealth color="success">Healthy</OuiHealth>',
  '<OuiHealth color="#33CC33">Custom color as hex</OuiHealth>',
];

import HealthSize from './health_size';
const healthTextSizeSource = require('./health_size?raw');
const healthTextSizeHtml = renderToHtml(HealthSize);
const healthTextSizeSnippet = [
  '<OuiHealth textSize="inherit">Text inherited from the parent element</OuiHealth>',
  '<OuiHealth textSize="xs">Text extra small</OuiHealth>',
];

export const HealthExample = {
  title: 'Health',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: healthSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: healthHtml,
        },
      ],
      text: (
        <p>
          The <strong>OuiHealth</strong> component should be used when showing
          comparitive health of listed objects (like servers, HTTP response
          status codes(as per convenience), nodes, indexes..etc). Because icons
          are vague and bulky and color alone does not work, color plus text
          provides a recognizable, lightweight combo that works in most
          situations.
        </p>
      ),
      snippet: healthSnippet,
      props: { OuiHealth },
      demo: <Health />,
    },
    {
      title: 'Text sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: healthTextSizeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: healthTextSizeHtml,
        },
      ],
      text: (
        <p>
          Match the text size of <strong>OuiHealth</strong> to your context by
          passing <OuiCode>xs / s / m / inherit</OuiCode> to the{' '}
          <OuiCode>textSize</OuiCode> prop. The <OuiCode>inherit</OuiCode> style
          will get its font size from the parent element.
        </p>
      ),
      snippet: healthTextSizeSnippet,
      props: { OuiHealth },
      demo: <HealthSize />,
    },
  ],
  playground: healthConfig,
};
