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

import React, { useState, Fragment, useContext } from 'react';
import orderBy from 'lodash/orderBy';
import round from 'lodash/round';

import { ThemeContext } from '../../components';
import { Chart, Settings, Axis } from '@elastic/charts';

import {
  OUI_CHARTS_THEME_DARK,
  OUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

import {
  OuiSwitch,
  OuiSpacer,
  OuiTitle,
  OuiFlexGrid,
  OuiFlexItem,
  OuiCode,
  OuiCopy,
  OuiButton,
} from '../../../../src/components';

import { SIMPLE_GITHUB_DATASET, GITHUB_DATASET } from './data';
import {
  ChartTypeCard,
  MultiChartCard,
  CHART_COMPONENTS,
  ChartCard,
} from './shared';

export const CategoryChart = () => {
  const themeContext = useContext(ThemeContext);

  const [multi, setMulti] = useState(false);
  const [stacked, setStacked] = useState(false);
  const [rotated, setRotated] = useState(true);
  const [ordered, setOrdered] = useState(true);
  const [formatted, setFormatted] = useState(false);
  const [chartType, setChartType] = useState('BarSeries');

  const onMultiChange = (multiObject) => {
    const { multi, stacked } = multiObject;
    setMulti(multi);
    setStacked(stacked);
  };

  const onRotatedChange = (e) => {
    setRotated(e.target.checked);
  };

  const onOrderedChange = (e) => {
    setOrdered(e.target.checked);
  };

  const onFormatChange = (e) => {
    setFormatted(e.target.checked);
  };

  const onChartTypeChange = (chartType) => {
    setChartType(chartType);
  };

  const isDarkTheme = themeContext.theme.includes('dark');
  const theme = isDarkTheme
    ? OUI_CHARTS_THEME_DARK.theme
    : OUI_CHARTS_THEME_LIGHT.theme;

  const ChartType = CHART_COMPONENTS[chartType];

  const DATASET = multi ? GITHUB_DATASET : SIMPLE_GITHUB_DATASET;

  return (
    <Fragment>
      <OuiTitle size="xxs">
        <h2>
          Number of GitHub issues per visualization type
          {multi && ' by type of issue'}
        </h2>
      </OuiTitle>

      <OuiSpacer size="s" />

      <Chart size={{ height: 300 }}>
        <Settings
          theme={theme}
          showLegend={multi}
          legendPosition="right"
          rotation={rotated ? 90 : 0}
        />
        <ChartType
          id="issues"
          name="Issues"
          data={
            ordered
              ? orderBy(DATASET, ['count'], ['desc'])
              : orderBy(DATASET, ['vizType'], ['asc'])
          }
          xAccessor="vizType"
          yAccessors={['count']}
          splitSeriesAccessors={multi ? ['issueType'] : undefined}
          stackAccessors={stacked ? ['issueType'] : undefined}
        />
        <Axis
          id="bottom-axis"
          position={rotated ? 'left' : 'bottom'}
          showGridLines={false}
        />
        <Axis
          id="left-axis"
          position={rotated ? 'bottom' : 'left'}
          tickFormat={
            formatted ? (d) => `${round(Number(d) / 1000, 2)}k` : undefined
          }
        />
      </Chart>

      <OuiSpacer />

      <OuiFlexGrid columns={3}>
        <OuiFlexItem>
          <ChartCard
            title="Chart titles"
            description="A meaningful, descriptive title can often eliminate the need for axis titles entirely. That title may need to dynamically change depending on the number of series data rendered."
          />
        </OuiFlexItem>

        <OuiFlexItem>
          <ChartCard
            title="Order and rotation"
            description="Categorical data is often easier to compare when sorted by sequence. Use a horizontal layout when you need more space for the category labels.">
            <OuiSwitch
              label="Order by count descending"
              checked={ordered}
              onChange={onOrderedChange}
            />
            <OuiSpacer size="s" />
            <OuiSwitch
              label="Rotate 90deg"
              checked={rotated}
              onChange={onRotatedChange}
            />
          </ChartCard>
        </OuiFlexItem>

        <OuiFlexItem>
          <ChartCard
            title="Tick marks"
            description="Tick marks should be spaced out properly and number values formatted. For example, if the number is in the thousands, remove a few numerals and add the `k` symbol.">
            <OuiCode>1000 ⇢ 1k</OuiCode> &nbsp; <OuiCode>20000 ⇢ 20k</OuiCode>
            <OuiSpacer size="s" />
            <OuiSwitch
              label="Simulate thousands formatting"
              checked={formatted}
              onChange={onFormatChange}
            />
          </ChartCard>
        </OuiFlexItem>

        <OuiFlexItem>
          <ChartTypeCard
            type="Although we recommend only bar charts, categorical"
            onChange={onChartTypeChange}
            disabled
          />
        </OuiFlexItem>

        <OuiFlexItem>
          <MultiChartCard onChange={onMultiChange} />
        </OuiFlexItem>
      </OuiFlexGrid>

      <OuiSpacer />

      <div className="oui-textCenter">
        <OuiCopy
          textToCopy={`<Chart size={{height: 300}}>
  <Settings
    theme={isDarkTheme ? OUI_CHARTS_THEME_DARK.theme : OUI_CHARTS_THEME_LIGHT.theme}
    rotation={${rotated ? 90 : 0}}
    showLegend={${multi}}
    ${multi ? 'legendPosition="right"' : ''}
  />
  <${chartType}
    id="issues"
    name="Issues"
    data={${
      ordered
        ? "orderBy([{vizType: 'Data Table', count: 24, issueType: 'Bug'},{vizType: 'Heatmap',count: 12, issueType: 'Other'}], ['count'], ['desc'])"
        : "orderBy([{vizType: 'Data Table', count: 24, issueType: 'Bug'},{vizType: 'Heatmap',count: 12, issueType: 'Other'}], ['vizType'], ['asc'])"
    }}
    xAccessor="vizType"
    yAccessors={['count']}
    ${multi ? "splitSeriesAccessors={['issueType']}" : ''}
    ${stacked ? "stackAccessors={['issueType']}" : ''}
  />
  <Axis
    id="bottom-axis"
    position={${rotated ? 'left' : 'bottom'}}
    showGridLines={false}
  />
  <Axis
    id="left-axis"
    position={${rotated ? 'bottom' : 'left'}}
    ${formatted ? 'tickFormat={d => `${round(Number(d) / 1000, 2)}k`}' : ''}
  />
</Chart>`}>
          {(copy) => (
            <OuiButton fill onClick={copy} iconType="copyClipboard">
              Copy code of current configuration
            </OuiButton>
          )}
        </OuiCopy>
      </div>
    </Fragment>
  );
};
