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

import {
  OuiFlexGroup,
  OuiFlexItem,
  OuiTitle,
  OuiSpacer,
  OuiBadge,
  OuiFlexGrid,
} from '../../../../src/components';
import { OuiLink } from '../../../../src/components/link';

import {
  ouiPaletteColorBlind,
  ouiPaletteColorBlindBehindText,
} from '../../../../src/services';
import { ColorPaletteFlexItem, ColorPaletteCopyCode } from './shared';

const customPalettes = [
  {
    title: 'Max 10 colors',
    palette: ouiPaletteColorBlind(),
    code: 'ouiPaletteColorBlind()',
  },
  {
    title: 'More than 10 colors are needed',
    palette: ouiPaletteColorBlind({ rotations: 2 }),
    code: 'ouiPaletteColorBlind({rotations: 2})',
  },
  {
    title:
      'Series may have multiple metrics and so the colors must coordinate but be distinguishable',
    palette: ouiPaletteColorBlind({
      rotations: 3,
      order: 'group',
      direction: 'both',
    }),
    code:
      "ouiPaletteColorBlind({rotations: 3, order: 'group', direction: 'both'})",
  },
  {
    title:
      "The default sort order is close but not exactly aligned with the color wheel. To sort this better add the 'natural' sort param.",
    palette: ouiPaletteColorBlind({ sortBy: 'natural' }),
    code: "ouiPaletteColorBlind({sortBy: 'natural'})",
  },
];

export default () => (
  <Fragment>
    <OuiTitle size="xs">
      <h3>
        OUI qualitative palettes (Vega, pre-selected swatches in Gannt Chart,
        TSVB)
      </h3>
    </OuiTitle>
    {customPalettes.map((palette) => (
      <Fragment key={palette.title}>
        <OuiTitle size="xxs">
          <h3>{palette.title}</h3>
        </OuiTitle>
        <OuiSpacer size="s" />
        <OuiFlexGroup alignItems="center">
          <OuiFlexItem grow={false} style={{ maxWidth: 240 }}>
            <OuiFlexGroup
              className="guideColorPalette__swatchHolder"
              gutterSize="none"
              alignItems="flexStart"
              responsive={false}
              wrap>
              {palette.palette.map((hexCode) => (
                <ColorPaletteFlexItem
                  className="guideColorPalette__swatch--notRound"
                  hexCode={hexCode}
                  key={hexCode}
                />
              ))}
            </OuiFlexGroup>
          </OuiFlexItem>
          <OuiFlexItem>
            <ColorPaletteCopyCode code={palette.code} />
          </OuiFlexItem>
        </OuiFlexGroup>
        <OuiSpacer size="xl" />
      </Fragment>
    ))}
    <OuiTitle size="xxs">
      <h3>Behind text variant</h3>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiFlexGroup alignItems="center">
      <OuiFlexItem grow={false} style={{ maxWidth: 240 }}>
        <OuiFlexGrid columns={4} gutterSize="s">
          {ouiPaletteColorBlindBehindText({ sortBy: 'natural' }).map(
            (color, i) => (
              <OuiFlexItem key={i} grow={false}>
                <span>
                  <OuiBadge color={color}>Text</OuiBadge>
                </span>
              </OuiFlexItem>
            )
          )}
        </OuiFlexGrid>
      </OuiFlexItem>
      <OuiFlexItem>
        <ColorPaletteCopyCode
          textToCopy={"ouiPaletteColorBlindBehindText({ sortBy: 'natural' })"}
          code={"ouiPaletteColorBlindBehindText({ sortBy: 'natural' })"}
        />
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiSpacer size="xl" />
    <OuiTitle size="xs">
      <h3>Legacy qualitative palettes</h3>
    </OuiTitle>
    <OuiTitle size="xxs">
      <h3>OpenSearch Dashboards legacy seed colors (Tag cloud)</h3>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiFlexGroup alignItems="center">
      <OuiFlexItem grow={false} style={{ maxWidth: 240 }}>
        <OuiFlexGroup
          className="guideColorPalette__swatchHolder"
          gutterSize="none"
          alignItems="flexStart"
          responsive={false}
          wrap>
          {[
            '#00a69b',
            '#57c17b',
            '#6f87d8',
            '#663db8',
            '#bc52bc',
            '#9e3533',
            '#daa05d',
          ].map((hexCode) => (
            <ColorPaletteFlexItem
              className="guideColorPalette__swatch--notRound"
              hexCode={hexCode}
              key={hexCode}
            />
          ))}
        </OuiFlexGroup>
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiLink href="https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/src/plugins/charts/public/services/colors/seed_colors.ts#L36-L44">
          Source code
        </OuiLink>
      </OuiFlexItem>
      <OuiFlexItem>
        <ColorPaletteCopyCode code="colors.seedColors" />
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiSpacer size="xl" />
    <OuiTitle size="xxs">
      <h3>
        OpenSearch Dashboards legacy mapped colors (VisLib Area, VisLib Pie,
        VisLib Horizontal Bar, VisLib Line, VisLib Vertical Bar, TSVB&nbsp;
        <OuiLink href="https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/docs/charts/current_usage.md#chartspluginsetup">
          as fallback
        </OuiLink>
        )
      </h3>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiFlexGroup alignItems="center">
      <OuiFlexItem grow={false} style={{ maxWidth: 192 }}>
        <OuiFlexGroup
          className="guideColorPalette__swatchHolder"
          gutterSize="none"
          alignItems="flexStart"
          responsive={false}
          wrap>
          {[
            '#57c17b',
            '#6f87d8',
            '#663db8',
            '#bc52bc',
            '#9e3533',
            '#daa05d',
            '#BFAF40',
            '#4050BF',
            '#BF5040',
            '#40AFBF',
            '#70BF40',
            '#8F40BF',
            '#BF40A7',
            '#40BF58',
            '#BF9740',
            '#4068BF',
            '#BF4048',
            '#40BFB7',
            '#87BF40',
            '#7840BF',
            '#BF4078',
            '#40BF87',
            '#B7BF40',
            '#4840BF',
            '#BF6840',
            '#4097BF',
            '#58BF40',
            '#A740BF',
            '#BF40B3',
            '#40BF4C',
          ].map((hexCode) => (
            <ColorPaletteFlexItem
              className="guideColorPalette__swatch--notRound"
              hexCode={hexCode}
              key={hexCode}
            />
          ))}
        </OuiFlexGroup>
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiLink href="https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/src/plugins/charts/public/services/colors/color_palette.ts">
          Source code
        </OuiLink>
      </OuiFlexItem>
      <OuiFlexItem>
        <ColorPaletteCopyCode code="colors.createColorLookupFunction()" />
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiSpacer size="xl" />
    <OuiTitle size="xxs">
      <h3>
        OpenSearch Dashboards legend colors (available choices in the legend
        color picker)
      </h3>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiFlexGroup alignItems="center">
      <OuiFlexItem grow={false} style={{ maxWidth: 192 }}>
        <OuiFlexGroup
          className="guideColorPalette__swatchHolder"
          gutterSize="none"
          alignItems="flexStart"
          responsive={false}
          wrap>
          {[
            '#3F6833',
            '#967302',
            '#2F575E',
            '#99440A',
            '#58140C',
            '#052B51',
            '#511749',
            '#3F2B5B', // 6
            '#508642',
            '#CCA300',
            '#447EBC',
            '#C15C17',
            '#890F02',
            '#0A437C',
            '#6D1F62',
            '#584477', // 2
            '#629E51',
            '#E5AC0E',
            '#64B0C8',
            '#E0752D',
            '#BF1B00',
            '#0A50A1',
            '#962D82',
            '#614D93', // 4
            '#7EB26D',
            '#EAB839',
            '#6ED0E0',
            '#EF843C',
            '#E24D42',
            '#1F78C1',
            '#BA43A9',
            '#705DA0', // Normal
            '#9AC48A',
            '#F2C96D',
            '#65C5DB',
            '#F9934E',
            '#EA6460',
            '#5195CE',
            '#D683CE',
            '#806EB7', // 5
            '#B7DBAB',
            '#F4D598',
            '#70DBED',
            '#F9BA8F',
            '#F29191',
            '#82B5D8',
            '#E5A8E2',
            '#AEA2E0', // 3
            '#E0F9D7',
            '#FCEACA',
            '#CFFAFF',
            '#F9E2D2',
            '#FCE2DE',
            '#BADFF4',
            '#F9D9F9',
            '#DEDAF7', // 7
          ].map((hexCode) => (
            <ColorPaletteFlexItem
              className="guideColorPalette__swatch--notRound"
              hexCode={hexCode}
              key={hexCode}
            />
          ))}
        </OuiFlexGroup>
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiLink href="https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/src/plugins/vis_type_vislib/public/vislib/components/legend/models.ts#L38-L95">
          Source code
        </OuiLink>
      </OuiFlexItem>
      <OuiFlexItem>
        <ColorPaletteCopyCode code="legendColors" />
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiSpacer size="xl" />
    <OuiTitle size="xxs">
      <h3>OpenSearch Dashboards Timeline colors</h3>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiFlexGroup alignItems="center">
      <OuiFlexItem grow={false} style={{ maxWidth: 240 }}>
        <OuiFlexGroup
          className="guideColorPalette__swatchHolder"
          gutterSize="none"
          alignItems="flexStart"
          responsive={false}
          wrap>
          {[
            '#01A4A4',
            '#C66',
            '#D0D102',
            '#616161',
            '#00A1CB',
            '#32742C',
            '#F18D05',
            '#113F8C',
            '#61AE24',
            '#D70060',
          ].map((hexCode) => (
            <ColorPaletteFlexItem
              className="guideColorPalette__swatch--notRound"
              hexCode={hexCode}
              key={hexCode}
            />
          ))}
        </OuiFlexGroup>
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiLink href="https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/src/plugins/vis_type_timeline/public/helpers/panel_utils.ts#L68-L79">
          Source code
        </OuiLink>
      </OuiFlexItem>
      <OuiFlexItem>
        <ColorPaletteCopyCode code="colors" />
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiSpacer size="xl" />
    <OuiTitle size="xxs">
      <h3>OpenSearch Dashboards Observability Plotly colors</h3>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiFlexGroup alignItems="center">
      <OuiFlexItem grow={false} style={{ maxWidth: 240 }}>
        <OuiFlexGroup
          className="guideColorPalette__swatchHolder"
          gutterSize="none"
          alignItems="flexStart"
          responsive={false}
          wrap>
          {[
            '#3CA1C7',
            '#8C55A3',
            '#DB748A',
            '#F2BE4B',
            '#68CCC2',
            '#2A7866',
            '#843769',
            '#374FB8',
            '#BD6F26',
            '#4C636F',
          ].map((hexCode) => (
            <ColorPaletteFlexItem
              className="guideColorPalette__swatch--notRound"
              hexCode={hexCode}
              key={hexCode}
            />
          ))}
        </OuiFlexGroup>
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiLink href="https://github.com/opensearch-project/dashboards-observability/blob/main/common/constants/shared.ts#L56-L67">
          Source code
        </OuiLink>
      </OuiFlexItem>
      <OuiFlexItem>
        <ColorPaletteCopyCode code="PLOTLY_COLORS" />
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiSpacer size="xl" />
    <OuiTitle size="xs">
      <h3>Legacy single-color defaults</h3>
    </OuiTitle>
    <OuiTitle size="xxs">
      <h3>
        OpenSearch Dashboards VisLib Area, Horizontal Bar, Line, Pie, Vertical
        Bar default color
      </h3>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiFlexGroup alignItems="center">
      <OuiFlexItem grow={false} style={{ maxWidth: 240 }}>
        <OuiFlexGroup
          className="guideColorPalette__swatchHolder"
          gutterSize="none"
          alignItems="flexStart"
          responsive={false}
          wrap>
          {['#00a69b'].map((hexCode) => (
            <ColorPaletteFlexItem
              className="guideColorPalette__swatch--notRound"
              hexCode={hexCode}
              key={hexCode}
            />
          ))}
        </OuiFlexGroup>
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiLink href="https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/src/plugins/charts/public/services/colors/seed_colors.ts#L37">
          Source code
        </OuiLink>
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiSpacer size="xl" />
    <OuiTitle size="xxs">
      <h3>OpenSearch Dashboards TSVB default color</h3>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiFlexGroup alignItems="center">
      <OuiFlexItem grow={false} style={{ maxWidth: 240 }}>
        <OuiFlexGroup
          className="guideColorPalette__swatchHolder"
          gutterSize="none"
          alignItems="flexStart"
          responsive={false}
          wrap>
          {['#68BC00'].map((hexCode) => (
            <ColorPaletteFlexItem
              className="guideColorPalette__swatch--notRound"
              hexCode={hexCode}
              key={hexCode}
            />
          ))}
        </OuiFlexGroup>
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiLink href="https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/src/plugins/vis_type_timeseries/public/metrics_type.ts#L56">
          Source code
        </OuiLink>
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiSpacer size="xl" />
    <OuiTitle size="xxs">
      <h3>OpenSearch Dashboards Observability default color</h3>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiFlexGroup alignItems="center">
      <OuiFlexItem grow={false} style={{ maxWidth: 240 }}>
        <OuiFlexGroup
          className="guideColorPalette__swatchHolder"
          gutterSize="none"
          alignItems="flexStart"
          responsive={false}
          wrap>
          {['#3CA1C7'].map((hexCode) => (
            <ColorPaletteFlexItem
              className="guideColorPalette__swatch--notRound"
              hexCode={hexCode}
              key={hexCode}
            />
          ))}
        </OuiFlexGroup>
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiLink href="https://github.com/opensearch-project/dashboards-observability/blob/main/public/components/event_analytics/utils/utils.tsx#L288">
          Source code
        </OuiLink>
      </OuiFlexItem>
    </OuiFlexGroup>
    <OuiSpacer size="xl" />
    <OuiTitle size="xxs">
      <h3>OpenSearch Dashboards Gantt Chart default color</h3>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiFlexGroup alignItems="center">
      <OuiFlexItem grow={false} style={{ maxWidth: 240 }}>
        <OuiFlexGroup
          className="guideColorPalette__swatchHolder"
          gutterSize="none"
          alignItems="flexStart"
          responsive={false}
          wrap>
          {['#6092C0'].map((hexCode) => (
            <ColorPaletteFlexItem
              className="guideColorPalette__swatch--notRound"
              hexCode={hexCode}
              key={hexCode}
            />
          ))}
        </OuiFlexGroup>
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiLink href="https://github.com/opensearch-project/dashboards-visualizations/blob/main/gantt-chart/public/gantt_vis_type.ts#L118">
          Source code
        </OuiLink>
      </OuiFlexItem>
    </OuiFlexGroup>
  </Fragment>
);
