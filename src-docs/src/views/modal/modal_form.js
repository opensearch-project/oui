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
  OuiButton,
  OuiButtonEmpty,
  OuiFieldText,
  OuiForm,
  OuiFormRow,
  OuiModal,
  OuiModalBody,
  OuiModalFooter,
  OuiModalHeader,
  OuiModalHeaderTitle,
  OuiRange,
  OuiSwitch,
  OuiSuperSelect,
  OuiText,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);
  const [superSelectvalue, setSuperSelectValue] = useState('option_one');

  const onSwitchChange = () =>
    setIsSwitchChecked((isSwitchChecked) => !isSwitchChecked);

  const closeModal = () => setIsModalVisible(false);

  const showModal = () => setIsModalVisible(true);

  const superSelectOptions = [
    {
      value: 'option_one',
      inputDisplay: 'Option one',
      dropdownDisplay: (
        <Fragment>
          <strong>Option one</strong>
          <OuiText size="s" color="subdued">
            <p className="ouiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </OuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_two',
      inputDisplay: 'Option two',
      dropdownDisplay: (
        <Fragment>
          <strong>Option two</strong>
          <OuiText size="s" color="subdued">
            <p className="ouiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </OuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_three',
      inputDisplay: 'Option three',
      dropdownDisplay: (
        <Fragment>
          <strong>Option three</strong>
          <OuiText size="s" color="subdued">
            <p className="ouiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </OuiText>
        </Fragment>
      ),
    },
  ];

  const formSample = (
    <OuiForm id="modalFormId" component="form">
      <OuiFormRow>
        <OuiSwitch
          id={htmlIdGenerator()()}
          name="popswitch"
          label="Isn't this modal form cool?"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
        />
      </OuiFormRow>

      <OuiFormRow label="A text field">
        <OuiFieldText name="popfirst" />
      </OuiFormRow>

      <OuiFormRow label="Range" helpText="Some help text for the range">
        <OuiRange min={0} max={100} name="poprange" />
      </OuiFormRow>

      <OuiFormRow label="An OuiSuperSelect">
        <OuiSuperSelect
          options={superSelectOptions}
          valueOfSelected={superSelectvalue}
          onChange={(value) => onSuperSelectChange(value)}
          itemLayoutAlign="top"
          hasDividers
        />
      </OuiFormRow>
    </OuiForm>
  );

  const onSuperSelectChange = (value) => {
    setSuperSelectValue(value);
  };

  let modal;

  if (isModalVisible) {
    modal = (
      <OuiModal onClose={closeModal} initialFocus="[name=popswitch]">
        <OuiModalHeader>
          <OuiModalHeaderTitle>
            <h1>Modal title</h1>
          </OuiModalHeaderTitle>
        </OuiModalHeader>

        <OuiModalBody>{formSample}</OuiModalBody>

        <OuiModalFooter>
          <OuiButtonEmpty onClick={closeModal}>Cancel</OuiButtonEmpty>

          <OuiButton type="submit" form="modalFormId" onClick={closeModal} fill>
            Save
          </OuiButton>
        </OuiModalFooter>
      </OuiModal>
    );
  }
  return (
    <div>
      <OuiButton onClick={showModal}>Show form modal</OuiButton>
      {modal}
    </div>
  );
};
