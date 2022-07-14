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
  OuiRange,
  OuiSpacer,
  OuiTitle,
  OuiDualRange,
} from '../../../../src/components';

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
        step={10}
        value={value}
        onChange={onChange}
        showTicks
        aria-label="An example of OuiRange with ticks"
      />

      <OuiSpacer size="xl" />

      <OuiTitle size="xxs">
        <h3>Custom tick interval</h3>
      </OuiTitle>

      <OuiSpacer size="l" />

      <OuiRange
        id={htmlIdGenerator()()}
        value={value}
        onChange={onChange}
        showInput
        showRange
        showTicks
        tickInterval={20}
        aria-label="An example of OuiRange with custom tickInterval"
      />

      <OuiSpacer size="xl" />

      <OuiTitle size="xxs">
        <h3>Custom ticks object</h3>
      </OuiTitle>

      <OuiSpacer size="l" />

      <OuiDualRange
        id={htmlIdGenerator()()}
        value={dualValue}
        onChange={onDualChange}
        showTicks
        ticks={[
          { label: '20kb', value: 20 },
          { label: '100kb', value: 100 },
        ]}
        showInput
        aria-label="An example of OuiDualRange with ticks"
      />

      <OuiSpacer size="xl" />

      <OuiTitle size="xxs">
        <h3>Long labels</h3>
      </OuiTitle>

      <OuiSpacer size="l" />

      <OuiDualRange
        id={htmlIdGenerator()()}
        value={dualValue}
        onChange={onDualChange}
        showTicks
        ticks={[
          { label: '0 kilobytes', value: 0 },
          { label: '50 kilobytes', value: 50 },
          { label: '100 kilobytes', value: 100 },
        ]}
        aria-label="An example of OuiDualRange with long tick labels"
      />
    </Fragment>
  );
};
