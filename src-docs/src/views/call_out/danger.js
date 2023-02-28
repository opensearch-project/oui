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

import { OuiCallOut, OuiLink } from '../../../../src/components';

export default () => (
  <OuiCallOut title="There was an error" color="danger" iconType="alert">
    <p>
      Now you have to fix it, but maybe{' '}
      <OuiLink href="#">this link can help</OuiLink>.
    </p>
  </OuiCallOut>
);
