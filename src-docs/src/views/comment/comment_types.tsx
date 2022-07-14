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
import { OuiText } from '../../../../src/components/text';
import { OuiCode } from '../../../../src/components/code';

const body = (
  <OuiText size="s">
    <p>
      This is the body of a comment of type <OuiCode>regular</OuiCode>
    </p>
  </OuiText>
);

const bodyUpdate = (
  <OuiText size="s">
    <p>
      Comments of type <OuiCode>update</OuiCode> can also have a body
    </p>
  </OuiText>
);

export default () => (
  <div>
    <OuiComment username="andred" event="added a comment" timestamp="yesterday">
      {body}
    </OuiComment>
    <OuiComment
      username="luisg"
      type="update"
      event="edited case"
      timestamp="22 hours ago"
    />
    <OuiComment
      username="milal"
      type="update"
      event="edited case"
      timestamp="6 hours ago">
      {bodyUpdate}
    </OuiComment>
  </div>
);
