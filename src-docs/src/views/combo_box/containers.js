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

import React, { useState, Fragment } from 'react';

import {
  OuiComboBox,
  OuiButton,
  OuiPopover,
  OuiFormRow,
  OuiModal,
  OuiModalBody,
  OuiModalHeader,
  OuiModalHeaderTitle,
  OuiSpacer,
} from '../../../../src/components';

const optionsStatic = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus',
  },
  {
    label: 'Mimas',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Iapetus',
  },
  {
    label: 'Phoebe',
  },
  {
    label: 'Rhea',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
  {
    label: 'Tethys',
  },
  {
    label: 'Hyperion',
  },
];

export default () => {
  const [options, setOptions] = useState(optionsStatic);
  const [selectedOptions, setSelected] = useState([options[2], options[4]]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPopoverOpen, setPopover] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const togglePopover = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

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
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        (option) => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      setOptions([...options, newOption]);
    }

    // Select the option.
    setSelected((prevSelected) => [...prevSelected, newOption]);
  };

  const comboBox = (
    <OuiComboBox
      placeholder="Select or create options"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      onCreateOption={onCreateOption}
    />
  );

  const button = (
    <OuiButton iconType="arrowDown" iconSide="right" onClick={togglePopover}>
      Open popover
    </OuiButton>
  );

  let modal;

  if (isModalVisible) {
    modal = (
      <OuiModal onClose={closeModal} style={{ width: '800px' }}>
        <OuiModalHeader>
          <OuiModalHeaderTitle>
            <h1>Combo box in a modal</h1>
          </OuiModalHeaderTitle>
        </OuiModalHeader>

        <OuiModalBody>{comboBox}</OuiModalBody>
      </OuiModal>
    );
  }

  return (
    <Fragment>
      <OuiFormRow
        label="Combo box"
        helpText="This combo box is inside of a form row">
        {comboBox}
      </OuiFormRow>

      <OuiSpacer />

      <OuiPopover
        id="popover"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}>
        <div style={{ width: '300px' }}>{comboBox}</div>
      </OuiPopover>

      <OuiSpacer size="m" />

      <OuiButton onClick={showModal}>Show modal</OuiButton>

      {modal}
    </Fragment>
  );
};
