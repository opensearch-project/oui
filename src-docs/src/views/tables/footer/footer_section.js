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

import { Table } from './footer';
const source = require('./footer?raw');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding a footer to a table',
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
      The following example shows how to add a footer to your table by adding{' '}
      <OuiCode>footer</OuiCode> to your column definitions. If one or more of
      your columns contains a <OuiCode>footer</OuiCode> definition, the footer
      area will be visible. By default, columns with no footer specified
      (undefined) will render an empty cell to preserve the table layout. Check
      out the <em>Build a custom table</em> section below for more examples of
      how you can work with table footers in OUI.
    </p>
  ),
  components: { OuiBasicTable },
  demo: <Table />,
};
