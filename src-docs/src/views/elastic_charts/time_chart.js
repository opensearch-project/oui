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

import React, { useState, useContext, Fragment } from 'react';
import { ThemeContext } from '../../components';
import {
  Chart,
  BarSeries,
  Settings,
  Axis,
  timeFormatter,
  niceTimeFormatByDay,
  LineSeries,
} from '@elastic/charts';

import {
  OUI_CHARTS_THEME_DARK,
  OUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

import {
  OuiSpacer,
  OuiTitle,
  OuiFlexGrid,
  OuiFlexItem,
  OuiCopy,
  OuiButton,
} from '../../../../src/components';

import { formatDate, dateFormatAliases } from '../../../../src/services';

import { TIME_DATA, TIME_DATA_2 } from './data';
import {
  ChartTypeCard,
  CHART_COMPONENTS,
  MultiChartCard,
  ChartCard,
} from './shared';

export const TimeChart = () => {
  const themeContext = useContext(ThemeContext);

  const [multi, setMulti] = useState(false);
  const [stacked, setStacked] = useState(false);
  const [chartType, setChartType] = useState('BarSeries');

  const onMultiChange = (multiObject) => {
    const { multi, stacked } = multiObject;
    setMulti(multi);
    setStacked(stacked);
  };

  const onChartTypeChange = (chartType) => {
    setChartType(chartType);
  };

  const isDarkTheme = themeContext.theme.includes('dark');
  const theme = isDarkTheme
    ? OUI_CHARTS_THEME_DARK.theme
    : OUI_CHARTS_THEME_LIGHT.theme;

  let ChartType = CHART_COMPONENTS[chartType];
  let ChartType2 = CHART_COMPONENTS[chartType];
  if (chartType === 'Mixed') {
    ChartType = BarSeries;
    ChartType2 = LineSeries;
  }

  const isBadChart = chartType === 'LineSeries' && stacked;

  return (
    <Fragment>
      <OuiTitle size="xxs">
        <h2>
          Number of {!multi && 'financial '}robo-calls
          {multi && ' by type'}
        </h2>
      </OuiTitle>

      <OuiSpacer size="s" />

      <Chart size={{ height: 200 }}>
        <Settings
          theme={theme}
          showLegend={multi}
          legendPosition="right"
          tooltip="cross"
        />
        <ChartType
          id="financial"
          name="Financial"
          data={TIME_DATA}
          xScaleType="time"
          xAccessor={0}
          yAccessors={[1]}
          stackAccessors={stacked ? [0] : undefined}
        />
        {multi && (
          <ChartType2
            id="tech"
            name="Tech support"
            data={TIME_DATA_2}
            xScaleType="time"
            xAccessor={0}
            yAccessors={[1]}
            stackAccessors={stacked ? [0] : undefined}
          />
        )}
        <Axis
          title={formatDate(Date.now(), dateFormatAliases.date)}
          id="bottom-axis"
          position="bottom"
          tickFormat={timeFormatter(niceTimeFormatByDay(1))}
          showGridLines={chartType !== 'BarSeries'}
          tickPadding={0}
        />
        <Axis id="left-axis" position="left" showGridLines />
      </Chart>

      <OuiSpacer />

      <OuiFlexGrid columns={3}>
        <OuiFlexItem>
          <ChartTypeCard
            type="Time series"
            onChange={onChartTypeChange}
            mixed={multi ? 'enabled' : 'disabled'}
          />
        </OuiFlexItem>

        <OuiFlexItem>
          <MultiChartCard onChange={onMultiChange} />
        </OuiFlexItem>

        <OuiFlexItem>
          <ChartCard
            title="Tick marks"
            description="If the tick marks all share a portion of their date (e.g. they're all on the same day) format the ticks to only display the disparate portions of the timestamp and show the common portion as the axis title."
          />
        </OuiFlexItem>
      </OuiFlexGrid>

      <OuiSpacer />

      <div className="oui-textCenter">
        <OuiCopy
          textToCopy={`<Chart size={{height: 200}}>
  <Settings
    theme={isDarkTheme ? OUI_CHARTS_THEME_DARK.theme : OUI_CHARTS_THEME_LIGHT.theme}
    showLegend={${multi}}
    ${multi ? 'legendPosition="right"' : ''}
  />
  <${chartType === 'Mixed' ? 'BarSeries' : chartType}
    id="financial"
    name="Financial"
    data={[[0,1],[1,2]]}
    xScaleType="time"
    xAccessor={0}
    yAccessors={[1]}
    ${stacked ? 'stackAccessors={[0]}' : ''}
  />
  ${
    multi
      ? `<${chartType === 'Mixed' ? 'LineSeries' : chartType}
      id="tech"
      name="Tech support"
      data={[[0,1],[1,2]]}
      xScaleType="time"
      xAccessor={0}
      yAccessors={[1]}
      ${stacked ? 'stackAccessors={[0]}' : ''}
    />`
      : ''
  }
  <Axis
    title={formatDate(Date.now(), dateFormatAliases.date)}
    id="bottom-axis"
    position="bottom"
    tickFormat={timeFormatter(niceTimeFormatByDay(1))}
    ${chartType !== 'BarSeries' ? 'showGridLines' : ''}
  />
  <Axis
    id="left-axis"
    position="left"
    showGridLines
  />
</Chart>`}>
          {(copy) => (
            <OuiButton
              fill
              onClick={copy}
              iconType="copyClipboard"
              disabled={isBadChart}>
              {isBadChart
                ? "Bad chart, don't copy"
                : 'Copy code of current configuration'}
            </OuiButton>
          )}
        </OuiCopy>
      </div>
    </Fragment>
  );
};
