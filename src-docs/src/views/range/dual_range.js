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

import { OuiDualRange, OuiSpacer, OuiTitle } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState(['100', '150']);
  const [value2, setValue2] = useState(['40', '60']);

  return (
    <>
      <OuiDualRange
        id={htmlIdGenerator()()}
        min={0}
        max={300}
        step={10}
        value={value}
        onChange={setValue}
        showLabels
        aria-label="An example of OuiDualRange"
      />

      <OuiSpacer size="xl" />

      <OuiTitle size="xxs">
        <h3>Draggable highlight area</h3>
      </OuiTitle>

      <OuiSpacer size="l" />

      <OuiDualRange
        id={htmlIdGenerator()()}
        min={0}
        max={100}
        step={1}
        value={value2}
        onChange={setValue2}
        showLabels
        aria-label="An example of OuiDualRange with isDraggable='true'"
        isDraggable
      />
    </>
  );
};
