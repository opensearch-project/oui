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

const esError =
  'Error: expected_scroll_id in the following response: {"took":0,"timed_out":false,"_shards":{"total":0,"successful":0,"skipped":0,"failed":0},"hits":{"total":0,"max_score":0,"hits":[]}}';

export default () => (
  <OuiToast
    title="Couldn't complete the search"
    color="danger"
    iconType="alert">
    <p>{esError}</p>
  </OuiToast>
);
