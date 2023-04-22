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

import { OuiErrorBoundary } from '../../../../src/components';

import ErrorBoundary from './error_boundary';
const errorBoundarySource = require('./error_boundary?raw');
const errorBoundaryHtml = renderToHtml(ErrorBoundary);

export const ErrorBoundaryExample = {
  title: 'Error boundary',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: errorBoundarySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: errorBoundaryHtml,
        },
      ],
      text: (
        <p>
          Use <strong>OuiErrorBoundary</strong> to prevent errors from taking
          down the entire app.
        </p>
      ),
      props: { OuiErrorBoundary },
      demo: <ErrorBoundary />,
    },
  ],
};
