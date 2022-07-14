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
  OuiSpacer,
  OuiCodeBlock,
  OuiText,
  prettyDuration,
} from '../../../../src/components';

const examples = [
  {
    start: '2018-01-17T18:57:57.149Z',
    end: '2018-01-17T20:00:00.000Z',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY, HH:mm:ss.SSS',
  },
  {
    start: '2018-01-17T18:57:57.149Z',
    end: '2018-01-17T20:00:00.000Z',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY @ HH:mm:ss.SSS',
  },
  {
    start: '2018-01-17T18:57:57.149Z',
    end: 'now-2h',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY @ HH:mm:ss.SSS',
  },
  {
    start: 'now-17m',
    end: 'now',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY @ HH:mm:ss.SSS',
  },
  {
    start: 'now-17m',
    end: 'now-1m',
    quickRanges: [],
    dateFormat: 'MMMM Do YYYY @ HH:mm:ss.SSS',
  },
  {
    start: 'now-15m',
    end: 'now',
    quickRanges: [
      {
        start: 'now-15m',
        end: 'now',
        label: 'quick range 15 minutes custom display',
      },
    ],
    dateFormat: 'MMMM Do YYYY, HH:mm:ss.SSS',
  },
];

export default function prettyDurationExample() {
  return (
    <Fragment>
      {examples.map(({ start, end, quickRanges, dateFormat }, idx) => (
        <div key={idx}>
          <OuiCodeBlock paddingSize="s" isCopyable language="js">
            prettyDuration(&apos;{start}&apos;, &apos;{end}&apos;,{' '}
            {JSON.stringify(quickRanges)}, &apos;
            {dateFormat}&apos;)
          </OuiCodeBlock>

          <OuiSpacer size="s" />

          <OuiText>
            <p>{prettyDuration(start, end, quickRanges, dateFormat)}</p>
          </OuiText>

          <OuiSpacer size="xl" />
        </div>
      ))}
    </Fragment>
  );
}
