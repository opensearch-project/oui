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

import React, { useState } from 'react';

import {
  OuiCopy,
  OuiButton,
  OuiFieldText,
  OuiSpacer,
  OuiFormRow,
} from '../../../../src/components/';

export default () => {
  const [copyText, setCopyText] = useState('I am the text that will be copied');

  const onChange = (e) => {
    setCopyText(e.target.value);
  };

  return (
    <div>
      <OuiFormRow label="Enter text that will be copied to clipboard">
        <OuiFieldText value={copyText} onChange={onChange} />
      </OuiFormRow>

      <OuiSpacer size="m" />

      <OuiCopy textToCopy={copyText}>
        {(copy) => (
          <OuiButton onClick={copy}>Click to copy input text</OuiButton>
        )}
      </OuiCopy>
    </div>
  );
};
