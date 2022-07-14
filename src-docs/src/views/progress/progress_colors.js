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

import {
  OuiFlexGroup,
  OuiFlexItem,
  OuiProgress,
  OuiSpacer,
} from '../../../../src/components';

const mainColors = [
  'primary',
  'success',
  'warning',
  'danger',
  'subdued',
  'accent',
];

const vizBars = [];

for (let i = 0; i < 10; i++) {
  vizBars.push(
    <>
      <OuiProgress
        label={`vis${i}`}
        valueText={true}
        value={80}
        max={100}
        color={`vis${i}`}
        size="m"
      />
      <OuiSpacer size="s" />
    </>
  );
}

export default () => (
  <OuiFlexGroup>
    <OuiFlexItem>
      {mainColors.map((value) => (
        <>
          <OuiProgress
            label={value}
            valueText={true}
            value={80}
            max={100}
            color={value}
            size="m"
          />
          <OuiSpacer size="s" />
        </>
      ))}
    </OuiFlexItem>
    <OuiFlexItem>{vizBars}</OuiFlexItem>
    <OuiFlexItem>
      <OuiProgress
        valueText={true}
        label="#32CD32"
        color="#32CD32"
        value={80}
        max={100}
        size="m"
      />
      <OuiSpacer size="s" />
      <OuiProgress
        valueText={true}
        label="mediumslateblue"
        color="mediumslateblue"
        value={80}
        max={100}
        size="m"
      />
    </OuiFlexItem>
  </OuiFlexGroup>
);
