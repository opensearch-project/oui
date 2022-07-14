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

import { OuiSteps, OuiTitle, OuiSpacer } from '../../../../src/components';

const steps = [
  {
    title: 'Inspect me',
    children: (
      <OuiTitle size="xs">
        <h3>Did you notice the step title is inside a Heading 2 element?</h3>
      </OuiTitle>
    ),
  },
];

export default () => (
  <div>
    <OuiTitle size="l">
      <h1>Heading 1</h1>
    </OuiTitle>

    <OuiSpacer size="xl" />

    <OuiSteps steps={steps} headingElement="h2" />
  </div>
);
