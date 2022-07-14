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
import PropTypes from 'prop-types';

import {
  OuiFlexGroup,
  OuiFlexItem,
  OuiButtonEmpty,
  OuiFormRow,
  OuiComboBox,
  OuiButton,
  OuiSpacer,
  OuiSwitch,
  OuiFieldText,
} from '../../../../src/components';

const fieldOption = [
  {
    label: 'Fields',
    isGroupLabelOption: true,
  },
  {
    label: 'field_1',
  },
  {
    label: 'field_2',
  },
  {
    label: 'field_3',
  },
  {
    label: 'field_4',
  },
];
const operatorOption = [
  {
    label: 'Operators',
    isGroupLabelOption: true,
  },
  {
    label: 'IS',
  },
  {
    label: 'IS NOT',
  },
  {
    label: 'IS ONE OF',
  },
  {
    label: 'EXISTS',
  },
];
const valueOption = [
  {
    label: 'Values',
    isGroupLabelOption: true,
  },
  {
    label: 'Value 1',
  },
  {
    label: 'Value 2',
  },
  {
    label: 'Value 3',
  },
  {
    label: 'Value 4',
  },
];

const GlobalFilterForm = (props) => {
  const [fieldOptions, setFieldOptions] = useState(fieldOption);
  const [operandOptions, setOperandOptions] = useState(operatorOption);
  const [valueOptions, setValueOptions] = useState(valueOption);
  const [selectedField, setSelectedField] = useState(
    props.selectedObject ? props.selectedObject.field : []
  );
  const [selectedOperand, setSelectedOperand] = useState(
    props.selectedObject ? props.selectedObject.operand : []
  );
  const [selectedValues, setSelectedValues] = useState(
    props.selectedObject ? props.selectedObject.values : []
  );
  const [useCustomLabel, setUseCustomLabel] = useState(false);
  const [customLabel, setCustomLabel] = useState('');

  const onFieldChange = (selectedOptions) => {
    // We should only get back either 0 or 1 options.
    setSelectedField(selectedOptions);
  };

  const onOperandChange = (selectedOptions) => {
    // We should only get back either 0 or 1 options.
    setSelectedOperand(selectedOptions);
  };

  const onValuesChange = (selectedOptions) => {
    setSelectedValues(selectedOptions);
  };

  const onCustomLabelSwitchChange = (e) => {
    setUseCustomLabel(e.target.checked);
  };

  const onFieldSearchChange = (searchValue) => {
    setFieldOptions(
      fieldOption.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const onOperandSearchChange = (searchValue) => {
    setOperandOptions(
      operatorOption.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const onValuesSearchChange = (searchValue) => {
    setValueOptions(
      valueOption.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const resetForm = () => {
    setSelectedField([]);
    setSelectedOperand([]);
    setSelectedValues([]);
    setUseCustomLabel(false);
    setCustomLabel('');
  };

  const onCustomLabelChange = (e) => {
    setCustomLabel(e.target.value);
  };

  const { onAdd, onCancel, selectedObject, ...rest } = props;

  return (
    <div {...rest}>
      <OuiFlexGroup>
        <OuiFlexItem style={{ maxWidth: '188px' }}>
          <OuiFormRow label="Field">
            <OuiComboBox
              placeholder={
                selectedOperand.length < 1 ? 'Start here' : 'Select a field'
              }
              options={fieldOptions}
              selectedOptions={selectedField}
              onChange={onFieldChange}
              onSearchChange={onFieldSearchChange}
              singleSelection={{ asPlainText: true }}
              isClearable={false}
            />
          </OuiFormRow>
        </OuiFlexItem>
        <OuiFlexItem style={{ maxWidth: '188px' }}>
          <OuiFormRow label="Operand">
            <OuiComboBox
              placeholder={
                selectedField.length < 1
                  ? 'Select a field first'
                  : 'Select an operand'
              }
              isDisabled={selectedField.length < 1}
              options={operandOptions}
              selectedOptions={selectedOperand}
              onChange={onOperandChange}
              onSearchChange={onOperandSearchChange}
              singleSelection={{ asPlainText: true }}
              isClearable={false}
            />
          </OuiFormRow>
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiSpacer size="m" />

      <div>
        <OuiFormRow label="Value(s)">
          <OuiComboBox
            placeholder={
              selectedField.length < 1 && selectedOperand.length < 1
                ? 'Waiting on previous selections'
                : 'Select one or more values'
            }
            isDisabled={selectedField.length < 1 || selectedOperand.length < 1}
            options={valueOptions}
            selectedOptions={selectedValues}
            onChange={onValuesChange}
            onSearchChange={onValuesSearchChange}
          />
        </OuiFormRow>
      </div>

      <OuiSpacer size="m" />

      <OuiSwitch
        label="Create custom label?"
        checked={useCustomLabel}
        onChange={onCustomLabelSwitchChange}
      />

      {useCustomLabel && (
        <div>
          <OuiSpacer size="m" />
          <OuiFormRow label="Custom label">
            <OuiFieldText value={customLabel} onChange={onCustomLabelChange} />
          </OuiFormRow>
        </div>
      )}

      <OuiSpacer size="m" />

      <OuiFlexGroup direction="rowReverse" alignItems="center">
        <OuiFlexItem grow={false}>
          <OuiButton
            isDisabled={selectedValues.length < 1 && customLabel.length === 0}
            fill
            onClick={onAdd}>
            Add
          </OuiButton>
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiButtonEmpty
            flush="right"
            onClick={selectedObject ? onCancel : resetForm}>
            {selectedObject ? 'Cancel' : 'Reset form'}
          </OuiButtonEmpty>
        </OuiFlexItem>
        <OuiFlexItem />
        <OuiFlexItem grow={false}>
          {selectedObject && (
            <OuiButtonEmpty flush="left" color="danger">
              Delete
            </OuiButtonEmpty>
          )}
        </OuiFlexItem>
      </OuiFlexGroup>
    </div>
  );
};

GlobalFilterForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedObject: PropTypes.object,
};

export default GlobalFilterForm;
