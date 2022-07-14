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
  OuiBadge,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components';

export default () => (
  <OuiFlexGroup wrap responsive={false} gutterSize="xs">
    <OuiFlexItem grow={false}>
      <OuiBadge
        color="primary"
        onClick={() => {}}
        onClickAriaLabel="Example of onClick event for the button"
        data-test-sub="testExample1">
        onClick on text within badge
      </OuiBadge>
    </OuiFlexItem>
    <OuiFlexItem grow={false}>
      <OuiBadge
        color="hollow"
        iconType="cross"
        iconSide="right"
        iconOnClick={() => {}}
        iconOnClickAriaLabel="Example of onClick event for icon within the button"
        data-test-sub="testExample2">
        onClick on icon within badge
      </OuiBadge>
    </OuiFlexItem>
    <OuiFlexItem grow={false}>
      <OuiBadge
        color="success"
        iconType="cross"
        iconSide="right"
        onClick={() => {}}
        onClickAriaLabel="Example of onClick event for the button"
        iconOnClick={() => {}}
        iconOnClickAriaLabel="Example of onClick event for icon within the button"
        data-test-sub="testExample3">
        onClick on both text and icon within badge
      </OuiBadge>
    </OuiFlexItem>
    <OuiFlexItem grow={false}>
      <OuiBadge
        isDisabled={true}
        color="danger"
        onClick={() => {}}
        onClickAriaLabel="Example of disabled button badge"
        iconOnClick={() => {}}
        iconOnClickAriaLabel="Example of disabled button badge"
        data-test-sub="testExample4">
        disabled button badge
      </OuiBadge>
    </OuiFlexItem>
  </OuiFlexGroup>
);
