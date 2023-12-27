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

const options = ['option'];

export default () => (
  <div>
    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiSplitButton options={options} onClick={() => {}}>
          Primary
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton fill options={options} onClick={() => {}}>
          Filled
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton size="s" options={options} onClick={() => {}}>
          Small
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton size="s" fill options={options} onClick={() => {}}>
          Small and filled
        </OuiSplitButton>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiSplitButton color="success" options={options} onClick={() => {}}>
          Success
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton
          color="success"
          fill
          options={options}
          onClick={() => {}}>
          Filled
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton
          color="success"
          size="s"
          options={options}
          onClick={() => {}}>
          Small
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton
          color="success"
          size="s"
          fill
          options={options}
          onClick={() => {}}>
          Small and filled
        </OuiSplitButton>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiSplitButton color="warning" options={options} onClick={() => {}}>
          Warning
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton
          color="warning"
          fill
          options={options}
          onClick={() => {}}>
          Filled
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton
          color="warning"
          size="s"
          options={options}
          onClick={() => {}}>
          Small
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton
          color="warning"
          size="s"
          fill
          options={options}
          onClick={() => {}}>
          Small and filled
        </OuiSplitButton>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiSplitButton color="danger" options={options} onClick={() => {}}>
          Danger
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton
          color="danger"
          fill
          options={options}
          onClick={() => {}}>
          Filled
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton
          color="danger"
          size="s"
          options={options}
          onClick={() => {}}>
          Small
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton
          color="danger"
          size="s"
          fill
          options={options}
          onClick={() => {}}>
          Small and filled
        </OuiSplitButton>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiSplitButton color="text" options={options} onClick={() => {}}>
          Text
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton color="text" fill options={options} onClick={() => {}}>
          Filled
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton
          color="text"
          size="s"
          options={options}
          onClick={() => {}}>
          Small
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton
          color="text"
          size="s"
          fill
          options={options}
          onClick={() => {}}>
          Small and filled
        </OuiSplitButton>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false} wrap>
      <OuiFlexItem grow={false}>
        <OuiSplitButton isDisabled options={options} onClick={() => {}}>
          Disabled
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton isDisabled fill options={options} onClick={() => {}}>
          Filled
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton
          isDisabled
          size="s"
          options={options}
          onClick={() => {}}>
          Small
        </OuiSplitButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiSplitButton
          isDisabled
          size="s"
          fill
          options={options}
          onClick={() => {}}>
          Small and filled
        </OuiSplitButton>
      </OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
