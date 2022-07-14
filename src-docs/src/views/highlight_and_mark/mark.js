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

import React, { Fragment } from 'react';

import { OuiMark } from '../../../../src/components';

export function Mark() {
  return (
    <Fragment>
      The quick brown fox <OuiMark>jumped over</OuiMark> the lazy dog
    </Fragment>
  );
}
