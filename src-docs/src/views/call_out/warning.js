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
      This feature is experimental, and should not be run in production. For
      more information on this feature, visit{' '}
      <OuiLink href="https://opensearch.org/docs/latest/">
        documentation
      </OuiLink>
      .
    </p>
    <OuiButton href="https://opensearch.org/docs/latest/" color="warning">
      Link button
    </OuiButton>
  </OuiCallOut>
);
