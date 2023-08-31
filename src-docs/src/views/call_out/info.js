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

import { OuiCallOut, OuiLink, OuiSpacer } from '../../../../src/components';

export default () => {
  const [isCallOutVisible, setIsCallOutVisible] = useState(true);

  const closeCallOut = () => setIsCallOutVisible(false);

  let callOut;

  if (isCallOutVisible) {
    callOut = (
      <OuiCallOut
        title="Callouts can be dismissed when dismissible is set to true unless the color is danger or warning. "
        iconType="wrench"
        dismissible
        onDismiss={closeCallOut}
      />
    );
  }

  return (
    <div>
      <OuiCallOut
        title="Check it out, here's a really long title that will wrap within a narrower browser"
        iconType="search">
        <p>
          Here&rsquo;s some stuff that you need to know. We can make this text
          really long so that, when viewed within a browser that&rsquo;s fairly
          narrow, it will wrap, too.
        </p>
        <p>
          When possible, its recommended to include links to product{' '}
          <OuiLink href="https://opensearch.org/docs/latest/">
            documentation
          </OuiLink>
          .
        </p>
      </OuiCallOut>

      <OuiSpacer size="m" />

      <OuiCallOut
        title="Callouts can exist as just a title. Simply omit the child content."
        iconType="visVisualBuilder"
      />

      <OuiSpacer size="m" />

      {callOut}

      <OuiSpacer size="m" />

      <OuiCallOut
        size="s"
        title="This is a small callout for more unintrusive but constant messages."
        iconType="pin"
      />
    </div>
  );
};
