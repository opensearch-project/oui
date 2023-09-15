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

import { OuiCode, OuiSpacer } from '../../../../src/components';

import { spacerConfig } from './playground';

import Spacer from './spacer';
const spacerSource = require('./spacer?raw');

const spacerSnippet = '<OuiSpacer size="xs" />';

export const SpacerExample = {
  title: 'Spacer',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: spacerSource,
        },
      ],
      text: (
        <p>
          The <strong>OuiSpacer</strong> component is for adding vertical space
          between items and should be used in place of the{' '}
          <OuiCode>{'<br />'}</OuiCode> tag. There are many different heights
          you can specify via the <OuiCode>size</OuiCode> prop which align to
          the OUI vertical grid sizing.
        </p>
      ),
      props: { OuiSpacer },
      snippet: spacerSnippet,
      demo: (
        <div className="guideDemo__highlightSpacer">
          <Spacer />
        </div>
      ),
      playground: spacerConfig,
    },
  ],
};
