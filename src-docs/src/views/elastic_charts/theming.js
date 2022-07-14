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
import { ThemeContext } from '../../components';
import {
  Chart,
  Settings,
  Axis,
  LineSeries,
  BarSeries,
  DataGenerator,
} from '@elastic/charts';

import {
  OuiSpacer,
  OuiFlexGroup,
  OuiFlexItem,
  OuiColorPalettePicker,
} from '../../../../src/components';

import {
  OUI_CHARTS_THEME_DARK,
  OUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

import {
  ouiPaletteColorBlind,
  ouiPaletteComplimentary,
  ouiPaletteForStatus,
  ouiPaletteForTemperature,
  ouiPaletteCool,
  ouiPaletteWarm,
  ouiPaletteNegative,
  ouiPalettePositive,
  ouiPaletteGray,
} from '../../../../src/services';

const paletteData = {
  ouiPaletteColorBlind,
  ouiPaletteForStatus,
  ouiPaletteForTemperature,
  ouiPaletteComplimentary,
  ouiPaletteNegative,
  ouiPalettePositive,
  ouiPaletteCool,
  ouiPaletteWarm,
  ouiPaletteGray,
};

const paletteNames = Object.keys(paletteData);

export const Theming = () => {
  const themeContext = useContext(ThemeContext);

  const palettes = paletteNames.map((paletteName, index) => {
    const options =
      index > 0
        ? 10
        : {
            sortBy: 'natural',
          };

    return {
      value: paletteName,
      title: paletteName,
      palette: paletteData[paletteNames[index]](options),
      type: 'fixed',
    };
  });

  const [barPalette, setBarPalette] = useState('ouiPaletteColorBlind');

  /**
   * Create data
   */
  const dg = new DataGenerator();
  const data1 = dg.generateGroupedSeries(20, 1);
  const data2 = dg.generateGroupedSeries(20, 5);

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = themeContext.theme.includes('dark');
  const theme = isDarkTheme
    ? OUI_CHARTS_THEME_DARK.theme
    : OUI_CHARTS_THEME_LIGHT.theme;

  const barPaletteIndex = paletteNames.findIndex((item) => item === barPalette);

  const customTheme =
    barPaletteIndex > 0
      ? [
          {
            colors: {
              vizColors: paletteData[paletteNames[barPaletteIndex]](5),
            },
          },
          theme,
        ]
      : theme;

  return (
    <Fragment>
      <Chart size={{ height: 200 }}>
        <Settings theme={customTheme} showLegend={false} />
        <BarSeries
          id="status"
          name="Status"
          data={data2}
          xAccessor={'x'}
          yAccessors={['y']}
          splitSeriesAccessors={['g']}
          stackAccessors={['g']}
        />
        <LineSeries
          id="control"
          name="Control"
          data={data1}
          xAccessor={'x'}
          yAccessors={['y']}
          color={['black']}
        />
        <Axis id="bottom-axis" position="bottom" showGridLines />
        <Axis id="left-axis" position="left" showGridLines />
      </Chart>
      <OuiSpacer size="xxl" />
      <OuiFlexGroup justifyContent="center">
        <OuiFlexItem grow={false} style={{ width: 300 }}>
          <OuiColorPalettePicker
            palettes={palettes}
            onChange={setBarPalette}
            valueOfSelected={barPalette}
          />
        </OuiFlexItem>
      </OuiFlexGroup>
    </Fragment>
  );
};
