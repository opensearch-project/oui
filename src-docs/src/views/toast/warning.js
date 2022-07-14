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

import { OuiToast } from '../../../../src/components';

export default () => (
  <OuiToast
    title="Sometimes a title is enough!"
    color="warning"
    iconType="help"
  />
);
