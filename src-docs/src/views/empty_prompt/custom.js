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
    iconType="dataVisualizer"
    iconColor="default"
    title={<h2>You have no spice</h2>}
    titleSize="xs"
    body={
      <Fragment>
        <p>
          Navigators use massive amounts of spice to gain a limited form of
          prescience. This allows them to safely navigate interstellar space,
          enabling trade and travel throughout the galaxy.
        </p>
        <p>You&rsquo;ll need spice to rule Arrakis, young Atreides.</p>
      </Fragment>
    }
    actions={
      <OuiButton size="s" color="primary" fill>
        Harvest spice
      </OuiButton>
    }
  />
);
