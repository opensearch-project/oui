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

import { OuiTitle } from '../../../../src/components';
import { titleConfig } from './playground';

import Title from './title';
const titleSource = require('./title?raw');
const titleHtml = renderToHtml(Title);
const titleSnippet = [
  `<OuiTitle>
  <h2><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
</OuiTitle>`,
  `<OuiTitle size="s">
  <h2><!-- Small title but heading level can be anything based on your context. --></h2>
</OuiTitle>`,
];

export const TitleExample = {
  title: 'Title',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: titleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: titleHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiTitle</strong> styles the page, section, and content
          headings we use in OpenSearch Dashboards. They can contain any markup,
          but usually contain a heading tag of some sort. Unlike{' '}
          <strong>OuiText</strong> they are margin neutral and more suitable for
          general layout design.
        </p>
      ),
      snippet: titleSnippet,
      props: { OuiTitle },
      demo: <Title />,
    },
  ],
  playground: titleConfig,
};
