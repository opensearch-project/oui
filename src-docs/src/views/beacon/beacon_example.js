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

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { OuiBeacon, OuiText } from '../../../../src/components';

import { beaconConfig } from './playground';

import Beacon from './beacon';
import { OuiCallOut } from '../../../../src/components/call_out';
import { OuiSpacer } from '../../../../src/components/spacer';
const beaconSource = require('./beacon?raw');
const beaconHtml = renderToHtml(Beacon);
const beaconSnippet = '<OuiBeacon />';

export const BeaconExample = {
  title: 'Beacon',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: beaconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: beaconHtml,
        },
      ],
      text: (
        <OuiText>
          <OuiCallOut
            color="warning"
            title="OuiBeacon should only be used in conjunction with OuiTour."
          />
          <OuiSpacer />
          <p>
            Use the <strong>OuiBeacon</strong> component to draw visual
            attention to a specific location or element.
          </p>
        </OuiText>
      ),
      props: { OuiBeacon },
      snippet: beaconSnippet,
      demo: <Beacon />,
      playground: beaconConfig,
    },
  ],
};
