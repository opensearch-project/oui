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

import { OuiFieldPassword, OuiSwitch } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default function () {
  const [value, setValue] = useState('');
  const [dual, setDual] = useState(true);

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles
      canAppend
      canPrepend
      extras={[
        <OuiSwitch
          compressed
          label={'dual'}
          checked={dual}
          onChange={(e) => {
            setDual(e.target.checked);
          }}
        />,
      ]}>
      <OuiFieldPassword
        placeholder="Placeholder text"
        type={dual ? 'dual' : undefined}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Use aria labels when no actual label is in use"
      />
    </DisplayToggles>
  );
}
