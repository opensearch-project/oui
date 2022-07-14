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

import React, { useState, useRef } from 'react';

import {
  OuiButton,
  OuiCheckboxGroup,
  OuiFieldText,
  OuiForm,
  OuiFormRow,
  OuiFilePicker,
  OuiLink,
  OuiRange,
  OuiSelect,
  OuiSpacer,
  OuiSwitch,
  OuiText,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const idPrefix = useRef(htmlIdGenerator()());
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const checkboxes = [
    {
      id: `${idPrefix.current}0`,
      label: 'Option one',
    },
    {
      id: `${idPrefix.current}1`,
      label: 'Option two is checked by default',
    },
    {
      id: `${idPrefix.current}2`,
      label: 'Option three',
    },
  ];
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState({
    [`${idPrefix.current}1`]: true,
  });

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
    <OuiForm component="form">
      <OuiFormRow label="Text field" helpText="I am some friendly help text.">
        <OuiFieldText name="first" />
      </OuiFormRow>

      <OuiFormRow
        label="Select (with no initial selection)"
        labelAppend={
          <OuiText size="xs">
            <OuiLink>Link to some help</OuiLink>
          </OuiText>
        }>
        <OuiSelect
          hasNoInitialSelection
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
        />
      </OuiFormRow>

      <OuiFormRow label="File picker">
        <OuiFilePicker />
      </OuiFormRow>

      <OuiFormRow label="Range">
        <OuiRange min={0} max={100} name="range" id="range" />
      </OuiFormRow>

      <OuiFormRow
        label="Use a switch instead of a single checkbox and set 'hasChildLabel' to false"
        hasChildLabel={false}>
        <OuiSwitch
          name="switch"
          label="Should we do this?"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
        />
      </OuiFormRow>

      <OuiSpacer />

      <OuiCheckboxGroup
        options={checkboxes}
        idToSelectedMap={checkboxIdToSelectedMap}
        onChange={onCheckboxChange}
        legend={{
          children:
            'Checkbox groups should use the `legend` prop instead of form row',
        }}
      />

      <OuiSpacer />

      <OuiButton type="submit" fill>
        Save form
      </OuiButton>
    </OuiForm>
  );
};
