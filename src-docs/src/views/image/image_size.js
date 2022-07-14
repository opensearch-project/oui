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

import { OuiImage, OuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <OuiImage
      hasShadow
      allowFullScreen
      size={50}
      caption="Custom size (50)"
      alt="Accessible image alt goes here"
      src="https://source.unsplash.com/1000x1000/?Nature"
    />
    <OuiSpacer />
    <OuiImage
      size="s"
      hasShadow
      allowFullScreen
      caption="Small"
      alt="Accessible image alt goes here"
      src="https://source.unsplash.com/1000x1000/?Nature"
    />
    <OuiSpacer />
    <OuiImage
      size="m"
      hasShadow
      allowFullScreen
      caption="Medium"
      alt="Accessible image alt goes here"
      src="https://source.unsplash.com/1000x1000/?Nature"
    />
    <OuiSpacer />
    <OuiImage
      size="l"
      hasShadow
      allowFullScreen
      caption="Large"
      alt="Accessible image alt goes here"
      src="https://source.unsplash.com/1000x1000/?Nature"
    />
    <OuiSpacer />
    <OuiImage
      size="xl"
      hasShadow
      allowFullScreen
      caption="Extra large"
      alt="Accessible image alt goes here"
      src="https://source.unsplash.com/1000x1000/?Nature"
    />
    <OuiSpacer />
    <OuiImage
      hasShadow
      allowFullScreen
      caption="Original"
      alt="Accessible image alt goes here"
      src="https://source.unsplash.com/1000x1000/?Nature"
    />
    <OuiSpacer />
    <OuiImage
      hasShadow
      allowFullScreen
      size="fullWidth"
      caption="Full width"
      alt="Accessible image alt goes here"
      src="https://source.unsplash.com/1000x1000/?Nature"
    />
  </div>
);
