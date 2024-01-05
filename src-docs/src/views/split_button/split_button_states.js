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
  OuiSplitButton,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components/';
import { flatten } from 'lodash';

const options = [{ display: 'option' }];

const colors = ['primary', 'success', 'warning', 'danger', 'text', 'disabled'];
const fills = [false, true];
const smalls = [undefined, 's'];

const name = (color, filled, small) => {
  if (filled && small) return 'Filled and Small';
  if (filled) return 'Filled';
  if (small) return 'Small';

  return color;
};

const iterations = flatten(fills.map((f) => smalls.map((s) => [f, s])));

const button = (color, fill, size) => (
  <OuiFlexItem grow={false}>
    <OuiSplitButton {...{ color, fill, size, options }}>
      {name(color, fill, size)}
    </OuiSplitButton>
  </OuiFlexItem>
);

const colorGroup = (color) => {
  const buttons = iterations.map(([fill, size]) => button(color, fill, size));

  return (
    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      {buttons}
    </OuiFlexGroup>
  );
};

const colorGroups = colors.map((color) => colorGroup(color));

export default () => <div>{colorGroups}</div>;
