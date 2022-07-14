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
  const [options, setOptions] = useState(
    Options.map((option) => {
      const { checked, ...checklessOption } = option;
      return { ...checklessOption };
    })
  );

  return (
    <OuiSelectable
      aria-label="Single selection example"
      options={options}
      onChange={(newOptions) => setOptions(newOptions)}
      singleSelection={true}
      listProps={{ bordered: true }}>
      {(list) => list}
    </OuiSelectable>
  );
};
