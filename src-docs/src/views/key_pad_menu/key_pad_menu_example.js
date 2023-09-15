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

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiKeyPadMenu,
  OuiKeyPadMenuItem,
  OuiCallOut,
} from '../../../../src/components';
import { keyPadMenuItemConfig } from './playground';

import KeyPadMenu from './key_pad_menu';
const keyPadMenuSource = require('./key_pad_menu?raw');
const keyPadMenuHtml = renderToHtml(KeyPadMenu);
const keyPadMenuSnippet = `<OuiKeyPadMenu>
  <OuiKeyPadMenuItem label={label1} href="https://oui.opensearch.org/latest/">
    <OuiIcon type={icon1} size="l" />
  </OuiKeyPadMenuItem>
  <OuiKeyPadMenuItem label={label2} href="https://oui.opensearch.org/latest/">
    <OuiIcon type={icon2} size="l" />
  </OuiKeyPadMenuItem>
</OuiKeyPadMenu>
`;

import KeyPadMenuItemButton from './key_pad_menu_item_button';
const keyPadMenuItemButtonSource = require('./key_pad_menu_item_button?raw');
const keyPadMenuItemButtonHtml = renderToHtml(KeyPadMenuItemButton);
const keyPadMenuItemButtonSnippet = `<OuiKeyPadMenuItem
  label={label}
  onClick={handleClick}>
  <OuiIcon type={icon} size="l" />
</OuiKeyPadMenuItem>
`;

import KeyPadBeta from './key_pad_beta';
const keyPadBetaSource = require('./key_pad_beta?raw');
const keyPadBetaHtml = renderToHtml(KeyPadBeta);
const keyPadBetaSnippet = `<OuiKeyPadMenuItem
  label={label}
  href="https://oui.opensearch.org/latest/"
  betaBadgeLabel={betaBadgeLabel}
  betaBadgeTooltipContent={tooltipContent}
  betaBadgeIconType={badgeIconType}>
  <OuiIcon type={menuItemIcon} size="l" />
</OuiKeyPadMenuItem>
`;

export const KeyPadMenuExample = {
  title: 'Key pad menu',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyPadMenuSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: keyPadMenuHtml,
        },
      ],
      text: (
        <>
          <p>
            The <strong>OuiKeyPadMenu</strong> component presents{' '}
            <strong>OuiKeyPadMenuItems</strong> in a tiled format, with a fixed
            width which will accommodate three items and then wrap.
          </p>
          <OuiCallOut
            iconType="accessibility"
            title={
              <>
                If the menu provides navigation for your application, wrap the{' '}
                <strong>OuiKeyPadMenu</strong> with{' '}
                <OuiCode language="html">
                  {'<nav aria-label="Nav title"></nav>'}
                </OuiCode>
                .
              </>
            }
          />
        </>
      ),
      props: { OuiKeyPadMenu, OuiKeyPadMenuItem },
      snippet: keyPadMenuSnippet,
      demo: <KeyPadMenu />,
    },
    {
      title: 'Item button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyPadMenuItemButtonSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: keyPadMenuItemButtonHtml,
        },
      ],
      text: (
        <p>
          The <strong>OuiKeyPadMenuItem</strong> component can act both as an
          anchor as well as a button by specifying <OuiCode>href</OuiCode> or
          <OuiCode>onClick</OuiCode> respectively.
        </p>
      ),
      snippet: keyPadMenuItemButtonSnippet,
      demo: <KeyPadMenuItemButton />,
    },
    {
      title: 'Experimental item',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyPadBetaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: keyPadBetaHtml,
        },
      ],
      text: (
        <div>
          <p>
            If the item links to a module that is not GA (experimental, lab,
            etc), you can add a <OuiCode>betaBadgeLabel</OuiCode> and{' '}
            <OuiCode>betaBadgeTooltipContent</OuiCode> to the card and it will
            properly create and position an <strong>OuiBetaBadge</strong>.
          </p>
          <p>
            You can pass an <OuiCode>iconType</OuiCode> and the label will
            become the title.
          </p>
        </div>
      ),
      snippet: keyPadBetaSnippet,
      demo: <KeyPadBeta />,
    },
  ],
  playground: keyPadMenuItemConfig,
};
