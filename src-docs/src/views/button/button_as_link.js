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
  OuiButton,
  OuiButtonEmpty,
  OuiButtonIcon,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <OuiFlexGroup gutterSize="s" alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiButton href="https://opensearch.org/">
          Link to OpenSearch.org
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButtonEmpty href="https://opensearch.org/">
          Link to OpenSearch.org
        </OuiButtonEmpty>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButtonIcon
          href="https://opensearch.org/"
          iconType="link"
          aria-label="This is a link"
        />
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiFlexGroup gutterSize="s" alignItems="center">
      <OuiFlexItem grow={false}>
        <OuiButton href="https://opensearch.org/" isDisabled>
          Disabled link
        </OuiButton>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButtonEmpty href="https://opensearch.org/" isDisabled>
          Disabled empty link
        </OuiButtonEmpty>
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiButtonIcon
          href="https://opensearch.org/"
          iconType="link"
          aria-label="This is a link"
          isDisabled
        />
      </OuiFlexItem>
    </OuiFlexGroup>
  </Fragment>
);
