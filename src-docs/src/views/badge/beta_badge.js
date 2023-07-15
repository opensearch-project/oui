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

import { OuiBetaBadge, OuiSpacer, OuiTitle } from '../../../../src/components';

const colors = ['hollow', 'subdued'];

export default () => (
  <div>
    {colors.map((item, index) => (
      <div key={index}>
        <OuiBetaBadge
          label="Experimental"
          color={item}
          tooltipContent="This module is not GA. Please help us by reporting any bugs."
        />
        &emsp;
        <OuiBetaBadge
          label="Experimental"
          color={item}
          size="s"
          tooltipContent="This module is not GA. Please help us by reporting any bugs."
        />
        &emsp;
        <OuiBetaBadge label="E" color={item} />
        &emsp;
        <OuiBetaBadge size="s" label="E" color={item} />
        &emsp;
        <OuiBetaBadge label="experimental" color={item} iconType="beaker" />
        &emsp;
        <OuiBetaBadge
          label="experimental"
          size="s"
          color={item}
          iconType="beaker"
        />
        <OuiSpacer size="s" />
      </div>
    ))}
    <OuiSpacer size="s" />
    <OuiTitle size="s">
      <h3>
        Beta badges will also line up nicely with titles &nbsp;
        <OuiBetaBadge
          label="experimental"
          tooltipContent="This module is not GA. Please help us by reporting any bugs."
        />
      </h3>
    </OuiTitle>
    <OuiTitle size="xxs">
      <h4>Clickable beta badges</h4>
    </OuiTitle>
    <OuiSpacer size="s" />
    <OuiBetaBadge
      label="Visualize"
      iconType="visVisualBuilder"
      href="https://playground.opensearch.org/app/visualize#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))"
      target="_blank"
    />
    &emsp;
    <OuiBetaBadge
      label="Experimental"
      href="https://opensearch.org/docs/latest/"
      target="_blank"
    />
  </div>
);
