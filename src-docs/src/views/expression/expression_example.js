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

import { OuiCode } from '../../../../src/components';

import { OuiExpression } from '../../../../src/components/expression';

import { expressionConfig } from './playground';

import Expression from './expression';
const expressionSource = require('./expression?raw');
const expressionHtml = renderToHtml(Expression);
const expressionSnippet = `<OuiExpression
  description={description}
  value={value}
  isActive={isActive}
  onClick={handleClick}
/>`;

import Colors from './colors';
const colorSource = require('./colors?raw');
const colorHtml = renderToHtml(Colors);
const colorSnippet = `<OuiExpression
  description={description}
  value={value}
  color="primary"
/>`;

import Stringing from './stringing';
const stringingSource = require('./stringing?raw');
const stringingHtml = renderToHtml(Stringing);
const stringingSnippet = `<div>
  <OuiExpression
    description={description1}
    value={value1}
    onClick={handleClick1}
  />
  <OuiExpression
    description={description2}
    value={value2}
    onClick={handleClick2}
  />
</div>`;

import Columns from './columns';
const columnsSource = require('./columns?raw');
const columnsHtml = renderToHtml(Columns);
const columnsSnippet = `<OuiExpression
  description={description}
  display="columns"
  value={value}
/>`;

import Invalid from './invalid';
const invalidSource = require('./invalid?raw');
const invalidHtml = renderToHtml(Invalid);
const invalidSnippet = `<OuiExpression
  description={description}
  isInvalid
  value={value}
/>`;

import Truncate from './truncate';
const truncateSource = require('./truncate?raw');
const truncateHtml = renderToHtml(Truncate);
const truncateSnippet = `<OuiExpression
  description={description}
  value={value}
  textWrap="truncate"
/>`;

export const ExpressionExample = {
  title: 'Expression',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: expressionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: expressionHtml,
        },
      ],
      text: (
        <p>
          Use the <strong>OuiExpression</strong> component to surface
          expressions. It requires both a <OuiCode>description</OuiCode> (left
          side) and <OuiCode>value</OuiCode> (right side). Optionally, you can
          pass it an <OuiCode>onClick</OuiCode> function that will convert it to
          a button and add some additional styling to indicate that it is
          clickable.
        </p>
      ),
      props: { OuiExpression },
      snippet: expressionSnippet,
      demo: <Expression />,
    },
    {
      title: 'Colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorHtml,
        },
      ],
      text: (
        <p>
          You can pass a <OuiCode>color</OuiCode> prop but it will only color
          the <OuiCode>description</OuiCode>.
        </p>
      ),
      snippet: colorSnippet,
      demo: <Colors />,
    },
    {
      title: 'Stringing a bunch together',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stringingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: stringingHtml,
        },
      ],
      text: (
        <p>
          If the expression is more than one description and value, you can
          string multiple expressions together and they should inline together
          and wrap at logical points.
        </p>
      ),
      snippet: stringingSnippet,
      demo: <Stringing />,
    },
    {
      title: 'Column display',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: columnsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: columnsHtml,
        },
      ],
      text: (
        <div>
          <p>
            There might be cases where displaying multiple{' '}
            <strong>OuiExpression</strong>s in a paragraph is not ideal. For
            example, when both the <OuiCode>description</OuiCode> and the{' '}
            <OuiCode>value</OuiCode> are variable or when their text is quite
            long. To use a column display instead, pass{' '}
            <OuiCode language="ts">{'display="columns"'}</OuiCode>.
          </p>
          <p>
            In column display, each expression is its own line and the{' '}
            <OuiCode>description</OuiCode> column is aligned to the right. The
            default width for the <OuiCode>description</OuiCode> is 20%, but you
            can customize this with the
            <OuiCode>descriptionWidth</OuiCode> prop. When displaying a group of{' '}
            <strong>OuiExpression</strong>s, make sure to set the same width for
            all descriptions.
          </p>
        </div>
      ),
      snippet: columnsSnippet,
      demo: <Columns />,
    },
    {
      title: 'Invalid state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: invalidSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: invalidHtml,
        },
      ],
      text: (
        <p>
          Set <OuiCode>isInvalid</OuiCode> to true to display{' '}
          <strong>OuiExpression</strong>&apos;s error state. This state will
          override the <OuiCode>color</OuiCode> prop with danger.
        </p>
      ),
      snippet: invalidSnippet,
      demo: <Invalid />,
    },
    {
      title: 'Truncate text',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: truncateSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: truncateHtml,
        },
      ],
      text: (
        <p>
          To truncate <strong>OuiExpression</strong>&apos;s content, pass{' '}
          <OuiCode language="ts">{'textWrap="truncate"'}</OuiCode>. Text
          truncation only works properly if the prop types of{' '}
          <OuiCode>description</OuiCode> and <OuiCode>value</OuiCode> are
          strings. If you&apos;re using nodes, use the{' '}
          <OuiCode>.oui-textTruncate</OuiCode> utility class on all their
          sub-children.
        </p>
      ),
      snippet: truncateSnippet,
      demo: <Truncate />,
    },
  ],
  playground: expressionConfig,
};
