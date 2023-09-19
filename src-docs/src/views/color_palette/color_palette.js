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
    title: 'Lots of colors, with the extremes last',
    palette: ouiPaletteColorBlind({
      rotations: 9,
      direction: 'both',
      order: 'middle-out',
    }),
    code:
      "ouiPaletteColorBlind({ rotations: 9, direction: 'both', order: 'middle-out' })",
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
  </Fragment>
);
