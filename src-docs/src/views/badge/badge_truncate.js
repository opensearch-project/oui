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

import { OuiBadge, OuiPanel, OuiBadgeGroup } from '../../../../src/components';

export default () => (
  <OuiPanel style={{ maxWidth: 200 }}>
    <OuiBadgeGroup gutterSize="s">
      <OuiBadge>Badge with simple text being truncated</OuiBadge>

      <OuiBadge iconType="clock">Badge with icon being truncated</OuiBadge>

      <OuiBadge onClick={() => {}} onClickAriaLabel="Click this badge to...">
        Badge with onClick being truncated
      </OuiBadge>

      <OuiBadge
        iconType="cross"
        iconSide="right"
        iconOnClick={() => {}}
        iconOnClickAriaLabel="Click this icon to...">
        Badge with iconOnClick being truncated
      </OuiBadge>

      <OuiBadge
        iconType="cross"
        iconSide="right"
        onClick={() => {}}
        onClickAriaLabel="Click this badge to..."
        iconOnClick={() => {}}
        iconOnClickAriaLabel="Click this icon to...">
        Badge with both onClicks being truncated
      </OuiBadge>
    </OuiBadgeGroup>
  </OuiPanel>
);
