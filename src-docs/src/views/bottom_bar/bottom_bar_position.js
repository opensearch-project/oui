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

import { OuiBottomBar, OuiSpacer, OuiText } from '../../../../src/components';

export default () => {
  return (
    <>
      <OuiText>
        <p>
          When scrolling past this example block, the{' '}
          <strong>OuiBottomBar</strong> will stick to the bottom of the browser
          window (with a 10px offset), but keeps it within the bounds of its
          parent.
        </p>
      </OuiText>
      <OuiSpacer size="xl" />
      <OuiSpacer size="xl" />
      <OuiBottomBar position="sticky" bottom={10}>
        <OuiText color="ghost" textAlign="center">
          <p>Scroll to demo</p>
        </OuiText>
      </OuiBottomBar>
    </>
  );
};
