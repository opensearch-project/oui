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
  OuiFieldText,
  OuiFormRow,
  OuiFilePicker,
  OuiRange,
  OuiSelect,
  OuiSwitch,
  OuiPanel,
} from '../../../../src/components';

export default () => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [comboBoxSelectionOptions, setComboBoxSelectionOptions] = useState([]);
  const [value, setValue] = useState('20');

  const onRangeChange = (e) => {
    setValue(e.target.value);
  };

  const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  return (
    <OuiPanel style={{ maxWidth: 300 }}>
      <OuiFormRow
        label="Text field"
        helpText="I am some friendly help text."
        display="columnCompressed">
        <OuiFieldText name="first" isLoading compressed />
      </OuiFormRow>

      <OuiFormRow label="Select" display="columnCompressed">
        <OuiSelect
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
          compressed
        />
      </OuiFormRow>

      <OuiFormRow label="File picker" display="columnCompressed">
        <OuiFilePicker compressed display="default" />
      </OuiFormRow>

      <OuiFormRow label="Comboboxwithalonglabelname" display="columnCompressed">
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

      <OuiFormRow label="Range" display="columnCompressed">
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

      <OuiFormRow display="columnCompressedSwitch" label="Switch">
        <OuiSwitch
          showLabel={false}
          label="Switch"
          name="switch"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
          compressed
        />
      </OuiFormRow>
    </OuiPanel>
  );
};
