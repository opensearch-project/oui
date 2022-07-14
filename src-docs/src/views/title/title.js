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
  OuiTitle,
  OuiHorizontalRule,
  OuiSpacer,
  OuiCode,
} from '../../../../src/components';

export default () => (
  <div>
    <OuiTitle size="l">
      <h1>This is a large title, only one should exist per page</h1>
    </OuiTitle>
    <OuiCode language="js">size=&quot;l&quot;</OuiCode>

    <OuiSpacer />
    <OuiTitle>
      <h2>This is the default size for title</h2>
    </OuiTitle>
    <OuiCode language="js">size=&quot;m&quot;</OuiCode>

    <OuiSpacer />
    <OuiTitle size="s">
      <h3>This is a small title</h3>
    </OuiTitle>
    <OuiCode language="js">size=&quot;s&quot;</OuiCode>

    <OuiSpacer />
    <OuiTitle size="xs">
      <h4>This is an extra small title</h4>
    </OuiTitle>
    <OuiCode language="js">size=&quot;xs&quot;</OuiCode>

    <OuiSpacer />
    <OuiTitle size="xxs">
      <h5>This is an extra extra small title</h5>
    </OuiTitle>
    <OuiCode language="js">size=&quot;xxs&quot;</OuiCode>

    <OuiSpacer />
    <OuiTitle size="xxxs">
      <h6>
        This is an extra extra extra small title and should only be used when
        the title is inconsequential (like a label)
      </h6>
    </OuiTitle>
    <OuiCode language="js">size=&quot;xxxs&quot;</OuiCode>

    <OuiHorizontalRule />

    <OuiTitle size="l">
      <span>Titles are markup agnostic, they only confer style</span>
    </OuiTitle>
  </div>
);
