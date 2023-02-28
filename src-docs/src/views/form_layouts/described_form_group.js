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
  OuiCode,
  OuiFieldText,
  OuiForm,
  OuiFormRow,
  OuiDescribedFormGroup,
  OuiFilePicker,
  OuiRange,
  OuiSelect,
  OuiSwitch,
  OuiLink,
} from '../../../../src/components';

export default () => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  return (
    <OuiForm component="form">
      <OuiDescribedFormGroup
        title={<h3>Single text field</h3>}
        description={
          <Fragment>
            A single text field that can be used to display additional text. It
            can have{' '}
            <OuiLink href="https://opensearch.org/docs/latest/" target="_blank">
              links
            </OuiLink>{' '}
            or any other type of content.
          </Fragment>
        }>
        <OuiFormRow label="Text field">
          <OuiFieldText name="first" aria-label="Example" />
        </OuiFormRow>
      </OuiDescribedFormGroup>
      <OuiDescribedFormGroup title={<h3>No description</h3>}>
        <OuiFormRow label="Text field">
          <OuiFieldText name="first" />
        </OuiFormRow>
      </OuiDescribedFormGroup>
      <OuiDescribedFormGroup
        title={<h3>Multiple fields</h3>}
        description="Here are three form rows. The first form row does not have a title.">
        <OuiFormRow
          hasEmptyLabelSpace
          helpText={<span>This is a help text</span>}>
          <OuiSelect
            hasNoInitialSelection
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
            aria-label="An example of a form element without a visible label"
          />
        </OuiFormRow>

        <OuiFormRow label="File picker">
          <OuiFilePicker />
        </OuiFormRow>

        <OuiFormRow label="Range">
          <OuiRange min={0} max={100} name="range" id="range" />
        </OuiFormRow>
      </OuiDescribedFormGroup>
      <OuiDescribedFormGroup
        title={<h2>Full width</h2>}
        titleSize="xxxs"
        description={
          <Fragment>
            By default, <strong>OuiDescribedFormGroup</strong> will be double
            the default width of form elements. However, you can pass{' '}
            <OuiCode>fullWidth</OuiCode> prop to this, the individual field and
            row components to expand to their container.
          </Fragment>
        }
        fullWidth>
        <OuiFormRow
          label="Use a switch instead of a single checkbox"
          hasChildLabel={false}
          fullWidth>
          <OuiSwitch
            name="switch"
            label="Should we do this?"
            checked={isSwitchChecked}
            onChange={onSwitchChange}
          />
        </OuiFormRow>

        <OuiFormRow fullWidth>
          <OuiFieldText
            name="second"
            fullWidth
            aria-label="An example of OuiTextField with fullWidth"
          />
        </OuiFormRow>
      </OuiDescribedFormGroup>
    </OuiForm>
  );
};
