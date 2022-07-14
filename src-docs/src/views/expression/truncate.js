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

import { OuiExpression, OuiSpacer, OuiTitle } from '../../../../src/components';

const value = 'and a very long string as value';
const description = 'some very very long description';
const nodes = (
  <Fragment>
    <p className="oui-textTruncate">.kibana_task_manager</p>
    <p className="oui-textTruncate">kibana_sample_data_ecommerce</p>
  </Fragment>
);

export default () => (
  <div>
    <div style={{ maxWidth: 240 }}>
      <OuiExpression
        onClick={() => {}}
        description={description}
        value={value}
        textWrap="truncate"
      />
      <OuiSpacer />
      <OuiExpression
        description={description}
        display="columns"
        text
        textWrap="truncate"
        value={value}
        onClick={() => {}}
      />
      <OuiSpacer />
    </div>
    <OuiTitle size="xxs">
      <h3>oui-textTruncate applied to sub-children</h3>
    </OuiTitle>
    <div style={{ maxWidth: 310 }}>
      <OuiExpression
        value={nodes}
        display="columns"
        text
        textWrap="truncate"
        description="indices"
        onClick={() => {}}
      />
    </div>
  </div>
);
