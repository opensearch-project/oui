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
  OuiCode,
  OuiHideFor,
  OuiShowFor,
  OuiText,
  OuiSpacer,
} from '../../../../src/components';

export default () => (
  <OuiText>
    <OuiHideFor sizes={'none'}>
      <p>
        Hiding from <OuiCode>{'"none"'}</OuiCode> of the screen sizes
      </p>
    </OuiHideFor>
    <OuiHideFor sizes={['xs']}>
      <p>
        Hiding from <OuiCode>xs</OuiCode> screens only
      </p>
    </OuiHideFor>
    <OuiHideFor sizes={['xs', 's']}>
      <p>
        Hiding from <OuiCode>xs, s</OuiCode> screens
      </p>
    </OuiHideFor>
    <OuiHideFor sizes={['xs', 's', 'm', 'l']}>
      <p>
        Hiding from <OuiCode>xs, s, m, l</OuiCode> screens
      </p>
    </OuiHideFor>
    <OuiHideFor sizes={['xl']}>
      <p>
        Hiding from <OuiCode>xl</OuiCode> screens only
      </p>
    </OuiHideFor>

    <OuiSpacer size="xxl" />

    <OuiShowFor sizes={'all'}>
      <p>
        Showing for <OuiCode>{'"all"'}</OuiCode> of the screen sizes
      </p>
    </OuiShowFor>
    <OuiShowFor sizes={['xs']}>
      <p>
        Showing for <OuiCode>xs</OuiCode> screens only
      </p>
    </OuiShowFor>
    <OuiShowFor sizes={['xs', 's']}>
      <p>
        Showing for <OuiCode>xs, s</OuiCode> screens
      </p>
    </OuiShowFor>
    <OuiShowFor sizes={['xs', 's', 'm', 'l']}>
      <p>
        Showing for <OuiCode>xs, s, m, l</OuiCode> screens
      </p>
    </OuiShowFor>
    <OuiShowFor sizes={['xl']}>
      <p>
        Showing for <OuiCode>xl</OuiCode> screen only
      </p>
    </OuiShowFor>
    <OuiShowFor sizes={['m', 'l', 'xl']}>
      <p>
        Showing for <OuiCode>m, l, xl</OuiCode> screen only
      </p>
    </OuiShowFor>
  </OuiText>
);
