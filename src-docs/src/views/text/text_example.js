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

import {
  OuiCode,
  OuiText,
  OuiTextColor,
  OuiTextAlign,
} from '../../../../src/components';
import Guidelines from '../text_scaling/text_scaling_sandbox';
import { textConfig, textColorConfig } from './playground';

import Text from './text';
const textSource = require('./text?raw');
const textHtml = renderToHtml(Text);
const textSnippet = `<OuiText grow={false}><!-- Raw HTML content --></OuiText>
`;

import TextSmall from './text_small';
const textSmallSource = require('./text_small?raw');
const textSmallHtml = renderToHtml(TextSmall);
const textSmallSnippet = [
  `<OuiText size="s"><!-- Raw HTML content --></OuiText>
`,
];

import TextColor from './text_color';
const textColorSource = require('./text_color?raw');
const textColorHtml = renderToHtml(TextColor);
const textColorSnippet = [
  `<OuiText color="danger"><!-- Raw HTML content --></OuiText>
`,
  `<OuiTextColor color="subdued">Subdued text color</OuiTextColor>
`,
];

import TextAlign from './text_align';
const textAlignSource = require('./text_align?raw');
const textAlignHtml = renderToHtml(TextAlign);
const textAlignSnippet = [
  `<OuiText textAlign="center"><!-- Raw HTML content --></OuiText>
`,
  `<OuiTextAlign textAlign="center"><!-- Raw HTML content --></OuiTextAlign>
`,
];

export const TextExample = {
  title: 'Text',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>OuiText</strong> is a generic catchall wrapper that will
            apply our standard typography styling and spacing to naked HTML.
            Because of its forced style it{' '}
            <strong>only accepts raw XHTML</strong> and can not / should not be
            used to wrap React components (which would break their styling).
          </p>
          <p>
            <strong>OuiText</strong> can ensure proper line-length for
            readability by setting a{' '}
            <OuiCode language="sass">max-width</OuiCode> on the entire
            component. To add the max-width setting, set{' '}
            <OuiCode language="js">grow=false</OuiCode>.
          </p>
        </div>
      ),
      props: { OuiText },
      snippet: textSnippet,
      demo: <Text />,
    },
    {
      title: 'Text can come in various sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textSmallSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textSmallHtml,
        },
      ],
      text: (
        <p>
          Using the <OuiCode>size</OuiCode> prop on <strong>OuiText</strong> you
          can get smaller sizes of text than the default.
        </p>
      ),
      snippet: textSmallSnippet,
      demo: <TextSmall />,
    },
    {
      title: 'Coloring text',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textColorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textColorHtml,
        },
      ],
      text: (
        <p>
          There are two ways to color text. Either individually by applying{' '}
          <strong>OuiTextColor</strong> on individual text objects, or by
          passing the <OuiCode>color</OuiCode> prop directly on{' '}
          <strong>OuiText</strong> for a blanket approach across the entirety of
          your text.
        </p>
      ),
      props: { OuiTextColor },
      snippet: textColorSnippet,
      demo: <TextColor />,
    },
    {
      title: 'Alignment',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textAlignSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textAlignHtml,
        },
      ],
      text: (
        <p>
          There are two ways to align text. Either individually by applying{' '}
          <strong>OuiTextAlign</strong> on individual text objects, or by
          passing the <OuiCode>textAlign</OuiCode> prop directly on{' '}
          <strong>OuiText</strong> for a blanket approach across the entirety of
          your text.
        </p>
      ),
      props: { OuiTextAlign },
      snippet: textAlignSnippet,
      demo: <TextAlign />,
    },
  ],
  guidelines: <Guidelines />,
  playground: [textConfig, textColorConfig],
};
