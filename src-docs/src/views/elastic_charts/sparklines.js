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

import React, { useContext, Fragment } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { ThemeContext } from '../../components';
import {
  Chart,
  BarSeries,
  Settings,
  LineSeries,
  AreaSeries,
} from '@elastic/charts';

import {
  OUI_CHARTS_THEME_DARK,
  OUI_CHARTS_THEME_LIGHT,
  OUI_SPARKLINE_THEME_PARTIAL,
} from '../../../../src/themes/charts/themes';

import {
  OuiPanel,
  OuiStat,
  OuiFlexGrid,
  OuiFlexItem,
  OuiIcon,
  OuiSpacer,
  OuiText,
} from '../../../../src/components';

import { TIME_DATA_SMALL } from './data';
import {
  ouiPaletteForDarkBackground,
  ouiPaletteForLightBackground,
} from '../../../../src/services';

export const Sparklines = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');

  const theme = [
    OUI_SPARKLINE_THEME_PARTIAL,
    isDarkTheme ? OUI_CHARTS_THEME_DARK.theme : OUI_CHARTS_THEME_LIGHT.theme,
  ];

  const TIME_DATA_SMALL_REVERSE = cloneDeep(TIME_DATA_SMALL).reverse();
  const TIME_DATA_SMALL_REVERSE_MAJOR = cloneDeep(TIME_DATA_SMALL_REVERSE);
  TIME_DATA_SMALL_REVERSE_MAJOR[
    TIME_DATA_SMALL_REVERSE_MAJOR.length - 1
  ][1] = -100;

  return (
    <Fragment>
      <OuiFlexGrid columns={4} responsive={false}>
        <OuiFlexItem>
          <OuiPanel>
            <OuiStat title="" description="Number of things" textAlign="right">
              <OuiSpacer size="s" />
              <Chart size={{ height: 64 }}>
                <Settings theme={theme} showLegend={false} tooltip="none" />
                <BarSeries
                  id="numbers"
                  data={TIME_DATA_SMALL}
                  xAccessor={0}
                  yAccessors={[1]}
                  color={[
                    isDarkTheme
                      ? ouiPaletteForDarkBackground()[1]
                      : ouiPaletteForLightBackground()[1],
                  ]}
                />
              </Chart>
            </OuiStat>
          </OuiPanel>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiPanel>
            <OuiStat
              title=""
              description="Increase over time"
              titleColor="success"
              textAlign="right">
              <OuiSpacer size="s" />
              <Chart size={{ height: 48 }}>
                <Settings theme={theme} showLegend={false} tooltip="none" />
                <LineSeries
                  id="increase"
                  data={TIME_DATA_SMALL}
                  xAccessor={0}
                  yAccessors={[1]}
                  color={[
                    isDarkTheme
                      ? ouiPaletteForDarkBackground()[1]
                      : ouiPaletteForLightBackground()[1],
                  ]}
                />
              </Chart>
              <OuiSpacer size="s" />
              <OuiText size="xs" color="success">
                <OuiIcon type="sortUp" /> <strong>15%</strong>
              </OuiText>
            </OuiStat>
          </OuiPanel>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiPanel>
            <OuiStat
              title={
                <span>
                  <OuiIcon size="xl" type="sortDown" /> 15%
                </span>
              }
              description="Major decrease over time"
              titleColor="danger"
              textAlign="right">
              <OuiSpacer size="s" />
              <Chart size={{ height: 16 }}>
                <Settings theme={theme} showLegend={false} tooltip="none" />
                <LineSeries
                  id="major"
                  data={TIME_DATA_SMALL_REVERSE_MAJOR}
                  xAccessor={0}
                  yAccessors={[1]}
                  color={[
                    isDarkTheme
                      ? ouiPaletteForDarkBackground()[3]
                      : ouiPaletteForLightBackground()[3],
                  ]}
                />
              </Chart>
            </OuiStat>
          </OuiPanel>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiPanel>
            <OuiStat
              title=""
              description="Subtle decrease"
              titleColor="danger"
              textAlign="right">
              <OuiSpacer size="s" />
              <Chart size={{ height: 48 }}>
                <Settings theme={theme} showLegend={false} tooltip="none" />
                <AreaSeries
                  id="subtle"
                  data={TIME_DATA_SMALL_REVERSE}
                  xAccessor={0}
                  yAccessors={[1]}
                  color={[
                    isDarkTheme
                      ? ouiPaletteForDarkBackground()[3]
                      : ouiPaletteForLightBackground()[3],
                  ]}
                />
              </Chart>
              <OuiSpacer size="s" />
              <OuiText size="xs" color="danger">
                - 15 points since last Tuesday
              </OuiText>
            </OuiStat>
          </OuiPanel>
        </OuiFlexItem>
      </OuiFlexGrid>
    </Fragment>
  );
};
