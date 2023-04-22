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

import IdGenerator from './html_id_generator';
import { HtmlIdGeneratorPrefix } from './html_id_generator_prefix';
import { HtmlIdGeneratorSuffix } from './html_id_generator_suffix';
import { PrefixSufix } from './bothPrefixSuffix';

const htmlIdGeneratorSource = require('./html_id_generator?raw');
const htmlIdGeneratorHtml = renderToHtml(IdGenerator);
const htmlIdGeneratorSnippet = ' htmlIdGenerator()()';

const htmlIdGeneratorPrefixSource = require('./html_id_generator_prefix?raw');
const htmlIdGeneratorPrefixHtml = renderToHtml(HtmlIdGeneratorPrefix);
const htmlIdGeneratorPrefixSnippet = " htmlIdGenerator('prefix')()";

const HtmlIdGeneratorSuffixSource = require('./html_id_generator_suffix?raw');
const HtmlIdGeneratorSuffixHtml = renderToHtml(HtmlIdGeneratorSuffix);
const suffixSnippet = " htmlIdGenerator()('suffix')";

const PrefixSufixSource = require('./bothPrefixSuffix?raw');
const PrefixSufixHtml = renderToHtml(PrefixSufix);
const prefixSuffixSnippet = " htmlIdGenerator('prefix')('suffix')";

export const HtmlIdGeneratorExample = {
  title: 'HTML ID generator',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: htmlIdGeneratorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: htmlIdGeneratorHtml,
        },
      ],
      text: (
        <p>
          Use <OuiCode>htmlIdGenerator()()</OuiCode> to generate unique IDs for
          elements with an optional <OuiCode>prefix</OuiCode> and/or{' '}
          <OuiCode>suffix</OuiCode>. The first call to{' '}
          <OuiCode>htmlIdGenerator</OuiCode> accepts the prefix as an optional
          argument and returns a second function which accepts an optional
          suffix and returns the generated ID.
        </p>
      ),
      snippet: htmlIdGeneratorSnippet,
      demo: <IdGenerator />,
    },
    {
      title: 'ID generator with prefix',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: htmlIdGeneratorPrefixSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: htmlIdGeneratorPrefixHtml,
        },
      ],
      text: (
        <p>
          Provide a <OuiCode>prefix</OuiCode> to the generator to get an ID that
          starts with the specified prefix.
        </p>
      ),
      snippet: htmlIdGeneratorPrefixSnippet,
      demo: <HtmlIdGeneratorPrefix />,
    },
    {
      title: 'ID generator with suffix',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: HtmlIdGeneratorSuffixSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: HtmlIdGeneratorSuffixHtml,
        },
      ],
      text: (
        <p>
          Provide a <OuiCode>suffix</OuiCode> to the generator to get an ID that
          starts with the specified suffix.
        </p>
      ),
      snippet: suffixSnippet,
      demo: <HtmlIdGeneratorSuffix />,
    },
    {
      title: 'ID generator with both prefix and suffix',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PrefixSufixSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: PrefixSufixHtml,
        },
      ],
      text: (
        <p>
          The <OuiCode>htmlIdGenerator</OuiCode> is capable of generating an ID
          with both a specified prefix <strong>and</strong> suffix.
        </p>
      ),
      snippet: prefixSuffixSnippet,
      demo: <PrefixSufix />,
    },
  ],
};
