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

import { OuiStepsHorizontal } from '../../../../src/components';

const horizontalSteps = [
  {
    title: 'Completed step 1',
    isComplete: true,
    onClick: () => {},
  },
  {
    title: 'Selected step 2',
    isSelected: true,
    onClick: () => {},
  },
  {
    title: 'Incomplete step 3 which will wrap to the next line',
    onClick: () => {},
  },
  {
    title: 'Disabled step 4',
    disabled: true,
    onClick: () => {},
  },
];

export default () => <OuiStepsHorizontal steps={horizontalSteps} />;
