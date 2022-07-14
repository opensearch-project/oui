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

import { OuiTextArea } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default () => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canLoading={false}>
      <OuiTextArea
        placeholder="Placeholder text"
        aria-label="Use aria labels when no actual label is in use"
        value={value}
        onChange={(e) => onChange(e)}
      />
    </DisplayToggles>
  );
};
