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

import { OuiCopy, OuiCode } from '../../../../src/components';

import Copy from './copy';
const copySource = require('./copy?raw');
const copyHtml = renderToHtml(Copy);

export const CopyExample = {
  title: 'Copy',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: copySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: copyHtml,
        },
      ],
      text: (
        <p>
          The <strong>OuiCopy</strong> component is a utility for copying text
          to clipboard. Wrap a function that returns a component. The first
          argument will be a <OuiCode>copy</OuiCode> function.
        </p>
      ),
      components: { OuiCopy },
      demo: <Copy />,
      props: { OuiCopy },
      snippet: `<OuiCopy textToCopy={textToCopy}>
  {copy => (
    <OuiButton onClick={copy}>Click to copy</OuiButton>
  )}
</OuiCopy>`,
    },
  ],
};
