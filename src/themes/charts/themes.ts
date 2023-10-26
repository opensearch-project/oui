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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { ouiPaletteColorBlind } from '../../services/color/oui_palettes';
import { DEFAULT_VISUALIZATION_COLOR } from '../../services/color/visualization_colors';
import {
  PartialTheme,
  LineAnnotationStyle,
  PartitionConfig,
} from '@elastic/charts';

import { RecursivePartial } from '../../components/common';

// @ts-ignore typescript doesn't understand the babel preprocessor
import {
  ouiColorChartBand as ouiV7ColorChartBand,
  ouiColorChartLines as ouiV7ColorChartLines,
  ouiColorDarkShade as ouiV7ColorDarkShade,
  ouiColorDarkestShade as ouiV7ColorDarkestShade,
  ouiColorEmptyShade as ouiV7ColorEmptyShade,
  // @ts-ignore typescript doesn't understand the babel preprocessor
} from '!!variables-from-scss!!../../global_styling/variables/_colors.scss';

// @ts-ignore typescript doesn't understand the babel preprocessor
import {
  ouiColorChartBand as ouiV7ColorChartBandDark,
  ouiColorChartLines as ouiV7ColorChartLinesDark,
  ouiColorDarkShade as ouiV7ColorDarkShadeDark,
  ouiColorDarkestShade as ouiV7ColorDarkestShadeDark,
  ouiColorEmptyShade as ouiV7ColorEmptyShadeDark,
  // @ts-ignore typescript doesn't understand the babel preprocessor
} from '!!variables-from-scss!!../../themes/oui/oui_colors_dark.scss';

const ouiV7FontFamily =
  "'Inter UI', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

// @ts-ignore typescript doesn't understand the babel preprocessor
import {
  ouiColorChartBand as ouiNextColorChartBand,
  ouiColorChartLines as ouiNextColorChartLines,
  ouiColorDarkShade as ouiNextColorDarkShade,
  ouiColorDarkestShade as ouiNextColorDarkestShade,
  ouiColorEmptyShade as ouiNextColorEmptyShade,
  // @ts-ignore typescript doesn't understand the babel preprocessor
} from '!!variables-from-scss!!../oui-next/global_styling/variables/_colors.scss';

// @ts-ignore typescript doesn't understand the babel preprocessor
import {
  ouiColorChartBand as ouiNextColorChartBandDark,
  ouiColorChartLines as ouiNextColorChartLinesDark,
  ouiColorDarkShade as ouiNextColorDarkShadeDark,
  ouiColorDarkestShade as ouiNextColorDarkestShadeDark,
  ouiColorEmptyShade as ouiNextColorEmptyShadeDark,
  // @ts-ignore typescript doesn't understand the babel preprocessor
} from '!!variables-from-scss!!../oui-next/oui_next_colors_dark.scss';

const ouiNextFontFamily =
  "'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

export interface OuiChartThemeType {
  lineAnnotation: LineAnnotationStyle;
  theme: PartialTheme;
  partition: RecursivePartial<PartitionConfig>;
}

function createTheme(theme: any): OuiChartThemeType {
  return {
    lineAnnotation: {
      line: {
        strokeWidth: 1,
        stroke: theme.ouiColorDarkShade,
        opacity: 1,
      },
      details: {
        fontSize: 10,
        fontFamily: theme.fontFamily,
        fill: theme.ouiColorDarkShade,
        padding: 0,
      },
    },
    partition: {
      fontFamily: theme.fontFamily,
      minFontSize: 8,
      maxFontSize: 16,
      fillLabel: {
        textInvertible: false,
        valueFont: {
          fontWeight: 700,
        },
      },
      linkLabel: {
        maxCount: 5,
        fontSize: 11,
        textColor: theme.ouiColorDarkestShade,
      },
      outerSizeRatio: 1,
      circlePadding: 4,
      sectorLineStroke: theme.ouiColorEmptyShade,
      sectorLineWidth: 1.5,
    },
    theme: {
      background: {
        color: theme.ouiColorEmptyShade,
      },
      chartMargins: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      lineSeriesStyle: {
        line: {
          strokeWidth: 2,
        },
        point: {
          fill: theme.ouiColorEmptyShade,
          strokeWidth: 2,
          radius: 3,
        },
      },
      areaSeriesStyle: {
        area: {
          opacity: 0.3,
        },
        line: {
          strokeWidth: 2,
        },
        point: {
          visible: false,
          fill: theme.ouiColorEmptyShade,
          strokeWidth: 2,
          radius: 3,
        },
      },
      barSeriesStyle: {
        displayValue: {
          fontSize: 8,
          fontFamily: theme.fontFamily,
          fill: theme.ouiColorDarkShade,
        },
      },
      scales: {
        barsPadding: 0.25,
        histogramPadding: 0.05,
      },
      axes: {
        axisTitle: {
          fontSize: 12,
          fontFamily: theme.fontFamily,
          fill: theme.ouiColorDarkestShade,
          padding: {
            inner: 10,
            outer: 0,
          },
        },
        axisLine: {
          stroke: theme.ouiColorChartLines,
        },
        tickLabel: {
          fontSize: 10,
          fontFamily: theme.fontFamily,
          fill: theme.ouiColorDarkShade,
          padding: {
            outer: 8,
            inner: 10,
          },
        },
        tickLine: {
          visible: false,
          stroke: theme.ouiColorChartLines,
          strokeWidth: 1,
        },
        gridLine: {
          horizontal: {
            visible: true,
            stroke: theme.ouiColorChartLines,
            strokeWidth: 1,
            opacity: 1,
            dash: [0, 0],
          },
          vertical: {
            visible: true,
            stroke: theme.ouiColorChartLines,
            strokeWidth: 1,
            opacity: 1,
            dash: [4, 4],
          },
        },
      },
      colors: {
        vizColors: ouiPaletteColorBlind({ sortBy: 'natural' }),
        defaultVizColor: DEFAULT_VISUALIZATION_COLOR,
      },
      crosshair: {
        band: {
          fill: theme.ouiColorChartBand,
        },
        line: {
          stroke: theme.ouiColorDarkShade,
          strokeWidth: 1,
          dash: [4, 4],
        },
        crossLine: {
          stroke: theme.ouiColorDarkShade,
          strokeWidth: 1,
          dash: [4, 4],
        },
      },
    },
  };
}

export const OUI_CHARTS_THEME_LIGHT: OuiChartThemeType = createTheme({
  ouiColorChartBand: ouiV7ColorChartBand,
  ouiColorChartLines: ouiV7ColorChartLines,
  ouiColorDarkShade: ouiV7ColorDarkShade,
  ouiColorDarkestShade: ouiV7ColorDarkestShade,
  ouiColorEmptyShade: ouiV7ColorEmptyShade,
  ouiFontFamily: ouiV7FontFamily,
});
export const OUI_CHARTS_THEME_DARK: OuiChartThemeType = createTheme({
  ouiColorChartBand: ouiV7ColorChartBandDark,
  ouiColorChartLines: ouiV7ColorChartLinesDark,
  ouiColorDarkShade: ouiV7ColorDarkShadeDark,
  ouiColorDarkestShade: ouiV7ColorDarkestShadeDark,
  ouiColorEmptyShade: ouiV7ColorEmptyShadeDark,
  ouiFontFamily: ouiV7FontFamily,
});
export const OUI_CHARTS_NEXT_THEME_LIGHT: OuiChartThemeType = createTheme({
  ouiColorChartBand: ouiNextColorChartBand,
  ouiColorChartLines: ouiNextColorChartLines,
  ouiColorDarkShade: ouiNextColorDarkShade,
  ouiColorDarkestShade: ouiNextColorDarkestShade,
  ouiColorEmptyShade: ouiNextColorEmptyShade,
  ouiFontFamily: ouiNextFontFamily,
});
export const OUI_CHARTS_NEXT_THEME_DARK: OuiChartThemeType = createTheme({
  ouiColorChartBand: ouiNextColorChartBandDark,
  ouiColorChartLines: ouiNextColorChartLinesDark,
  ouiColorDarkShade: ouiNextColorDarkShadeDark,
  ouiColorDarkestShade: ouiNextColorDarkestShadeDark,
  ouiColorEmptyShade: ouiNextColorEmptyShadeDark,
  ouiFontFamily: ouiNextFontFamily,
});

export const OUI_SPARKLINE_THEME_PARTIAL: PartialTheme = {
  lineSeriesStyle: {
    point: {
      visible: false,
      strokeWidth: 1,
      radius: 1,
    },
  },
  areaSeriesStyle: {
    point: {
      visible: false,
      strokeWidth: 1,
      radius: 1,
    },
  },
};

/* OUI -> EUI Aliases */
export interface EuiChartThemeType extends OuiChartThemeType {}
export const EUI_CHARTS_THEME_LIGHT = OUI_CHARTS_THEME_LIGHT;
export const EUI_CHARTS_THEME_DARK = OUI_CHARTS_THEME_DARK;
export const EUI_CHARTS_NEXT_THEME_LIGHT = OUI_CHARTS_NEXT_THEME_LIGHT;
export const EUI_CHARTS_NEXT_THEME_DARK = OUI_CHARTS_NEXT_THEME_DARK;
export const EUI_SPARKLINE_THEME_PARTIAL = OUI_SPARKLINE_THEME_PARTIAL;
/* End of Aliases */
