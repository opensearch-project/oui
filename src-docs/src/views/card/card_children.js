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
  OuiCard,
  OuiFlexGroup,
  OuiFlexItem,
  OuiCodeBlock,
  OuiRadioGroup,
  OuiText,
  OuiButton,
  OuiCode,
} from '../../../../src/components';

const radios = [
  {
    id: 'radios0',
    label: 'Option one',
  },
  {
    id: 'radios1',
    label: 'Option two',
  },
  {
    id: 'radios2',
    label: 'Option three',
    disabled: true,
  },
];

export default () => {
  return (
    <OuiFlexGroup gutterSize="l">
      <OuiFlexItem>
        <OuiCard
          textAlign="left"
          title="Lists"
          description={
            <span>
              Wrap a lists with <strong>OuiText size=&quot;s&quot;</strong> to
              match the description text.
            </span>
          }>
          <OuiText size="s">
            <ul>
              <li>Bullet 1</li>
              <li>Bullet 2</li>
              <li>Bullet 3</li>
            </ul>
          </OuiText>
        </OuiCard>
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiCard
          textAlign="left"
          title="Form controls"
          footer={
            <OuiFlexGroup justifyContent="flexEnd">
              <OuiFlexItem grow={false}>
                <OuiButton size="s" fill>
                  Send
                </OuiButton>
              </OuiFlexItem>
            </OuiFlexGroup>
          }>
          <OuiRadioGroup
            options={radios}
            idSelected={radios[0].id}
            onChange={() => {}}
            compressed
          />
        </OuiCard>
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiCard
          textAlign="left"
          title="Just about anything"
          description={
            <span>
              Just be sure not to add any <OuiCode>onClick</OuiCode> handler to
              the card if the children are also interactable.
            </span>
          }>
          <OuiCodeBlock language="html" paddingSize="s">
            {'<yoda>Hello, young Skywalker</yoda>'}
          </OuiCodeBlock>
        </OuiCard>
      </OuiFlexItem>
    </OuiFlexGroup>
  );
};
