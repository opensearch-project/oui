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

import React from 'react';

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiPanel,
  OuiText,
  OuiCallOut,
} from '../../../../src/components';
import {
  _OuiSplitPanelOuter,
  _OuiSplitPanelInner,
} from '../../../../src/components/panel/split_panel/split_panel';

import { panelConfig } from './playground';
import Guidelines from './guidelines';

import Panel from './panel';
const panelSource = require('./panel?raw');
const panelHtml = renderToHtml(Panel);

import PanelShadow from './panel_shadow';
const panelShadowSource = require('./panel_shadow?raw');
const panelShadowHtml = renderToHtml(PanelShadow);

import PanelColor from './panel_color';
const panelColorSource = require('./panel_color?raw');
const panelColorHtml = renderToHtml(PanelColor);

import PanelGrow from './panel_grow';
const panelGrowSource = require('./panel_grow?raw');
const panelGrowHtml = renderToHtml(PanelGrow);

import SplitPanel from './split_panel';
const splitPanelSource = require('./split_panel?raw');
const splitPanelHtml = renderToHtml(SplitPanel);

const panelSnippet = `<OuiPanel paddingSize="none">
  <!-- Panel with no padding -->
</OuiPanel>`;

const panelShadowSnippet = [
  `<OuiPanel hasShadow={false}>
  <!-- Panel without shadow -->
</OuiPanel>`,
  `<OuiPanel hasBorder={false}>
  <!-- Panel without border -->
</OuiPanel>`,
];

const panelColorSnippet = [
  `<OuiPanel color="subdued" borderRadius="none">
  <!-- Panel with gray background and no rounded corners -->
</OuiPanel>`,
  `<OuiPanel color="transparent" hasBorder={false}>
  <!-- Transparent panel -->
</OuiPanel>`,
];

const panelGrowSnippet = `<OuiPanel grow={false}>
  <!-- Panel whose height won't grow to match -->
</OuiPanel>`;

const splitPanelSnippet = [
  `<OuiSplitPanel.Outer>
  <OuiSplitPanel.Inner>
    <!-- Top panel content -->
  </OuiSplitPanel.Inner>
  <OuiSplitPanel.Inner color="subdued">
    <!-- Bottom panel content -->
  </OuiSplitPanel.Inner>
</OuiSplitPanel.Outer>`,
  `<OuiSplitPanel.Outer direction="row">
  <OuiSplitPanel.Inner>
    <!-- Left panel content -->
  </OuiSplitPanel.Inner>
  <OuiSplitPanel.Inner color="subdued">
    <!-- Right panel content -->
  </OuiSplitPanel.Inner>
</OuiSplitPanel.Outer>`,
];

export const PanelExample = {
  title: 'Panel',
  guidelines: <Guidelines />,
  intro: (
    <>
      <OuiText>
        <p>
          <strong>OuiPanel</strong> is a building block component. Use it as a
          layout helper for containing content. It is also commonly used as a
          base for other larger components like{' '}
          <Link to="/layout/page">
            <strong>OuiPage</strong>
          </Link>
          ,{' '}
          <Link to="/layout/popover">
            <strong>OuiPopover</strong>
          </Link>
          and{' '}
          <Link to="/display/card">
            <strong>OuiCard</strong>
          </Link>
          .
        </p>
      </OuiText>
    </>
  ),
  sections: [
    {
      title: 'Padding',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: panelSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: panelHtml,
        },
      ],
      text: (
        <p>The most basic use is to simply add padding around your content.</p>
      ),
      props: { OuiPanel },
      snippet: panelSnippet,
      demo: <Panel />,
      playground: panelConfig,
    },
    {
      title: 'Shadow and border',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: panelShadowSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: panelShadowHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiPanel</strong> can give depth to your container with{' '}
            <OuiCode>hasShadow</OuiCode> while <OuiCode>hasBorder</OuiCode> can
            add containment. Just be sure not to include too many nested panels
            with these settings.
          </p>
          <OuiCallOut
            color="warning"
            title="Certain allowed combinations of shadow, border, and color depend on the current theme.">
            <p>
              For instance, only plain or transparent panels can have a border
              and/or shadow. The default theme only allows removing the border
              if both <OuiCode>hasShadow</OuiCode> and{' '}
              <OuiCode>hasBorder</OuiCode> are set to <OuiCode>false</OuiCode>.
            </p>
          </OuiCallOut>
        </>
      ),
      props: { OuiPanel },
      snippet: panelShadowSnippet,
      demo: <PanelShadow />,
    },
    {
      title: 'Colors and corners',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: panelColorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: panelColorHtml,
        },
      ],
      text: (
        <>
          <p>
            Use <OuiCode>color</OuiCode> to add background shading to your panel
            and provide an additional helpful aesthetic to your container in
            context. Be mindful to use color sparingly. You can also remove the
            rounded corners depending on the placement of your panel with{' '}
            <OuiCode language="tsx">{'borderRadius="none"'}</OuiCode>
          </p>
          <p>
            Passing <OuiCode language="ts">{'color="transparent"'}</OuiCode> can
            give you a quick empty box simply for adding padding to all sides.
          </p>
        </>
      ),
      props: { OuiPanel },
      snippet: panelColorSnippet,
      demo: <PanelColor />,
    },
    {
      title: 'Growing height',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: panelGrowSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: panelGrowHtml,
        },
      ],
      text: (
        <p>
          Using <strong>OuiPanel</strong> in an{' '}
          <Link to="/layout/flex#panels-grow-to-fill-flex-items">
            <strong>OuiFlexItem</strong>
          </Link>{' '}
          will always grow its height to match. This is great for rows of
          panels. However, you can also turn this feature off by setting{' '}
          <OuiCode language="tsx">{'grow={false}'}</OuiCode>.
        </p>
      ),
      props: { OuiPanel },
      snippet: panelGrowSnippet,
      demo: <PanelGrow />,
    },
    {
      title: 'Split panels',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: splitPanelSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: splitPanelHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiSplitPanel</strong> is a composition of an outer and
            multiple inner <strong>OuiPanels</strong>. It is a namespaced
            component that you consume using{' '}
            <OuiCode>OuiSplitPanel.Outer</OuiCode> and{' '}
            <OuiCode>OuiSplitPanel.Inner</OuiCode> respectively. You can supply
            the same panel props to both components with the exception of a few
            to ensure the visual layout is correct. It also has two directions,{' '}
            <OuiCode>column</OuiCode> (default) and <OuiCode>row</OuiCode>.
          </p>
          <p>
            For custom responsiveness, you can adjust at which breakpoints a{' '}
            <OuiCode>row</OuiCode> layout will stack by passing a new array of
            breakpoint names <OuiCode>{"['xs', 's']"}</OuiCode> to the{' '}
            <OuiCode>responsive</OuiCode> prop, or completely turn it off with{' '}
            <OuiCode>false</OuiCode>.
          </p>
        </>
      ),
      props: { _OuiSplitPanelOuter, _OuiSplitPanelInner },
      snippet: splitPanelSnippet,
      demo: <SplitPanel />,
    },
  ],
};
