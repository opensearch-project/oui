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

interface TypeScaleEntry {
  label: string;
  variable: string;
  size: string;
  lineHeight: string;
  weight: string;
}

interface FontFamilyEntry {
  name: string;
  variable: string;
  value: string;
  usage: string;
}

interface FontWeightEntry {
  name: string;
  variable: string;
  value: number;
}

interface LetterSpacingEntry {
  name: string;
  variable: string;
  value: string;
}

const v9TypeScale: TypeScaleEntry[] = [
  {
    label: 'XXL (h1)',
    variable: '$ouiFontSizeXXL',
    size: '28px',
    lineHeight: '1.3',
    weight: '500 (Medium)',
  },
  {
    label: 'XL (h2)',
    variable: '$ouiFontSizeXL',
    size: '24px',
    lineHeight: '1.3',
    weight: '500 (Medium)',
  },
  {
    label: 'L (h3)',
    variable: '$ouiFontSizeL',
    size: '18px',
    lineHeight: '1.3',
    weight: '600 (SemiBold)',
  },
  {
    label: 'M (h4)',
    variable: '$ouiFontSizeM',
    size: '16px',
    lineHeight: '1.3',
    weight: '600 (SemiBold)',
  },
  {
    label: 'S — Base (body)',
    variable: '$ouiFontSizeS / $ouiFontSize',
    size: '14px',
    lineHeight: '1.6',
    weight: '400 (Regular)',
  },
  {
    label: 'XS (small)',
    variable: '$ouiFontSizeXS',
    size: '12px',
    lineHeight: '1.6',
    weight: '400 (Regular)',
  },
];

const defaultTypeScale: TypeScaleEntry[] = [
  {
    label: 'XXL (h1)',
    variable: '$ouiFontSizeXXL',
    size: '36px',
    lineHeight: 'baseline × 6',
    weight: '300 (Light)',
  },
  {
    label: 'XL (h2)',
    variable: '$ouiFontSizeXL',
    size: '28px',
    lineHeight: 'baseline × 5',
    weight: '300 (Light)',
  },
  {
    label: 'L (h3)',
    variable: '$ouiFontSizeL',
    size: '20px',
    lineHeight: 'baseline × 4',
    weight: '500 (Medium)',
  },
  {
    label: 'M (h4)',
    variable: '$ouiFontSizeM',
    size: '18px',
    lineHeight: 'baseline × 3',
    weight: '600 (SemiBold)',
  },
  {
    label: 'S — Base (body)',
    variable: '$ouiFontSize',
    size: '16px',
    lineHeight: '1.5',
    weight: '400 (Regular)',
  },
  {
    label: 'XS (small)',
    variable: '$ouiFontSizeXS',
    size: '12px',
    lineHeight: 'baseline × 3',
    weight: '400 (Regular)',
  },
];

const v9FontFamilies: FontFamilyEntry[] = [
  {
    name: 'Primary',
    variable: '$ouiFontFamily',
    value:
      "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    usage: 'All UI text, headings, labels, and body copy',
  },
  {
    name: 'Code',
    variable: '$ouiCodeFontFamily',
    value: "'Roboto Mono', Consolas, Menlo, Courier, monospace",
    usage: 'Code blocks, inline code, query editors, and log output',
  },
];

const defaultFontFamilies: FontFamilyEntry[] = [
  {
    name: 'Primary',
    variable: '$ouiFontFamily',
    value:
      "'Inter UI', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    usage: 'All UI text, headings, labels, and body copy',
  },
  {
    name: 'Code',
    variable: '$ouiCodeFontFamily',
    value: "'Roboto Mono', Consolas, Menlo, Courier, monospace",
    usage: 'Code blocks, inline code, query editors, and log output',
  },
];

const fontWeights: FontWeightEntry[] = [
  { name: 'Light', variable: '$ouiFontWeightLight', value: 300 },
  { name: 'Regular', variable: '$ouiFontWeightRegular', value: 400 },
  { name: 'Medium', variable: '$ouiFontWeightMedium', value: 500 },
  { name: 'SemiBold', variable: '$ouiFontWeightSemiBold', value: 600 },
  { name: 'Bold', variable: '$ouiFontWeightBold', value: 700 },
];

const letterSpacings: LetterSpacingEntry[] = [
  { name: 'Tight', variable: '$ouiLetterSpacingTight', value: '-0.01em' },
  { name: 'Normal', variable: '$ouiLetterSpacingNormal', value: '0' },
  { name: 'Wide', variable: '$ouiLetterSpacingWide', value: '0.02em' },
];

/**
 * Renders a live text sample at the given type scale entry's size and weight.
 */
const TypeScaleSample: React.FC<{
  entry: TypeScaleEntry;
  isV9: boolean;
}> = ({ entry, isV9 }) => {
  const sizeNum = parseInt(entry.size, 10);
  const weightNum = parseInt(entry.weight, 10);
  const fontFamily = isV9
    ? "'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    : "'Inter UI', -apple-system, BlinkMacSystemFont, sans-serif";

  return (
    <OuiPanel paddingSize="m" style={{ marginBottom: 8 }}>
      <OuiFlexGroup alignItems="center" gutterSize="l">
        <OuiFlexItem grow={false} style={{ minWidth: 160 }}>
          <OuiText size="xs">
            <strong>{entry.label}</strong>
          </OuiText>
          <OuiText size="xs" color="subdued">
            <OuiCode transparentBackground>{entry.variable}</OuiCode>
          </OuiText>
        </OuiFlexItem>
        <OuiFlexItem>
          <p
            style={{
              fontSize: sizeNum,
              fontWeight: weightNum,
              fontFamily,
              lineHeight: entry.lineHeight.startsWith('baseline')
                ? 1.5
                : parseFloat(entry.lineHeight),
              margin: 0,
            }}>
            The quick brown fox jumps over the lazy dog
          </p>
        </OuiFlexItem>
        <OuiFlexItem grow={false} style={{ minWidth: 120, textAlign: 'right' }}>
          <OuiText size="xs" color="subdued">
            <p style={{ margin: 0 }}>
              {entry.size} / {entry.weight.split(' ')[0]}
            </p>
          </OuiText>
        </OuiFlexItem>
      </OuiFlexGroup>
    </OuiPanel>
  );
};

const FoundationsTypography: React.FC<ContentPageProps> = ({
  selectedTheme,
}) => {
  const isV9 = selectedTheme.includes('v9');
  const typeScale = isV9 ? v9TypeScale : defaultTypeScale;
  const fontFamilies = isV9 ? v9FontFamilies : defaultFontFamilies;

  return (
    <GuidePage title="Typography">
      <OuiText grow={false}>
        <h2>{isV9 ? 'V9' : 'Default'} type scale</h2>
        <p>
          {isV9
            ? "The v9 theme uses a 14px base font size with 'Noto Sans' as the primary typeface. The type scale is built on a Major Third ratio, producing a compact, information-dense hierarchy suited for data-heavy interfaces like dashboards, log explorers, and query builders."
            : "The default theme uses a 16px base font size with 'Inter UI' as the primary typeface. The type scale is built on a Major Third ratio (1.250), providing clear visual hierarchy across headings and body text."}
        </p>
      </OuiText>

      <OuiSpacer size="l" />

      {isV9 && (
        <>
          <OuiCallOut
            title="V9 typography changes"
            iconType="iInCircle"
            color="primary"
            size="s">
            <OuiText size="xs">
              <p>
                V9 shifts the base font size from 16px to 14px and replaces
                Inter UI with Noto Sans. Headings use a consistent 1.3
                line-height with SemiBold or Medium weights, while body text
                uses a 1.6 line-height for improved readability at the smaller
                base size.
              </p>
            </OuiText>
          </OuiCallOut>
          <OuiSpacer size="l" />
        </>
      )}

      {/* Live type scale samples */}
      <OuiTitle size="xs">
        <h3>Type scale samples</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s" color="subdued">
        <p>
          Each sample below is rendered at its actual font size and weight so
          you can see the visual result.
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      {typeScale.map((entry) => (
        <TypeScaleSample key={entry.label} entry={entry} isV9={isV9} />
      ))}

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Type scale reference table */}
      <OuiTitle size="xs">
        <h3>Type scale reference</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s" color="subdued">
        <p>
          Complete type scale with SCSS variable names, computed sizes,
          line-heights, and default weights.
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      <OuiTable>
        <OuiTableHeader>
          <OuiTableHeaderCell>Level</OuiTableHeaderCell>
          <OuiTableHeaderCell>Variable</OuiTableHeaderCell>
          <OuiTableHeaderCell>Size</OuiTableHeaderCell>
          <OuiTableHeaderCell>Line height</OuiTableHeaderCell>
          <OuiTableHeaderCell>Weight</OuiTableHeaderCell>
        </OuiTableHeader>
        <OuiTableBody>
          {typeScale.map((entry) => (
            <OuiTableRow key={entry.label}>
              <OuiTableRowCell>{entry.label}</OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>{entry.variable}</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>{entry.size}</OuiTableRowCell>
              <OuiTableRowCell>{entry.lineHeight}</OuiTableRowCell>
              <OuiTableRowCell>{entry.weight}</OuiTableRowCell>
            </OuiTableRow>
          ))}
        </OuiTableBody>
      </OuiTable>

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Font families */}
      <OuiTitle size="xs">
        <h3>Font families</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s" color="subdued">
        <p>
          OUI uses two font stacks: a primary sans-serif family for all UI text
          and a monospace family for code.
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      {fontFamilies.map((family) => (
        <React.Fragment key={family.name}>
          <OuiPanel paddingSize="m">
            <OuiFlexGroup direction="column" gutterSize="xs">
              <OuiFlexItem>
                <OuiText size="s">
                  <strong>{family.name}</strong>
                </OuiText>
              </OuiFlexItem>
              <OuiFlexItem>
                <OuiText size="xs" color="subdued">
                  <OuiCode transparentBackground>{family.variable}</OuiCode>
                </OuiText>
              </OuiFlexItem>
              <OuiFlexItem>
                <p
                  style={{
                    fontFamily: (() => {
                      if (family.name === 'Code') {
                        return "'Roboto Mono', Consolas, Menlo, Courier, monospace";
                      }
                      return isV9
                        ? "'Noto Sans', sans-serif"
                        : "'Inter UI', sans-serif";
                    })(),
                    fontSize: 18,
                    margin: '8px 0',
                  }}>
                  The quick brown fox jumps over the lazy dog — 0123456789
                </p>
              </OuiFlexItem>
              <OuiFlexItem>
                <OuiText size="xs" color="subdued">
                  <p>{family.usage}</p>
                </OuiText>
              </OuiFlexItem>
              <OuiFlexItem>
                <OuiText size="xs" color="subdued">
                  <p>
                    <em>{family.value}</em>
                  </p>
                </OuiText>
              </OuiFlexItem>
            </OuiFlexGroup>
          </OuiPanel>
          <OuiSpacer size="m" />
        </React.Fragment>
      ))}

      <OuiSpacer size="l" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Font weights */}
      <OuiTitle size="xs">
        <h3>Font weights</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s" color="subdued">
        <p>
          Available font weight tokens.{' '}
          {isV9
            ? 'V9 headings primarily use Medium (500) and SemiBold (600) weights.'
            : 'Default theme headings use Light (300) through Bold (700) weights.'}
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      {fontWeights.map((fw) => (
        <OuiPanel key={fw.name} paddingSize="s" style={{ marginBottom: 8 }}>
          <OuiFlexGroup alignItems="center" gutterSize="l">
            <OuiFlexItem grow={false} style={{ minWidth: 160 }}>
              <OuiText size="xs">
                <strong>{fw.name}</strong>
              </OuiText>
              <OuiText size="xs" color="subdued">
                <OuiCode transparentBackground>{fw.variable}</OuiCode>
              </OuiText>
            </OuiFlexItem>
            <OuiFlexItem>
              <p
                style={{
                  fontWeight: fw.value,
                  fontSize: 16,
                  margin: 0,
                }}>
                The quick brown fox — {fw.value}
              </p>
            </OuiFlexItem>
          </OuiFlexGroup>
        </OuiPanel>
      ))}

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Line heights */}
      <OuiTitle size="xs">
        <h3>Line heights</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s" color="subdued">
        <p>Line height tokens control vertical rhythm and readability.</p>
      </OuiText>
      <OuiSpacer size="m" />

      <OuiTable>
        <OuiTableHeader>
          <OuiTableHeaderCell>Token</OuiTableHeaderCell>
          <OuiTableHeaderCell>Variable</OuiTableHeaderCell>
          <OuiTableHeaderCell>Value</OuiTableHeaderCell>
          <OuiTableHeaderCell>Usage</OuiTableHeaderCell>
        </OuiTableHeader>
        <OuiTableBody>
          <OuiTableRow>
            <OuiTableRowCell>Body line height</OuiTableRowCell>
            <OuiTableRowCell>
              <OuiCode transparentBackground>$ouiLineHeight</OuiCode>
            </OuiTableRowCell>
            <OuiTableRowCell>{isV9 ? '1.6' : '1.5'}</OuiTableRowCell>
            <OuiTableRowCell>Body text and paragraphs</OuiTableRowCell>
          </OuiTableRow>
          {isV9 && (
            <OuiTableRow>
              <OuiTableRowCell>Heading line height</OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>$ouiHeadingLineHeight</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>1.3</OuiTableRowCell>
              <OuiTableRowCell>All heading levels (h1–h6)</OuiTableRowCell>
            </OuiTableRow>
          )}
          <OuiTableRow>
            <OuiTableRowCell>Body reset</OuiTableRowCell>
            <OuiTableRowCell>
              <OuiCode transparentBackground>$ouiBodyLineHeight</OuiCode>
            </OuiTableRowCell>
            <OuiTableRowCell>1</OuiTableRowCell>
            <OuiTableRowCell>Reset value for the body element</OuiTableRowCell>
          </OuiTableRow>
        </OuiTableBody>
      </OuiTable>

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Letter spacing */}
      <OuiTitle size="xs">
        <h3>Letter spacing</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s" color="subdued">
        <p>
          Letter spacing tokens for fine-tuning text density and readability.
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      {letterSpacings.map((ls) => (
        <OuiPanel key={ls.name} paddingSize="s" style={{ marginBottom: 8 }}>
          <OuiFlexGroup alignItems="center" gutterSize="l">
            <OuiFlexItem grow={false} style={{ minWidth: 160 }}>
              <OuiText size="xs">
                <strong>{ls.name}</strong>
              </OuiText>
              <OuiText size="xs" color="subdued">
                <OuiCode transparentBackground>{ls.variable}</OuiCode>
              </OuiText>
            </OuiFlexItem>
            <OuiFlexItem>
              <p
                style={{
                  letterSpacing: ls.value,
                  fontSize: 16,
                  margin: 0,
                }}>
                The quick brown fox jumps over the lazy dog — {ls.value}
              </p>
            </OuiFlexItem>
          </OuiFlexGroup>
        </OuiPanel>
      ))}

      {isV9 && (
        <>
          <OuiSpacer size="xxl" />
          <OuiHorizontalRule />
          <OuiSpacer size="xxl" />

          <OuiCallOut
            title="V9 typography design rationale"
            iconType="iInCircle"
            color="primary">
            <OuiText size="s">
              <p>
                The v9 type scale is optimized for data-dense interfaces. The
                14px base size allows more content to fit on screen — critical
                for log explorers, trace views, and monitoring dashboards. Noto
                Sans provides excellent legibility at small sizes and broad
                Unicode coverage for internationalized content. Heading weights
                shift from Light (300) to Medium/SemiBold (500–600) for stronger
                visual anchoring in complex layouts.
              </p>
            </OuiText>
          </OuiCallOut>
        </>
      )}

      <OuiSpacer size="xxl" />
    </GuidePage>
  );
};

export default FoundationsTypography;
