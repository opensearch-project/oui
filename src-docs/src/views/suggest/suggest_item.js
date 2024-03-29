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

import { OuiSuggestItem, OuiSpacer } from '../../../../src/components';

const shortDescription = 'This is the description';

const longDescription =
  'This is a long description. Fusce ouismod dui eu metus sagittis molestie.';

const sampleItems = [
  {
    type: { iconType: 'kqlField', color: 'tint5' },
    label: 'Field sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlValue', color: 'tint0' },
    label: 'Value sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlSelector', color: 'tint3' },
    label: 'Conjunction sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlOperand', color: 'tint1' },
    label: 'Operator sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'search', color: 'tint10' },
    label: 'Recent search',
  },
  {
    type: { iconType: 'save', color: 'tint7' },
    label: 'Saved query',
  },
];

const sampleItems2 = [
  {
    type: { iconType: 'kqlField', color: 'tint5' },
    label: 'Field sample with label at 30%',
    labelWidth: 30,
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlField', color: 'tint5' },
    label: 'Field sample with label at 50%',
    labelWidth: 50,
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlField', color: 'tint5' },
    label: 'Field sample with label at 80%',
    labelWidth: 80,
    description: shortDescription,
  },
];

const typeObj = { iconType: 'kqlValue', color: 'tint0' };

const longLabel =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut quam.';

export default () => (
  <div style={{ maxWidth: '800px' }}>
    {sampleItems.map((item, index) => (
      <OuiSuggestItem
        type={item.type}
        key={index}
        label={item.label}
        description={item.description}
      />
    ))}
    <OuiSpacer size="m" />
    <OuiSuggestItem
      type={typeObj}
      label={longLabel}
      description="This item has a fixed width label"
    />
    <OuiSuggestItem
      type={typeObj}
      labelDisplay="expand"
      label={longLabel}
      description="This item will expand its label if needed"
    />
    <OuiSpacer size="m" />
    <OuiSuggestItem
      type={{ iconType: 'search', color: 'tint10' }}
      label="Items with no description will expand their label"
    />
    <OuiSpacer size="m" />
    {sampleItems2.map((item, index) => (
      <OuiSuggestItem
        type={item.type}
        key={index}
        labelWidth={item.labelWidth}
        label={item.label}
        description={item.description}
      />
    ))}
    <OuiSpacer size="m" />
    <OuiSuggestItem
      type={typeObj}
      label="Item with a description that truncates"
      description={longDescription}
    />
    <OuiSuggestItem
      type={typeObj}
      label="Item with a description that wraps"
      description={longDescription}
      descriptionDisplay="wrap"
    />
  </div>
);
