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
import {
  OuiCommentList,
  OuiCommentProps,
} from '../../../../src/components/comment_list';
import { OuiAvatar } from '../../../../src/components/avatar';
import { OuiButtonIcon } from '../../../../src/components/button';
import { OuiText } from '../../../../src/components/text';
import { OuiBadge } from '../../../../src/components/badge';
import { OuiFlexGroup, OuiFlexItem } from '../../../../src/components/flex';

const body = (
  <OuiText size="s">
    <p>
      Far out in the uncharted backwaters of the unfashionable end of the
      western spiral arm of the Galaxy lies a small unregarded yellow sun.
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

const complexEvent = (
  <OuiFlexGroup responsive={false} alignItems="center" gutterSize="s">
    <OuiFlexItem grow={false}>added tags</OuiFlexItem>
    <OuiFlexItem grow={false}>
      <OuiBadge color="primary">sample</OuiBadge>
    </OuiFlexItem>
    <OuiFlexItem grow={false}>
      <OuiBadge color="success">review</OuiBadge>
    </OuiFlexItem>
  </OuiFlexGroup>
);

const complexUsername = (
  <OuiFlexGroup responsive={false} alignItems="center" gutterSize="s">
    <OuiFlexItem grow={false}>
      <OuiAvatar size="s" type="space" name="Pedro" />
    </OuiFlexItem>
    <OuiFlexItem grow={false}>pedror</OuiFlexItem>
  </OuiFlexGroup>
);

const longBody = (
  <OuiText size="s">
    <p>
      This planet has - or rather had - a problem, which was this: most of the
      people living on it were unhappy for pretty much of the time. Many
      solutions were suggested for this problem, but most of these were largely
      concerned with the movements of small green pieces of paper, which is odd
      because on the whole it was not the small green pieces of paper that were
      unhappy.
    </p>
  </OuiText>
);

const avatar = (
  <OuiAvatar
    imageUrl="https://source.unsplash.com/64x64/?woman"
    size="l"
    name="Juana"
  />
);

const comments: OuiCommentProps[] = [
  {
    username: 'janed',
    event: 'added a comment',
    timestamp: 'on Jan 1, 2020',
    children: body,
    actions: copyAction,
  },
  {
    username: 'juanab',
    type: 'update',
    actions: copyAction,
    event: 'pushed incident X0Z235',
    timestamp: 'on Jan 3, 2020',
    timelineIcon: avatar,
  },
  {
    username: 'pancho1',
    type: 'update',
    event: 'edited case',
    timestamp: 'on Jan 9, 2020',
  },
  {
    username: complexUsername,
    type: 'update',
    actions: copyAction,
    event: complexEvent,
    timestamp: 'on Jan 11, 2020',
    timelineIcon: 'tag',
  },
  {
    username: 'elohar',
    event: 'added a comment',
    timestamp: 'on Jan 14, 2020',
    timelineIcon: <OuiAvatar size="l" name="Eloha" />,
    children: longBody,
    actions: copyAction,
  },
];

export default () => <OuiCommentList comments={comments} />;
