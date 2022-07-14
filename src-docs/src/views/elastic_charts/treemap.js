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
import { Chart, Partition, Settings, PartitionLayout } from '@elastic/charts';
import { GITHUB_DATASET_MOD } from './data';
import { ouiPaletteColorBlind } from '../../../../src/services';

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

  /**
   * Create a 3 rotation palette (one for each level)
   */
  const groupedPalette = ouiPaletteColorBlind({
    rotations: 3,
    order: 'group',
    sortBy: 'natural',
  });

  return (
    <div>
      <OuiTitle className="oui-textCenter" size="xs">
        <h3>Github issues by label</h3>
      </OuiTitle>
      <OuiSpacer />
      <OuiFlexGrid columns={2}>
        <OuiFlexItem>
          <Chart size={{ height: 240 }}>
            <Settings showLegend legendMaxDepth={2} />
            <Partition
              id="sunburst"
              data={GITHUB_DATASET_MOD}
              valueAccessor={(d) => d.count}
              layers={[
                {
                  groupByRollup: (d) => d.total,
                  shape: {
                    fillColor: isDarkTheme
                      ? OUI_CHARTS_THEME_DARK.partition.sectorLineStroke
                      : OUI_CHARTS_THEME_LIGHT.partition.sectorLineStroke,
                  },
                  hideInLegend: true,
                },
                {
                  groupByRollup: (d) => d.vizType,
                  shape: {
                    fillColor: (d) => groupedPalette[d.sortIndex * 3],
                  },
                },
                {
                  groupByRollup: (d) => d.issueType,
                  shape: {
                    fillColor: (d) =>
                      groupedPalette[d.parent.sortIndex * 3 + d.sortIndex + 1],
                  },
                },
              ]}
              config={{
                ...(isDarkTheme
                  ? OUI_CHARTS_THEME_DARK.partition
                  : OUI_CHARTS_THEME_LIGHT.partition),
                clockwiseSectors: false,
                fillLabel: {
                  ...(isDarkTheme
                    ? OUI_CHARTS_THEME_DARK.partition.fillLabel
                    : OUI_CHARTS_THEME_LIGHT.partition.fillLabel),
                  textInvertible: true,
                },
              }}
            />
          </Chart>
        </OuiFlexItem>
        <OuiFlexItem>
          <Chart size={{ height: 240 }}>
            <Settings showLegend legendMaxDepth={1} />
            <Partition
              id="treemap"
              data={GITHUB_DATASET_MOD}
              valueAccessor={(d) => d.count}
              valueGetter="percent"
              topGroove={0}
              layers={[
                {
                  groupByRollup: (d) => d.vizType,
                  shape: {
                    fillColor: (d) => groupedPalette[d.sortIndex * 3],
                  },
                  fillLabel: {
                    valueFormatter: () => '',
                    textColor: 'rgba(0,0,0,0)', // Keeps the label in the legend, but hides it from view
                  },
                },
                {
                  groupByRollup: (d) => d.issueType,
                  shape: {
                    fillColor: (d) =>
                      groupedPalette[d.parent.sortIndex * 3 + d.sortIndex],
                  },
                },
              ]}
              config={{
                partitionLayout: PartitionLayout.treemap,
                ...(isDarkTheme
                  ? OUI_CHARTS_THEME_DARK.partition
                  : OUI_CHARTS_THEME_LIGHT.partition),
              }}
            />
          </Chart>
        </OuiFlexItem>
      </OuiFlexGrid>
    </div>
  );
};
