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
  OuiButton,
  OuiPopover,
  OuiForm,
  OuiFormRow,
  OuiFieldText,
  OuiFlexGroup,
  OuiFlexItem,
  OuiFieldNumber,
  OuiRange,
  OuiSpacer,
  OuiSwitch,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isPopover2Open, setIsPopover2Open] = useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  const onButton2Click = () => {
    setIsPopover2Open(!isPopover2Open);
  };

  const closePopover2 = () => {
    setIsPopover2Open(false);
  };

  const button = (
    <OuiButton
      iconSide="right"
      fill
      iconType="arrowDown"
      onClick={onButtonClick}>
      Inline form in a popover
    </OuiButton>
  );

  const formSample = (
    <OuiForm component="form">
      <OuiFlexGroup>
        <OuiFlexItem grow={false} style={{ width: 100 }}>
          <OuiFormRow label="Age">
            <OuiFieldNumber max={10} placeholder={42} />
          </OuiFormRow>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiFormRow label="Full name">
            <OuiFieldText icon="user" placeholder="John Doe" />
          </OuiFormRow>
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiFormRow hasEmptyLabelSpace>
            <OuiButton>Save</OuiButton>
          </OuiFormRow>
        </OuiFlexItem>
      </OuiFlexGroup>
    </OuiForm>
  );

  const button2 = (
    <OuiButton
      iconSide="right"
      fill
      iconType="arrowDown"
      onClick={onButton2Click}>
      Vertical form in a popover
    </OuiButton>
  );

  const formSample2 = (
    <OuiForm component="form">
      <OuiFormRow>
        <OuiSwitch
          id={htmlIdGenerator()()}
          name="popswitch"
          label="Isn't this popover form cool?"
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

      <OuiSpacer />
      <OuiButton fullWidth>Save</OuiButton>
    </OuiForm>
  );

  return (
    <div>
      <OuiPopover
        id="inlineFormPopover"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}>
        <div style={{ width: 500 }}>{formSample}</div>
      </OuiPopover>
      &emsp;
      <OuiPopover
        id="formPopover"
        button={button2}
        isOpen={isPopover2Open}
        closePopover={closePopover2}
        initialFocus="[name='popfirst']">
        <div style={{ width: '300px' }}>{formSample2}</div>
      </OuiPopover>
    </div>
  );
};
