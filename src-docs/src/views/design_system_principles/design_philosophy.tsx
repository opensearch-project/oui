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

const DesignPhilosophy: React.FC<ContentPageProps> = ({ selectedTheme }) => {
  const isV9 = selectedTheme.includes('v9');

  return (
    <GuidePage title="Design Philosophy">
      <OuiText grow={false}>
        <h2>Guiding principles</h2>
        <p>
          OUI is built on a set of core principles that guide every component,
          pattern, and design decision. These principles ensure that OpenSearch
          interfaces remain usable, consistent, and trustworthy across the
          diverse workflows the platform supports.
        </p>
      </OuiText>

      <OuiSpacer size="xxl" />

      <OuiFlexGroup gutterSize="l">
        <OuiFlexItem>
          <OuiPanel>
            <OuiTitle size="xs">
              <h3>Consistency</h3>
            </OuiTitle>
            <OuiSpacer size="s" />
            <OuiText size="s">
              <p>
                Similar actions should look and behave the same way everywhere.
                When a user learns how to filter results in one part of
                OpenSearch, that knowledge transfers to every other filtering
                interface. Consistency reduces cognitive load and builds user
                confidence.
              </p>
            </OuiText>
          </OuiPanel>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiPanel>
            <OuiTitle size="xs">
              <h3>Predictability</h3>
            </OuiTitle>
            <OuiSpacer size="s" />
            <OuiText size="s">
              <p>
                Interfaces should behave as users expect. Components follow
                established web conventions so that interactions feel natural.
                Predictable behavior is especially critical in security and
                observability contexts where users make time-sensitive
                decisions.
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
              <h3>Clarity</h3>
            </OuiTitle>
            <OuiSpacer size="s" />
            <OuiText size="s">
              <p>
                Information should be presented clearly and without ambiguity.
                OpenSearch users work with complex data — logs, traces, metrics,
                and query results — so the interface must help them understand
                what they see rather than adding visual noise.
              </p>
            </OuiText>
          </OuiPanel>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiPanel>
            <OuiTitle size="xs">
              <h3>Balance</h3>
            </OuiTitle>
            <OuiSpacer size="s" />
            <OuiText size="s">
              <p>
                OUI balances established patterns with thoughtful innovation. We
                favor proven conventions but are not afraid to introduce new
                approaches when they meaningfully improve the user experience.
                Every departure from convention must earn its place.
              </p>
            </OuiText>
          </OuiPanel>
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      <OuiText grow={false}>
        <h2>Design through the lens of OpenSearch</h2>
        <p>
          OpenSearch serves four core focus areas, each with distinct user needs
          and workflow characteristics. OUI&apos;s design philosophy is shaped
          by these domains, ensuring that components and patterns work well in
          the contexts where they are most needed.
        </p>
      </OuiText>

      <OuiSpacer size="l" />

      <OuiTitle size="xs">
        <h3>
          <OuiIcon type="search" size="l" /> &nbsp; Search experiences
        </h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText grow={false}>
        <p>
          Search is the foundation of OpenSearch. Interfaces for full-text
          search must support rapid query iteration, clear result presentation,
          and flexible filtering. OUI components for search bars, combo boxes,
          filter groups, and result lists are designed to handle high-volume
          data while keeping the interaction fast and focused. The design favors
          progressive disclosure — showing essential controls upfront and
          revealing advanced options on demand.
        </p>
      </OuiText>

      <OuiSpacer size="l" />

      <OuiTitle size="xs">
        <h3>
          <OuiIcon type="lock" size="l" /> &nbsp; Security workflows
        </h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText grow={false}>
        <p>
          Security interfaces demand precision and trust. Users managing access
          control, reviewing audit logs, or responding to security alerts need
          interfaces that communicate state clearly and minimize the risk of
          error. OUI applies conservative interaction patterns in security
          contexts — confirmations for destructive actions, clear status
          indicators, and unambiguous permission displays. Color usage follows
          strict semantic conventions so that warnings and errors are
          immediately recognizable.
        </p>
      </OuiText>

      <OuiSpacer size="l" />

      <OuiTitle size="xs">
        <h3>
          <OuiIcon type="visLine" size="l" /> &nbsp; Observability interfaces
        </h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText grow={false}>
        <p>
          Observability tools help users understand system behavior through
          logs, traces, and metrics. These interfaces are data-dense by nature,
          so OUI emphasizes information hierarchy, scannable layouts, and
          effective use of whitespace. Components support time-range selection,
          metric visualization, and log exploration patterns that let users
          drill from high-level overviews into specific details without losing
          context.
        </p>
      </OuiText>

      <OuiSpacer size="l" />

      <OuiTitle size="xs">
        <h3>
          <OuiIcon type="dashboardApp" size="l" /> &nbsp; Dashboarding
        </h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiText grow={false}>
        <p>
          Dashboards aggregate information from multiple sources into a single
          view. OUI supports grid-based layouts, responsive panel arrangement,
          and widget patterns that adapt to different screen sizes. The design
          philosophy for dashboards prioritizes glanceability — users should be
          able to assess system health or key metrics at a glance, then interact
          with individual panels for deeper exploration.
        </p>
      </OuiText>

      <OuiSpacer size="xxl" />
      <OuiHorizontalRule />
      <OuiSpacer size="xxl" />

      <OuiText grow={false}>
        <h2>Balancing convention and innovation</h2>
        <p>
          OUI leans on established web and UI conventions wherever possible.
          Standard form controls, familiar navigation patterns, and widely
          understood iconography reduce the learning curve for new users. At the
          same time, OpenSearch&apos;s unique requirements — such as complex
          query building, multi-dimensional data exploration, and real-time
          monitoring — sometimes call for novel approaches.
        </p>
        <p>When introducing a new pattern, OUI follows these guidelines:</p>
        <ul>
          <li>
            <strong>Start with the familiar</strong> &mdash; Build on patterns
            users already know before introducing new interactions.
          </li>
          <li>
            <strong>Validate with real use cases</strong> &mdash; New patterns
            must solve a demonstrated need from actual OpenSearch workflows.
          </li>
          <li>
            <strong>Document the rationale</strong> &mdash; Every non-standard
            pattern includes documentation explaining why it exists and when to
            use it.
          </li>
          <li>
            <strong>Provide escape hatches</strong> &mdash; Complex components
            expose lower-level building blocks so teams can compose custom
            solutions when needed.
          </li>
        </ul>
      </OuiText>

      {isV9 && (
        <>
          <OuiSpacer size="xxl" />
          <OuiHorizontalRule />
          <OuiSpacer size="xxl" />

          <OuiCallOut
            title="v9 theme and the design philosophy"
            iconType="iInCircle"
            color="primary">
            <OuiText size="s">
              <p>
                The v9 theme embodies these design principles with an updated
                visual language. Its refined color palette improves semantic
                clarity, the new typography scale enhances readability in
                data-dense interfaces, and updated spacing tokens create better
                visual rhythm across all four focus areas.
              </p>
            </OuiText>
          </OuiCallOut>
        </>
      )}

      <OuiSpacer size="xxl" />
    </GuidePage>
  );
};

export default DesignPhilosophy;
