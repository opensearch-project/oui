/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

import { GuidePage } from '../../components';

import {
  OuiText,
  OuiSpacer,
  OuiTitle,
  OuiHorizontalRule,
  OuiFlexGroup,
  OuiFlexItem,
  OuiPanel,
  OuiCode,
  OuiCallOut,
  OuiTable,
  OuiTableHeader,
  OuiTableHeaderCell,
  OuiTableBody,
  OuiTableRow,
  OuiTableRowCell,
} from '../../../../src/components';

interface ContentPageProps {
  selectedTheme: string;
}

interface SpacingToken {
  name: string;
  variable: string;
  value: string;
  multiplier: string;
}

const spacingScale: SpacingToken[] = [
  {
    name: 'ouiSizeXXS',
    variable: '$ouiSizeXXS',
    value: '2px',
    multiplier: '0.125x',
  },
  {
    name: 'ouiSizeXS',
    variable: '$ouiSizeXS',
    value: '4px',
    multiplier: '0.25x',
  },
  {
    name: 'ouiSizeS',
    variable: '$ouiSizeS',
    value: '8px',
    multiplier: '0.5x',
  },
  {
    name: 'ouiSizeM',
    variable: '$ouiSizeM',
    value: '12px',
    multiplier: '0.75x',
  },
  {
    name: 'ouiSize',
    variable: '$ouiSize',
    value: '16px',
    multiplier: '1x (base)',
  },
  {
    name: 'ouiSizeL',
    variable: '$ouiSizeL',
    value: '24px',
    multiplier: '1.5x',
  },
  {
    name: 'ouiSizeXL',
    variable: '$ouiSizeXL',
    value: '32px',
    multiplier: '2x',
  },
  {
    name: 'ouiSizeXXL',
    variable: '$ouiSizeXXL',
    value: '40px',
    multiplier: '2.5x',
  },
];

/**
 * Renders a visual bar representing a spacing token value.
 */
const SpacingBar: React.FC<{
  token: SpacingToken;
}> = ({ token }) => {
  const pxValue = parseInt(token.value, 10);

  return (
    <OuiPanel paddingSize="s" style={{ marginBottom: 8 }}>
      <OuiFlexGroup alignItems="center" gutterSize="l">
        <OuiFlexItem grow={false} style={{ minWidth: 140 }}>
          <OuiText size="xs">
            <strong>{token.name}</strong>
          </OuiText>
          <OuiText size="xs" color="subdued">
            <OuiCode transparentBackground>{token.variable}</OuiCode>
          </OuiText>
        </OuiFlexItem>
        <OuiFlexItem grow={false} style={{ minWidth: 60, textAlign: 'right' }}>
          <OuiText size="xs" color="subdued">
            <p style={{ margin: 0 }}>{token.value}</p>
          </OuiText>
        </OuiFlexItem>
        <OuiFlexItem>
          <div
            style={{
              width: Math.max(pxValue * 4, 8),
              height: 24,
              backgroundColor: '#2563EB',
              borderRadius: 4,
              opacity: 0.8,
            }}
          />
        </OuiFlexItem>
        <OuiFlexItem grow={false} style={{ minWidth: 80, textAlign: 'right' }}>
          <OuiText size="xs" color="subdued">
            <p style={{ margin: 0 }}>{token.multiplier}</p>
          </OuiText>
        </OuiFlexItem>
      </OuiFlexGroup>
    </OuiPanel>
  );
};

/**
 * Renders a visual box demonstrating spacing as padding around content.
 */
const SpacingBox: React.FC<{
  token: SpacingToken;
}> = ({ token }) => {
  const pxValue = parseInt(token.value, 10);

  return (
    <OuiFlexItem style={{ minWidth: 120, maxWidth: 160 }}>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-block',
            padding: pxValue,
            backgroundColor: 'rgba(37, 99, 235, 0.15)',
            borderRadius: 4,
            border: '1px dashed rgba(37, 99, 235, 0.4)',
          }}>
          <div
            style={{
              width: 32,
              height: 32,
              backgroundColor: '#2563EB',
              borderRadius: 4,
              opacity: 0.8,
            }}
          />
        </div>
        <OuiSpacer size="xs" />
        <OuiText size="xs">
          <strong>{token.variable.replace('$', '')}</strong>
        </OuiText>
        <OuiText size="xs" color="subdued">
          <p>{token.value}</p>
        </OuiText>
      </div>
    </OuiFlexItem>
  );
};

const FoundationsSpacing: React.FC<ContentPageProps> = ({ selectedTheme }) => {
  const isV9 = selectedTheme.includes('v9');

  return (
    <GuidePage title="Spacing & Layout">
      <OuiText grow={false}>
        <h2>Spacing scale</h2>
        <p>
          OUI uses a base-16 spacing scale where all spacing values are derived
          from a 16px base unit (<OuiCode transparentBackground>$ouiSize</OuiCode>).
          This creates a consistent, predictable rhythm across all components
          and layouts. The scale ranges from 2px (XXS) to 40px (XXL), covering
          the full range of spacing needs from tight icon gaps to generous
          section padding.
        </p>
      </OuiText>

      <OuiSpacer size="l" />

      {isV9 && (
        <>
          <OuiCallOut
            title="V9 spacing tokens"
            iconType="iInCircle"
            color="primary"
            size="s">
            <OuiText size="xs">
              <p>
                The v9 theme uses the same base-16 spacing scale as the default
                theme. Spacing tokens remain consistent across themes to ensure
                layout stability when switching between themes.
              </p>
            </OuiText>
          </OuiCallOut>
          <OuiSpacer size="l" />
        </>
      )}

      {/* Visual spacing bars */}
      <OuiTitle size="xs">
        <h3>Visual scale</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s" color="subdued">
        <p>
          Each bar below is proportional to its token value, showing the
          relative size of each spacing step.
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      {spacingScale.map((token) => (
        <SpacingBar key={token.name} token={token} />
      ))}

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Spacing as padding visualization */}
      <OuiTitle size="xs">
        <h3>Spacing as padding</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s" color="subdued">
        <p>
          The dashed border shows the padding area around a fixed-size element,
          demonstrating how each token translates to visual breathing room.
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      <OuiFlexGroup wrap gutterSize="l">
        {spacingScale.map((token) => (
          <SpacingBox key={token.name} token={token} />
        ))}
      </OuiFlexGroup>

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Spacing reference table */}
      <OuiTitle size="xs">
        <h3>Token reference</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s" color="subdued">
        <p>
          Complete spacing scale with SCSS variable names, computed pixel
          values, and base multipliers.
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      <OuiTable>
        <OuiTableHeader>
          <OuiTableHeaderCell>Token</OuiTableHeaderCell>
          <OuiTableHeaderCell>Variable</OuiTableHeaderCell>
          <OuiTableHeaderCell>Value</OuiTableHeaderCell>
          <OuiTableHeaderCell>Multiplier</OuiTableHeaderCell>
        </OuiTableHeader>
        <OuiTableBody>
          {spacingScale.map((token) => (
            <OuiTableRow key={token.name}>
              <OuiTableRowCell>{token.name}</OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>{token.variable}</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>{token.value}</OuiTableRowCell>
              <OuiTableRowCell>{token.multiplier}</OuiTableRowCell>
            </OuiTableRow>
          ))}
        </OuiTableBody>
      </OuiTable>

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Layout grid conventions */}
      <OuiTitle size="xs">
        <h3>Layout grid conventions</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s">
        <p>
          OUI layouts are built using <strong>OuiFlexGroup</strong> and{' '}
          <strong>OuiFlexItem</strong> rather than a fixed-column CSS grid. This
          flex-based approach adapts naturally to varying content widths and
          responsive breakpoints.
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      <OuiPanel paddingSize="m">
        <OuiTitle size="xxs">
          <h4>Gutter sizes</h4>
        </OuiTitle>
        <OuiSpacer size="s" />
        <OuiText size="s" color="subdued">
          <p>
            <OuiCode transparentBackground>OuiFlexGroup</OuiCode> accepts a{' '}
            <OuiCode transparentBackground>gutterSize</OuiCode> prop that maps
            directly to spacing tokens:
          </p>
        </OuiText>
        <OuiSpacer size="s" />
        <OuiTable>
          <OuiTableHeader>
            <OuiTableHeaderCell>Gutter prop</OuiTableHeaderCell>
            <OuiTableHeaderCell>Spacing token</OuiTableHeaderCell>
            <OuiTableHeaderCell>Value</OuiTableHeaderCell>
            <OuiTableHeaderCell>Usage</OuiTableHeaderCell>
          </OuiTableHeader>
          <OuiTableBody>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>none</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>—</OuiTableRowCell>
              <OuiTableRowCell>0px</OuiTableRowCell>
              <OuiTableRowCell>No gap between items</OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>xs</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiSizeXS</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>4px</OuiTableRowCell>
              <OuiTableRowCell>Tight groupings, icon + label</OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>s</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiSizeS</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>8px</OuiTableRowCell>
              <OuiTableRowCell>Compact layouts, form rows</OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>m</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiSize</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>16px</OuiTableRowCell>
              <OuiTableRowCell>Default gap for most layouts</OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>l</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiSizeL</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>24px</OuiTableRowCell>
              <OuiTableRowCell>Card grids, section content</OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>xl</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiSizeXL</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>32px</OuiTableRowCell>
              <OuiTableRowCell>Wide layouts, dashboard panels</OuiTableRowCell>
            </OuiTableRow>
          </OuiTableBody>
        </OuiTable>
      </OuiPanel>

      <OuiSpacer size="l" />

      <OuiPanel paddingSize="m">
        <OuiTitle size="xxs">
          <h4>Panel padding</h4>
        </OuiTitle>
        <OuiSpacer size="s" />
        <OuiText size="s" color="subdued">
          <p>
            <OuiCode transparentBackground>OuiPanel</OuiCode> uses a{' '}
            <OuiCode transparentBackground>paddingSize</OuiCode> prop that maps
            to spacing tokens for consistent internal spacing:
          </p>
        </OuiText>
        <OuiSpacer size="s" />
        <OuiTable>
          <OuiTableHeader>
            <OuiTableHeaderCell>Padding prop</OuiTableHeaderCell>
            <OuiTableHeaderCell>Spacing token</OuiTableHeaderCell>
            <OuiTableHeaderCell>Value</OuiTableHeaderCell>
          </OuiTableHeader>
          <OuiTableBody>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>none</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>—</OuiTableRowCell>
              <OuiTableRowCell>0px</OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>s</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiSizeS</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>8px</OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>m</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiSize</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>16px</OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>l</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiSizeL</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>24px</OuiTableRowCell>
            </OuiTableRow>
          </OuiTableBody>
        </OuiTable>
      </OuiPanel>

      <OuiSpacer size="l" />

      <OuiPanel paddingSize="m">
        <OuiTitle size="xxs">
          <h4>Vertical spacing with OuiSpacer</h4>
        </OuiTitle>
        <OuiSpacer size="s" />
        <OuiText size="s" color="subdued">
          <p>
            Use <OuiCode transparentBackground>OuiSpacer</OuiCode> to add
            consistent vertical gaps between content sections. The{' '}
            <OuiCode transparentBackground>size</OuiCode> prop maps to the
            same spacing tokens:
          </p>
        </OuiText>
        <OuiSpacer size="s" />
        <OuiTable>
          <OuiTableHeader>
            <OuiTableHeaderCell>Size prop</OuiTableHeaderCell>
            <OuiTableHeaderCell>Spacing token</OuiTableHeaderCell>
            <OuiTableHeaderCell>Value</OuiTableHeaderCell>
            <OuiTableHeaderCell>Usage</OuiTableHeaderCell>
          </OuiTableHeader>
          <OuiTableBody>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>xs</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiSizeXS</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>4px</OuiTableRowCell>
              <OuiTableRowCell>Between tightly related elements</OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>s</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiSizeS</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>8px</OuiTableRowCell>
              <OuiTableRowCell>Between label and content</OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>m</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiSize</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>16px</OuiTableRowCell>
              <OuiTableRowCell>Default vertical gap</OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>l</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiSizeL</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>24px</OuiTableRowCell>
              <OuiTableRowCell>Between content groups</OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>xl</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiSizeXL</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>32px</OuiTableRowCell>
              <OuiTableRowCell>Between major sections</OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <OuiCode transparentBackground>xxl</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiSizeXXL</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>40px</OuiTableRowCell>
              <OuiTableRowCell>Page-level section breaks</OuiTableRowCell>
            </OuiTableRow>
          </OuiTableBody>
        </OuiTable>
      </OuiPanel>

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Spacing usage guidance */}
      <OuiTitle size="xs">
        <h3>Usage guidance</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s">
        <ul>
          <li>
            <strong>Always use spacing tokens</strong> instead of arbitrary
            pixel values. This ensures consistency and makes future scale
            adjustments possible.
          </li>
          <li>
            <strong>Use smaller tokens (XS, S)</strong> for related elements
            within a component — icon-to-label gaps, label-to-input spacing,
            and inline badge margins.
          </li>
          <li>
            <strong>Use the base token (M)</strong> as the default gap for
            flex layouts and panel padding. It provides comfortable spacing
            without wasting screen real estate.
          </li>
          <li>
            <strong>Use larger tokens (L, XL, XXL)</strong> to separate
            distinct content sections, page regions, and major layout areas.
          </li>
          <li>
            <strong>Prefer OUI layout components</strong> (
            <OuiCode transparentBackground>OuiFlexGroup</OuiCode>,{' '}
            <OuiCode transparentBackground>OuiSpacer</OuiCode>,{' '}
            <OuiCode transparentBackground>OuiPanel</OuiCode>) over manual
            CSS margins and padding. These components enforce the spacing
            scale automatically.
          </li>
        </ul>
      </OuiText>

      {isV9 && (
        <>
          <OuiSpacer size="xxl" />
          <OuiHorizontalRule />
          <OuiSpacer size="xxl" />

          <OuiCallOut
            title="V9 spacing design rationale"
            iconType="iInCircle"
            color="primary">
            <OuiText size="s">
              <p>
                The v9 theme retains the base-16 spacing scale to maintain
                layout compatibility with existing components. Because v9
                reduces the base font size from 16px to 14px, the relative
                proportion of spacing to text increases slightly, giving
                data-dense interfaces like log explorers and dashboards more
                visual breathing room without requiring layout changes.
              </p>
            </OuiText>
          </OuiCallOut>
        </>
      )}

      <OuiSpacer size="xxl" />
    </GuidePage>
  );
};

export default FoundationsSpacing;
