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
  OuiCheckboxGroup,
  OuiComboBox,
  OuiFieldText,
  OuiFormRow,
  OuiFilePicker,
  OuiRange,
  OuiSelect,
  OuiSwitch,
  OuiPanel,
  OuiSpacer,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const idPrefix = htmlIdGenerator()();

  const [checkboxes] = useState([
    {
      id: `${idPrefix}0`,
      label: 'Option one',
    },
    {
      id: `${idPrefix}1`,
      label: 'Option two is checked by default',
    },
    {
      id: `${idPrefix}2`,
      label: 'Option three',
    },
  ]);
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState({
    [`${idPrefix}1`]: true,
  });

  const [comboBoxSelectionOptions, setComboBoxSelectionOptions] = useState([]);

  const [value, setValue] = useState(20);

  const onRangeChange = (e) => {
    setValue(e.target.value);
  };

  const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  const onCheckboxChange = (optionId) => {
    const newCheckboxIdToSelectedMap = {
      ...checkboxIdToSelectedMap,
      ...{
        [optionId]: !checkboxIdToSelectedMap[optionId],
      },
    };
    setCheckboxIdToSelectedMap(newCheckboxIdToSelectedMap);
  };
  return (
    <OuiPanel style={{ maxWidth: 300 }}>
      <OuiFormRow
        label="Text field"
        helpText="I am some friendly help text."
        display="rowCompressed">
        <OuiFieldText name="first" isLoading compressed />
      </OuiFormRow>

      <OuiFormRow label="Select" display="rowCompressed">
        <OuiSelect
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
          compressed
        />
      </OuiFormRow>

      <OuiFormRow label="File picker" display="rowCompressed">
        <OuiFilePicker compressed display="default" />
      </OuiFormRow>

      <OuiFormRow label="Combobox" display="rowCompressed">
        <OuiComboBox
          options={[
            { label: 'Option one' },
            { label: 'Option two' },
            { label: 'Option three' },
          ]}
          compressed
          selectedOptions={comboBoxSelectionOptions}
          onChange={(comboBoxSelectionOptions) =>
            setComboBoxSelectionOptions(comboBoxSelectionOptions)
          }
        />
      </OuiFormRow>

      <OuiFormRow label="Range" display="rowCompressed">
        <OuiRange
          min={0}
          max={100}
          name="range"
          id="range"
          showInput
          compressed
          value={value}
          onChange={onRangeChange}
        />
      </OuiFormRow>

      <OuiFormRow label="Switch" display="rowCompressed" hasChildLabel={false}>
        <OuiSwitch
          label="Should we do this?"
          name="switch"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
          compressed
        />
      </OuiFormRow>

      <OuiSpacer size="m" />

      <OuiCheckboxGroup
        options={checkboxes}
        idToSelectedMap={checkboxIdToSelectedMap}
        onChange={onCheckboxChange}
        legend={{
          children: 'Checkboxes',
        }}
        compressed
      />
    </OuiPanel>
  );
};
