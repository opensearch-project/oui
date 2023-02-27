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
      Irure non eiusmod minim id aliqua esse proident veniam cillum amet. Est
      nulla ea amet culpa. Non tempor magna eiusmod ex eu anim. Commodo nulla
      nisi et et nisi elit sit. Do veniam occaecat proident qui proident et
      occaecat.
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
      Irure veniam mollit elit esse proident ex tempor ad Lorem pariatur.
      Incididunt enim cillum in occaecat esse pariatur veniam proident aute.
      Reprehenderit quis nulla labore velit ipsum duis exercitation cupidatat
      cupidatat deserunt ut magna duis nulla.
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
