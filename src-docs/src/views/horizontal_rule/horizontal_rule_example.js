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

import { GuideSectionTypes } from '../../components';

import { OuiHorizontalRule, OuiCode } from '../../../../src/components';

import { horizontalRuleConfig } from './playground';

import HorizontalRule from './horizontal_rule';
const horizontalRuleSource = require('./horizontal_rule?raw');

import HorizontalRuleMargin from './horizontal_rule_margin';
const horizontalRuleMarginSource = require('./horizontal_rule_margin?raw');

const horizontalRuleSnippet = '<OuiHorizontalRule />';
const horizontalRuleMarginSnippet = '<OuiHorizontalRule margin="xs" />';

export const HorizontalRuleExample = {
  title: 'Horizontal rule',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: horizontalRuleSource,
        },
      ],
      text: (
        <p>
          <strong>OuiHorizontalRule</strong> is a styled{' '}
          <OuiCode>{'<hr>'}</OuiCode> element. It can be one of three provided
          sizes (lengths), by default it will be <OuiCode>full</OuiCode>.
        </p>
      ),
      props: { OuiHorizontalRule },
      snippet: horizontalRuleSnippet,
      demo: (
        <div className="oui-textCenter">
          <HorizontalRule />
        </div>
      ),
      playground: horizontalRuleConfig,
    },
    {
      title: 'Margins',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: horizontalRuleMarginSource,
        },
      ],
      text: (
        <p>
          The spacing added before and after <strong>OuiHorizontalRule</strong>{' '}
          can be adjusted using the <OuiCode>margin</OuiCode> prop. Don&rsquo;t
          forget that margins will collapse against items that proceed and/or
          follow.
        </p>
      ),
      snippet: horizontalRuleMarginSnippet,
      demo: (
        <div className="guideDemo__highlightHR">
          <HorizontalRuleMargin />
        </div>
      ),
    },
  ],
};
