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

import React, { useState } from 'react';
import {
  OuiResizableContainer,
  OuiListGroup,
  OuiListGroupItem,
  OuiPanel,
  OuiTitle,
  OuiSpacer,
  OuiText,
  OuiPage,
} from '../../../../src/components';
import { fake } from 'faker';

const texts = [];

for (let i = 0; i < 4; i++) {
  texts.push(<p>{fake('{{lorem.paragraph}}')}</p>);
}

export default () => {
  const items = [
    {
      id: 1,
      label: 'First item',
      text: texts[0],
    },
    {
      id: 2,
      label: 'Second item',
      text: texts[1],
    },
    {
      id: 3,
      label: 'Third item',
      text: texts[2],
    },
    {
      id: 4,
      label: 'Fourth item',
      text: texts[3],
    },
  ];

  const [itemSelected, setItemSelected] = useState(items[0]);
  const itemElements = items.map((item, index) => (
    <OuiListGroupItem
      key={index}
      onClick={() => setItemSelected(item)}
      label={item.label}
      size="s"
      isActive={item.id === itemSelected.id}
    />
  ));
  return (
    <OuiPage paddingSize="none">
      <OuiResizableContainer style={{ height: '320px' }}>
        {(OuiResizablePanel, OuiResizableButton) => (
          <>
            <OuiResizablePanel
              mode={[
                'collapsible',
                {
                  className: 'panel-toggle',
                  'data-test-subj': 'panel-1-toggle',
                  position: 'top',
                },
              ]}
              initialSize={20}
              minSize="10%">
              <OuiListGroup flush>{itemElements}</OuiListGroup>
            </OuiResizablePanel>

            <OuiResizableButton />

            <OuiResizablePanel mode="main" initialSize={60} minSize="20%">
              <OuiPanel paddingSize="l" style={{ minHeight: '100%' }}>
                <OuiTitle>
                  <p>{itemSelected.label}</p>
                </OuiTitle>
                <OuiSpacer />
                <OuiText>{itemSelected.text}</OuiText>
              </OuiPanel>
            </OuiResizablePanel>

            <OuiResizableButton />

            <OuiResizablePanel
              mode={[
                'collapsible',
                {
                  className: 'panel-toggle',
                  'data-test-subj': 'panel-3-toggle',
                  position: 'bottom',
                },
              ]}
              initialSize={20}
              minSize="10%">
              <OuiListGroup flush>{itemElements}</OuiListGroup>
            </OuiResizablePanel>
          </>
        )}
      </OuiResizableContainer>
    </OuiPage>
  );
};
