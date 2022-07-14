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

import { OuiControlBar, OuiLink } from '../../../../src/components';

export default () => {
  const controls = [
    {
      controlType: 'button',
      id: 'controls_button',
      label: 'Button',
      onClick: () => {},
    },
    {
      controlType: 'spacer',
    },
    {
      controlType: 'icon',
      id: 'controls_icon',
      iconType: 'flag',
    },
    {
      controlType: 'divider',
    },
    {
      controlType: 'icon',
      id: 'controls_icon_button',
      iconType: 'bell',
      onClick: () => {},
      color: 'primary',
      'aria-label': 'Bell',
    },
    {
      controlType: 'divider',
    },
    {
      controlType: 'text',
      id: 'controls_text',
      text: 'Some text',
    },
    {
      controlType: 'divider',
    },
    {
      controlType: 'tab',
      id: 'controls_tab',
      label: 'Tab',
      onClick: () => {},
    },
    {
      controlType: 'divider',
    },
    {
      controlType: 'text',
      id: 'some_text',
      text: <OuiLink>A sample link</OuiLink>,
    },
    {
      controlType: 'spacer',
    },
    {
      controlType: 'breadcrumbs',
      id: 'controls_breadcrumbs',
      breadcrumbs: [
        {
          text: 'Breadcrumbs',
        },
        {
          text: 'Item',
        },
      ],
    },
  ];

  return <OuiControlBar controls={controls} position="relative" showOnMobile />;
};
