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

export default () => (
  <div>
    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiSplitButton onClick={() => {}}>Primary</OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton fill onClick={() => {}}>
          Filled
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton size="s" onClick={() => {}}>
          Small
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton size="s" fill onClick={() => {}}>
          Small and filled
        </OuiSplitButton>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiSplitButton color="success" onClick={() => {}}>
          Success
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton color="success" fill onClick={() => {}}>
          Filled
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton color="success" size="s" onClick={() => {}}>
          Small
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton color="success" size="s" fill onClick={() => {}}>
          Small and filled
        </OuiSplitButton>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiSplitButton color="warning" onClick={() => {}}>
          Warning
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton color="warning" fill onClick={() => {}}>
          Filled
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton color="warning" size="s" onClick={() => {}}>
          Small
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton color="warning" size="s" fill onClick={() => {}}>
          Small and filled
        </OuiSplitButton>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiSplitButton color="danger" onClick={() => {}}>
          Danger
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton color="danger" fill onClick={() => {}}>
          Filled
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton color="danger" size="s" onClick={() => {}}>
          Small
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton color="danger" size="s" fill onClick={() => {}}>
          Small and filled
        </OuiSplitButton>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiSplitButton color="text" onClick={() => {}}>
          Text
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton color="text" fill onClick={() => {}}>
          Filled
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton color="text" size="s" onClick={() => {}}>
          Small
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton color="text" size="s" fill onClick={() => {}}>
          Small and filled
        </OuiSplitButton>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiSplitButton isDisabled onClick={() => {}}>
          Disabled
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton isDisabled fill onClick={() => {}}>
          Filled
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton isDisabled size="s" onClick={() => {}}>
          Small
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton isDisabled size="s" fill onClick={() => {}}>
          Small and filled
        </OuiSplitButton>
      </OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
