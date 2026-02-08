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
import { OuiIcon } from '../../../../src/components/icon';
import { OuiCallOut } from '../../../../src/components/call_out';

interface ContentPageProps {
  selectedTheme: string;
}

const AboutOui: React.FC<ContentPageProps> = ({ selectedTheme }) => {
  const isV9 = selectedTheme.includes('v9');

  return (
    <GuidePage title="About OUI">
      <OuiText grow={false}>
        <h2>What is OUI?</h2>
        <p>
          The OpenSearch UI Framework (OUI) is a React component library that
          provides the building blocks for creating user interfaces across the
          OpenSearch Project ecosystem. OUI delivers a comprehensive design
          system of reusable components that handle CSS complexity, enabling
          developers to focus on building great experiences for search,
          security, observability, and dashboarding workflows.
        </p>
        <p>
          OUI serves as the single source of truth for design aesthetic in
          OpenSearch, ensuring visual and behavioral consistency across all
          projects that adopt it. Whether you are building a query interface, a
          security dashboard, or a log exploration tool, OUI provides the
          components and patterns you need.
        </p>
      </OuiText>

      <OuiSpacer size="xxl" />

      <OuiTitle size="s">
        <h2>Role in the OpenSearch ecosystem</h2>
      </OuiTitle>
      <OuiSpacer size="m" />
      <OuiFlexGroup gutterSize="l">
        <OuiFlexItem>
          <OuiPanel>
            <OuiTitle size="xs">
              <h3>
                <OuiIcon type="search" size="l" /> &nbsp; Search
              </h3>
            </OuiTitle>
            <OuiSpacer size="s" />
            <OuiText size="s">
              <p>
                Components for query bars, filter groups, result lists, and
                faceted navigation that power full-text search experiences.
              </p>
            </OuiText>
          </OuiPanel>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiPanel>
            <OuiTitle size="xs">
              <h3>
                <OuiIcon type="lock" size="l" /> &nbsp; Security
              </h3>
            </OuiTitle>
            <OuiSpacer size="s" />
            <OuiText size="s">
              <p>
                Patterns for authentication flows, permission management, audit
                log displays, and security alert interfaces.
              </p>
            </OuiText>
          </OuiPanel>
        </OuiFlexItem>
      </OuiFlexGroup>
      <OuiSpacer size="m" />
      <OuiFlexGroup gutterSize="l">
        <OuiFlexItem>
          <OuiPanel>
            <OuiTitle size="xs">
              <h3>
                <OuiIcon type="visLine" size="l" /> &nbsp; Observability
              </h3>
            </OuiTitle>
            <OuiSpacer size="s" />
            <OuiText size="s">
              <p>
                Layouts for log exploration, trace visualization, metric
                displays, and alert management dashboards.
              </p>
            </OuiText>
          </OuiPanel>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiPanel>
            <OuiTitle size="xs">
              <h3>
                <OuiIcon type="dashboardApp" size="l" /> &nbsp; Dashboarding
              </h3>
            </OuiTitle>
            <OuiSpacer size="s" />
            <OuiText size="s">
              <p>
                Grid-based dashboard composition, panel arrangement, responsive
                behavior, and widget patterns for monitoring interfaces.
              </p>
            </OuiText>
          </OuiPanel>
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      <OuiText grow={false}>
        <h2>Open-source mission</h2>
        <p>
          OUI is developed as part of the OpenSearch Project, an open-source
          initiative driven by a diverse community of contributors. The project
          operates under the Apache 2.0 license, ensuring that the framework
          remains freely available and open to contributions from anyone.
        </p>
        <p>
          The open-source model means that OUI benefits from real-world usage
          across many teams and projects. Community members contribute bug
          fixes, new components, accessibility improvements, and design
          refinements. This collaborative approach ensures that OUI evolves to
          meet the needs of the people who use it every day.
        </p>
        <p>
          Designers and developers are encouraged to contribute directly to the
          codebase. OUI is structured so that designers can make changes in
          code, and developers can build interfaces without deep CSS expertise.
          This shared ownership model keeps the design system aligned with both
          design intent and engineering reality.
        </p>
      </OuiText>

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      <OuiText grow={false}>
        <h2>Community-driven development</h2>
        <p>
          OUI follows a community-driven development model where decisions are
          made transparently and contributions are welcomed from all skill
          levels. Key aspects of this model include:
        </p>
        <ul>
          <li>
            <strong>Open governance</strong> &mdash; Design and API decisions
            are discussed publicly, with input from the community shaping the
            direction of the framework.
          </li>
          <li>
            <strong>Stable API commitment</strong> &mdash; OUI maintains a
            well-tested, stable component API so that consumers can upgrade with
            confidence.
          </li>
          <li>
            <strong>Accessibility first</strong> &mdash; Components are built
            with accessibility as a core requirement, not an afterthought,
            ensuring OpenSearch interfaces are usable by everyone.
          </li>
          <li>
            <strong>Comprehensive documentation</strong> &mdash; Every component
            includes usage examples, API documentation, and design guidelines to
            lower the barrier to adoption.
          </li>
        </ul>
      </OuiText>

      {isV9 && (
        <>
          <OuiSpacer size="xxl" />
          <OuiHorizontalRule />
          <OuiSpacer size="xxl" />

          <OuiCallOut
            title="You are viewing the v9 theme"
            iconType="iInCircle"
            color="primary">
            <OuiText size="s">
              <p>
                The v9 theme is the current recommended theme direction for
                OpenSearch interfaces. It features an updated color palette,
                refined typography scale, new spacing tokens, and improved
                elevation levels. New projects should adopt v9 as their default
                theme.
              </p>
              <p>
                Explore the <strong>Foundations</strong> section to see the v9
                visual building blocks in detail, including color swatches, type
                scale samples, and elevation examples.
              </p>
            </OuiText>
          </OuiCallOut>
        </>
      )}

      <OuiSpacer size="xxl" />
    </GuidePage>
  );
};

export default AboutOui;
