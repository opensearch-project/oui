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

import React, { useState, Fragment } from 'react';

import { OuiSelectable } from '../../../../src/components/selectable';
import { Options } from './data';

export default () => {
  const [options, setOptions] = useState(Options);

  return (
    <Fragment>
      <OuiSelectable
        aria-label="Searchable example"
        searchable
        searchProps={{
          'data-test-subj': 'selectableSearchHere',
        }}
        options={options}
        onChange={(newOptions) => setOptions(newOptions)}>
        {(list, search) => (
          <Fragment>
            {search}
            {list}
          </Fragment>
        )}
      </OuiSelectable>
    </Fragment>
  );
};
