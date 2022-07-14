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

import { OuiCodeBlock } from '../../../../src/components';

export default () => (
  <div>
    <OuiCodeBlock
      language="jsx"
      fontSize="m"
      paddingSize="m"
      color="dark"
      overflowHeight={300}
      whiteSpace="pre"
      isCopyable>
      {`export default () => (
  <div>In this example, the whiteSpace property is set to pre. All the whitespaces will be kept as is and the text only wraps when line breaks are in the content.</div>
);`}
    </OuiCodeBlock>
  </div>
);
