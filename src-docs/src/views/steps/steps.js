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

import {
  OuiCode,
  OuiSpacer,
  OuiSteps,
  OuiText,
} from '../../../../src/components';

const firstSetOfSteps = [
  {
    title: 'Step 1',
    children: (
      <OuiText>
        <p>Do this first</p>
      </OuiText>
    ),
  },
  {
    title: 'Step 2',
    children: (
      <OuiText>
        <p>Then this</p>
      </OuiText>
    ),
  },
];

const nextSetOfSteps = [
  {
    title: 'Good step',
    children: (
      <OuiText>
        <p>Do this first</p>
      </OuiText>
    ),
  },
  {
    title: 'Better step',
    children: (
      <OuiText>
        <p>Then this</p>
      </OuiText>
    ),
  },
];

export default () => (
  <div>
    <OuiSteps steps={firstSetOfSteps} />

    <OuiSpacer size="m" />
    <OuiText>
      <p>
        Set <OuiCode>firstStepNumber</OuiCode> to continue step numbering after
        any type of break in the content
      </p>
    </OuiText>
    <OuiSpacer size="m" />

    <OuiSteps
      firstStepNumber={firstSetOfSteps.length + 1}
      steps={nextSetOfSteps}
    />
  </div>
);
