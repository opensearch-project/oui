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

import { OuiSchemaItem } from '../../../../src/components/schema';
import { OuiFlexGroup, OuiFlexItem } from '../../../../src/components/flex';
import { OuiSpacer } from '../../../../src/components/spacer';

export default () => {
  const actions = [
    {
      iconType: 'trash',
      'aria-label': 'Delete',
      onClick: () => {},
      color: 'danger' as const,
    },
    {
      iconType: 'pencil',
      'aria-label': 'Edit',
      onClick: () => {},
      tooltip: {
        content: 'Edit',
        position: 'top' as const,
        delay: 'long' as const,
      },
    },
  ];

  const items = Array.from({ length: 5 }, (_, i) => ({
    key: `item${i}`,
    iconType: 'tokenShape',
    label: `Item no ${i + 1}`,
    actions,
  }));

  items.push({
    key: 'last',
    iconType: 'tokenShape',
    label: 'Item with a really long label that will wrap',
    actions,
  });

  return (
    <>
      <p>As a list</p>
      <OuiSpacer size="m" />
      <OuiFlexGroup
        style={{ width: '300px' }}
        direction="column"
        gutterSize="none">
        {items.map((item) => (
          <OuiFlexItem>
            <OuiSchemaItem {...item} compressed />
          </OuiFlexItem>
        ))}
      </OuiFlexGroup>
      <OuiSpacer size="m" />
      <p>With panels</p>
      <OuiSpacer size="m" />
      <OuiFlexGroup
        style={{ width: '300px' }}
        direction="column"
        gutterSize="s">
        {items.map((item) => (
          <OuiFlexItem>
            <OuiSchemaItem {...item} withPanel />
          </OuiFlexItem>
        ))}
      </OuiFlexGroup>
    </>
  );
};
