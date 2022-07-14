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

import { OuiSelectable } from '../../../../src/components/selectable';
import { Options } from './data';

export default () => {
  const [options, setOptions] = useState(Options);

  return (
    <OuiSelectable
      aria-label="Basic example"
      options={options}
      listProps={{ bordered: true }}
      onChange={(newOptions) => setOptions(newOptions)}>
      {(list) => list}
    </OuiSelectable>
  );
};
