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

import { OuiCallOut, OuiLink, OuiButton } from '../../../../src/components';

export default () => (
  <OuiCallOut title="Proceed with caution!" color="warning" iconType="help">
    <p>
      Here be dragons. Don&rsquo;t wanna mess with no dragons. And{' '}
      <OuiLink href="#">here&rsquo;s a link</OuiLink>.
    </p>
    <OuiButton href="#" color="warning">
      Link button
    </OuiButton>
  </OuiCallOut>
);
