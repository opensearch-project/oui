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

import { OuiRange, OuiSpacer, OuiDualRange } from '../../../../src/components';

import { DisplayToggles } from '../form_controls/display_toggles';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState('20');
  const [dualValue, setDualValue] = useState([20, 100]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onDualChange = (value) => {
    setDualValue(value);
  };

  const levels = [
    {
      min: 0,
      max: 20,
      color: 'danger',
    },
    {
      min: 20,
      max: 100,
      color: 'success',
    },
  ];

  return (
    <Fragment>
      <DisplayToggles canAppend canPrepend>
        <OuiRange
          id={htmlIdGenerator()()}
          value={value}
          onChange={onChange}
          showInput="inputWithPopover"
          showLabels
          aria-label="An example of OuiRange with showInput prop"
        />
      </DisplayToggles>

      <OuiSpacer size="xl" />

      <DisplayToggles canAppend canPrepend canLoading={false}>
        <OuiDualRange
          id={htmlIdGenerator()()}
          value={dualValue}
          onChange={onDualChange}
          showInput="inputWithPopover"
          showLabels
          levels={levels}
          aria-label="An example of OuiDualRange with showInput prop"
        />
      </DisplayToggles>
    </Fragment>
  );
};
