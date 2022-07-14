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
} from '../../../../src/components';

export default () => (
  <div>
    <OuiFlexGroup gutterSize="s" alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiButton onClick={() => {}} iconType="heart">
          Primary
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton fill iconType="lensApp" onClick={() => {}}>
          Filled
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton iconType="heart" size="s" onClick={() => {}}>
          small
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton iconType="lensApp" size="s" fill onClick={() => {}}>
          small and filled
        </OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiButton iconSide="right" onClick={() => {}} iconType="heart">
          Primary
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton iconSide="right" fill iconType="lensApp" onClick={() => {}}>
          Filled
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton
          iconSide="right"
          iconType="heart"
          size="s"
          onClick={() => {}}>
          small
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton
          iconSide="right"
          iconType="lensApp"
          size="s"
          fill
          onClick={() => {}}>
          small and filled
        </OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiButton
          iconSide="right"
          onClick={() => {}}
          iconType="heart"
          isDisabled>
          Disabled
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton
          iconSide="right"
          fill
          iconType="lensApp"
          onClick={() => {}}
          isDisabled>
          Filled
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton
          iconSide="right"
          iconType="heart"
          size="s"
          onClick={() => {}}
          isDisabled>
          small
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButton
          iconSide="right"
          iconType="lensApp"
          size="s"
          fill
          onClick={() => {}}
          isDisabled>
          small and filled
        </OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
