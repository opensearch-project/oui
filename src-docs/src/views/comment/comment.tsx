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
import { OuiComment } from '../../../../src/components/comment_list';
import { OuiButtonIcon } from '../../../../src/components/button';
import { OuiText } from '../../../../src/components/text';

const body = (
  <OuiText size="s">
    <p>
      Officia tempor minim dolore adipisicing non irure irure consectetur
      pariatur. Consequat occaecat cillum et et pariatur. Officia dolore
      reprehenderit sint aute ut cupidatat consectetur nulla nostrud incididunt
      pariatur nulla velit ut. Minim quis adipisicing non minim. Ullamco elit
      dolore enim Lorem proident do exercitation aute laboris. Eu aliqua labore
      enim minim deserunt dolor. Nisi labore occaecat mollit mollit irure
      reprehenderit.
    </p>
  </OuiText>
);

const copyAction = (
  <OuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color="subdued"
    iconType="copy"
  />
);

export default () => (
  <div>
    <OuiComment
      username="janed"
      event="added a comment"
      actions={copyAction}
      timestamp="on Jan 1, 2020">
      {body}
    </OuiComment>
  </div>
);
