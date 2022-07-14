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

import { OuiExpression, OuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <OuiExpression
      onClick={() => {}}
      description="sort by"
      value="count"
      isInvalid
    />
    <OuiSpacer />
    <div style={{ maxWidth: 220 }}>
      <OuiExpression
        description="email"
        display="columns"
        isInvalid
        value="example@mail."
        onClick={() => {}}
      />
    </div>
  </div>
);
