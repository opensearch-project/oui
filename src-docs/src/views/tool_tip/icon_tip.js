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
  OuiCheckbox,
  OuiFlexGroup,
  OuiFlexItem,
  OuiIconTip,
  OuiSpacer,
  OuiText,
  OuiCode,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <OuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
      <OuiFlexItem grow={false}>
        <OuiCheckbox
          id="explainedCheckbox"
          label="Use source maps"
          onChange={() => {}}
        />
      </OuiFlexItem>

      <OuiFlexItem grow={false}>
        <OuiIconTip
          content="Source maps allow browser dev tools to map minified code to the original source code"
          position="right"
        />
      </OuiFlexItem>
    </OuiFlexGroup>

    <OuiSpacer />

    <OuiIconTip
      aria-label="Warning"
      size="xl"
      type="alert"
      color="warning"
      content="I do not think it means what you think it means"
    />

    <OuiSpacer />

    <OuiText>
      <p>
        Pass a position utility class via <OuiCode>iconProps</OuiCode> to shift
        for better alignment.
        <OuiIconTip
          type="iInCircle"
          color="subdued"
          content={
            <span>
              This was passed <OuiCode>.oui-alignTop</OuiCode>
            </span>
          }
          iconProps={{
            className: 'oui-alignTop',
          }}
        />
      </p>
    </OuiText>
  </Fragment>
);
