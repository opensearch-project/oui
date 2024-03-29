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
  OuiComboBox,
  OuiHighlight,
  OuiHealth,
} from '../../../../src/components';
import {
  ouiPaletteColorBlind,
  ouiPaletteColorBlindBehindText,
} from '../../../../src/services';

const visColors = ouiPaletteColorBlind();
const visColorsBehindText = ouiPaletteColorBlindBehindText();
const optionsStatic = [
  {
    value: {
      size: 5,
    },
    label: 'Titan',
    'data-test-subj': 'titanOption',
    color: visColorsBehindText[0],
  },
  {
    value: {
      size: 2,
    },
    label: 'Enceladus',
    color: visColorsBehindText[1],
  },
  {
    value: {
      size: 15,
    },
    label: 'Mimas',
    color: visColorsBehindText[2],
  },
  {
    value: {
      size: 1,
    },
    label: 'Dione',
    color: visColorsBehindText[3],
  },
  {
    value: {
      size: 8,
    },
    label: 'Iapetus',
    color: visColorsBehindText[4],
  },
  {
    value: {
      size: 2,
    },
    label: 'Phoebe',
    color: visColorsBehindText[5],
  },
  {
    value: {
      size: 33,
    },
    label: 'Rhea',
    color: visColorsBehindText[6],
  },
  {
    value: {
      size: 18,
    },
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    color: visColorsBehindText[7],
  },
  {
    value: {
      size: 9,
    },
    label: 'Tethys',
    color: visColorsBehindText[8],
  },
  {
    value: {
      size: 4,
    },
    label: 'Hyperion',
    color: visColorsBehindText[9],
  },
];

export default () => {
  const [options, setOptions] = useState(optionsStatic);
  const [selectedOptions, setSelected] = useState([options[2], options[5]]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const onCreateOption = (searchValue, flattenedOptions = []) => {
    if (!searchValue) {
      return;
    }

    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      value: searchValue,
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        (option) => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      options.push(newOption);
      setOptions([...options, newOption]);
    }

    // Select the option.
    setSelected((prevSelected) => [...prevSelected, newOption]);
  };

  const renderOption = (option, searchValue, contentClassName) => {
    const { color, label, value } = option;
    const dotColor = visColors[visColorsBehindText.indexOf(color)];
    return (
      <OuiHealth color={dotColor}>
        <span className={contentClassName}>
          <OuiHighlight search={searchValue}>{label}</OuiHighlight>
          &nbsp;
          <span>({value.size})</span>
        </span>
      </OuiHealth>
    );
  };

  return (
    <OuiComboBox
      placeholder="Select or create options"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      onCreateOption={onCreateOption}
      renderOption={renderOption}
    />
  );
};
