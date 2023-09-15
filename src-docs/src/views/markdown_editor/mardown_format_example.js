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
  OuiMarkdownFormat,
  OuiText,
} from '../../../../src/components';

import { Link } from 'react-router-dom';

import MarkdownFormat from './markdown_format';
const markdownFormatSource = require('./markdown_format?raw');
const markdownFormatHtml = renderToHtml(MarkdownFormat);

import MarkdownFormatSink from './markdown_format_sink';
const markdownFormatSinkSource = require('./markdown_format_sink?raw');
const markdownFormatSinkHtml = renderToHtml(MarkdownFormatSink);

export const MarkdownFormatExample = {
  title: 'Markdown format',
  beta: true,
  intro: (
    <Fragment>
      <OuiText>
        <p>
          <strong>OuiMarkdownFormat</strong> is a read-only way to render
          markdown-style content in a page. It is a peer component to{' '}
          <strong>
            <Link to="/editors-syntax/markdown-editor/">OuiMarkdownEditor</Link>
          </strong>{' '}
          and has the ability to be modified by additional{' '}
          <Link to="/editors-syntax/markdown-plugins">markdown plugins</Link>.
        </p>
      </OuiText>
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownFormatSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownFormatHtml,
        },
      ],
      title: 'Built in plugins',
      text: (
        <p>
          <strong>OuiMarkdownFormat</strong> is a wrapper that will render
          Markdown provided. OuiMarkdownFormat uses{' '}
          <OuiLink target="_blank" href="https://github.com/remarkjs/remark">
            Remark
          </OuiLink>{' '}
          by default. The translation layer automatically substitutes raw HTML
          output with their OUI equivalent. This means anchor and code blocks
          will become <strong>OuiLink</strong> and <strong>OuiCodeBlock</strong>{' '}
          components respectively.
        </p>
      ),
      props: {
        OuiMarkdownFormat,
      },
      demo: <MarkdownFormat />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markdownFormatSinkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markdownFormatSinkHtml,
        },
      ],
      title: 'Kitchen sink',
      text: (
        <p>
          This example shows of all the styling and markup possibilities. It is
          mostly used for testing.
        </p>
      ),
      props: {
        OuiMarkdownFormat,
      },
      demo: <MarkdownFormatSink />,
    },
  ],
};
