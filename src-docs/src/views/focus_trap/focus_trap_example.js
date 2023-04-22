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

import { OuiCode, OuiFocusTrap } from '../../../../src/components';

import FocusTrap from './focus_trap';
const focusTrapSource = require('./focus_trap?raw');
const focusTrapHtml = renderToHtml(FocusTrap);

export const FocusTrapExample = {
  title: 'Focus trap',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: focusTrapSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: focusTrapHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            Use <strong>OuiFocusTrap</strong> to prevent keyboard-initiated
            focus from leaving a defined area. Temporary flows and UX escapes
            that occur in components such as{' '}
            <Link to="/layout/modal">
              <strong>OuiModal</strong>
            </Link>{' '}
            and{' '}
            <Link to="/layout/flyout">
              <strong>OuiFlyout</strong>
            </Link>{' '}
            are prime examples.
          </p>
          <p>
            For components that project content in a React portal,{' '}
            <strong>OuiFocusTrap</strong> will maintain the tab order expected
            by users.
          </p>
          <p>
            Use <OuiCode>clickOutsideDisables</OuiCode> to disable the focus
            trap when the user clicks outside the trap.
          </p>
          <p>
            Use <OuiCode>noIsolation=false</OuiCode> when pointer events on
            outside elements should be disallowed.
          </p>
        </React.Fragment>
      ),
      props: { OuiFocusTrap },
      demo: <FocusTrap />,
    },
  ],
};
