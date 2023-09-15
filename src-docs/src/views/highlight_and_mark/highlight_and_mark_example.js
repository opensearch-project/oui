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

import { OuiCode, OuiHighlight, OuiMark } from '../../../../src/components';

import { highlightConfig, markConfig } from './playground';

import { Highlight } from './highlight';
import { Mark } from './mark';

const highlightSource = require('./highlight?raw');
const highlightHtml = renderToHtml(Highlight);
const highlightSnippet = `<OuiHighlight search={searchValue} highlightAll={isHighlightAll}>
  <!-- A text where all your search matches will be highlighted -->
</OuiHighlight>
`;

const markSource = require('./mark?raw');
const markHtml = renderToHtml(Mark);
const markSnippet = '<OuiMark><!-- Mark text --></OuiMark>';

export const HighlightAndMarkExample = {
  title: 'Highlight and mark',
  sections: [
    {
      title: 'Highlight',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: highlightSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: highlightHtml,
        },
      ],
      text: (
        <p>
          Use <strong>OuiHighlight</strong> to highlight substrings within a
          string, typically in response to user input.
        </p>
      ),
      props: { OuiHighlight },
      snippet: highlightSnippet,
      demo: <Highlight />,
      playground: highlightConfig,
    },
    {
      title: 'Mark',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markHtml,
        },
      ],
      text: (
        <p>
          Use <strong>OuiMark</strong> to wrap a string in a{' '}
          <OuiCode>mark</OuiCode> element.
        </p>
      ),
      props: { OuiMark },
      snippet: markSnippet,
      demo: <Mark />,
      playground: markConfig,
    },
  ],
};
