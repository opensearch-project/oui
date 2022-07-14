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

  return (
    <Fragment>
      <OuiRange
        id={htmlIdGenerator()()}
        value={value}
        onChange={onChange}
        showInput
        aria-label="An example of OuiRange"
      />

      <OuiSpacer size="xl" />

      <OuiDualRange
        id={htmlIdGenerator()()}
        value={dualValue}
        onChange={onDualChange}
        showInput
        minInputProps={{ 'aria-label': 'Min value' }}
        maxInputProps={{ 'aria-label': 'Max value' }}
        aria-label="An example of OuiDualRange with inputs"
      />
    </Fragment>
  );
};
