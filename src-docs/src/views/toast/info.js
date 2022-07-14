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
  <OuiToast title="Icons should be rare" type="info" onClose={() => {}}>
    <p>
      Icons should be used rarely. They are good for warnings, but when paired
      with long titles they look out of place.
    </p>
  </OuiToast>
);
