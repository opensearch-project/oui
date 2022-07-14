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

import { OuiFormFieldset } from '../../../../src/components/form/form_fieldset';
import { OuiSwitch } from '../../../../src/components/form/switch';
import { OuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <OuiFormFieldset legend={{ children: 'Enable these objects' }}>
    <OuiSwitch label="Object 1" onChange={() => {}} checked={false} />
    <OuiSpacer size="s" />
    <OuiSwitch label="Object 2" onChange={() => {}} checked={true} />
  </OuiFormFieldset>
);
