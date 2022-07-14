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

import { OuiHorizontalRule, OuiCode } from '../../../../src/components';

export default () => (
  <>
    <OuiCode>quarter</OuiCode>
    <OuiHorizontalRule size="quarter" />
    <OuiCode>half</OuiCode>
    <OuiHorizontalRule size="half" />
    <OuiCode>full (default)</OuiCode>
    <OuiHorizontalRule />
  </>
);
