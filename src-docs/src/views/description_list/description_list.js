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
  OuiDescriptionList,
  OuiFlexItem,
  OuiFlexGroup,
  OuiDescriptionListTitle,
  OuiDescriptionListDescription,
} from '../../../../src/components';

const list = [
  {
    title: 'Item 1',
    description:
      'Aliqua reprehenderit voluptate laborum sit irure proident veniam sint laborum amet elit.',
  },
  {
    title: 'Item 2',
    description:
      'Officia nostrud pariatur sint pariatur ea esse non ea tempor laboris sint.',
  },
  {
    title: 'Item 3',
    description: 'Qui ea duis veniam nisi commodo laborum.',
  },
];
export default () => (
  <OuiFlexGroup>
    <OuiFlexItem>
      <OuiDescriptionList listItems={list} />
    </OuiFlexItem>
    <OuiFlexItem>
      <OuiDescriptionList>
        <OuiDescriptionListTitle>List item 1</OuiDescriptionListTitle>
        <OuiDescriptionListDescription>
          Voluptate aliqua officia excepteur labore anim non aute tempor id
          commodo pariatur exercitation sunt.
        </OuiDescriptionListDescription>
        <OuiDescriptionListTitle>List item 2</OuiDescriptionListTitle>
        <OuiDescriptionListDescription>
          Sunt mollit commodo do occaecat do dolor.
        </OuiDescriptionListDescription>
      </OuiDescriptionList>
    </OuiFlexItem>
  </OuiFlexGroup>
);
