/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// @ts-ignore — GuidePage is a JS-only module without type declarations
import { GuidePage } from '../../components';

import { OuiText } from '../../../../src/components/text';
import { OuiSpacer } from '../../../../src/components/spacer';
import { OuiTitle } from '../../../../src/components/title';
import { OuiHorizontalRule } from '../../../../src/components/horizontal_rule';
import { OuiFlexGroup, OuiFlexItem } from '../../../../src/components/flex';
import { OuiPanel } from '../../../../src/components/panel';
import { OuiCode } from '../../../../src/components/code';
import { OuiCallOut } from '../../../../src/components/call_out';
import {
  OuiTable,
  OuiTableHeader,
  OuiTableHeaderCell,
  OuiTableBody,
  OuiTableRow,
  OuiTableRowCell,
} from '../../../../src/components/table';

interface ContentPageProps {
  selectedTheme: string;
}

interface ElevationLevel {
  level: number;
  variable: string;
  description: string;
  cssValue: string;
}

const lightElevationLevels: ElevationLevel[] = [
  {
    level: 0,
    variable: 'none',
    description:
      'Flat — no elevation. Used for inline content and flush surfaces.',
    cssValue: 'none',
  },
  {
    level: 1,
    variable: '$ouiShadow1',
    description: 'Subtle lift — cards, panels, and resting surfaces.',
    cssValue: '0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.32)',
  },
  {
    level: 2,
    variable: '$ouiShadow2',
    description: 'Hover state — interactive cards and raised buttons.',
    cssValue: '0 0 1px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.32)',
  },
  {
    level: 3,
    variable: '$ouiShadow3',
    description: 'Popovers, dropdowns, and floating menus.',
    cssValue: '0 0 1px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.32)',
  },
  {
    level: 4,
    variable: '$ouiShadow4',
    description: 'Sticky headers, toolbars, and navigation bars.',
    cssValue: '0 0 1px rgba(0,0,0,0.1), 0 3px 12px rgba(0,0,0,0.32)',
  },
  {
    level: 5,
    variable: '$ouiShadow5',
    description: 'Modals, dialogs, and high-priority overlays.',
    cssValue: '0 0 1px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.32)',
  },
  {
    level: 6,
    variable: '$ouiShadow6',
    description: 'Toasts, notifications, and top-level alerts.',
    cssValue: '0 0 1px rgba(0,0,0,0.1), 0 5px 24px rgba(0,0,0,0.32)',
  },
];

const darkElevationLevels: ElevationLevel[] = [
  {
    level: 0,
    variable: 'none',
    description:
      'Flat — no elevation. Used for inline content and flush surfaces.',
    cssValue: 'none',
  },
  {
    level: 1,
    variable: '$ouiShadow1',
    description: 'Subtle lift — cards, panels, and resting surfaces.',
    cssValue:
      '0 0 1px rgba(161,161,170,0.12), 0 0 0 1px rgba(161,161,170,0.06), 0 1px 4px rgba(0,0,0,0.9)',
  },
  {
    level: 2,
    variable: '$ouiShadow2',
    description: 'Hover state — interactive cards and raised buttons.',
    cssValue:
      '0 0 1px rgba(161,161,170,0.12), 0 0 0 1px rgba(161,161,170,0.06), 0 2px 8px rgba(0,0,0,0.9)',
  },
  {
    level: 3,
    variable: '$ouiShadow3',
    description: 'Popovers, dropdowns, and floating menus.',
    cssValue:
      '0 0 1px rgba(161,161,170,0.12), 0 0 0 1px rgba(161,161,170,0.06), 0 4px 16px rgba(0,0,0,0.9)',
  },
  {
    level: 4,
    variable: '$ouiShadow4',
    description: 'Sticky headers, toolbars, and navigation bars.',
    cssValue:
      '0 0 1px rgba(161,161,170,0.12), 0 0 0 1px rgba(161,161,170,0.06), 0 6px 24px rgba(0,0,0,0.9)',
  },
  {
    level: 5,
    variable: '$ouiShadow5',
    description: 'Modals, dialogs, and high-priority overlays.',
    cssValue:
      '0 0 1px rgba(161,161,170,0.12), 0 0 0 1px rgba(161,161,170,0.06), 0 8px 32px rgba(0,0,0,0.9)',
  },
  {
    level: 6,
    variable: '$ouiShadow6',
    description: 'Toasts, notifications, and top-level alerts.',
    cssValue:
      '0 0 1px rgba(161,161,170,0.12), 0 0 0 1px rgba(161,161,170,0.06), 0 12px 48px rgba(0,0,0,0.9)',
  },
];

/**
 * Renders a panel with the given elevation shadow applied so users can
 * visually compare each level.
 */
const ElevationPanel: React.FC<{
  elevation: ElevationLevel;
  isDark: boolean;
}> = ({ elevation, isDark }) => {
  const bgColor = isDark ? '#1C1C22' : '#FFFFFF';
  const borderColor = isDark ? '#2E2E36' : '#E2E8F0';

  return (
    <OuiFlexItem style={{ minWidth: 280, maxWidth: 400 }}>
      <div
        style={{
          backgroundColor: bgColor,
          borderRadius: 8,
          border: `1px solid ${borderColor}`,
          boxShadow:
            elevation.cssValue === 'none' ? 'none' : elevation.cssValue,
          padding: 24,
          minHeight: 120,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <div>
          <OuiText size="s">
            <p style={{ margin: 0 }}>
              <strong>Level {elevation.level}</strong>
            </p>
          </OuiText>
          <OuiSpacer size="xs" />
          <OuiText size="xs" color="subdued">
            <p style={{ margin: 0 }}>{elevation.description}</p>
          </OuiText>
        </div>
        <div style={{ marginTop: 12 }}>
          {elevation.variable !== 'none' ? (
            <OuiCode transparentBackground>{elevation.variable}</OuiCode>
          ) : (
            <OuiText size="xs" color="subdued">
              <em>No shadow token</em>
            </OuiText>
          )}
        </div>
      </div>
    </OuiFlexItem>
  );
};

const FoundationsElevation: React.FC<ContentPageProps> = ({
  selectedTheme,
}) => {
  const isV9 = selectedTheme.includes('v9');
  const isDark = selectedTheme.includes('dark');
  const elevationLevels = isDark ? darkElevationLevels : lightElevationLevels;

  return (
    <GuidePage title="Elevation">
      <OuiText grow={false}>
        <h2>V9 elevation system</h2>
        <p>
          The v9 theme introduces a structured elevation system with seven
          levels (0–6). Each level applies a progressively stronger box-shadow
          to communicate depth and layering in the interface. Elevation helps
          users understand which elements sit above others, guiding focus toward
          floating surfaces like popovers, modals, and notifications.
        </p>
      </OuiText>

      <OuiSpacer size="l" />

      <OuiCallOut
        title={
          isDark
            ? 'Viewing dark mode shadow values'
            : 'Viewing light mode shadow values'
        }
        iconType="iInCircle"
        color="primary"
        size="s">
        <OuiText size="xs">
          <p>
            The panels below show {isDark ? 'dark' : 'light'} mode shadows.
            {isDark
              ? ' Dark mode uses a subtle light-ring glow plus stronger shadows for visibility against dark backgrounds.'
              : ' Light mode uses a subtle base shadow layer with increasing blur radius.'}{' '}
            Switch the theme to see {isDark ? 'light' : 'dark'} mode values.
          </p>
        </OuiText>
      </OuiCallOut>

      <OuiSpacer size="xxl" />

      {/* Visual elevation panels */}
      <OuiTitle size="xs">
        <h3>Elevation levels</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s" color="subdued">
        <p>
          Each panel below has its shadow applied directly so you can see the
          visual difference between levels. Level 0 is flat with no shadow,
          while level 6 provides the strongest elevation.
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      <OuiFlexGroup wrap gutterSize="l">
        {elevationLevels.map((elevation) => (
          <ElevationPanel
            key={elevation.level}
            elevation={elevation}
            isDark={isDark}
          />
        ))}
      </OuiFlexGroup>

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Shadow token reference table */}
      <OuiTitle size="xs">
        <h3>Token reference</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s" color="subdued">
        <p>
          Complete elevation scale with SCSS variable names, CSS shadow values,
          and recommended usage contexts.
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      <OuiTable>
        <OuiTableHeader>
          <OuiTableHeaderCell>Level</OuiTableHeaderCell>
          <OuiTableHeaderCell>Variable</OuiTableHeaderCell>
          <OuiTableHeaderCell>Usage</OuiTableHeaderCell>
        </OuiTableHeader>
        <OuiTableBody>
          {elevationLevels.map((elevation) => (
            <OuiTableRow key={elevation.level}>
              <OuiTableRowCell>{elevation.level}</OuiTableRowCell>
              <OuiTableRowCell>
                {elevation.variable !== 'none' ? (
                  <OuiCode transparentBackground>{elevation.variable}</OuiCode>
                ) : (
                  '—'
                )}
              </OuiTableRowCell>
              <OuiTableRowCell>{elevation.description}</OuiTableRowCell>
            </OuiTableRow>
          ))}
        </OuiTableBody>
      </OuiTable>

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* SCSS mixin usage */}
      <OuiTitle size="xs">
        <h3>Using elevation in SCSS</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s">
        <p>
          Apply elevation using the{' '}
          <OuiCode transparentBackground>ouiElevation()</OuiCode> mixin, which
          maps a numeric level to the corresponding shadow token:
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      <OuiPanel paddingSize="m" color="subdued">
        <OuiText size="s">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {`.my-card {
  @include ouiElevation(1); // Resting card
}

.my-card:hover {
  @include ouiElevation(2); // Raised on hover
}

.my-popover {
  @include ouiElevation(3); // Floating popover
}

.my-modal {
  @include ouiElevation(5); // High-priority overlay
}`}
          </pre>
        </OuiText>
      </OuiPanel>

      <OuiSpacer size="l" />

      <OuiText size="s">
        <p>
          For components that create a local stacking context, combine elevation
          with the <OuiCode transparentBackground>ouiLocalElevation</OuiCode>{' '}
          mixin:
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      <OuiPanel paddingSize="m" color="subdued">
        <OuiText size="s">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {`.my-dropdown-container {
  @include ouiLocalElevation; // isolation: isolate
  
  .my-dropdown-menu {
    @include ouiElevation(3);
    z-index: $ouiLocalZIndex2;
  }
}`}
          </pre>
        </OuiText>
      </OuiPanel>

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Layering guidance */}
      <OuiTitle size="xs">
        <h3>Layering guidance</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s">
        <p>
          Elevation levels should be applied consistently based on the
          element&apos;s role in the interface hierarchy. Follow these
          guidelines to maintain a predictable depth model:
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      <OuiPanel paddingSize="m">
        <OuiTitle size="xxs">
          <h4>Layer hierarchy</h4>
        </OuiTitle>
        <OuiSpacer size="s" />
        <OuiTable>
          <OuiTableHeader>
            <OuiTableHeaderCell>Layer</OuiTableHeaderCell>
            <OuiTableHeaderCell>Elevation</OuiTableHeaderCell>
            <OuiTableHeaderCell>Examples</OuiTableHeaderCell>
          </OuiTableHeader>
          <OuiTableBody>
            <OuiTableRow>
              <OuiTableRowCell>
                <strong>Page surface</strong>
              </OuiTableRowCell>
              <OuiTableRowCell>Level 0</OuiTableRowCell>
              <OuiTableRowCell>
                Page background, inline content, flush sections
              </OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <strong>Resting surfaces</strong>
              </OuiTableRowCell>
              <OuiTableRowCell>Level 1</OuiTableRowCell>
              <OuiTableRowCell>
                Cards, panels, data grid containers, form groups
              </OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <strong>Interactive surfaces</strong>
              </OuiTableRowCell>
              <OuiTableRowCell>Level 2</OuiTableRowCell>
              <OuiTableRowCell>
                Hovered cards, raised buttons, draggable items
              </OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <strong>Floating elements</strong>
              </OuiTableRowCell>
              <OuiTableRowCell>Level 3</OuiTableRowCell>
              <OuiTableRowCell>
                Popovers, dropdowns, tooltips, context menus
              </OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <strong>Sticky elements</strong>
              </OuiTableRowCell>
              <OuiTableRowCell>Level 4</OuiTableRowCell>
              <OuiTableRowCell>
                Sticky headers, fixed toolbars, navigation bars
              </OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <strong>Overlays</strong>
              </OuiTableRowCell>
              <OuiTableRowCell>Level 5</OuiTableRowCell>
              <OuiTableRowCell>
                Modals, dialogs, full-screen overlays, flyouts
              </OuiTableRowCell>
            </OuiTableRow>
            <OuiTableRow>
              <OuiTableRowCell>
                <strong>Notifications</strong>
              </OuiTableRowCell>
              <OuiTableRowCell>Level 6</OuiTableRowCell>
              <OuiTableRowCell>
                Toasts, system alerts, top-level notifications
              </OuiTableRowCell>
            </OuiTableRow>
          </OuiTableBody>
        </OuiTable>
      </OuiPanel>

      <OuiSpacer size="l" />

      <OuiText size="s">
        <ul>
          <li>
            <strong>Never skip more than one level</strong> when transitioning
            between states. For example, a card at level 1 should rise to level
            2 on hover, not jump to level 4.
          </li>
          <li>
            <strong>Use local stacking contexts</strong> (
            <OuiCode transparentBackground>ouiLocalElevation</OuiCode>) to
            prevent z-index conflicts between independent component trees. This
            uses <OuiCode transparentBackground>isolation: isolate</OuiCode> to
            scope z-index values.
          </li>
          <li>
            <strong>Pair elevation with background color</strong> changes in
            dark mode. Elevated surfaces should use a slightly lighter
            background to reinforce the sense of depth, since shadows are less
            visible against dark backgrounds.
          </li>
          <li>
            <strong>Keep the page surface flat</strong> (level 0). Only elements
            that need to communicate layering — cards, popovers, modals — should
            receive elevation.
          </li>
          <li>
            <strong>Avoid stacking elevated elements</strong> unnecessarily. If
            a popover opens from within a modal, the popover should use level 3
            relative to its local context, not level 6.
          </li>
        </ul>
      </OuiText>

      {isV9 && (
        <>
          <OuiSpacer size="xxl" />
          <OuiHorizontalRule />
          <OuiSpacer size="xxl" />

          <OuiCallOut
            title="V9 elevation design rationale"
            iconType="iInCircle"
            color="primary">
            <OuiText size="s">
              <p>
                The v9 elevation system uses a layered shadow approach: a
                constant base shadow (
                <OuiCode transparentBackground>$ouiShadowBase</OuiCode>)
                provides a subtle outline at every level, while the primary
                shadow layer increases in offset and blur from level 1 to 6. In
                dark mode, the base layer switches to a light-ring glow using
                zinc-400 tones so that elevated surfaces remain perceptible
                against dark backgrounds. Shadow opacity increases from 0.32
                (light) to 0.90 (dark) to compensate for reduced contrast.
              </p>
            </OuiText>
          </OuiCallOut>
        </>
      )}

      <OuiSpacer size="xxl" />
    </GuidePage>
  );
};

export default FoundationsElevation;
