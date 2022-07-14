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

import { OuiCodeBlock, OuiSpacer } from '../../../../src/components';

const htmlCode = require('!!raw-loader!./code_examples/example.html').default;

const jsCode = require('!!raw-loader!./code_examples/example.js').default;

const sqlCode = require('!!raw-loader!./code_examples/example.sql').default;

export default () => (
  <div>
    <OuiCodeBlock language="html">{htmlCode}</OuiCodeBlock>

    <OuiSpacer />

    <OuiCodeBlock
      language="jsx"
      fontSize="m"
      paddingSize="m"
      overflowHeight={300}
      isCopyable>
      {jsCode}
    </OuiCodeBlock>

    <OuiSpacer />

    <OuiCodeBlock
      language="sql"
      fontSize="m"
      paddingSize="m"
      overflowHeight={300}
      isCopyable>
      {sqlCode}
    </OuiCodeBlock>
  </div>
);
