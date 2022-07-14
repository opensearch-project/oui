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

import React, { useContext } from 'react';
import { ThemeContext } from '../../components';
import { Chart, Partition } from '@elastic/charts';

import {
  OUI_CHARTS_THEME_DARK,
  OUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';
import {
  OuiFlexGrid,
  OuiFlexItem,
  OuiTitle,
  OuiSpacer,
} from '../../../../src/components';

export default () => {
  const themeContext = useContext(ThemeContext);

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = themeContext.theme.includes('dark');
  const ouiChartTheme = isDarkTheme
    ? OUI_CHARTS_THEME_DARK
    : OUI_CHARTS_THEME_LIGHT;
  const ouiPartitionConfig = ouiChartTheme.partition;

  return (
    <div>
      <OuiFlexGrid columns={2}>
        <OuiFlexItem>
          <OuiTitle className="oui-textCenter" size="xs">
            <h3>Year to date PR count by status</h3>
          </OuiTitle>
          <OuiSpacer />
          <Chart size={{ height: 200 }}>
            <Partition
              id="pieByPR"
              data={[
                {
                  status: 'Open',
                  count: 25,
                },
                {
                  status: 'Closed',
                  count: 319,
                },
              ]}
              valueAccessor={(d) => d.count}
              layers={[
                {
                  groupByRollup: (d) => d.status,
                  shape: {
                    fillColor: (d) =>
                      ouiChartTheme.theme.colors.vizColors[d.sortIndex],
                  },
                },
              ]}
              config={{
                ...ouiPartitionConfig,
                clockwiseSectors: false,
              }}
            />
          </Chart>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiTitle className="oui-textCenter" size="xs">
            <h3>Code languages</h3>
          </OuiTitle>
          <OuiSpacer />
          <Chart size={{ height: 200 }}>
            <Partition
              id="donutByLanguage"
              data={[
                {
                  language: 'JavaScript',
                  percent: 51.4,
                },
                {
                  language: 'TypeScript',
                  percent: 39.6,
                },
                {
                  language: 'CSS',
                  percent: 8.7,
                },
              ]}
              valueAccessor={(d) => Number(d.percent)}
              valueFormatter={() => ''}
              layers={[
                {
                  groupByRollup: (d) => d.language,
                  shape: {
                    fillColor: (d) =>
                      ouiChartTheme.theme.colors.vizColors[d.sortIndex],
                  },
                },
              ]}
              config={{
                ...ouiPartitionConfig,
                emptySizeRatio: 0.4,
                clockwiseSectors: false,
              }}
            />
          </Chart>
        </OuiFlexItem>
      </OuiFlexGrid>
    </div>
  );
};
