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
  OuiIcon,
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

interface IconEntry {
  type: string;
  label: string;
}

const navigationIcons: IconEntry[] = [
  { type: 'arrowRight', label: 'arrowRight' },
  { type: 'arrowLeft', label: 'arrowLeft' },
  { type: 'arrowUp', label: 'arrowUp' },
  { type: 'arrowDown', label: 'arrowDown' },
  { type: 'menu', label: 'menu' },
  { type: 'apps', label: 'apps' },
  { type: 'home', label: 'home' },
  { type: 'refresh', label: 'refresh' },
  { type: 'popout', label: 'popout' },
  { type: 'link', label: 'link' },
];

const editorIcons: IconEntry[] = [
  { type: 'editorBold', label: 'editorBold' },
  { type: 'editorItalic', label: 'editorItalic' },
  { type: 'editorUnderline', label: 'editorUnderline' },
  { type: 'editorUndo', label: 'editorUndo' },
  { type: 'editorRedo', label: 'editorRedo' },
  { type: 'editorLink', label: 'editorLink' },
  { type: 'editorOrderedList', label: 'editorOrderedList' },
  { type: 'editorUnorderedList', label: 'editorUnorderedList' },
  { type: 'editorCodeBlock', label: 'editorCodeBlock' },
  { type: 'editorComment', label: 'editorComment' },
];

const dataVisualizationIcons: IconEntry[] = [
  { type: 'visLine', label: 'visLine' },
  { type: 'visArea', label: 'visArea' },
  { type: 'visBarVertical', label: 'visBarVertical' },
  { type: 'visBarHorizontal', label: 'visBarHorizontal' },
  { type: 'visPie', label: 'visPie' },
  { type: 'visMetric', label: 'visMetric' },
  { type: 'visGauge', label: 'visGauge' },
  { type: 'visGoal', label: 'visGoal' },
  { type: 'visTable', label: 'visTable' },
  { type: 'visTagCloud', label: 'visTagCloud' },
];

const statusIcons: IconEntry[] = [
  { type: 'check', label: 'check' },
  { type: 'cross', label: 'cross' },
  { type: 'alert', label: 'alert' },
  { type: 'iInCircle', label: 'iInCircle' },
  { type: 'questionInCircle', label: 'questionInCircle' },
  { type: 'checkInCircleFilled', label: 'checkInCircleFilled' },
  { type: 'crossInACircleFilled', label: 'crossInACircleFilled' },
  { type: 'bell', label: 'bell' },
  { type: 'flag', label: 'flag' },
  { type: 'bolt', label: 'bolt' },
];

const actionIcons: IconEntry[] = [
  { type: 'search', label: 'search' },
  { type: 'filter', label: 'filter' },
  { type: 'pencil', label: 'pencil' },
  { type: 'trash', label: 'trash' },
  { type: 'copy', label: 'copy' },
  { type: 'save', label: 'save' },
  { type: 'download', label: 'download' },
  { type: 'share', label: 'share' },
  { type: 'lock', label: 'lock' },
  { type: 'gear', label: 'gear' },
];

const appIcons: IconEntry[] = [
  { type: 'dashboardApp', label: 'dashboardApp' },
  { type: 'discoverApp', label: 'discoverApp' },
  { type: 'visualizeApp', label: 'visualizeApp' },
  { type: 'consoleApp', label: 'consoleApp' },
  { type: 'securityApp', label: 'securityApp' },
  { type: 'logsApp', label: 'logsApp' },
  { type: 'metricsApp', label: 'metricsApp' },
  { type: 'managementApp', label: 'managementApp' },
  { type: 'devToolsApp', label: 'devToolsApp' },
  { type: 'monitoringApp', label: 'monitoringApp' },
];

const iconSizes: Array<{ size: 's' | 'm' | 'l' | 'xl' | 'xxl'; label: string; pixels: string }> = [
  { size: 's', label: 'Small (s)', pixels: '12px' },
  { size: 'm', label: 'Medium (m)', pixels: '16px' },
  { size: 'l', label: 'Large (l)', pixels: '24px' },
  { size: 'xl', label: 'Extra Large (xl)', pixels: '32px' },
  { size: 'xxl', label: 'XX-Large (xxl)', pixels: '48px' },
];

/**
 * Renders a single icon with its label in a compact tile.
 */
const IconTile: React.FC<{ icon: IconEntry }> = ({ icon }) => (
  <OuiFlexItem style={{ minWidth: 120, maxWidth: 140 }}>
    <OuiPanel paddingSize="s" style={{ textAlign: 'center' }}>
      <OuiIcon type={icon.type} size="l" />
      <OuiSpacer size="xs" />
      <OuiText size="xs" color="subdued">
        <p style={{ margin: 0, wordBreak: 'break-all' }}>{icon.label}</p>
      </OuiText>
    </OuiPanel>
  </OuiFlexItem>
);

/**
 * Renders a category of icons with a title and description.
 */
const IconCategory: React.FC<{
  title: string;
  description: string;
  icons: IconEntry[];
}> = ({ title, description, icons }) => (
  <>
    <OuiTitle size="xs">
      <h3>{title}</h3>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiText size="s" color="subdued">
      <p>{description}</p>
    </OuiText>
    <OuiSpacer size="m" />
    <OuiFlexGroup wrap gutterSize="s">
      {icons.map((icon) => (
        <IconTile key={icon.type} icon={icon} />
      ))}
    </OuiFlexGroup>
  </>
);

const FoundationsIcons: React.FC<ContentPageProps> = ({ selectedTheme }) => {
  const isV9 = selectedTheme.includes('v9');

  return (
    <GuidePage title="Icons">
      <OuiText grow={false}>
        <h2>Icon usage guidelines</h2>
        <p>
          OUI provides a comprehensive set of icons for use across OpenSearch
          interfaces. Icons serve as visual shorthand to help users quickly
          identify actions, navigate interfaces, and understand status at a
          glance. Use icons consistently to reinforce meaning and reduce
          cognitive load.
        </p>
      </OuiText>

      <OuiSpacer size="l" />

      <OuiCallOut
        title="When to use icons"
        iconType="iInCircle"
        color="primary"
        size="s">
        <OuiText size="xs">
          <ul style={{ margin: 0 }}>
            <li>
              <strong>Pair with text</strong> — icons work best alongside
              labels. Avoid icon-only buttons unless the meaning is universally
              understood (e.g., close, search).
            </li>
            <li>
              <strong>Be consistent</strong> — use the same icon for the same
              action throughout your application. Don&apos;t use different icons
              for the same concept.
            </li>
            <li>
              <strong>Don&apos;t overuse</strong> — too many icons create visual
              noise. Use them where they add clarity, not decoration.
            </li>
          </ul>
        </OuiText>
      </OuiCallOut>

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Sizing conventions */}
      <OuiTitle size="s">
        <h2>Sizing conventions</h2>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s">
        <p>
          Icons are available in five sizes. Use the{' '}
          <OuiCode transparentBackground>size</OuiCode> prop on{' '}
          <OuiCode transparentBackground>OuiIcon</OuiCode> to control
          rendering size. The default size is{' '}
          <OuiCode transparentBackground>m</OuiCode> (16px), which is
          appropriate for most inline and button contexts.
        </p>
      </OuiText>
      <OuiSpacer size="m" />

      <OuiTable>
        <OuiTableHeader>
          <OuiTableHeaderCell>Size</OuiTableHeaderCell>
          <OuiTableHeaderCell>Prop value</OuiTableHeaderCell>
          <OuiTableHeaderCell>Dimensions</OuiTableHeaderCell>
          <OuiTableHeaderCell>Preview</OuiTableHeaderCell>
          <OuiTableHeaderCell>Usage</OuiTableHeaderCell>
        </OuiTableHeader>
        <OuiTableBody>
          {iconSizes.map((entry) => (
            <OuiTableRow key={entry.size}>
              <OuiTableRowCell>{entry.label}</OuiTableRowCell>
              <OuiTableRowCell>
                <OuiCode transparentBackground>{entry.size}</OuiCode>
              </OuiTableRowCell>
              <OuiTableRowCell>{entry.pixels}</OuiTableRowCell>
              <OuiTableRowCell>
                <OuiIcon type="search" size={entry.size} />
              </OuiTableRowCell>
              <OuiTableRowCell>
                {entry.size === 's' && 'Compact UI, badges, inline indicators'}
                {entry.size === 'm' && 'Default — buttons, form fields, navigation items'}
                {entry.size === 'l' && 'Section headers, empty states, card icons'}
                {entry.size === 'xl' && 'Feature highlights, onboarding illustrations'}
                {entry.size === 'xxl' && 'Hero sections, large empty states'}
              </OuiTableRowCell>
            </OuiTableRow>
          ))}
        </OuiTableBody>
      </OuiTable>

      <OuiSpacer size="m" />

      {/* Live size comparison */}
      <OuiTitle size="xs">
        <h3>Size comparison</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiPanel paddingSize="l">
        <OuiFlexGroup alignItems="center" gutterSize="xl">
          {iconSizes.map((entry) => (
            <OuiFlexItem key={entry.size} grow={false} style={{ textAlign: 'center' }}>
              <OuiIcon type="alert" size={entry.size} />
              <OuiSpacer size="xs" />
              <OuiText size="xs" color="subdued">
                <p style={{ margin: 0 }}>{entry.size}</p>
              </OuiText>
            </OuiFlexItem>
          ))}
        </OuiFlexGroup>
      </OuiPanel>

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Icon categories */}
      <OuiTitle size="s">
        <h2>Available icon categories</h2>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s">
        <p>
          OUI icons are organized into categories based on their purpose.
          Below is a representative sample from each category. For the
          complete list, see the OuiIcon component documentation.
        </p>
      </OuiText>

      <OuiSpacer size="xl" />

      <IconCategory
        title="Navigation"
        description="Directional arrows, menus, and wayfinding icons for moving through interfaces."
        icons={navigationIcons}
      />

      <OuiSpacer size="xxl" />

      <IconCategory
        title="Actions"
        description="Common action icons for search, edit, delete, and other user operations."
        icons={actionIcons}
      />

      <OuiSpacer size="xxl" />

      <IconCategory
        title="Status &amp; indicators"
        description="Icons that communicate state — success, error, warning, and informational indicators."
        icons={statusIcons}
      />

      <OuiSpacer size="xxl" />

      <IconCategory
        title="Editor"
        description="Text formatting and rich-text editor toolbar icons."
        icons={editorIcons}
      />

      <OuiSpacer size="xxl" />

      <IconCategory
        title="Data visualization"
        description="Chart type icons for selecting and identifying visualization types."
        icons={dataVisualizationIcons}
      />

      <OuiSpacer size="xxl" />

      <IconCategory
        title="App icons"
        description="Application-level icons used in navigation and app switchers within OpenSearch Dashboards."
        icons={appIcons}
      />

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      {/* Accessibility guidance */}
      <OuiTitle size="s">
        <h2>Accessibility</h2>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText size="s">
        <p>
          Proper accessibility handling ensures icons are usable by everyone,
          including users of assistive technologies. Icons fall into two
          categories: <strong>informative</strong> and{' '}
          <strong>decorative</strong>.
        </p>
      </OuiText>

      <OuiSpacer size="m" />

      <OuiPanel paddingSize="m">
        <OuiTitle size="xxs">
          <h4>Informative icons</h4>
        </OuiTitle>
        <OuiSpacer size="s" />
        <OuiText size="s">
          <p>
            Icons that convey meaning on their own (e.g., a standalone icon
            button) must include an accessible label. Use the{' '}
            <OuiCode transparentBackground>aria-label</OuiCode> prop to
            describe the icon&apos;s purpose:
          </p>
        </OuiText>
        <OuiSpacer size="s" />
        <OuiPanel paddingSize="s" color="subdued">
          <OuiText size="s">
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{`<OuiIcon type="lock" aria-label="Secured" />
<OuiButtonIcon iconType="trash" aria-label="Delete item" />`}
            </pre>
          </OuiText>
        </OuiPanel>
      </OuiPanel>

      <OuiSpacer size="m" />

      <OuiPanel paddingSize="m">
        <OuiTitle size="xxs">
          <h4>Decorative icons</h4>
        </OuiTitle>
        <OuiSpacer size="s" />
        <OuiText size="s">
          <p>
            Icons that appear alongside visible text labels are decorative and
            should be hidden from screen readers. OuiIcon sets{' '}
            <OuiCode transparentBackground>aria-hidden=&quot;true&quot;</OuiCode>{' '}
            by default when no <OuiCode transparentBackground>aria-label</OuiCode>{' '}
            is provided:
          </p>
        </OuiText>
        <OuiSpacer size="s" />
        <OuiPanel paddingSize="s" color="subdued">
          <OuiText size="s">
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{`{/* Icon is decorative — the button text provides context */}
<OuiButton iconType="save">Save changes</OuiButton>

{/* Icon is decorative — adjacent text describes the status */}
<OuiIcon type="check" color="success" /> Operation complete`}
            </pre>
          </OuiText>
        </OuiPanel>
      </OuiPanel>

      <OuiSpacer size="m" />

      <OuiCallOut
        title="Accessibility checklist"
        iconType="accessibility"
        color="warning"
        size="s">
        <OuiText size="xs">
          <ul style={{ margin: 0 }}>
            <li>
              Always provide <OuiCode transparentBackground>aria-label</OuiCode>{' '}
              for icon-only interactive elements.
            </li>
            <li>
              Omit <OuiCode transparentBackground>aria-label</OuiCode> when the
              icon is paired with visible text to avoid redundant announcements.
            </li>
            <li>
              Use descriptive labels that convey the action, not the icon
              appearance (e.g., &quot;Delete item&quot; not &quot;Trash can&quot;).
            </li>
            <li>
              Ensure sufficient color contrast when using colored icons to
              convey status — don&apos;t rely on color alone.
            </li>
          </ul>
        </OuiText>
      </OuiCallOut>

      {isV9 && (
        <>
          <OuiSpacer size="xxl" />
          <OuiHorizontalRule />
          <OuiSpacer size="xxl" />

          <OuiCallOut
            title="V9 icon rendering"
            iconType="iInCircle"
            color="primary">
            <OuiText size="s">
              <p>
                In the v9 theme, icons inherit the current text color by
                default, ensuring they integrate naturally with surrounding
                content. Status-colored icons use the v9 semantic color tokens
                for consistency with the updated palette. Icon sizing remains
                consistent across all themes.
              </p>
            </OuiText>
          </OuiCallOut>
        </>
      )}

      <OuiSpacer size="xxl" />
    </GuidePage>
  );
};

export default FoundationsIcons;
