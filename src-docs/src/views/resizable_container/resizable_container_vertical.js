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
import { faker } from '@faker-js/faker';

const text = (
  <>
    <p>{faker.helpers.fake('{{lorem.paragraphs}}')}</p>
    <p>{faker.helpers.fake('{{lorem.paragraphs}}')}</p>
    <p>{faker.helpers.fake('{{lorem.paragraphs}}')}</p>
  </>
);

export default () => (
  <OuiResizableContainer style={{ height: '400px' }} direction="vertical">
    {(OuiResizablePanel, OuiResizableButton) => (
      <>
        <OuiResizablePanel initialSize={60} minSize="40%">
          <OuiText>
            <div>{text}</div>
          </OuiText>
        </OuiResizablePanel>

        <OuiResizableButton />

        <OuiResizablePanel initialSize={40} minSize="10%">
          <OuiText>
            <div>{text}</div>
          </OuiText>
        </OuiResizablePanel>
      </>
    )}
  </OuiResizableContainer>
);
