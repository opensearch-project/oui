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
  OuiFieldText,
  OuiFormRow,
  OuiSelect,
  OuiButton,
  OuiPopover,
  OuiButtonGroup,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [granularityIdSelected, setGranularityIdSelected] = useState(
    'granularityButton1'
  );

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const onGranularityChange = (optionId) => {
    setGranularityIdSelected(optionId);
  };

  const button = (
    <OuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Open form in popover
    </OuiButton>
  );

  const granularityToggleButtons = [
    {
      id: 'granularityButton1',
      label: 'Left',
    },
    {
      id: 'granularityButton2',
      label: 'Middle',
    },
    {
      id: 'granularityButton3',
      label: 'Right',
    },
  ];

  return (
    <OuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}>
      <div style={{ width: 300 }}>
        <OuiFormRow label="Button group" display="columnCompressed">
          <OuiButtonGroup
            legend="Granulariy of zoom levels"
            options={granularityToggleButtons}
            idSelected={granularityIdSelected}
            onChange={onGranularityChange}
            buttonSize="compressed"
            isFullWidth
          />
        </OuiFormRow>
        <OuiFormRow label="Text field" display="columnCompressed">
          <OuiFieldText name="first" compressed />
        </OuiFormRow>

        <OuiFormRow label={'Select'} display="columnCompressed">
          <OuiSelect
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
            compressed
          />
        </OuiFormRow>
      </div>
    </OuiPopover>
  );
};
