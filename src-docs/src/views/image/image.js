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

import { OuiImage } from '../../../../src/components';

export default () => (
  <OuiImage
    size="l"
    hasShadow
    caption="Random nature image"
    alt="Random nature image"
    src="https://picsum.photos/300/300"
  />
);
