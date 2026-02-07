/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

import { OuiFlexGroup, OuiFlexItem } from '../../../../src/components/flex';
import { OuiPanel } from '../../../../src/components/panel';
import { OuiText } from '../../../../src/components/text';
import { OuiTitle } from '../../../../src/components/title';
import { OuiSpacer } from '../../../../src/components/spacer';

const shadowLevels = [
  {
    level: 1,
    shadow: '0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.32)',
    useCase: 'Small hovered elements (Buttons, Selects)',
  },
  {
    level: 2,
    shadow: '0 0 1px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.32)',
    useCase: 'Large hovered elements (dashboard widgets, Modals)',
  },
  {
    level: 3,
    shadow: '0 0 1px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.32)',
    useCase: 'DraggablePanes and Headers',
  },
  {
    level: 4,
    shadow: '0 0 1px rgba(0,0,0,0.1), 0 3px 12px rgba(0,0,0,0.32)',
    useCase: 'Facets, Popovers, SearchBars, Toasts',
  },
  {
    level: 5,
    shadow: '0 0 1px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.32)',
    useCase: 'Reserved (not currently used)',
  },
  {
    level: 6,
    shadow: '0 0 1px rgba(0,0,0,0.1), 0 5px 24px rgba(0,0,0,0.32)',
    useCase: 'SidePanels',
  },
];

export const ElevationShadows = () => (
  <OuiFlexGroup gutterSize="l" wrap>
    {shadowLevels.map(({ level, shadow, useCase }) => (
      <OuiFlexItem key={level} style={{ minWidth: 280 }} grow={false}>
        <OuiPanel
          hasShadow={false}
          hasBorder={false}
          style={{ boxShadow: shadow, padding: 24 }}>
          <OuiTitle size="s">
            <h3>Level {level}</h3>
          </OuiTitle>
          <OuiSpacer size="s" />
          <OuiText size="s">
            <p>{useCase}</p>
          </OuiText>
        </OuiPanel>
      </OuiFlexItem>
    ))}
  </OuiFlexGroup>
);

export default ElevationShadows;
