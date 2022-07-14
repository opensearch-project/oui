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

import React, { Fragment } from 'react';
import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';

import { ExternalBadge } from './shared';
import { Sizes } from './sizes';
import { Sparklines } from './sparklines';
const sparklinesSource = require('!!raw-loader!./sparklines');
const sparklinesHtml = renderToHtml(Sparklines);

import { OuiCode, OuiCodeBlock } from '../../../../src/components';

export const ElasticChartsSparklinesExample = {
  title: 'Sizing',
  intro: (
    <Fragment>
      <ExternalBadge />
    </Fragment>
  ),
  sections: [
    {
      text: (
        <Fragment>
          <p>
            When placing charts into smaller containers or panels, you must
            re-evaluate your data to provide a more simplified version. This
            could be as simple as shifting legend positions from the right side
            to the bottom or adding annotations to give context and describe the
            key points in your data.
          </p>
        </Fragment>
      ),
      demo: <Sizes />,
    },
    {
      title: 'Sparklines',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sparklinesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: sparklinesHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Sparklines are quick visual summaries of data where actual values
            are not important. They should be only a single series and not
            contain more than 12 values. Be sure to remove all extraneous
            markings like ticks, labels, tooltips and grid. The surrounding
            content should give context to the sparkline.
          </p>
          <p>
            OUI also provides a quick theme alteration object that you can merge
            with the correct dark or light theme to properly style your
            sparklines.
          </p>
          <OuiCodeBlock language="javascript" isCopyable>
            {`import { OUI_CHARTS_THEME_DARK, OUI_CHARTS_THEME_LIGHT, OUI_SPARKLINE_THEME_PARTIAL } from \'@opensearch-project/oui/dist/oui_charts_theme\';
const ouiTheme = isDarkTheme ? OUI_CHARTS_THEME_DARK.theme : OUI_CHARTS_THEME_LIGHT.theme;
<Settings theme={[OUI_SPARKLINE_THEME_PARTIAL, ouiTheme]} />`}
          </OuiCodeBlock>
          <p>
            <strong>Other key configurations</strong>
          </p>
          <ul>
            <li>
              <OuiCode language="js">Settings.showLegend = false</OuiCode>
            </li>
            <li>
              <OuiCode language="js">
                Settings.tooltip = &quot;none&quot;
              </OuiCode>
            </li>
          </ul>
        </Fragment>
      ),
      demo: <Sparklines />,
    },
  ],
};
