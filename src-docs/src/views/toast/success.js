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

import {
  OuiButton,
  OuiLink,
  OuiToast,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components';

export default () => (
  <OuiToast
    title="Created report for dashboard 'Tuba Sales by Region'"
    color="success"
    iconType="check">
    <p>
      While the layout will adjust properly for wrapping titles, they do not
      look particularly good. Similarily, do not use a whole lot of text in your
      body either. At a certain point people will not have enough time to read
      these things. Like, you probably are not even reading this now.
    </p>

    <p>
      And some other stuff on another line, just for kicks. And{' '}
      <OuiLink href="https://oui.opensearch.org/latest/">
        here&rsquo;s a link
      </OuiLink>
      .
    </p>

    <OuiFlexGroup justifyContent="flexEnd" gutterSize="s">
      <OuiFlexItem grow={false}>
        <OuiButton size="s">Download report</OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>
  </OuiToast>
);
