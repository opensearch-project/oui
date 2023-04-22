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
import { useOuiTextDiffProp } from './props';
import TextDiff from './text_diff';
const textDiffSource = require('./text_diff?raw');
const textDiffHtml = renderToHtml(TextDiff);

import TextDiffCustomComponents from './text_diff_custom_components';
const customComponentsSource = require('./text_diff_custom_components?raw');
const customComponentsHtml = renderToHtml(TextDiffCustomComponents);

export const TextDiffExample = {
  title: 'Text diff',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textDiffSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textDiffHtml,
        },
      ],
      text: (
        <>
          <p>
            The hook, <strong>useOuiTextDiff</strong>, generates a set of
            changes between two strings. It returns both React elements for
            displaying the diff and an object representing the identified
            changes. The <OuiCode>timeout</OuiCode> prop is used to set how many
            seconds any diff&apos;s exploration phase may take. The default
            value is 0.1, a value of 0 disables the timeout and lets diff run
            until completion. The higher the timeout, the more detailed the
            comparison.
          </p>
          <p>
            <OuiCode language="tsx">
              {
                'const [rendered, textDiffObject] = useOuiTextDiff({ beforeText, afterText })'
              }
            </OuiCode>
          </p>
        </>
      ),
      demo: <TextDiff />,
      props: { useOuiTextDiffProp },
      snippet: `const [rendered, textDiffObject] = useOuiTextDiff({ beforeText, afterText })

<OuiText><p>{rendered}</p></OuiText>`,
    },
    {
      title: 'Custom rendered elements',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customComponentsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customComponentsHtml,
        },
      ],
      text: (
        <>
          <p>
            By default, the hook will wrap deletions with{' '}
            <OuiCode>{'<del>'}</OuiCode> and insertions with{' '}
            <OuiCode>{'<ins>'}</OuiCode> elements. You can replace these
            elements with the <OuiCode>deleteComponent</OuiCode> and{' '}
            <OuiCode>insertComponent</OuiCode>
            props respectively.
          </p>
          <p>
            Also, since <OuiCode>rendered</OuiCode> is simple html string, you
            can wrap it in any contextual element like{' '}
            <Link to="/display/text">
              <strong>OuiText</strong>
            </Link>{' '}
            or{' '}
            <Link to="/display/code">
              <strong>OuiCodeBlock</strong>
            </Link>
            .
          </p>
        </>
      ),
      demo: <TextDiffCustomComponents />,
      snippet: `const [rendered] = useOuiTextDiff({
  beforeText,
  afterText,
  insertComponent: 'strong',
});

<OuiCodeBlock fontSize="m" paddingSize="m">
  {rendered}
</OuiCodeBlock>`,
    },
  ],
};
