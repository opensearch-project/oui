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

import React from 'react';

import {
  OuiAccordion,
  OuiText,
  OuiTextColor,
  OuiForm,
  OuiFormRow,
  OuiFieldText,
  OuiFieldPassword,
  OuiIcon,
  OuiTextArea,
  OuiSpacer,
  OuiFlexGroup,
  OuiFlexItem,
  OuiTitle,
  OuiButtonIcon,
} from '../../../../src/components';

const repeatableForm = (
  <OuiForm component="form">
    <OuiFlexGroup>
      <OuiFlexItem>
        <OuiFormRow label="Username">
          <OuiFieldText icon="user" placeholder="John" />
        </OuiFormRow>
      </OuiFlexItem>

      <OuiFlexItem>
        <OuiFormRow
          label="Password"
          helpText="Must include one number and one symbol">
          <OuiFieldPassword icon="lock" />
        </OuiFormRow>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiSpacer size="m" />

    <OuiFormRow label="Body">
      <OuiTextArea placeholder="I am a textarea, put some content in me!" />
    </OuiFormRow>
  </OuiForm>
);

const buttonContent = (
  <div>
    <OuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
      <OuiFlexItem grow={false}>
        <OuiIcon type="logoWebhook" size="m" />
      </OuiFlexItem>

      <OuiFlexItem>
        <OuiTitle size="xs">
          <h3>Webhook</h3>
        </OuiTitle>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiText size="s">
      <p>
        <OuiTextColor color="subdued">
          Will send a POST request to www.example.com/some/path/
        </OuiTextColor>
      </p>
    </OuiText>
  </div>
);

const extraAction = (
  <OuiButtonIcon
    iconType="cross"
    color="danger"
    className="ouiAccordionForm__extraAction"
    aria-label="Delete"
  />
);

export default () => (
  <div>
    <OuiAccordion
      id="accordionForm1"
      className="ouiAccordionForm"
      buttonClassName="ouiAccordionForm__button"
      buttonContent={buttonContent}
      extraAction={extraAction}
      paddingSize="l">
      {repeatableForm}
    </OuiAccordion>

    <OuiAccordion
      id="accordionForm2"
      className="ouiAccordionForm"
      buttonClassName="ouiAccordionForm__button"
      buttonContent={buttonContent}
      extraAction={extraAction}
      paddingSize="l">
      {repeatableForm}
    </OuiAccordion>
  </div>
);
