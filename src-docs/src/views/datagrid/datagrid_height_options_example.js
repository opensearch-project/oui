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

import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';
import {
  OuiCallOut,
  OuiCode,
  OuiCodeBlock,
  OuiSpacer,
} from '../../../../src/components';

import DataGridRowHeightOptions from './row_height_options';
const dataGridRowHeightOptionsSource = require('./row_height_options?raw');
const dataGridRowHeightOptionsHtml = renderToHtml(DataGridRowHeightOptions);

const rowHeightsSnippet = `
  {
    defaultHeight: {
      lineCount: 2, // default every row to 2 lines of text. Also we can provide height in pixels
    },
    rowHeights: {
      1: {
        lineCount: 5, // for row which have index 1 we allow to show 5 lines after that we truncate
      },
      4: 140, // for row which have index 4 we set 140 pixel
      5: 80,
    },
  }
`;

export const DataGridRowHeightOptionsExample = {
  title: 'Data grid row height options',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridRowHeightOptionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridRowHeightOptionsHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Row height options can be passed down to the grid through the{' '}
            <OuiCode>rowHeightsOptions</OuiCode> prop. It accepts an object
            configuring the default height and/or specific row heights:
          </p>
          <ul>
            <li>
              <OuiCode>defaultHeight</OuiCode> - defines the default size for
              all rows
            </li>
            <li>
              <OuiCode>rowHeights</OuiCode> - overrides the height for a
              specific row
            </li>
          </ul>
          <OuiCallOut
            color="warning"
            title="Rows have minimum height requirements">
            <p>
              Rows must be at least <strong>34 pixels</strong> tall so they can
              render at least one line of text. If you provide a smaller height
              the row will default to 34 pixels.
            </p>
          </OuiCallOut>
          <OuiSpacer />
          <OuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {rowHeightsSnippet}
          </OuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridRowHeightOptions },
      demo: <DataGridRowHeightOptions />,
    },
  ],
};
