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

import { OuiAccordion, OuiButton } from '../../../../src/components';

export default () => (
  <OuiAccordion
    id="accordionExtraWithLeftArrow"
    buttonContent="Click to open"
    extraAction={<OuiButton size="s">Extra action!</OuiButton>}
    paddingSize="l">
    <strong>Opened content.</strong>
  </OuiAccordion>
);
