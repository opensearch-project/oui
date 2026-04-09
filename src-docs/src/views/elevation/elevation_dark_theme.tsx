/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

import { OuiFlexGroup, OuiFlexItem } from '../../../../src/components/flex';
import { OuiText } from '../../../../src/components/text';
import { OuiTitle } from '../../../../src/components/title';
import { OuiSpacer } from '../../../../src/components/spacer';

export const ElevationDarkTheme = () => (
  <OuiFlexGroup gutterSize="l">
    <OuiFlexItem>
      {/* Light theme context */}
      <div style={{ padding: 24, background: '#fff', borderRadius: 6 }}>
        <OuiTitle size="xs">
          <h4>Light Theme</h4>
        </OuiTitle>
        <OuiSpacer size="m" />
        <div
          style={{
            backgroundColor: 'var(--oui-background-elevated)',
            border: '1px solid var(--oui-border-elevated)',
            padding: 16,
            borderRadius: 4,
          }}>
          <OuiText size="s">
            <p>
              Elevated surface — both <code>--oui-background-elevated</code> and{' '}
              <code>--oui-border-elevated</code> are{' '}
              <strong>transparent</strong> in light theme, so there is no
              visible effect.
            </p>
          </OuiText>
        </div>
      </div>
    </OuiFlexItem>
    <OuiFlexItem>
      {/* Dark theme context — override CSS custom properties */}
      <div
        style={
          {
            padding: 24,
            background: '#020617',
            borderRadius: 6,
            color: '#CBD5E1',
            '--oui-background-elevated': '#1E293B',
            '--oui-border-elevated': 'rgba(71, 85, 105, 0.5)',
          } as React.CSSProperties
        }>
        <OuiTitle size="xs">
          <h4 style={{ color: '#F1F5F9' }}>Dark Theme</h4>
        </OuiTitle>
        <OuiSpacer size="m" />
        <div
          style={{
            backgroundColor: 'var(--oui-background-elevated)',
            border: '1px solid var(--oui-border-elevated)',
            padding: 16,
            borderRadius: 4,
          }}>
          <OuiText size="s">
            <p style={{ color: '#CBD5E1' }}>
              Elevated surface — <code>--oui-background-elevated</code> is{' '}
              <strong>#1E293B</strong> (Slate-800) and{' '}
              <code>--oui-border-elevated</code> is{' '}
              <strong>rgba(71, 85, 105, 0.5)</strong> (Slate-600 at 50%),
              providing visible contrast in dark theme.
            </p>
          </OuiText>
        </div>
      </div>
    </OuiFlexItem>
  </OuiFlexGroup>
);

export default ElevationDarkTheme;
