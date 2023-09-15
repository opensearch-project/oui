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
import { OuiBasicTable } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './actions';
import { OuiCode } from '../../../../../src/components/code';
const source = require('./actions?raw');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding actions to table',
  source: [
    {
      type: GuideSectionTypes.JS,
      code: source,
    },
    {
      type: GuideSectionTypes.HTML,
      code: html,
    },
  ],
  text: (
    <div>
      <p>
        The following example demonstrates &quot;actions&quot; columns. These
        are special columns where you define per-row, item level actions. The
        most basic action you might define is a type <OuiCode>button</OuiCode>{' '}
        or <OuiCode>icon</OuiCode> though you can always make your own custom
        actions as well.
      </p>
      <p>Actions enforce some strict UI/UX guidelines:</p>
      <ul>
        <li>
          There can only be up to 2 actions visible per row. When more than two
          actions are defined, the first 2 <OuiCode>isPrimary</OuiCode> actions
          will stay visible, an ellipses icon button will hold all actions in a
          single popover.
        </li>
        <li>
          Actions change opacity when user hovers over the row with the mouse.
          When more than 2 actions are supplied, only the ellipses icon button
          stays visible at all times.
        </li>
      </ul>
    </div>
  ),
  components: { OuiBasicTable },
  demo: <Table />,
};
