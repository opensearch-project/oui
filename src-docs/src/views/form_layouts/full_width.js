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

import {
  OuiFieldSearch,
  OuiRange,
  OuiTextArea,
  OuiFormRow,
  OuiFlexGroup,
  OuiFlexItem,
  OuiSpacer,
  OuiButton,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <OuiFlexGroup>
      <OuiFlexItem>
        <OuiFieldSearch
          placeholder="Search..."
          fullWidth
          aria-label="An example of search with fullWidth"
        />
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiButton>Search</OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiSpacer size="l" />

    <OuiFormRow
      label="Works on form rows too"
      fullWidth
      helpText="Note that the fullWidth prop is not passed to the form row's child">
      <OuiRange fullWidth min={0} max={100} name="range" />
    </OuiFormRow>

    <OuiFormRow label="Often useful for text areas" fullWidth>
      <OuiTextArea
        fullWidth
        placeholder="There is a reason we do not make forms ALWAYS 100% width.
          See how this text area becomes extremely hard to read when the individual
          lines get this long? It is much more readable when contained to a scannable max-width."
      />
    </OuiFormRow>
  </Fragment>
);
