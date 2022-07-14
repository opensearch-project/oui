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

import { OuiRange, OuiSpacer } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState('120');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Fragment>
      <OuiRange
        id={htmlIdGenerator()()}
        min={100}
        max={200}
        step={0.05}
        value={value}
        onChange={onChange}
        showLabels
        aria-label="An example of OuiRange with showLabels prop"
      />

      <OuiSpacer size="xl" />

      <OuiRange
        id={htmlIdGenerator()()}
        min={100}
        max={200}
        value={value}
        onChange={onChange}
        showLabels
        showValue
        aria-label="An example of OuiRange with showValue prop"
      />

      <OuiSpacer size="xl" />

      <OuiRange
        id={htmlIdGenerator()()}
        min={100}
        max={200}
        value={value}
        onChange={onChange}
        showLabels
        showRange
        showValue
        valuePrepend="100 - "
        aria-label="An example of OuiRange with valuePrepend prop"
      />
    </Fragment>
  );
};
