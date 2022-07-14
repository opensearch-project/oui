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

import { OuiListGroup, OuiListGroupItem } from '../../../../src/components';

export default () => (
  <OuiListGroup showToolTips>
    <OuiListGroupItem onClick={() => {}} label="First item" />

    <OuiListGroupItem onClick={() => {}} label="Second item" />

    <OuiListGroupItem
      onClick={() => {}}
      label={
        <span>
          Third very, very long item that <strong>will surely</strong> force
          truncation
        </span>
      }
    />

    <OuiListGroupItem
      onClick={() => {}}
      wrapText
      label="Fourth very, very long item with wrapping enabled that will not force truncation"
    />
  </OuiListGroup>
);
