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

import React, { useState } from 'react';
import {
  ouiPaletteColorBlind,
  ouiPaletteForStatus,
  ouiPaletteForTemperature,
  ouiPaletteComplimentary,
  ouiPaletteNegative,
  ouiPalettePositive,
  ouiPaletteCool,
  ouiPaletteWarm,
  ouiPaletteGray,
} from '../../../../src/services/color';

import {
  OuiColorPaletteDisplay,
  OuiColorPalettePicker,
  OuiFormRow,
  OuiSpacer,
  OuiTitle,
  OuiFlexGroup,
  OuiFlexItem,
  OuiPopover,
  OuiRange,
  OuiSwitch,
  OuiCode,
  OuiButtonEmpty,
  OuiSelect,
} from '../../../../src/components/';

const paletteWithStops = [
  {
    stop: 100,
    color: 'white',
  },
  {
    stop: 250,
    color: 'lightgray',
  },
  {
    stop: 320,
    color: 'gray',
  },
  {
    stop: 470,
    color: 'black',
  },
];

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

const sizes = [
  { value: 'xs', text: 'Extra small' },
  { value: 's', text: 'Small' },
  { value: 'm', text: 'Medium' },
];

export default () => {
  const [palette, setPalette] = useState('1');
  const [categories, setCategories] = useState(5);
  const [selectionType, setSelectionType] = useState(true);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [size, setSize] = useState(sizes[1].value);

  const onChangeSize = (e) => {
    setSize(e.target.value);
  };

  const onChange = (e) => {
    setCategories(parseInt(e.target.value));
  };

  const palettes = paletteNames.map((paletteName, index) => {
    return {
      value: String(index + 1),
      title: paletteName,
      palette: paletteData[paletteNames[index]](categories),
      type: selectionType ? 'fixed' : 'gradient',
    };
  });

  const selectedPalette = paletteData[paletteNames[palette - 1]](categories);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <OuiButtonEmpty
      onClick={onButtonClick}
      iconType="controlsVertical"
      aria-label="Open settings"
      color="text"
      size="xs">
      Customize
    </OuiButtonEmpty>
  );

  return (
    <>
      <OuiTitle size="xxxs">
        <h3>Fixed</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiColorPaletteDisplay type="fixed" palette={ouiPaletteColorBlind()} />
      <OuiSpacer />
      <OuiTitle size="xxxs">
        <h3>Gradient</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiColorPaletteDisplay
        type="gradient"
        palette={ouiPaletteColorBlind()}
      />
      <OuiSpacer />
      <OuiTitle size="xxxs">
        <h3>Fixed with stops</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiColorPaletteDisplay type="fixed" palette={paletteWithStops} />
      <OuiSpacer />
      <OuiTitle size="xxxs">
        <h3>Gradient with stops</h3>
      </OuiTitle>
      <OuiSpacer size="s" />
      <OuiColorPaletteDisplay type="gradient" palette={paletteWithStops} />
      <OuiSpacer />
      <OuiTitle size="xxxs">
        <h3>Complex example</h3>
      </OuiTitle>
      <OuiSpacer size="xs" />
      <OuiFlexGroup alignItems="center" gutterSize="xs">
        <OuiFlexItem>
          <OuiColorPaletteDisplay
            type={selectionType ? 'fixed' : 'gradient'}
            palette={selectedPalette}
            size={size}
          />
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiPopover
            panelStyle={{ minWidth: 380 }}
            button={button}
            isOpen={isPopoverOpen}
            closePopover={closePopover}>
            <OuiFormRow label="Color palette" display="columnCompressed">
              <OuiColorPalettePicker
                palettes={palettes}
                onChange={setPalette}
                valueOfSelected={palette}
                selectionDisplay="title"
                compressed
              />
            </OuiFormRow>
            <OuiFormRow label="Number of stops" display="columnCompressed">
              <OuiRange
                value={categories}
                onChange={onChange}
                min={1}
                max={10}
                compressed
                showValue
              />
            </OuiFormRow>
            <OuiFormRow label="Size" display="columnCompressed">
              <OuiSelect
                options={sizes}
                value={size}
                onChange={(e) => onChangeSize(e)}
                compressed
              />
            </OuiFormRow>
            <OuiFormRow
              label={
                <span>
                  Display <OuiCode>fixed</OuiCode>
                </span>
              }
              display="columnCompressedSwitch">
              <OuiSwitch
                checked={selectionType}
                onChange={() => setSelectionType(!selectionType)}
                compressed
                showLabel={false}
                label="Display as fixed"
              />
            </OuiFormRow>
          </OuiPopover>
        </OuiFlexItem>
      </OuiFlexGroup>
    </>
  );
};
