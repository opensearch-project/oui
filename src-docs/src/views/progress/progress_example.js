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

import { OuiCallOut, OuiCode, OuiProgress } from '../../../../src/components';
import progressConfig from './playground';

import Progress from './progress';
const progressSource = require('./progress?raw');
const progressHtml = renderToHtml(Progress);
const progressSnippet = '<OuiProgress size="xs" color="accent" />';

import ProgressValue from './progress_value';
const progressValueSource = require('./progress_value?raw');
const progressValueHtml = renderToHtml(ProgressValue);
const progressValueSnippet = '<OuiProgress value={22} max={100} size="xs" />';

import ProgressFixed from './progress_fixed';
const progressFixedSource = require('./progress_fixed?raw');
const progressFixedHtml = renderToHtml(ProgressFixed);
const progressFixedSnippet = `<!-- Position at top of parent container -->
<OuiProgress size="xs" color="accent" position="absolute" />

<!-- Position at top of screen, above global header -->
<OuiPortal>
  <OuiProgress size="xs" color="accent" position="fixed" />
</OuiPortal>`;

import ProgressSizes from './progress_sizes';
const progressSizesSource = require('./progress_sizes?raw');
const progressSizesHtml = renderToHtml(ProgressSizes);
const progressSizesSnippet = `<OuiProgress
  value={20}
  max={100}
  size="s"
/>`;

import ProgressColors from './progress_colors';
const progressColorsSource = require('./progress_colors?raw');
const progressColorsHtml = renderToHtml(ProgressColors);
const progressColorsSnippet = `<OuiProgress
  value={20}
  max={100}
  color="vis4"
/>`;

import ProgressChart from './progress_chart';
const progressChartSource = require('./progress_chart?raw');
const progressChartHtml = renderToHtml(ProgressChart);
const progressChartSnippet = `<OuiProgress
  value={20}
  valueText={true}
  label={label}
  max={100}
/>`;

export const ProgressExample = {
  title: 'Progress',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressHtml,
        },
      ],
      text: (
        <p>
          The <strong>OuiProgress</strong> component by default will display in
          an indeterminate loading state (rendered as a single div) until you
          define a <OuiCode>max</OuiCode> and <OuiCode>value</OuiCode> prop. The{' '}
          <OuiCode>size</OuiCode> prop refers to its vertical height. It will
          always stretch <OuiCode>100%</OuiCode> to its container.
        </p>
      ),
      snippet: progressSnippet,
      props: { OuiProgress },
      demo: <Progress />,
    },
    {
      title: 'Progress with values',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressValueSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressValueHtml,
        },
      ],
      text: (
        <p>
          Once the <OuiCode>max</OuiCode> and <OuiCode>value</OuiCode> props are
          set, it will act as a determinate progress bar. This is rendered using
          an HTML5 <OuiCode>progress</OuiCode> tag.
        </p>
      ),
      snippet: progressValueSnippet,
      demo: <ProgressValue />,
    },
    {
      title: 'Progress can have absolute or fixed positions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressFixedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressFixedHtml,
        },
      ],
      text: (
        <div>
          <p>
            Using the <OuiCode>position</OuiCode> prop we can align our bar to
            be <OuiCode>fixed</OuiCode> or <OuiCode>absolute</OuiCode>. In both
            options, the background color of the base bar is dropped (since the
            context of width is already known from your wrapping element). For
            the absolute option, make sure that your wrapping element has{' '}
            <OuiCode language="sass">position: relative</OuiCode> applied.
          </p>
          <OuiCallOut
            title="Note about progress bars over fixed headers"
            iconType="iInCircle">
            <p>
              Using <strong>OuiProgress</strong> with a <OuiCode>fixed</OuiCode>{' '}
              position may result in it being overlayed when its parent wrapper
              has a <OuiCode>z-index</OuiCode> value lower than another fixed
              element, such as <strong>OuiHeader</strong>. In that case, wrap{' '}
              <strong>OuiProgress</strong> in an <strong>OuiPortal</strong> as
              seen on the Snippet tab.
            </p>
          </OuiCallOut>
        </div>
      ),
      snippet: progressFixedSnippet,
      demo: <ProgressFixed />,
    },
    {
      title: 'Sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressSizesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressSizesHtml,
        },
      ],
      text: (
        <p>
          You can adjust the <OuiCode>size</OuiCode> of both determinate and
          indeterminate progress bars.
        </p>
      ),
      demo: <ProgressSizes />,
      snippet: progressSizesSnippet,
    },
    {
      title: 'Colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressColorsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressColorsHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>OuiProgress</strong> supports a few options for{' '}
            <OuiCode>color</OuiCode>. You can pass any value from our basic
            color set or from our visualization palette (<OuiCode>vis0</OuiCode>{' '}
            through <OuiCode>vis9</OuiCode>). To learn more about color usage,
            go to the <Link to="/guidelines/colors">Color guidelines</Link>{' '}
            page.
          </p>
          <p>
            Additionally, you can pass any valid color string like a hex value
            or named color.
          </p>
          <OuiCallOut
            title="Note about using custom colors"
            iconType="accessibility"
            color="warning">
            <p>
              Usually, we calculate a high contrast color for{' '}
              <OuiCode>valueText</OuiCode> based on <OuiCode>color</OuiCode>.
              This is not possible when using a custom color. In such cases,{' '}
              <OuiCode>valueText</OuiCode> will just use the custom color.
            </p>
          </OuiCallOut>
        </div>
      ),
      demo: <ProgressColors />,
      snippet: progressColorsSnippet,
    },
    {
      title: 'Progress for charts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: progressChartSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: progressChartHtml,
        },
      ],
      text: (
        <div>
          <p>
            Determinate progress bar can be used as simple bar charts. Use them
            with the <OuiCode>label</OuiCode> and <OuiCode>valueText</OuiCode>{' '}
            props to show the data corresponding to each bar. The{' '}
            <OuiCode>valueText</OuiCode> renders as the same color as the{' '}
            <strong>OuiProgress</strong>.
          </p>
          <p>
            Setting <OuiCode language="ts">{'valueText={true}'}</OuiCode> will
            add a % sign next to the<OuiCode>value</OuiCode> passed. If you want
            to display a custom <OuiCode>valueText</OuiCode>, you can pass a
            node instead.
          </p>
        </div>
      ),
      demo: <ProgressChart />,
      snippet: progressChartSnippet,
    },
  ],
  playground: progressConfig,
};
