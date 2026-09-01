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

import React, { Fragment, useState } from 'react';

import {
  OuiFlexGroup,
  OuiFlexItem,
  OuiRange,
  OuiFormRow,
  OuiSpacer,
  OuiTitle,
  OuiText,
} from '../../../../src/components';

import { ColorPaletteFlexItem, ColorPaletteCopyCode } from './shared';

import {
  ouiPaletteComplimentary,
  ouiPaletteForStatus,
  ouiPaletteForTemperature,
  ouiPaletteCool,
  ouiPaletteWarm,
  ouiPaletteNegative,
  ouiPalettePositive,
  ouiPaletteGray,
} from '../../../../src/services';
import {
  colorSchemas,
  getHeatmapColors,
  truncatedColorMaps,
} from './osd_legacy_color_maps/color_maps';
import { getLegendColors } from './osd_legacy_color_maps/color_util';
import { COLOR_PALETTES as observabilityColorPalettes } from './osd_legacy_color_maps/observability_colors';
import { serviceMapColorPalette } from './osd_legacy_color_maps/observability_trace_analytics_color_palettes';
import { OuiLink } from '../../../../src/components/link';

const paletteData = {
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

export default () => {
  const [length, setLength] = useState(5);

  const onLengthChange = (e) => {
    setLength(e.currentTarget.value);
  };

  return (
    <Fragment>
      <OuiFormRow label="Number of steps" display="columnCompressed">
        <OuiRange
          value={length}
          onChange={onLengthChange}
          min={1}
          max={20}
          compressed
          showValue
        />
      </OuiFormRow>

      <OuiSpacer />
      <OuiTitle size="xxs">
        <h3>OUI palettes (not in use in OpenSearch Dashboards)</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      {paletteNames.map((paletteName) => (
        <OuiFlexGroup alignItems="center" key={paletteName}>
          <OuiFlexItem grow={false}>
            <OuiFlexGroup
              className="guideColorPalette__swatchHolder"
              gutterSize="none"
              responsive={false}>
              {paletteData[paletteName](Number(length)).map((hexCode) => (
                <ColorPaletteFlexItem hexCode={hexCode} key={hexCode} />
              ))}
            </OuiFlexGroup>
          </OuiFlexItem>
          <OuiFlexItem>
            <ColorPaletteCopyCode
              textToCopy={`${paletteName}(${length});`}
              code={`${paletteName}(${length})`}
            />
          </OuiFlexItem>
        </OuiFlexGroup>
      ))}
      <OuiSpacer />
      <OuiTitle size="xxs">
        <h3>
          OpenSearch Dashboards color schemas (VisLib Gauge, VisLib Goal, VisLib
          Heatmap, Metric) via{' '}
          <OuiLink href="https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/src/plugins/charts/public/static/color_maps/heatmap_color.ts#LL69C13-L69C13">
            getHeatmapColors()
          </OuiLink>{' '}
          (
          <OuiLink href="https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/src/plugins/charts/public/static/color_maps/color_maps.ts">
            source code
          </OuiLink>
          )
        </h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      {colorSchemas.map(({ value }) => (
        <OuiFlexGroup alignItems="center" key={value}>
          <OuiFlexItem grow={false}>
            <OuiFlexGroup
              className="guideColorPalette__swatchHolder"
              gutterSize="none"
              responsive={false}>
              {Array.from(Array(Number(length)).keys()).map((index) => {
                const divider = Math.max(length - 1, 1);
                const hexCode = getHeatmapColors(index / divider, value);

                return <ColorPaletteFlexItem hexCode={hexCode} key={hexCode} />;
              })}
            </OuiFlexGroup>
          </OuiFlexItem>
          <OuiFlexItem>
            <ColorPaletteCopyCode
              textToCopy={`${value}(${length});`}
              code={`${value}(${length})`}
            />
          </OuiFlexItem>
          {value === 'Green to Red' && (
            <OuiFlexItem>
              <OuiText>Default for Gauge, Goal, Metric</OuiText>
            </OuiFlexItem>
          )}
          {value === 'Greens' && (
            <OuiFlexItem>
              <OuiText>Default for Heatmap</OuiText>
            </OuiFlexItem>
          )}
        </OuiFlexGroup>
      ))}

      <OuiSpacer />
      <OuiTitle size="xxs">
        <h3>
          OpenSearch Dashboards choropleth scales (Region Map, Coordinate Map)
          via truncatedColorMaps and getLegendColors() (
          <OuiLink href="https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/src/plugins/charts/public/static/color_maps/truncated_color_maps.ts#L33-L46">
            source code
          </OuiLink>
          )
        </h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      {colorSchemas.map(({ value }) => (
        <OuiFlexGroup alignItems="center" key={value}>
          <OuiFlexItem grow={false}>
            <OuiFlexGroup
              className="guideColorPalette__swatchHolder"
              gutterSize="none"
              responsive={false}>
              {getLegendColors(
                truncatedColorMaps[value].value,
                Number(length)
              ).map((hexCode) => {
                return <ColorPaletteFlexItem hexCode={hexCode} key={hexCode} />;
              })}
            </OuiFlexGroup>
          </OuiFlexItem>
          <OuiFlexItem>
            <ColorPaletteCopyCode
              textToCopy={`${value}(${length});`}
              code={`${value}(${length})`}
            />
          </OuiFlexItem>
          {value === 'Yellow to Red' && (
            <OuiFlexItem>
              <OuiText>Default for Region Map, Coordinate Map</OuiText>
            </OuiFlexItem>
          )}
        </OuiFlexGroup>
      ))}
      <OuiSpacer />
      <OuiTitle size="xxs">
        <h3>
          OpenSearch Dashboards Observability Heat Map schemes via
          colorPalette() (
          <OuiLink href="https://github.com/opensearch-project/dashboards-observability/blob/main/common/constants/colors.ts">
            source code
          </OuiLink>
          )
        </h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      {observabilityColorPalettes
        .filter(({ palette }) => palette)
        .map(({ title, palette }) => (
          <OuiFlexGroup alignItems="center" key={title}>
            <OuiFlexItem grow={false}>
              <OuiFlexGroup
                className="guideColorPalette__swatchHolder"
                gutterSize="none"
                responsive={false}>
                {palette
                  .filter((_x, i) => {
                    if (palette.length <= length) {
                      return true;
                    }
                    const sampledIndices = Array.from(
                      Array(length - 1).keys()
                    ).map((x) =>
                      Math.round((x * palette.length) / (length - 1))
                    );

                    return (
                      i === palette.length - 1 || sampledIndices.includes(i)
                    );
                  })
                  .reverse()
                  .map((hexCode) => {
                    return (
                      <ColorPaletteFlexItem hexCode={hexCode} key={hexCode} />
                    );
                  })}
              </OuiFlexGroup>
            </OuiFlexItem>
            <OuiFlexItem>
              <ColorPaletteCopyCode
                textToCopy={`${title}(${length}, downsampled from ${palette.length});`}
                code={`${title}(${length}, downsampled from ${palette.length})`}
              />
            </OuiFlexItem>
            {title === 'Reds' && (
              <OuiFlexItem>
                <OuiText>Default for Observability Heat Map</OuiText>
              </OuiFlexItem>
            )}
          </OuiFlexGroup>
        ))}
      <OuiSpacer />
      <OuiTitle size="xxs">
        <h3>
          OpenSearch Dashboards Observability Trace Analytics palettes (
          <OuiLink href="https://github.com/opensearch-project/dashboards-observability/blob/main/public/components/trace_analytics/components/common/color_palette.ts">
            source code
          </OuiLink>
          )
        </h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      {Object.entries(serviceMapColorPalette).map(([key, value]) => (
        <OuiFlexGroup alignItems="center" key={key}>
          <OuiFlexItem grow={false}>
            <OuiFlexGroup
              className="guideColorPalette__swatchHolder"
              gutterSize="none"
              responsive={false}>
              {value
                .filter((_x, i) => {
                  const sampledIndices = Array.from(
                    Array(length - 1).keys()
                  ).map((x) => Math.round((x * value.length) / (length - 1)));

                  return i === value.length - 1 || sampledIndices.includes(i);
                })
                .map((rgbValues) => {
                  const rgb = `rgb(${rgbValues})`;
                  return <ColorPaletteFlexItem hexCode={rgb} key={rgb} />;
                })}
            </OuiFlexGroup>
          </OuiFlexItem>
          <OuiFlexItem>
            <ColorPaletteCopyCode
              textToCopy={`${key}(${length}, downsampled from ${value.length});`}
              code={`${key}(${length}, downsampled from ${value.length})`}
            />
          </OuiFlexItem>
        </OuiFlexGroup>
      ))}
    </Fragment>
  );
};
