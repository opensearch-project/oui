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

import { OuiErrorBoundary } from '../../../../src/components';

const BadComponent = () => {
  throw new Error(
    "I'm here to kick butt and chew bubblegum. And I'm all out of gum."
  );
};

export default () => (
  <OuiErrorBoundary>
    <BadComponent />
  </OuiErrorBoundary>
);
