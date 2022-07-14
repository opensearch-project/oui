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

import React, { Fragment } from 'react';
import { OuiComment } from '../../../../src/components/comment_list';
import { OuiText } from '../../../../src/components/text';
import { OuiAvatar } from '../../../../src/components/avatar';
import { OuiCode } from '../../../../src/components/code';

const defaultBody = (
  <OuiText size="s">
    <p>
      This comment and the one below are using the default{' '}
      <OuiCode>timelineIcon</OuiCode>.
    </p>
  </OuiText>
);

const iconStringBody = (
  <OuiText size="s">
    <p>
      This comment passed the string &ldquo;tag&rdquo; to the{' '}
      <OuiCode>timelineIcon</OuiCode> prop.
    </p>
  </OuiText>
);

const customIconBody = (
  <OuiText size="s">
    <p>
      This comment has a custom element as its <OuiCode>timelineIcon</OuiCode>.
    </p>
  </OuiText>
);

export default () => (
  <Fragment>
    <OuiComment
      username="janed"
      event="added a comment"
      timestamp="Jan 1, 2020">
      {defaultBody}
    </OuiComment>
    <OuiComment
      username="pancho1"
      type="update"
      event="edited case"
      timestamp="Jan 3, 2020"
    />
    <OuiComment
      username="janed"
      event="added a comment"
      timestamp="Jan 1, 2020"
      timelineIcon="tag">
      {iconStringBody}
    </OuiComment>
    <OuiComment
      username="juanab"
      event="added a comment"
      timestamp="Jan 3, 2020"
      timelineIcon={
        <OuiAvatar
          imageUrl="https://source.unsplash.com/64x64/?woman"
          size="l"
          name="Juana"
        />
      }>
      {customIconBody}
    </OuiComment>
  </Fragment>
);
