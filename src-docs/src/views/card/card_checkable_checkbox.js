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

import { OuiCheckableCard } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [checkbox, setCheckbox] = useState(false);

  return (
    <OuiCheckableCard
      id={htmlIdGenerator()()}
      label="I am a checkbox"
      checkableType="checkbox"
      value="checkbox1"
      checked={checkbox}
      onChange={() => setCheckbox(!checkbox)}
    />
  );
};
