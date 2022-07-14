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
import { ExternalBadge } from './shared';
import { CategoryChart } from './category_chart';

import { OuiCode } from '../../../../src/components';

export const ElasticChartsCategoryExample = {
  title: 'Categorical',
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
            Categorical charts compare data between multiple distinct
            categories. Avoid using a line chart because it might create
            confusion with a time series chart. Use a bar chart instead.
          </p>

          <p>
            <strong>Key configurations</strong>
          </p>

          <ul>
            <li>
              <OuiCode language="js">Settings.rotation = 90</OuiCode>
            </li>
            <li>
              <OuiCode language="js">
                BarSeries.data = orderBy(DATASET, [&apos;count&apos;],
                [&apos;desc&apos;])
              </OuiCode>
            </li>
            <li>
              <OuiCode language="js">
                BarSeries.xAccessor = &quot;vizType&quot;
              </OuiCode>
            </li>
            <li>
              <OuiCode language="js">
                Axis.tickFormat = (d =&gt; Number(d)&apos;k&apos;)
              </OuiCode>
            </li>
          </ul>
        </Fragment>
      ),
      demo: <CategoryChart />,
    },
  ],
};
