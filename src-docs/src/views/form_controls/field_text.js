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

import { OuiFieldText } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default function () {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canPrepend canAppend>
      <OuiFieldText
        placeholder="Placeholder text"
        value={value}
        onChange={(e) => onChange(e)}
        aria-label="Use aria labels when no actual label is in use"
      />
    </DisplayToggles>
  );
}
