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

import IsColorDark from './is_color_dark';
const isColorDarkSource = require('./is_color_dark?raw');
const isColorDarkHtml = renderToHtml(IsColorDark);

export const IsColorDarkExample = {
  title: 'Color',
  sections: [
    {
      title: 'Is color dark',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: isColorDarkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: isColorDarkHtml,
        },
      ],
      text: (
        <p>
          Use <OuiCode>isColorDark</OuiCode> to determine whether or not to use
          light or dark text against a background of a given color.
        </p>
      ),
      demo: <IsColorDark />,
    },
  ],
};
