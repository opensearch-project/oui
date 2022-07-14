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

import React, { Fragment } from 'react';

import {
  OuiFormControlLayout,
  OuiSpacer,
  OuiFormLabel,
  OuiButtonEmpty,
  OuiText,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <OuiFormControlLayout icon="search">
      <input
        type="text"
        className="ouiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </OuiFormControlLayout>

    <OuiSpacer size="m" />

    <OuiFormControlLayout isLoading>
      <input
        type="text"
        className="ouiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </OuiFormControlLayout>

    <OuiSpacer size="m" />

    <OuiFormControlLayout clear={{ onClick: () => {} }}>
      <input
        type="text"
        className="ouiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </OuiFormControlLayout>

    <OuiSpacer size="m" />

    <OuiFormControlLayout isLoading clear={{ onClick: () => {} }}>
      <input
        type="text"
        className="ouiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </OuiFormControlLayout>

    <OuiSpacer size="m" />

    <OuiFormControlLayout isLoading icon="search">
      <input
        type="text"
        className="ouiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </OuiFormControlLayout>

    <OuiSpacer size="m" />

    <OuiFormControlLayout isLoading icon={{ type: 'arrowDown', side: 'right' }}>
      <input
        type="text"
        className="ouiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </OuiFormControlLayout>

    <OuiSpacer size="m" />

    <OuiFormControlLayout clear={{ onClick: () => {} }} icon="search">
      <input
        type="text"
        className="ouiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </OuiFormControlLayout>

    <OuiSpacer size="m" />

    <OuiFormControlLayout
      clear={{ onClick: () => {} }}
      icon={{ type: 'arrowDown', side: 'right' }}>
      <input
        type="text"
        className="ouiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </OuiFormControlLayout>

    <OuiSpacer size="m" />

    <OuiFormControlLayout isLoading clear={{ onClick: () => {} }} icon="search">
      <input
        type="text"
        className="ouiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </OuiFormControlLayout>

    <OuiSpacer size="m" />

    <OuiFormControlLayout
      isLoading
      clear={{ onClick: () => {} }}
      icon={{ type: 'arrowDown', side: 'right' }}>
      <input
        type="text"
        className="ouiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </OuiFormControlLayout>

    <OuiSpacer size="m" />

    <OuiFormControlLayout isLoading clear={{ onClick: () => {} }} icon="search">
      <input
        type="text"
        className="ouiFieldText"
        aria-label="Use aria labels when no actual label is in use"
      />
    </OuiFormControlLayout>

    <OuiSpacer size="m" />

    <OuiFormControlLayout
      prepend={<OuiFormLabel htmlFor="textField19">Label</OuiFormLabel>}>
      <input
        type="text"
        className="ouiFieldText ouiFieldText--inGroup"
        id="textField19"
      />
    </OuiFormControlLayout>

    <OuiSpacer size="m" />

    <OuiFormControlLayout
      readOnly
      prepend={<OuiFormLabel htmlFor="textField19a">Read only</OuiFormLabel>}>
      <input
        type="text"
        className="ouiFieldText ouiFieldText--inGroup"
        id="textField19a"
        readOnly
      />
    </OuiFormControlLayout>

    <OuiSpacer size="m" />

    <OuiFormControlLayout
      append={
        <OuiText size="xs">
          <strong>%</strong>
        </OuiText>
      }>
      <input
        type="number"
        className="ouiFieldNumber ouiFieldNumber--inGroup"
        aria-label="Use aria labels when no actual label is in use"
      />
    </OuiFormControlLayout>

    <OuiSpacer size="m" />

    <OuiFormControlLayout
      isLoading
      clear={{ onClick: () => {} }}
      prepend={
        <OuiButtonEmpty size="xs" iconType="arrowDown" iconSide="right">
          Button
        </OuiButtonEmpty>
      }>
      <input
        type="text"
        className="ouiFieldText ouiFieldText--inGroup"
        aria-label="Use aria labels when no actual label is in use"
      />
    </OuiFormControlLayout>
  </Fragment>
);
