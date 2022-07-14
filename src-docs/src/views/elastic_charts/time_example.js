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
import { TimeChart } from './time_chart';

import { OuiCode } from '../../../../src/components';

export const ElasticChartsTimeExample = {
  title: 'Time series',
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
            Time series charts show data over a period of time, such as trends
            or comparisons across multiple categories. When smaller changes
            exist, it’s better to use line charts rather than bar charts.
          </p>

          <p>
            <strong>Key configurations</strong>
          </p>
          <ul>
            <li>
              <OuiCode language="js">
                BarSeries.xScaleType = &quot;time&quot;
              </OuiCode>
            </li>
            <li>
              <OuiCode language="js">
                tickFormat = timeFormatter(niceTimeFormatByDay(1));
              </OuiCode>
            </li>
          </ul>
        </Fragment>
      ),
      demo: <TimeChart />,
    },
  ],
};
