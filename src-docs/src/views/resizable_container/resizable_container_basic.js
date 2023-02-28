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
import { OuiText, OuiResizableContainer } from '../../../../src/components';
import { fake } from 'faker';

const text = (
  <>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
  </>
);

export default () => (
  <OuiResizableContainer style={{ height: '200px' }}>
    {(OuiResizablePanel, OuiResizableButton) => (
      <>
        <OuiResizablePanel initialSize={50} minSize="30%">
          <OuiText>
            <div>{text}</div>
          </OuiText>
        </OuiResizablePanel>

        <OuiResizableButton />

        <OuiResizablePanel initialSize={50} minSize="200px">
          <OuiText>{text}</OuiText>
        </OuiResizablePanel>
      </>
    )}
  </OuiResizableContainer>
);
