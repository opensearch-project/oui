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

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiAccordion,
  OuiCode,
  OuiCodeBlock,
  OuiSpacer,
  commonDurationRanges,
} from '../../../../src/components';

import PrettyDuration from './pretty_duration';
const prettyDurationSource = require('./pretty_duration?raw');
const prettyDurationHtml = renderToHtml(PrettyDuration);

export const PrettyDurationExample = {
  title: 'Pretty duration',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: prettyDurationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: prettyDurationHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Use <OuiCode>prettyDuration</OuiCode> to convert a start and end
            date string to a human-friendly format.
          </p>

          <p>
            Start and end values for the duration are passed as the first and
            second arguments, respectively. These can be timestamps (
            <OuiCode>2018-01-17T18:57:57.149Z</OuiCode>) or relative times (
            <OuiCode>now-15m</OuiCode>).
          </p>

          <p>
            An array of quick range values is passed as the third argument.
            These are used to pretty format custom ranges. OUI exports
            <OuiCode>commonDurationRanges</OuiCode> which can be passed here.
          </p>

          <OuiAccordion
            id="commonDurationRanges"
            buttonContent="Show commonDurationRanges definition">
            <OuiCodeBlock>
              {JSON.stringify(commonDurationRanges, null, 2)}
            </OuiCodeBlock>
          </OuiAccordion>

          <OuiSpacer />

          <p>
            The output date/time format is specified by the fourth argument.
          </p>
        </Fragment>
      ),
      demo: <PrettyDuration />,
    },
  ],
};
