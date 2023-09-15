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
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { OuiCode, OuiLink } from '../../../../src/components';

import { ResizeObserverExample as ResizeObserver } from './resize_observer';
const resizeObserverSource = require('./resize_observer?raw');
const resizeObserverHtml = renderToHtml(ResizeObserver);

import { ResizeObserverHookExample as ResizeObserverHook } from './resize_observer_hook';
const resizeObserverHookSource = require('./resize_observer_hook?raw');
const resizeObserverHookHtml = renderToHtml(ResizeObserverHook);

export const ResizeObserverExample = {
  title: 'Resize observer',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: resizeObserverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: resizeObserverHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            <strong>OuiResizeObserver</strong> is a wrapper around the
            <OuiLink href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">
              {' '}
              Resizer Observer API{' '}
            </OuiLink>
            which allows watching for changes to the content rectangle of DOM
            elements. Unlike{' '}
            <Link to="/utilities/mutation-observer">
              <strong>OuiMutationObserver</strong>
            </Link>
            , <strong>OuiResizeObserver</strong> does not take parameters, but
            it does fire a more efficient and informative callback when resize
            events occur.
          </p>
          <p>
            This is a render prop component, <strong>OuiResizeObserver</strong>{' '}
            will pass a <OuiCode>ref</OuiCode>
            callback which you must put on the element you wish to observe.
          </p>
        </React.Fragment>
      ),
      demo: <ResizeObserver />,
    },
    {
      title: 'useResizeObserver hook',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: resizeObserverHookSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: resizeObserverHookHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            There is also a React hook, <OuiCode>useResizeObserver</OuiCode>,
            which provides the same observation functionality.
          </p>
        </React.Fragment>
      ),
      demo: <ResizeObserverHook />,
    },
  ],
};
