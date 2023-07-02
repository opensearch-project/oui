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
  OuiListGroupItem,
  OuiListGroup,
} from '../../../../src/components/list_group';
import { OuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <>
    <OuiListGroup>
      <OuiListGroupItem
        href="https://oui.opensearch.org/latest/"
        label="Inherit by default (xs)"
        size="xs"
      />

      <OuiListGroupItem
        onClick={() => {}}
        label="Primary (s)"
        color="primary"
        size="s"
      />

      <OuiListGroupItem
        href="https://oui.opensearch.org/latest/"
        label="Text (m)"
        color="text"
      />

      <OuiListGroupItem
        href="https://oui.opensearch.org/latest/"
        label="Subdued (l)"
        color="subdued"
        size="l"
      />
    </OuiListGroup>

    <OuiSpacer size="s" />

    <OuiListGroup style={{ background: 'black' }}>
      <OuiListGroupItem
        href="https://oui.opensearch.org/latest/"
        label="Ghost"
        color="ghost"
      />
    </OuiListGroup>
  </>
);
