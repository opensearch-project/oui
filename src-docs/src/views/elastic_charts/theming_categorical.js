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

/* eslint-disable no-nested-ternary */
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Chart, Settings, Axis, DataGenerator } from '@elastic/charts';
import { ThemeContext } from '../../components';

import {
  OUI_CHARTS_THEME_DARK,
  OUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

import {
  OuiSpacer,
  OuiFlexGrid,
  OuiFlexItem,
  OuiFormRow,
  OuiRange,
  OuiCopy,
  OuiSwitch,
  OuiButton,
  OuiRadioGroup,
  OuiIcon,
  OuiTitle,
} from '../../../../src/components';

import { CHART_COMPONENTS, ChartCard } from './shared';
import {
  ouiPaletteColorBlind,
  ouiPalettePositive,
  ouiPaletteForStatus,
  ouiPaletteGray,
} from '../../../../src/services';

export const Categorical = () => {
  const themeContext = useContext(ThemeContext);
  const highlightColor = ouiPaletteColorBlind()[2];

  const idPrefix = 'colorType';

  const colorTypeRadios = [
    {
      id: `${idPrefix}3`,
      label: 'Categorical',
    },
    {
      id: `${idPrefix}0`,
      label: 'Sequential',
    },
    {
      id: `${idPrefix}1`,
      label: 'Diverging',
    },
    {
      id: `${idPrefix}2`,
      label: 'Highlight',
    },
  ];

  const [grouped, setGrouped] = useState(false);
  const [colorTypeIdSelected, setColorTypeIdSelected] = useState(
    colorTypeRadios[0].id
  );
  const [colorType, setColorType] = useState(colorTypeRadios[0].label);
  const [numCharts, setNumCharts] = useState('3');
  const [data, setData] = useState([]);
  const [dataString, setDataString] = useState('[{x: 1, y: 5.5, g: 0}]');
  const [vizColors, setVizColors] = useState();
  const [vizColorsString, setVizColorsString] = useState();
  const [chartType, setChartType] = useState('LineSeries');

  useEffect(() => {
    createCategoryChart(3);
  }, []);

  const isDarkTheme = themeContext.theme.includes('dark');
  const theme = isDarkTheme
    ? OUI_CHARTS_THEME_DARK.theme
    : OUI_CHARTS_THEME_LIGHT.theme;

  const onNumChartsChange = (e) => {
    updateCorrectChart(Number(e.target.value), colorType);
    setNumCharts(e.target.value);
  };

  const onColorTypeChange = (optionId) => {
    const colorType = colorTypeRadios.find(({ id }) => id === optionId).label;
    updateCorrectChart(Number(numCharts), colorType);
    setColorType(colorType);
    setColorTypeIdSelected(optionId);
  };

  const onGroupChange = (e) => {
    const colorType = e.target.checked
      ? 'Grouped'
      : colorTypeRadios.find(({ id }) => id === colorTypeIdSelected).label;
    updateCorrectChart(Number(numCharts), colorType);
    setGrouped(e.target.checked);
    setColorType(colorType);
  };

  const updateCorrectChart = (numCharts, chartType) => {
    switch (chartType) {
      case 'Categorical':
        createCategoryChart(numCharts);
        break;
      case 'Sequential':
        createQuantityChart(numCharts);
        break;
      case 'Diverging':
        createTrendChart(numCharts);
        break;
      case 'Highlight':
        createHighlightChart(numCharts);
        break;
      case 'Grouped':
        setDataString("[{x: 1, y: 5.5, g: 'Series 1'}]");
        setChartType('LineSeries');
        break;
      default:
        console.warn("Couldn't find the right chart type");
        break;
    }
  };

  const createCategoryChart = (numCharts) => {
    const dg = new DataGenerator();
    const data = dg.generateGroupedSeries(20, numCharts).map((item) => {
      item.g = `Categorical ${item.g.toUpperCase()}`;
      return item;
    });

    setData(data);
    setDataString("[{x: 1, y: 5.5, g: 'Categorical 1'}]");
    setVizColors(undefined);
    setVizColorsString(undefined);
    setChartType('LineSeries');
  };

  const createQuantityChart = (numCharts) => {
    const vizColors = ouiPalettePositive(numCharts);

    // convert series labels to percentages
    const dg = new DataGenerator();
    const data = dg.generateGroupedSeries(20, numCharts).map((item) => {
      const increment = 100 / numCharts;
      const index = item.g.charCodeAt(0) - 97;
      const lower = Math.floor(increment * index);
      const higher =
        index + 1 === numCharts
          ? Math.ceil(increment * (index + 1))
          : Math.floor(increment * (index + 1));
      item.g = `${lower} - ${higher}%`;
      return item;
    });

    setData(data);
    setDataString("[{x: 1, y: 5.5, g: '0 - 100%'}]");
    setVizColors(vizColors);
    setVizColorsString(`ouiPaletteCool(${numCharts})`);
    setChartType('BarSeries');
  };

  const createTrendChart = (numCharts) => {
    const vizColors = ouiPaletteForStatus(numCharts);

    // convert series labels to better/worse
    const oddSeries = numCharts % 2;
    const numOfHalf = Math.floor(numCharts / 2);

    const dg = new DataGenerator();
    const data = dg.generateGroupedSeries(20, numCharts).map((item) => {
      const index = item.g.charCodeAt(0) - 97;
      let howManyErs;
      if (oddSeries && index === numOfHalf) {
        item.g = 'Meh';
      } else if (index < numOfHalf) {
        howManyErs = numOfHalf - (index + 1);
        item.g = `Better${'er'.repeat(howManyErs)}`;
      } else if (index >= numOfHalf) {
        howManyErs = index - numOfHalf;
        if (oddSeries) {
          howManyErs -= 1;
        }
        item.g = `Wors${!howManyErs ? 'e' : ''}${'er'.repeat(
          howManyErs > 0 ? howManyErs : 0
        )}`;
      }
      return item;
    });

    setData(data);
    setDataString("[{x: 1, y: 5.5, g: 'Better'}]");
    setVizColors(vizColors);
    setVizColorsString(`ouiPaletteForStatus(${numCharts})`);
    setChartType('BarSeries');
  };

  const createHighlightChart = (numCharts) => {
    const vizColors = ouiPaletteGray(numCharts);
    vizColors[vizColors.length - 1] = highlightColor;

    const dg = new DataGenerator();
    const data = dg.generateGroupedSeries(20, numCharts);

    setData(data);
    setDataString("[{x: 1, y: 5.5, g: '0'}]");
    setVizColors(numCharts < 2 ? [highlightColor] : vizColors);
    setVizColorsString(
      `ouiPaletteGray(${numCharts})[length - 1] = highlightColor`
    );
    setChartType('LineSeries');
  };

  if (data.length === 0) {
    return null;
  }

  const dg = new DataGenerator();

  let ChartType = CHART_COMPONENTS[chartType];

  const isBadChart = !grouped && numCharts > 5;
  const isComplicatedChart = grouped;

  const customTitle =
    colorType === 'Highlight' ? (
      <OuiTitle size="xxs">
        <h4>
          <OuiIcon type="dot" color={highlightColor} /> My number of issues
          compared to others
        </h4>
      </OuiTitle>
    ) : undefined;

  const customTheme = vizColors
    ? [
        {
          colors: { vizColors },
        },
        theme,
      ]
    : theme;
  const customColorsString = vizColors
    ? `[
  { colors: { vizColors: ${vizColorsString} }},
  isDarkTheme ? OUI_CHARTS_THEME_DARK.theme : OUI_CHARTS_THEME_LIGHT.theme
]`
    : 'isDarkTheme ? OUI_CHARTS_THEME_DARK.theme : OUI_CHARTS_THEME_LIGHT.theme';

  const charts = [];
  let customLegend;

  if (!grouped) {
    charts.push(
      <ChartType
        key="data1"
        id="data1"
        name="0"
        data={data}
        xAccessor={'x'}
        yAccessors={['y']}
        splitSeriesAccessors={['g']}
        stackAccessors={chartType === 'BarSeries' ? ['g'] : undefined}
      />
    );
  } else {
    ChartType = CHART_COMPONENTS.LineSeries;

    for (let index = 0; index < 4; index++) {
      const data = dg.generateGroupedSeries(20, 1).map((item) => {
        item.y += index * 5;
        return item;
      });

      const isOdd = index % 2;

      const chart = (
        <ChartType
          key={`data${index}`}
          id={`data${index}`}
          name={`Series ${index < 2 ? 1 : 2}`}
          data={data}
          xAccessor={'x'}
          yAccessors={['y']}
          color={[ouiPaletteColorBlind()[index < 2 ? 0 : 1]]}
          lineSeriesStyle={{
            line: {
              strokeWidth: isOdd ? 1 : 6,
            },
            point: {
              visible: !isOdd,
            },
          }}
          hideInLegend={isOdd}
        />
      );

      charts.push(chart);
    }

    customLegend = (
      <dl className="guideCharts__customLegend">
        <span className="guideCharts__customLegendLine" />
        <span>Actual</span>
        <br />
        <br />
        <span className="guideCharts__customLegendLine guideCharts__customLegendLine--thin" />
        <span>Projected</span>
      </dl>
    );
  }

  let showLegend = numCharts > 1 || colorType === 'Grouped';
  if (colorType === 'Highlight') showLegend = false;

  return (
    <Fragment>
      {customTitle}
      <div style={{ position: 'relative' }}>
        <Chart size={{ height: 200 }}>
          <Settings
            theme={customTheme}
            showLegend={showLegend}
            legendPosition="right"
            showLegendDisplayValue={false}
          />
          {charts}
          <Axis
            id="bottom-axis"
            position="bottom"
            showGridLines={chartType !== 'BarSeries'}
          />
          <Axis id="left-axis" position="left" showGridLines />
        </Chart>
        {customLegend}
      </div>

      <OuiSpacer />

      <OuiFlexGrid columns={3}>
        <OuiFlexItem>
          <ChartCard
            title="Color types"
            description="Coloring multi-series non-categorical charts can have different connotations.">
            <OuiRadioGroup
              compressed
              options={colorTypeRadios}
              idSelected={grouped ? colorTypeRadios[0].id : colorTypeIdSelected}
              onChange={onColorTypeChange}
              disabled={grouped}
            />
          </ChartCard>
        </OuiFlexItem>
        <OuiFlexItem>
          <ChartCard
            title="Number of series"
            description="Do not use too many colors in a single chart as this will hinder understanding.">
            <OuiSpacer />
            <OuiFormRow
              helpText={
                <span id="levelsHelp3">
                  Recommended number of series is 5 or less.
                </span>
              }>
              <OuiRange
                min={1}
                max={10}
                showTicks
                value={grouped ? '2' : numCharts}
                disabled={grouped}
                onChange={onNumChartsChange}
                levels={[
                  { min: 1, max: 5.5, color: 'success' },
                  { min: 5.5, max: 10, color: 'danger' },
                ]}
                aria-describedby="levelsHelp3"
                aria-label="Number of series"
              />
            </OuiFormRow>
          </ChartCard>
        </OuiFlexItem>
        <OuiFlexItem>
          <ChartCard
            title="Grouping data"
            description="If the series' are or can be combined into logical groups, use contrasting shapes/styles but keep the same color for within groups.">
            <OuiSpacer />
            <OuiSwitch
              label="Show grouped"
              checked={grouped}
              onChange={onGroupChange}
            />
          </ChartCard>
        </OuiFlexItem>
      </OuiFlexGrid>
      <OuiSpacer />

      <div className="oui-textCenter">
        <OuiCopy
          textToCopy={`${
            customTitle
              ? `<OuiTitle size="xxs">
  <h4>
    <OuiIcon type="dot" color={highlightColor} /> My number of issues
    compared to others
  </h4>
</OuiTitle>`
              : ''
          }
<Chart size={{height: 200}}>
  <Settings
    theme={${customColorsString}}
    showLegend={${showLegend}}
    legendPosition="right"
    showLegendDisplayValue={false}
  />
  <${chartType}
    id="bars"
    name="0"
    data={${dataString}}
    xAccessor={'x'}
    yAccessors={['y']}
    splitSeriesAccessors={['g']}
    ${chartType === 'BarSeries' ? "stackAccessors={['g']}" : ''}
  />
  <Axis
    id="bottom-axis"
    position="bottom"
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
              disabled={isBadChart || isComplicatedChart}>
              {isBadChart || isComplicatedChart
                ? isComplicatedChart
                  ? "It's complicated"
                  : "Bad chart, don't copy"
                : 'Copy code of current configuration'}
            </OuiButton>
          )}
        </OuiCopy>
      </div>
    </Fragment>
  );
};
