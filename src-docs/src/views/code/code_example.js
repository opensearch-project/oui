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
  OuiCodeBlock,
  OuiLink,
  OuiText,
} from '../../../../src/components';
import { codeBlockConfig, codeConfig } from './playground';

import Code from './code';
const codeSource = require('./code?raw');
const codeHtml = renderToHtml(Code);
const codeSnippet = '<OuiCode>Text to be formatted</OuiCode>';

import CodeBlock from './code_block';
const codeBlockSource = require('./code_block?raw');
const codeBlockHtml = renderToHtml(CodeBlock);
const codeBlockSnippet = `<OuiCodeBlock language="html" paddingSize="s" isCopyable>
{ \`<h1>Title</h1>\` }
</OuiCodeBlock>
`;

import CodeBlockPre from './code_block_pre';
const codeBlockPreSource = require('./code_block_pre?raw');
const codeBlockPreHtml = renderToHtml(CodeBlockPre);

export const CodeExample = {
  title: 'Code',
  intro: (
    <>
      <OuiText>
        <p>
          The <strong>OuiCode</strong> and <strong>OuiCodeBlock</strong>{' '}
          components support{' '}
          <OuiLink external href="https://github.com/wooorm/refractor#syntaxes">
            all language syntaxes
          </OuiLink>{' '}
          supported by the
          <OuiCode>prism</OuiCode>{' '}
          <OuiLink external href="https://prismjs.com/">
            library
          </OuiLink>
          .
          <br />
          The <OuiCode>language</OuiCode> prop can also be omitted to simply
          render formatted but unhighlighted code.
        </p>
        <p>
          JSX code (often React) has distinct language syntaxes from the base
          JavaScript and TypeScript languages. For these instances, use{' '}
          <OuiCode>language=&quot;jsx&quot;</OuiCode> or{' '}
          <OuiCode>language=&quot;tsx&quot;</OuiCode>.
        </p>
      </OuiText>
    </>
  ),
  sections: [
    {
      title: 'Inline',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: codeHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiCode</strong> is for making inline code snippets that can
          work within or next to bodies of text.
        </p>
      ),
      snippet: codeSnippet,
      props: { OuiCode },
      demo: <Code />,
      playground: codeConfig,
    },
    {
      title: 'Code block',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeBlockSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: codeBlockHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiCodeBlock</strong> can be used to create multi-line code
          blocks. Copy and fullscreen buttons can be enabled via the
          <OuiCode>isCopyable</OuiCode> and <OuiCode>overflowHeight</OuiCode>
          props, respectively.
        </p>
      ),
      snippet: codeBlockSnippet,
      props: { OuiCodeBlock },
      demo: <CodeBlock />,
      playground: codeBlockConfig,
    },
    {
      title: 'Code block and white-space',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeBlockPreSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: codeBlockPreHtml,
        },
      ],
      text: (
        <p>
          By default, the <OuiCode>whiteSpace</OuiCode> property is set to{' '}
          <OuiCode>pre-wrap</OuiCode>. This makes the text wrap when needed. You
          can, however, pass <OuiCode>pre</OuiCode> to the{' '}
          <OuiCode>whiteSpace</OuiCode> prop and the text won&apos;t wrap unless
          line breaks are in the content.
        </p>
      ),
      props: { OuiCodeBlock },
      demo: <CodeBlockPre />,
    },
  ],
};
