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

import { OuiExpression } from '../../../../src/components/expression';

export default () => (
  <div>
    <OuiExpression description="Select" value="count(*)" onClick={() => {}} />
    <OuiExpression
      description="From"
      value="opensearch_dashboards_sample_data_ky_counties left"
    />
    <OuiExpression
      description="join"
      value="opensearch_dashboards_sample_data_ky_avl right"
      onClick={() => {}}
    />
    <OuiExpression description="on" value="left.smis = right.kytccountynmbr" />
    <OuiExpression
      description="group by"
      value="right.kytccountynmbr"
      onClick={() => {}}
      color="accent"
    />
    <OuiExpression description="sort by" value="count" />
  </div>
);
