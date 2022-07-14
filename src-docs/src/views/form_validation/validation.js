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
  OuiForm,
  OuiSelect,
  OuiFormRow,
  OuiTextArea,
  OuiFieldText,
  OuiSpacer,
} from '../../../../src/components';

export default () => {
  const [showErrors, setShowErrors] = useState(true);

  const onButtonClick = () => {
    setShowErrors(!showErrors);
  };

  const button = (
    <OuiButton fill color="danger" onClick={onButtonClick}>
      Toggle errors
    </OuiButton>
  );

  let errors;

  if (showErrors) {
    errors = [
      "Here's an example of an error",
      'You might have more than one error, so pass an array.',
    ];
  }

  return (
    <Fragment>
      <OuiForm isInvalid={showErrors} error={errors} component="form">
        <OuiFormRow label="Validation only" isInvalid={showErrors}>
          <OuiFieldText name="first" isInvalid={showErrors} />
        </OuiFormRow>

        <OuiFormRow
          label="Validation with help text and errors"
          helpText="I am some friendly help text."
          isInvalid={showErrors}
          error={errors}>
          <OuiFieldText name="text" isInvalid={showErrors} />
        </OuiFormRow>

        <OuiFormRow label="Text area" isInvalid={showErrors}>
          <OuiTextArea name="area" isInvalid={showErrors} />
        </OuiFormRow>

        <OuiFormRow label="Select" isInvalid={showErrors}>
          <OuiSelect
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
            isInvalid={showErrors}
          />
        </OuiFormRow>

        <OuiSpacer />

        {button}
      </OuiForm>
    </Fragment>
  );
};
