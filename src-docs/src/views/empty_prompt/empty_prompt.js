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

import { OuiEmptyPrompt, OuiButton } from '../../../../src/components';

export default () => (
  <OuiEmptyPrompt
    iconType="database"
    title={<h2>No data available</h2>}
    body={
      <Fragment>
        <p>
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Donec accumsan, nulla sed blandit semper.
        </p>
        <p>
          tell&rsquo;us est convallis mauris, eget consequat mi lacus non ante.
        </p>
      </Fragment>
    }
    actions={
      <OuiButton color="primary" fill>
        Connect to a data source
      </OuiButton>
    }
  />
);
