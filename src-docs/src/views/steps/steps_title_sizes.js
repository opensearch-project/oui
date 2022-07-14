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

import { OuiCode, OuiSteps } from '../../../../src/components';

const firstSetOfSteps = [
  {
    title: 'Step 1',
    children: (
      <p>
        Steps with <OuiCode>titleSize</OuiCode> set to <OuiCode>xs</OuiCode>{' '}
        like this one, get a smaller step circle
      </p>
    ),
  },
  {
    title: 'Step 2',
    children: (
      <p>
        Steps with <OuiCode>titleSize</OuiCode> set to <OuiCode>xs</OuiCode>{' '}
        like this one, get a smaller step circle
      </p>
    ),
  },
];

export default () => (
  <div>
    <OuiSteps titleSize="xs" steps={firstSetOfSteps} />
  </div>
);
