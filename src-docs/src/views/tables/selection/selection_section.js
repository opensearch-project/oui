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
import { OuiBasicTable, OuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './selection';
const source = require('./selection?raw');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding selection to a table',
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
    <p>
      The following example shows how to configure selection via the{' '}
      <OuiCode>selection</OuiCode>
      property. You can set items to be selected initially by passing an array
      of items as the <OuiCode>initialSelected</OuiCode> value inside{' '}
      <OuiCode>selection</OuiCode> property. You can also use the{' '}
      <OuiCode>setSelection</OuiCode> method to take complete control over table
      selection. This can be useful if you want to handle selection in table
      based on user interaction with another part of the UI.
    </p>
  ),
  components: { OuiBasicTable },
  demo: <Table />,
};
