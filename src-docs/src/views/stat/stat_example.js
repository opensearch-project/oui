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

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { OuiCode, OuiStat } from '../../../../src/components';
import statConfig from './playground';

import Stat from './stat';
const statSource = require('./stat?raw');
const statHtml = renderToHtml(Stat);
const statSnippet = `<OuiStat
  title="22,123"
  description="Total people"
/>
`;

import StatColors from './stat_colors';
const statColorsSource = require('./stat_colors?raw');
const statColorsHtml = renderToHtml(StatColors);
const statColorSnippet = `<OuiStat
  title="22,123"
  description="Total people"
  color="primary"
/>
`;

import StatAlign from './stat_align';
const statAlignSource = require('./stat_align?raw');
const statAlignHtml = renderToHtml(StatAlign);
const statAlignSnippet = `<OuiStat
  title="22,123"
  description="Total people"
  textAlign="right"
/>
`;

import StatSize from './stat_size';
const statSizeSource = require('./stat_size?raw');
const statSizeHtml = renderToHtml(StatSize);
const statSizeSnippet = `<OuiStat
  title="22,123"
  description="Total people"
  titleSize="s"
/>
`;

import StatOrder from './stat_order';
const statOrderSource = require('./stat_order?raw');
const statOrderHtml = renderToHtml(StatOrder);
const statOrderSnippet = `<OuiStat
  title="22,123"
  description="Total people"
  reverse
/>
`;

import StatCombos from './stat_combos';
const statCombosSource = require('./stat_combos?raw');
const statCombosHtml = renderToHtml(StatCombos);

import StatLoading from './stat_loading';
const statLoadingSource = require('./stat_loading?raw');
const statLoadingHtml = renderToHtml(StatLoading);
const statLoadingSnippet = `<OuiStat
  title={someNumber}
  description="Total people"
  isLoading={someNumber == undefined}
/>
`;

export const StatExample = {
  title: 'Stat',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: statHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiStat</strong> can be used to display prominent text or
          number values. It consists of <OuiCode>title</OuiCode>
          and <OuiCode>description</OuiCode> elements with several visual
          styling properties (examples below).
        </p>
      ),
      props: { OuiStat },
      demo: <Stat />,
      snippet: statSnippet,
    },
    {
      title: 'Applying color',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statColorsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: statColorsHtml,
        },
      ],
      text: (
        <p>
          <OuiCode>title</OuiCode> can be altered using the color property. By
          default, it will appear in <OuiCode>full</OuiCode> color. For proper
          color contrast, only a limited set of OUI colors are offered. See the
          Props tab above for a list of available colors.
        </p>
      ),
      snippet: statColorSnippet,
      demo: <StatColors />,
    },
    {
      title: 'Text alignment',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statAlignSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: statAlignHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiStat</strong> also offers alignment options. By default,
          text will be left aligned.
        </p>
      ),
      snippet: statAlignSnippet,
      demo: <StatAlign />,
    },
    {
      title: 'Title size',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statSizeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: statSizeHtml,
        },
      ],
      text: (
        <p>
          <OuiCode>title</OuiCode> uses the <strong>OuiTitle</strong> component
          and thus uses the same sizing property values (applied via the{' '}
          <OuiCode>titleSize</OuiCode> property). Although all{' '}
          <strong>OuiTitle</strong> sizes are available, suggested sizes include{' '}
          <OuiCode language="ts">
            {"'l' | 'm' | 's' | 'xs' | 'xxs' | 'xxxs'"}
          </OuiCode>
          . By default, the size is set to large{' '}
          <OuiCode language="ts">{"'l'"}</OuiCode>. The{' '}
          <OuiCode>description</OuiCode> label cannot be re-sized via component
          properties.
        </p>
      ),
      snippet: statSizeSnippet,
      demo: <StatSize />,
    },
    {
      title: 'Reverse the order',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statOrderSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: statOrderHtml,
        },
      ],
      text: (
        <p>
          You can reverse the order of the <OuiCode>description</OuiCode> and{' '}
          <OuiCode>title</OuiCode> text by setting the{' '}
          <OuiCode>reverse</OuiCode> property to true. By default, the
          description (label) is displayed above the title (value).
        </p>
      ),
      snippet: statOrderSnippet,
      demo: <StatOrder />,
    },
    {
      title: 'Stat loading',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statLoadingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: statLoadingHtml,
        },
      ],
      text: (
        <p>
          If you apply the <OuiCode>isLoading</OuiCode> prop, the title will
          indicate the loading status by swapping the provided title with two
          flashing dashes.
        </p>
      ),
      snippet: statLoadingSnippet,
      demo: <StatLoading />,
    },
    {
      title: 'Putting it all together',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statCombosSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: statCombosHtml,
        },
      ],
      text: (
        <p>
          Following are samples demonstrating how you might assemble and display{' '}
          <strong>OuiStat</strong> components.
        </p>
      ),
      demo: <StatCombos />,
    },
  ],
  playground: statConfig,
};
