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

import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiColorPicker,
  OuiColorPaletteDisplay,
  OuiColorPalettePicker,
  OuiColorStops,
  OuiText,
} from '../../../../src/components';
import {
  OuiColorPalettePickerPaletteTextProps,
  OuiColorPalettePickerPaletteFixedProps,
  OuiColorPalettePickerPaletteGradientProps,
} from '!!prop-loader!../../../../src/components/color_picker/color_palette_picker/color_palette_picker';

import { ColorStop } from '!!prop-loader!../../../../src/components/color_picker/color_stops/color_stop_thumb';

import playgrounds from './playground';

import ColorPicker from './color_picker';
const colorPickerSource = require('./color_picker?raw');
const colorPickerHtml = renderToHtml(ColorPicker);
const colorPickerSnippet = `<OuiColorPicker
  id={colorPickerId}
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
/>
`;

import ColorPaletteDisplay from './color_palette_display';
const colorPaletteDisplaySource = require('./color_palette_display?raw');
const colorPaletteDisplayHtml = renderToHtml(ColorPaletteDisplay);
const colorPaletteDisplaySnippet = [
  `<OuiColorPaletteDisplay
  palette={ouiPaletteColorBlind()}
/>
`,
  `<OuiColorPaletteDisplay
  palette={[
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
  ]}
/>
`,
];

import ColorPalettePicker from './color_palette_picker';
const colorPalettePickerSource = require('./color_palette_picker?raw');
const colorPalettePickerHtml = renderToHtml(ColorPalettePicker);
const colorPalettePickerSnippet = `<OuiColorPalettePicker
  palettes={[
    {
      value: 'palette1',
      title: 'Palette 1',
      palette: ouiPaletteColorBlind(),
      type: 'fixed',
    },
  ]}
  onChange={onPaletteChange}
  valueOfSelected={palette}
/>
`;

import ColorStops from './color_stops';
const colorStopsSource = require('./color_stops?raw');
const colorStopsHtml = renderToHtml(ColorStops);
const colorStopsSnippetStandard = `<OuiColorStops
  label="Standard"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
/>`;

const colorStopsSnippetAdd = `<OuiColorStops
  label="Custom add color"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  addColor={colorToAddToNewStops}
/>`;

const colorStopsSnippetFixed = `<OuiColorStops
  label="Fixed color segments"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  stopType="fixed"
/>
`;

const colorStopsSnippetStepped = `<OuiColorStops
  label="Stepped color segments"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  stopType="stepped"
  stepNumber={stepNumber}
/>
`;

import ColorStopsRange from './color_stops_range';
const colorStopsRangeSource = require('./color_stops_range?raw');
const colorStopsRangeHtml = renderToHtml(ColorStopsRange);
const colorPickerRangeSnippet = `<OuiColorStops
  label="Free-range color stops"
  onChange={handleChange}
  colorStops={colorStops}
/>
`;

import Alpha from './alpha';
const alphaSource = require('./alpha?raw');
const alphaHtml = renderToHtml(Alpha);
const alphaSnippet = `<OuiColorPicker
  id={colorPickerId}
  onChange={handleChange}
  color={chosenColor}
  showAlpha={true}
  isInvalid={hasErrors}
/>`;

import Formats from './formats';
const formatsSource = require('./formats?raw');
const formatsHtml = renderToHtml(Formats);
const formatsSnippet = `<OuiColorPicker
  format="hex"
  id={colorPickerId}
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
/>`;

import CustomSwatches from './custom_swatches';
const customSwatchesSource = require('./custom_swatches?raw');
const customSwatchesHtml = renderToHtml(CustomSwatches);
const customSwatchesSnippet = `<OuiColorPicker
  id={colorPickerId}
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  swatches={[
    '#333',
    '#666',
    '#999',
    '#CCC',
  ]}
/>`;

const stopCustomSwatchesSnippet = `<OuiColorStops
  label="Swatches"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  swatches={[
    '#333',
    '#666',
    '#999',
    '#CCC',
  ]}
/>
`;

import CustomButton from './custom_button';
const customButtonSource = require('./custom_button?raw');
const customButtonHtml = renderToHtml(CustomButton);
const customButtonSnippet = `<OuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  secondaryInputDisplay="top"
  button={
    <OuiColorPickerSwatch
      color={chosenColor}
      aria-label="Select a new color"
    />
  }
/>
`;
const customBadgeSnippet = `// Be sure to provide relevant accessibility to unmanaged elements
<OuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  secondaryInputDisplay="bottom"
  button={
    <OuiBadge
      color={chosenColor ? chosenColor : 'hollow'}
      onClickAriaLabel="Select a new color"
    >
      I'm a Badge
    </OuiBadge>
  }
/>
`;

import Empty from './empty_state';
const emptySource = require('./empty_state?raw');
const emptyHtml = renderToHtml(CustomButton);
const emptySnippet = `<OuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  placeholder="Auto"
  isClearable={true}
/>
`;

import Modes from './modes';
const modesSource = require('./modes?raw');
const modesHtml = renderToHtml(Modes);
const modesSwatchSnippet = `// Swatches only
<OuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  mode="swatch"
/>
`;
const modesPickerSnippet = `// Gradient map only
<OuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  mode="picker"
/>
`;
const stopModesSwatchSnippet = `// Swatches only
<OuiColorStops
  label="Swatch"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  mode="swatch"
/>
`;
const stopModesPickerSnippet = `// Gradient map only
<OuiColorStops
  label="Picker"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  mode="picker"
/>
`;

import Inline from './inline';
const inlineSource = require('./inline?raw');
const inlineHtml = renderToHtml(Inline);
const inlineSnippet = `<OuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  display="inline"
/>
`;

import Containers from './containers';
const containersSource = require('./containers?raw');
const containersHtml = renderToHtml(Containers);

import KitchenSink from './kitchen_sink';
const kitchenSinkSource = require('./kitchen_sink?raw');
const kitchenSinkHtml = renderToHtml(KitchenSink);
const kitchenSinkSnippet = `<OuiColorPicker
  onChange={handleChange}
  color={chosenColor}
  isInvalid={hasErrors}
  onBlur={() => {}}
  onFocus={() => {}}
  compressed={true}
  popoverZIndex={10}
  mode="default"
  swatches={[
    '#333',
    '#666',
    '#999',
    '#CCC',
    '#FFF',
  ]}
/>
`;
const stopKitchenSinkSnippet = `<OuiColorStops
  label="All the things"
  onChange={handleChange}
  colorStops={colorStops}
  min={0}
  max={100}
  mode="default"
  addStop={#FFF}
  swatches={[
    '#333',
    '#666',
    '#999',
    '#CCC',
    '#FFF',
  ]}
/>
`;

export const ColorPickerExample = {
  title: 'Color selection',
  intro: (
    <React.Fragment>
      <OuiText>
        <p>
          Three components exist to aid color selection:{' '}
          <strong>OuiColorPicker</strong>,{' '}
          <strong>OuiColorPalettePicker</strong> and{' '}
          <strong>OuiColorStops</strong>.
        </p>
      </OuiText>
    </React.Fragment>
  ),
  sections: [
    {
      title: 'Color picker',
      text: (
        <React.Fragment>
          <OuiText>
            <p>
              Color input component allowing for multiple methods of entry and
              selection.
            </p>
            <p>
              Direct text entry will match hexadecimal (hex) and RGB(a) colors,
              and output will return both hex and RGBa values. Spatial selection
              involves HSV manipulaton, which is converted to hex.
            </p>
            <p>
              Swatches allow consumers to predefine preferred or suggested
              choices. The swatches must also be entered in hex or RGBa format.
            </p>
          </OuiText>
        </React.Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorPickerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorPickerHtml,
        },
      ],
      props: { OuiColorPicker },
      snippet: colorPickerSnippet,
      demo: <ColorPicker />,
    },
    {
      title: 'Color palette picker',
      text: (
        <React.Fragment>
          <OuiText>
            <p>
              Use <strong>OuiColorPalettePicker</strong> to select palettes to
              apply colors to data visualization like maps and charts.
            </p>
            <p>
              Use the <OuiCode>palettes</OuiCode> prop to pass your palettes as
              an array <OuiCode>strings</OuiCode> or an array of{' '}
              <OuiCode>ColorStops</OuiCode> in the form of{' '}
              <OuiCode>{'{ stop: number, color: string }'}</OuiCode>. For each
              object, you should pass a palette (array of hex values) and
              specify the <OuiCode>type</OuiCode>. Use <OuiCode>fixed</OuiCode>{' '}
              palettes for categorical data and <OuiCode>gradient</OuiCode>{' '}
              palettes for continuous data.
            </p>
          </OuiText>
        </React.Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorPalettePickerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorPalettePickerHtml,
        },
      ],
      props: {
        OuiColorPalettePicker,
        OuiColorPalettePickerPaletteTextProps,
        OuiColorPalettePickerPaletteFixedProps,
        OuiColorPalettePickerPaletteGradientProps,
        ColorStop,
      },
      snippet: colorPalettePickerSnippet,
      demo: <ColorPalettePicker />,
    },
    {
      title: 'Color palette display',
      text: (
        <React.Fragment>
          <OuiText>
            <p>
              Use <strong>OuiColorPaletteDisplay</strong> to show the palette in
              use for a data visualization.
            </p>
            <p>
              Use the palette prop to pass your palette as an array of color{' '}
              <OuiCode>strings</OuiCode> or an array of{' '}
              <OuiCode>ColorStops</OuiCode> in the form of{' '}
              <OuiCode>{'{ stop: number, color: string }'}</OuiCode>. Use{' '}
              <OuiCode>fixed</OuiCode> palettes for categorical data and{' '}
              <OuiCode>gradient</OuiCode> palettes for continuous data.
            </p>
            <p>
              In cases you need to apply a palette, it&apos;s recommended to use
              the{' '}
              <Link to="/forms/color-selection#color-palette-picker">
                <strong>OuiColorPalettePicker</strong>
              </Link>
              .
            </p>
          </OuiText>
        </React.Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorPaletteDisplaySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorPaletteDisplayHtml,
        },
      ],
      props: {
        OuiColorPaletteDisplay,
        ColorStop,
      },
      snippet: colorPaletteDisplaySnippet,
      demo: <ColorPaletteDisplay />,
    },
    {
      title: 'Color stops',
      text: (
        <React.Fragment>
          <OuiText>
            <p>
              Use <strong>OuiColorStops</strong> to define color stops for data
              driven styling. Stops are numbers within the provided range. The
              color segment spans from the given stop number (inclusive) to the
              next stop number (exclusive).
            </p>
          </OuiText>
        </React.Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorStopsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorStopsHtml,
        },
      ],
      props: {
        OuiColorStops,
        ColorStop,
      },
      snippet: [
        colorStopsSnippetStandard,
        colorStopsSnippetAdd,
        colorStopsSnippetFixed,
        colorStopsSnippetStepped,
      ],
      demo: <ColorStops />,
    },
    {
      title: 'Free-range color stops',
      text: (
        <React.Fragment>
          <OuiText>
            <p>
              Typical use of <strong>OuiColorStops</strong> (as above) will have
              defined <OuiCode>min</OuiCode> and <OuiCode>max</OuiCode> range
              values. It is also possible to leave the range open-ended for
              cases where the target data set is unknown or maleable. In this
              case, a user&apos;s added values will define{' '}
              <OuiCode>min</OuiCode> and <OuiCode>max</OuiCode> and users will
              have more freedom over resetting the values on the fly.
            </p>
          </OuiText>
        </React.Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorStopsRangeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorStopsRangeHtml,
        },
      ],
      snippet: colorPickerRangeSnippet,
      demo: <ColorStopsRange />,
    },
    {
      title: 'Format selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formatsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formatsHtml,
        },
      ],
      text: (
        <>
          <p>
            Format selection does <em>not</em> limit the format of text input
            the picker will allow, but instead attempts to keep consistency
            during HSV selection. By default, the color picker will
            automatically use the last input value format. Notice in following
            the examples how hue and saturation selection behave differently.
          </p>
          <p>
            Swatches will always show the &quot;as-authored&quot; color value,
            as will the value provided via the <OuiCode>color</OuiCode> prop.
          </p>
        </>
      ),
      snippet: formatsSnippet,
      demo: <Formats />,
    },
    {
      title: 'Alpha channel (opacity) selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: alphaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: alphaHtml,
        },
      ],
      text: (
        <p>
          To allow color opacity via alpha channel, set{' '}
          <OuiCode language="js">showAlpha=true</OuiCode>. This will also
          display a range slider allowing manual opacity updates.
        </p>
      ),
      snippet: alphaSnippet,
      demo: <Alpha />,
    },
    {
      title: 'Custom color swatches',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customSwatchesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customSwatchesHtml,
        },
      ],
      text: (
        <p>
          By default the colors provided are the ten color blind safe
          visualization colors. You can however pass in your own color set with
          the <OuiCode>swatches</OuiCode> prop.
        </p>
      ),
      snippet: [customSwatchesSnippet, stopCustomSwatchesSnippet],
      demo: <CustomSwatches />,
    },
    {
      title: 'Limited selection modes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: modesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: modesHtml,
        },
      ],
      text: (
        <p>
          By default, both swatch selection and the gradient color map will be
          rendered. Use the <OuiCode>mode</OuiCode> prop to pass{' '}
          <OuiCode>swatch</OuiCode> for swatch-only selection, or pass{' '}
          <OuiCode>picker</OuiCode> for gradient map and hue slider selection
          without swatches.
        </p>
      ),
      snippet: [
        modesSwatchSnippet,
        modesPickerSnippet,
        stopModesSwatchSnippet,
        stopModesPickerSnippet,
      ],
      demo: <Modes />,
    },
    {
      title: 'Custom button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customButtonSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customButtonHtml,
        },
      ],
      text: (
        <>
          <p>
            Available only in <strong>OuiColorPicker</strong>. You can
            optionally use a custom button as the trigger for selection using
            the <OuiCode>button</OuiCode> prop. Please remember to add
            accessibility to this component, using proper button markup and aria
            labeling.
          </p>
          <p>
            Additionally, use the <OuiCode>secondaryInputDisplay</OuiCode> prop
            to show a secondary or alternative color value input. Options
            include <OuiCode>top</OuiCode> and <OuiCode>bottom</OuiCode>{' '}
            placement.
          </p>
        </>
      ),
      snippet: [customButtonSnippet, customBadgeSnippet],
      demo: <CustomButton />,
    },
    {
      title: 'Empty state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: emptySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: emptyHtml,
        },
      ],
      text: (
        <>
          <p>
            For instances where an &quot;empty&quot; color picker has meaning
            other than transparent color value, use the{' '}
            <OuiCode>placeholder</OuiCode> prop to provide context. Removing
            color selection and returning to the default state can be made
            easier by setting <OuiCode>isClearable=true</OuiCode>.
          </p>
        </>
      ),
      snippet: emptySnippet,
      demo: <Empty />,
    },
    {
      title: 'Inline',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlineSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inlineHtml,
        },
      ],
      text: (
        <p>
          Available only in <strong>OuiColorPicker</strong>. Set the{' '}
          <OuiCode>display</OuiCode> prop to <OuiCode>inline</OuiCode> to
          display the color picker without an input or popover. Note that the{' '}
          <OuiCode>button</OuiCode> prop will be ignored in this case.
        </p>
      ),
      snippet: inlineSnippet,
      demo: <Inline />,
    },
    {
      title: 'Containers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: containersSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: containersHtml,
        },
      ],
      text: (
        <p>
          Demonstrating that both color selection components can exist in portal
          containers and that their popover positioning works in nested
          contexts.
        </p>
      ),
      demo: <Containers />,
    },
    {
      title: 'Option toggling',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: kitchenSinkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: kitchenSinkHtml,
        },
      ],
      snippet: [kitchenSinkSnippet, stopKitchenSinkSnippet],
      demo: <KitchenSink />,
    },
  ],
  playground: playgrounds,
};
