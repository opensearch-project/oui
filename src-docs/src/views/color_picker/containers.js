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

import React, { Fragment, useState } from 'react';

import {
  OuiColorPicker,
  OuiColorStops,
  OuiButton,
  OuiPopover,
  OuiFormRow,
  OuiModal,
  OuiModalBody,
  OuiModalHeader,
  OuiModalHeaderTitle,
  OuiSpacer,
} from '../../../../src/components';

import {
  useColorPickerState,
  useColorStopsState,
} from '../../../../src/services';

export default () => {
  const [color, setColor] = useColorPickerState('#FFF');
  const [colorStops, setColorStops] = useColorStopsState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const colorPicker = <OuiColorPicker color={color} onChange={setColor} />;

  const stops = (
    <OuiColorStops
      label="Color stops"
      onChange={setColorStops}
      colorStops={colorStops}
      min={0}
      max={100}
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
            <h1>Color picker in a modal</h1>
          </OuiModalHeaderTitle>
        </OuiModalHeader>

        <OuiModalBody>
          <OuiFormRow label="Color picker">{colorPicker}</OuiFormRow>
          <OuiSpacer />
          <OuiFormRow label="Color stops">{stops}</OuiFormRow>
        </OuiModalBody>
      </OuiModal>
    );
  }

  return (
    <Fragment>
      <OuiFormRow
        label="Color picker"
        helpText="This color picker is inside of a form row">
        {colorPicker}
      </OuiFormRow>

      <OuiSpacer />

      <OuiFormRow
        label="Color stops"
        helpText="This color stops component is inside of a form row">
        {stops}
      </OuiFormRow>

      <OuiFormRow label="Unruly focus management">
        <OuiPopover
          id="popover"
          button={button}
          isOpen={isPopoverOpen}
          closePopover={closePopover}>
          <div style={{ width: '300px' }}>
            <OuiFormRow label="Color picker">{colorPicker}</OuiFormRow>
            <OuiSpacer />
            <OuiFormRow label="Color stops">{stops}</OuiFormRow>
          </div>
        </OuiPopover>
      </OuiFormRow>

      <OuiSpacer size="m" />

      <OuiButton onClick={showModal}>Show modal</OuiButton>

      {modal}
    </Fragment>
  );
};
