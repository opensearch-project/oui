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

import { OuiProgress, OuiSpacer } from '../../../../src/components';

const data = [
  { label: 'Basic percentage', value: '80' },
  {
    label: 'Long percentage',
    value: '60.0703850454546453168415365451354641354684531',
  },
  { label: 'Another basic percent', value: '45' },
  { label: 'Custom valueText', value: '40', valueText: <span>4,005,678</span> },
  { label: "Women's Accessories", value: '24.0256' },
];

export default () => (
  <Fragment>
    <div style={{ maxWidth: 160 }}>
      {data.map((item) => (
        <>
          <OuiProgress
            valueText={true}
            max={100}
            color="success"
            size="s"
            {...item}
          />
          <OuiSpacer size="s" />
        </>
      ))}
    </div>
    <OuiSpacer size="m" />
    <div style={{ maxWidth: 200 }}>
      {data.map((item) => (
        <>
          <OuiProgress
            valueText={true}
            max={100}
            color="primary"
            size="m"
            {...item}
          />
          <OuiSpacer size="s" />
        </>
      ))}
    </div>
  </Fragment>
);
