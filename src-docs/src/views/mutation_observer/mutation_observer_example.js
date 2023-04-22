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
  OuiLink,
  OuiMutationObserver,
} from '../../../../src/components';

import { MutationObserver } from './mutation_observer';
const mutationObserverSource = require('./mutation_observer?raw');
const mutationObserverHtml = renderToHtml(MutationObserver);

export const MutationObserverExample = {
  title: 'Mutation observer',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: mutationObserverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: mutationObserverHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            <strong>OuiMutationObserver</strong> is a wrapper around the
            <OuiLink href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver">
              {' '}
              Mutation Observer API{' '}
            </OuiLink>
            which allows watching for DOM changes to elements and their
            children. <strong>OuiMutationObserver</strong> takes the same
            configuration object as the browser API to describe what to watch
            for, and fires the callback when that mutation happens.
          </p>
          <p>
            This is a render prop component,{' '}
            <strong>OuiMutationObserver</strong> will pass a{' '}
            <OuiCode>ref</OuiCode>
            callback which you must put on the element you wish to observe the
            mutations.
          </p>
        </React.Fragment>
      ),
      components: { OuiMutationObserver },
      demo: <MutationObserver />,
    },
  ],
};
