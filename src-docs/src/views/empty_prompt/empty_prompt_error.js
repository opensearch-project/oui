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

import { OuiEmptyPrompt } from '../../../../src/components';

export default () => (
  <OuiEmptyPrompt
    iconType="alert"
    iconColor="danger"
    title={<h2>Error loading Dashboards</h2>}
    body={
      <p>
        There was an error loading the Dashboard application. Contact your
        administrator for help.
      </p>
    }
  />
);
