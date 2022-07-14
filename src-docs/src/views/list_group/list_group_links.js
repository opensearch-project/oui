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

import { OuiListGroup } from '../../../../src/components';

const myContent = [
  {
    label: 'First link',
    href: '#/display/list-group',
    iconType: 'calendar',
    size: 's',
  },
  {
    label: 'This is an active link with very long label that truncates',
    href: '#/display/list-group',
    isActive: true,
    iconType: 'clock',
    size: 's',
  },
  {
    label: 'Third link is disabled',
    href: '#/display/list-group',
    isDisabled: true,
    iconType: 'compute',
    size: 's',
  },
  {
    label: 'Fourth link',
    href: '#/display/list-group',
    iconType: 'copyClipboard',
    size: 's',
  },
  {
    label: 'Fifth link',
    href: '#/display/list-group',
    iconType: 'crosshairs',
    size: 's',
  },
];

export default () => {
  return <OuiListGroup listItems={myContent} />;
};
