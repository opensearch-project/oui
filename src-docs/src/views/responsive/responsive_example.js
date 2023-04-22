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
  OuiShowFor,
  OuiHideFor,
  OuiCodeBlock,
} from '../../../../src/components';

import { BREAKPOINTS, BREAKPOINT_KEYS } from '../../../../src/services';
import { OuiBreakpointSize } from '!!prop-loader!../../../../src/services/breakpoint';

import Responsive from './responsive';
const responsiveSource = require('./responsive?raw');
const responsiveHtml = renderToHtml(Responsive);
const responsiveSnippet = [
  `<OuiHideFor sizes={['xs', 's']}>
  <!-- Content to hide from xs and s screens -->
</OuiHideFor>`,
  `<OuiShowFor sizes={['l', 'xl']}>
  <!-- <div>Content only showing for l and xl screens</div> -->
</OuiShowFor>`,
];

function renderSizes(size, index) {
  let code = `'${size}': ${BREAKPOINTS[size]}px`;

  if (index > 0) {
    code += ` (to ${BREAKPOINTS[BREAKPOINT_KEYS[index - 1]] - 1}px)`;
  } else {
    code += ' +';
  }

  return <div key={index}>{code}</div>;
}

export const ResponsiveExample = {
  title: 'Responsive',
  sections: [
    {
      title: 'OuiShowFor and OuiHideFor',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: responsiveSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: responsiveHtml,
        },
      ],
      text: (
        <div>
          <p>
            These components will either render or not render their children
            based on the current window width. Pass an array of named
            breakpoints to the <OuiCode>sizes</OuiCode> prop to either show or
            hide their children respectively.
          </p>

          <p>
            The sizing options correlate with the keys in the{' '}
            <OuiCode language="ts">OuiBreakpoints</OuiCode> type. The named
            breakpoint starts at the pixel value provided and ends before the
            next one.
          </p>

          <OuiCodeBlock language="scss" paddingSize="s">
            {BREAKPOINT_KEYS.map(function (size, index) {
              return renderSizes(size, index);
            })}
          </OuiCodeBlock>
        </div>
      ),
      snippet: responsiveSnippet,
      props: { OuiShowFor, OuiHideFor, OuiBreakpointSize },
      demo: <Responsive />,
    },
  ],
};
