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

import { OuiImage, OuiText } from '../../../../src/components';
import { faker } from '@faker-js/faker';

export default () => (
  <OuiText>
    <OuiImage
      size="l"
      float="right"
      margin="l"
      hasShadow
      caption="Random nature image"
      allowFullScreen
      alt="Random nature image"
      src="https://picsum.photos/800/500"
    />
    <p>{faker.helpers.fake('{{lorem.paragraphs}}')}</p>
    <p>{faker.helpers.fake('{{lorem.paragraphs}}')}</p>
    <p>{faker.helpers.fake('{{lorem.paragraphs}}')}</p>
    <OuiImage
      size="l"
      float="left"
      margin="l"
      hasShadow
      allowFullScreen
      caption="Another random image"
      alt="Random nature image"
      src="https://picsum.photos/300/300"
    />
    <p>{faker.helpers.fake('{{lorem.paragraphs}}')}</p>
    <p>{faker.helpers.fake('{{lorem.paragraphs}}')}</p>
  </OuiText>
);
