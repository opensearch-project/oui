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

import { OuiScreenReaderOnly } from '../../../../src/components/accessibility/screen_reader';
import { OuiCallOut } from '../../../../src/components/call_out';
import { OuiText } from '../../../../src/components/text';
import { OuiTitle } from '../../../../src/components/title';
import { OuiLink } from '../../../../src/components/link';

export default () => (
  <div>
    <OuiText>
      <OuiTitle size="xxs">
        <h3>Visually hide content</h3>
      </OuiTitle>
      <p>
        <em>
          Use a screenreader to verify that there is a second paragraph in this
          example:
        </em>
      </p>
      <p>This is the first paragraph. It is visible to all.</p>
      <OuiScreenReaderOnly>
        <p>
          This is the second paragraph. It is hidden for sighted users but
          visible to screen readers.
        </p>
      </OuiScreenReaderOnly>
      <p>This is the third paragraph. It is visible to all.</p>
      <OuiTitle size="xxs">
        <h4>Show on focus</h4>
      </OuiTitle>
      <p>
        <em>
          Tab through this section with your keyboard to display a &lsquo;Skip
          navigation&rsquo; link:
        </em>
      </p>
      <p>
        This link is visible to all on focus:{' '}
        <OuiScreenReaderOnly showOnFocus>
          <OuiLink href="#">Skip navigation</OuiLink>
        </OuiScreenReaderOnly>
      </p>
      <OuiCallOut
        size="s"
        title="For a fully styled &lsquo;Skip to main content&rsquo; solution, see the OuiSkipLink component in the next section."
        iconType="iInCircle"
      />
    </OuiText>
  </div>
);
