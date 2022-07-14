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
  OuiSkipLink,
  OuiCallOut,
  OuiText,
  OuiSpacer,
  OuiSwitch,
} from '../../../../src/components';

export default () => {
  const [isFixed, setFixed] = useState(false);

  return (
    <>
      <OuiText>
        {isFixed ? (
          <p>
            <em>
              Tab through this section and a fixed{' '}
              <strong>Skip to main content </strong> link will appear atop this
              page.
            </em>
          </p>
        ) : (
          <p>
            <em>
              Tab through this section and a <strong>Skip to content</strong>{' '}
              link will appear below.
            </em>
          </p>
        )}
      </OuiText>
      <OuiSpacer />
      <OuiSwitch
        label="Fix link to top of screen"
        checked={isFixed}
        onChange={(e) => setFixed(e.target.checked)}
      />
      <OuiSpacer />
      <OuiSkipLink
        destinationId="/utilities/accessibility"
        position={isFixed ? 'fixed' : 'static'}
        data-test-subj="skip-link-demo-subj">
        Skip to {isFixed && 'main '}content
      </OuiSkipLink>
      {isFixed && (
        <>
          <OuiCallOut
            size="s"
            title="A functional &lsquo;Skip to main content&rsquo; link will be added to the OUI docs site once our URL format is updated."
            iconType="iInCircle"
          />
        </>
      )}
    </>
  );
};
