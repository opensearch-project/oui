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
} from '../../../../src/services';

import {
  OuiSwitch,
  OuiSpacer,
  OuiCode,
  OuiColorPalettePicker,
} from '../../../../src/components/';

import { DisplayToggles } from '../form_controls/display_toggles';

const palettes = [
  {
    value: 'pallette_1',
    title: 'OUI color blind (fixed)',
    palette: ouiPaletteColorBlind(),
    type: 'fixed',
  },
  {
    value: 'pallette_2',
    title: 'OUI palette for status (gradient)',
    palette: ouiPaletteForStatus(5),
    type: 'gradient',
  },
  {
    value: 'pallette_3',
    title: 'OUI palette for temperature (fixed)',
    palette: ouiPaletteForTemperature(5),
    type: 'fixed',
  },
  {
    value: 'pallette_4',
    title: 'Grayscale (gradient with stops)',
    palette: [
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
    ],
    type: 'gradient',
  },
  {
    value: 'pallette_5',
    title: 'Grayscale (fixed with stops)',
    palette: [
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
    ],
    type: 'fixed',
  },
  {
    value: 'custom',
    title: 'Plain text as a custom option',
    type: 'text',
  },
];

export default () => {
  const [selectionDisplay, setSelectionDisplay] = useState(false);
  const [pallette, setPallette] = useState('pallette_1');

  return (
    <>
      <OuiSwitch
        label={
          <span>
            Display selected item as a <OuiCode>title</OuiCode>
          </span>
        }
        checked={selectionDisplay}
        onChange={() => setSelectionDisplay(!selectionDisplay)}
      />
      <OuiSpacer />
      <DisplayToggles canPrepend={true} canAppend={true} canReadOnly={false}>
        <OuiColorPalettePicker
          palettes={palettes}
          onChange={setPallette}
          valueOfSelected={pallette}
          selectionDisplay={selectionDisplay ? 'title' : 'palette'}
        />
      </DisplayToggles>
    </>
  );
};
