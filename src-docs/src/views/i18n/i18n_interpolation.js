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

import React, { useState } from 'react';

import {
  OuiButton,
  OuiI18n,
  OuiMark,
  OuiSpacer,
  OuiTitle,
  useOuiI18n,
} from '../../../../src/components';

export default () => {
  const [count, setCount] = useState(1);

  return (
    <>
      <OuiTitle size="xs">
        <h3>useOuiI18n with string interpolation</h3>
      </OuiTitle>
      <p>
        {useOuiI18n(
          'ouiI18nInterpolation.clickedCount',
          'Clicked on button {count} times.',
          {
            count,
          }
        )}
      </p>

      <OuiSpacer size="l" />

      <OuiTitle size="xs">
        <h3>OuiI18n with string interpolation</h3>
      </OuiTitle>
      <p>
        <OuiI18n
          token="ouiI18nInterpolation.clickedCount"
          default="Clicked on button {count} times."
          values={{
            count,
          }}
        />
      </p>

      <OuiSpacer size="l" />

      <OuiTitle size="xs">
        <h3>useOuiI18n with component interpolation</h3>
      </OuiTitle>
      <p>
        {useOuiI18n(
          'ouiI18nInterpolation.clickedCount',
          'Clicked on button {count} times.',
          {
            count: <OuiMark color="primary">{count}</OuiMark>,
          }
        )}
      </p>

      <OuiSpacer size="l" />

      <OuiTitle size="xs">
        <h3>OuiI18n with component interpolation</h3>
      </OuiTitle>
      <p>
        <OuiI18n
          token="ouiI18nInterpolation.clickedCount"
          default="Clicked on button {count} times."
          values={{
            count: <OuiMark color="primary">{count}</OuiMark>,
          }}
        />
      </p>

      <OuiSpacer size="l" />

      <OuiButton onClick={() => setCount(count + 1)} size="s">
        Increase count
      </OuiButton>
    </>
  );
};
