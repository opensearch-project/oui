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

import React, { Fragment, useState } from 'react';

import {
  OuiHighlight,
  OuiFieldSearch,
  OuiFormRow,
  OuiSpacer,
  OuiSwitch,
} from '../../../../src/components';

export function Highlight() {
  const [searchValue, setSearchValue] = useState('jumped over');
  const [isHighlightAll, setHighlightAll] = useState(false);

  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const changeHighlightAll = (e) => {
    setHighlightAll(e.target.checked);
  };

  return (
    <Fragment>
      <OuiFormRow label="Enter text to highlight substrings within a string">
        <OuiFieldSearch
          value={searchValue}
          onChange={(e) => {
            onSearchChange(e);
          }}
        />
      </OuiFormRow>

      <OuiSpacer size="m" />
      <OuiSwitch
        label="Highlight all"
        checked={isHighlightAll}
        onChange={(e) => changeHighlightAll(e)}
      />
      <OuiSpacer size="m" />
      <OuiHighlight search={searchValue} highlightAll={isHighlightAll}>
        The quick brown fox jumped over the lazy dog
      </OuiHighlight>
    </Fragment>
  );
}
