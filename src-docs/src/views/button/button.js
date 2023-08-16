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
  OuiButton,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components/';

export default () => (
  <div>
    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiButton onClick={() => {}}>Primary</OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton fill onClick={() => {}}>
          Filled
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton size="s" onClick={() => {}}>
          Small
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton size="s" fill onClick={() => {}}>
          Small and filled
        </OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiButton color="secondary" onClick={() => {}}>
          Secondary
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="secondary" fill onClick={() => {}}>
          Filled
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="secondary" size="s" onClick={() => {}}>
          Small
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="secondary" size="s" fill onClick={() => {}}>
          Small and filled
        </OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiButton color="accent" onClick={() => {}}>
          Accent
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="accent" fill onClick={() => {}}>
          Filled
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="accent" size="s" onClick={() => {}}>
          Small
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="accent" size="s" fill onClick={() => {}}>
          Small and filled
        </OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiButton color="success" onClick={() => {}}>
          Success
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="success" fill onClick={() => {}}>
          Filled
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="success" size="s" onClick={() => {}}>
          Small
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="success" size="s" fill onClick={() => {}}>
          Small and filled
        </OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiButton color="warning" onClick={() => {}}>
          Warning
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="warning" fill onClick={() => {}}>
          Filled
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="warning" size="s" onClick={() => {}}>
          Small
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="warning" size="s" fill onClick={() => {}}>
          Small and filled
        </OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiButton color="danger" onClick={() => {}}>
          Danger
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="danger" fill onClick={() => {}}>
          Filled
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="danger" size="s" onClick={() => {}}>
          Small
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="danger" size="s" fill onClick={() => {}}>
          Small and filled
        </OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiButton color="text" onClick={() => {}}>
          Text
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="text" fill onClick={() => {}}>
          Filled
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="text" size="s" onClick={() => {}}>
          Small
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton color="text" size="s" fill onClick={() => {}}>
          Small and filled
        </OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiButton isDisabled onClick={() => {}}>
          Disabled
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton isDisabled fill onClick={() => {}}>
          Filled
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton isDisabled size="s" onClick={() => {}}>
          Small
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton isDisabled size="s" fill onClick={() => {}}>
          Small and filled
        </OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
