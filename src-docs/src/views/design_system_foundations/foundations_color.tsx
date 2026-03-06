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
} from '../../../../src/components';

interface ContentPageProps {
  selectedTheme: string;
}

interface ColorToken {
  name: string;
  cssVar: string;
  lightValue: string;
  darkValue: string;
  description: string;
  category:
    | 'core'
    | 'status'
    | 'shade'
    | 'background'
    | 'text'
    | 'visualization';
}

const coreColors: ColorToken[] = [
  {
    name: 'ouiColorPrimary',
    cssVar: '$ouiColorPrimary',
    lightValue: '#2563EB',
    darkValue: '#3B82F6',
    description: 'Primary brand color for actions, links, and focus states',
    category: 'core',
  },
  {
    name: 'ouiColorSecondary',
    cssVar: '$ouiColorSecondary',
    lightValue: '#059669',
    darkValue: '#10B981',
    description: 'Secondary color for positive actions and confirmations',
    category: 'core',
  },
  {
    name: 'ouiColorAccent',
    cssVar: '$ouiColorAccent',
    lightValue: '#7C3AED',
    darkValue: '#A78BFA',
    description: 'Accent color for highlights and decorative elements',
    category: 'core',
  },
];

const statusColors: ColorToken[] = [
  {
    name: 'ouiColorSuccess',
    cssVar: '$ouiColorSuccess',
    lightValue: '#10B981',
    darkValue: '#10B981',
    description: 'Indicates successful operations or healthy status',
    category: 'status',
  },
  {
    name: 'ouiColorWarning',
    cssVar: '$ouiColorWarning',
    lightValue: '#F59E0B',
    darkValue: '#FBBF24',
    description: 'Indicates warnings or items needing attention',
    category: 'status',
  },
  {
    name: 'ouiColorDanger',
    cssVar: '$ouiColorDanger',
    lightValue: '#EF4444',
    darkValue: '#F87171',
    description: 'Indicates errors, destructive actions, or critical alerts',
    category: 'status',
  },
];

const shadeColors: ColorToken[] = [
  {
    name: 'ouiColorEmptyShade',
    cssVar: '$ouiColorEmptyShade',
    lightValue: '#FFFFFF',
    darkValue: '#141418',
    description: 'Lightest shade — card and panel surfaces',
    category: 'shade',
  },
  {
    name: 'ouiColorLightestShade',
    cssVar: '$ouiColorLightestShade',
    lightValue: '#F8FAFC',
    darkValue: '#1C1C22',
    description: 'Subtle backgrounds, code blocks',
    category: 'shade',
  },
  {
    name: 'ouiColorLightShade',
    cssVar: '$ouiColorLightShade',
    lightValue: '#E2E8F0',
    darkValue: '#2E2E36',
    description: 'Borders, dividers, and separators',
    category: 'shade',
  },
  {
    name: 'ouiColorMediumShade',
    cssVar: '$ouiColorMediumShade',
    lightValue: '#94A3B8',
    darkValue: '#71717A',
    description: 'Muted UI elements, placeholder text',
    category: 'shade',
  },
  {
    name: 'ouiColorDarkShade',
    cssVar: '$ouiColorDarkShade',
    lightValue: '#475569',
    darkValue: '#A1A1AA',
    description: 'Secondary text, icons',
    category: 'shade',
  },
  {
    name: 'ouiColorDarkestShade',
    cssVar: '$ouiColorDarkestShade',
    lightValue: '#1E293B',
    darkValue: '#E4E4E7',
    description: 'High-contrast foreground elements',
    category: 'shade',
  },
  {
    name: 'ouiColorFullShade',
    cssVar: '$ouiColorFullShade',
    lightValue: '#0F172A',
    darkValue: '#FAFAFA',
    description: 'Maximum contrast foreground',
    category: 'shade',
  },
];

const backgroundColors: ColorToken[] = [
  {
    name: 'ouiPageBackgroundColor',
    cssVar: '$ouiPageBackgroundColor',
    lightValue: '#F8FAFC',
    darkValue: '#09090B',
    description: 'Page-level background color',
    category: 'background',
  },
  {
    name: 'ouiColorHighlight',
    cssVar: '$ouiColorHighlight',
    lightValue: '#FEF3C7',
    darkValue: '#422006',
    description: 'Highlight background for search matches and emphasis',
    category: 'background',
  },
  {
    name: 'ouiColorGhost',
    cssVar: '$ouiColorGhost',
    lightValue: '#FCFEFF',
    darkValue: '#E3E5E9',
    description: 'Ghost color — stays consistent across themes',
    category: 'background',
  },
  {
    name: 'ouiColorInk',
    cssVar: '$ouiColorInk',
    lightValue: '#02020E',
    darkValue: '#02020E',
    description: 'Ink color — stays consistent across themes',
    category: 'background',
  },
];

const textColors: ColorToken[] = [
  {
    name: 'ouiTextColor',
    cssVar: '$ouiTextColor',
    lightValue: '#1E293B',
    darkValue: '#D4D4D8',
    description: 'Default body text color',
    category: 'text',
  },
  {
    name: 'ouiTitleColor',
    cssVar: '$ouiTitleColor',
    lightValue: '#0F1524',
    darkValue: '#F4F4F5',
    description: 'Heading and title text color',
    category: 'text',
  },
  {
    name: 'ouiTextSubduedColor',
    cssVar: '$ouiTextSubduedColor',
    lightValue: '#69707D',
    darkValue: '#A1A1AA',
    description: 'Subdued text for secondary information',
    category: 'text',
  },
];

const visualizationColors: ColorToken[] = [
  {
    name: 'ouiColorVis0',
    cssVar: '$ouiColorVis0',
    lightValue: '#54B399',
    darkValue: '#54B399',
    description: 'Visualization series color 1 — teal',
    category: 'visualization',
  },
  {
    name: 'ouiColorVis1',
    cssVar: '$ouiColorVis1',
    lightValue: '#6092C0',
    darkValue: '#6092C0',
    description: 'Visualization series color 2 — blue',
    category: 'visualization',
  },
  {
    name: 'ouiColorVis2',
    cssVar: '$ouiColorVis2',
    lightValue: '#D36086',
    darkValue: '#D36086',
    description: 'Visualization series color 3 — pink',
    category: 'visualization',
  },
  {
    name: 'ouiColorVis3',
    cssVar: '$ouiColorVis3',
    lightValue: '#9170B8',
    darkValue: '#9170B8',
    description: 'Visualization series color 4 — purple',
    category: 'visualization',
  },
  {
    name: 'ouiColorVis4',
    cssVar: '$ouiColorVis4',
    lightValue: '#CA8EAE',
    darkValue: '#CA8EAE',
    description: 'Visualization series color 5 — mauve',
    category: 'visualization',
  },
  {
    name: 'ouiColorVis5',
    cssVar: '$ouiColorVis5',
    lightValue: '#D6BF57',
    darkValue: '#D6BF57',
    description: 'Visualization series color 6 — yellow',
    category: 'visualization',
  },
  {
    name: 'ouiColorVis6',
    cssVar: '$ouiColorVis6',
    lightValue: '#B9A888',
    darkValue: '#B9A888',
    description: 'Visualization series color 7 — tan',
    category: 'visualization',
  },
  {
    name: 'ouiColorVis7',
    cssVar: '$ouiColorVis7',
    lightValue: '#DA8B45',
    darkValue: '#DA8B45',
    description: 'Visualization series color 8 — orange',
    category: 'visualization',
  },
  {
    name: 'ouiColorVis8',
    cssVar: '$ouiColorVis8',
    lightValue: '#AA6556',
    darkValue: '#AA6556',
    description: 'Visualization series color 9 — brown',
    category: 'visualization',
  },
  {
    name: 'ouiColorVis9',
    cssVar: '$ouiColorVis9',
    lightValue: '#E7664C',
    darkValue: '#E7664C',
    description: 'Visualization series color 10 — red-orange',
    category: 'visualization',
  },
];

const ColorSwatch: React.FC<{
  token: ColorToken;
  isDark: boolean;
}> = ({ token, isDark }) => {
  const hexValue = isDark ? token.darkValue : token.lightValue;
  const isLightColor = isColorLight(hexValue);

  return (
    <OuiFlexItem style={{ minWidth: 200, maxWidth: 280 }}>
      <OuiPanel paddingSize="none" style={{ overflow: 'hidden' }}>
        <div
          style={{
            backgroundColor: hexValue,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: hexValue === '#FFFFFF' ? '1px solid #E2E8F0' : undefined,
          }}>
          <OuiText
            size="xs"
            style={{
              color: isLightColor ? '#0F172A' : '#FAFAFA',
              fontWeight: 600,
            }}>
            <p>{hexValue}</p>
          </OuiText>
        </div>
        <div style={{ padding: '8px 12px' }}>
          <OuiText size="xs">
            <p>
              <strong>{token.name}</strong>
            </p>
          </OuiText>
          <OuiText size="xs" color="subdued">
            <p>
              <OuiCode transparentBackground>{token.cssVar}</OuiCode>
            </p>
          </OuiText>
          <OuiSpacer size="xs" />
          <OuiText size="xs" color="subdued">
            <p>{token.description}</p>
          </OuiText>
        </div>
      </OuiPanel>
    </OuiFlexItem>
  );
};

/**
 * Simple heuristic to determine if a hex color is light or dark,
 * used to pick contrasting text color on swatches.
 */
function isColorLight(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  // Perceived brightness formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}

const ColorCategory: React.FC<{
  title: string;
  description: string;
  tokens: ColorToken[];
  isDark: boolean;
}> = ({ title, description, tokens, isDark }) => (
  <>
    <OuiTitle size="xs">
      <h3>{title}</h3>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiText size="s" color="subdued">
      <p>{description}</p>
    </OuiText>
    <OuiSpacer size="m" />
    <OuiFlexGroup wrap gutterSize="m">
      {tokens.map((token) => (
        <ColorSwatch key={token.name} token={token} isDark={isDark} />
      ))}
    </OuiFlexGroup>
  </>
);

const FoundationsColor: React.FC<ContentPageProps> = ({ selectedTheme }) => {
  const isV9 = selectedTheme.includes('v9');
  const isDark = selectedTheme.includes('dark');

  return (
    <GuidePage title="Color">
      <OuiText grow={false}>
        <h2>V9 color palette</h2>
        <p>
          The v9 theme introduces a modernized color palette built on
          contemporary design principles. Colors are organized into semantic
          categories that communicate purpose and guide consistent usage across
          OpenSearch interfaces. Each token has distinct values for light and
          dark modes to ensure proper contrast and readability.
        </p>
      </OuiText>

      <OuiSpacer size="l" />

      <OuiCallOut
        title={
          isDark
            ? 'Viewing dark mode values'
            : 'Viewing light mode values'
        }
        iconType="iInCircle"
        color="primary"
        size="s">
        <OuiText size="xs">
          <p>
            The swatches below show {isDark ? 'dark' : 'light'} mode hex
            values. Switch the theme to see {isDark ? 'light' : 'dark'} mode
            values.
          </p>
        </OuiText>
      </OuiCallOut>

      <OuiSpacer size="xxl" />

      {/* Core colors */}
      <ColorCategory
        title="Core colors"
        description="Primary brand colors used for interactive elements, links, and key UI accents."
        tokens={coreColors}
        isDark={isDark}
      />

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Status colors */}
      <ColorCategory
        title="Status colors"
        description="Semantic colors that communicate state — success, warning, and danger. Used consistently across alerts, badges, toasts, and form validation."
        tokens={statusColors}
        isDark={isDark}
      />

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Shade colors */}
      <ColorCategory
        title="Shade colors"
        description="A neutral gray scale from lightest to darkest, used for backgrounds, borders, text, and layering. In dark mode the scale inverts to maintain proper contrast."
        tokens={shadeColors}
        isDark={isDark}
      />

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Background colors */}
      <ColorCategory
        title="Background colors"
        description="Page-level and special-purpose background colors including highlights, ghost, and ink tokens."
        tokens={backgroundColors}
        isDark={isDark}
      />

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Text colors */}
      <ColorCategory
        title="Text colors"
        description="Dedicated text colors for body copy, headings, and subdued secondary text. These ensure readable contrast against their respective background colors."
        tokens={textColors}
        isDark={isDark}
      />

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Visualization colors */}
      <ColorCategory
        title="Visualization colors"
        description="A color-blind-friendly palette for charts, graphs, and data visualizations. These colors are consistent across light and dark modes to maintain data series identity."
        tokens={visualizationColors}
        isDark={isDark}
      />

      {isV9 && (
        <>
          <OuiSpacer size="xxl" />
          <OuiHorizontalRule />
          <OuiSpacer size="xxl" />

          <OuiCallOut
            title="V9 color design rationale"
            iconType="iInCircle"
            color="primary">
            <OuiText size="s">
              <p>
                The v9 palette draws from modern design systems, using
                Tailwind-inspired color values for core and status tokens.
                Light mode uses warm slate-based neutrals for a softer feel,
                while dark mode uses cool zinc-based neutrals to reduce eye
                strain. Status colors are tuned for higher vibrancy in dark
                mode to maintain visibility against dark backgrounds.
              </p>
            </OuiText>
          </OuiCallOut>
        </>
      )}

      <OuiSpacer size="xxl" />
    </GuidePage>
  );
};

export default FoundationsColor;
