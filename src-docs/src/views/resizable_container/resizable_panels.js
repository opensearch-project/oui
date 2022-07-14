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
  OuiText,
  OuiCode,
  OuiResizableContainer,
  OuiPanel,
} from '../../../../src/components';

export default () => (
  <OuiResizableContainer style={{ height: '200px' }}>
    {(OuiResizablePanel, OuiResizableButton) => (
      <>
        <OuiResizablePanel initialSize={20} color="subdued">
          <OuiText size="s">
            <p>
              This <strong>OuiResizablePanel</strong> changes the background
              with <OuiCode>{'color="subdued"'}</OuiCode>.
            </p>
          </OuiText>
        </OuiResizablePanel>

        <OuiResizableButton />

        <OuiResizablePanel
          initialSize={40}
          color="plain"
          hasShadow
          borderRadius="m"
          wrapperPadding="m"
          minSize="20%">
          <OuiText size="s">
            <p>
              This <strong>OuiResizablePanel</strong> resets most of the{' '}
              <strong>OuiPanel</strong> props back to default with{' '}
              <OuiCode>{'color="plain" hasShadow borderRadius="m"'}</OuiCode>.
            </p>
            <p>
              It also adds padding to the wrapping div with{' '}
              <OuiCode>{'wrapperPadding="m"'}</OuiCode> to maintain the scroll{' '}
              <strong>inside</strong> the panel.
            </p>
          </OuiText>
        </OuiResizablePanel>

        <OuiResizableButton />

        <OuiResizablePanel initialSize={40} color="subdued">
          <OuiPanel>
            <OuiText size="s">
              <p>
                This <strong>OuiResizablePanel</strong> also changes the
                background color but adds an internal <strong>OuiPanel</strong>{' '}
                that will not stretch and will scroll within the{' '}
                <strong>OuiResizablePanel</strong>.
              </p>
            </OuiText>
          </OuiPanel>
        </OuiResizablePanel>
      </>
    )}
  </OuiResizableContainer>
);
