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

import '../../assets/version-selector';

import {
  OuiHeaderLogo,
  OuiHeader,
  OuiHeaderSectionItemButton,
} from '../../../../src/components/header';
import { OuiIcon } from '../../../../src/components/icon';
import { OuiToolTip } from '../../../../src/components/tool_tip';
import { OuiPopover } from '../../../../src/components/popover';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks';
import { OuiButtonEmpty } from '../../../../src/components/button';

import logoOUI from '../../images/logo-oui.svg';
import { GuideThemeSelector } from '../guide_theme_selector';

const pkg = require('../../../../package.json');

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'version-selector': VersionSelectorAttributes;
    }

    interface VersionSelectorAttributes
      extends React.HTMLAttributes<HTMLElement> {
      selected: string;
    }
  }
}

export const GuidePageHeader: React.FunctionComponent<{}> = () => {
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);

  function renderLogo() {
    return (
      <OuiHeaderLogo iconType={logoOUI} href="#/" aria-label="OUI home">
        OpenSearch UI
      </OuiHeaderLogo>
    );
  }

  function renderVersion() {
    const trimVersion = pkg.version.replace(/^(\d+\.\d+)\..*/, '$1');
    return <version-selector selected={trimVersion} />;
  }

  function renderGithub() {
    const href = 'https://github.com/opensearch-project/oui';
    const label = 'OUI GitHub repo';
    return isMobileSize ? (
      <OuiButtonEmpty size="s" flush="both" iconType="logoGithub" href={href}>
        {label}
      </OuiButtonEmpty>
    ) : (
      <OuiToolTip content="Github">
        <OuiHeaderSectionItemButton
          aria-label={label}
          // @ts-ignore TODO: FIX
          href={href}>
          <OuiIcon type="logoGithub" aria-hidden="true" />
        </OuiHeaderSectionItemButton>
      </OuiToolTip>
    );
  }

  const [mobilePopoverIsOpen, setMobilePopoverIsOpen] = useState(false);

  function renderMobileMenu() {
    const button = (
      <OuiHeaderSectionItemButton
        aria-label="Open OUI options menu"
        onClick={() => setMobilePopoverIsOpen((isOpen) => !isOpen)}>
        <OuiIcon type="apps" aria-hidden="true" />
      </OuiHeaderSectionItemButton>
    );

    return (
      <OuiPopover
        id="guidePageChromeThemePopover"
        button={button}
        isOpen={mobilePopoverIsOpen}
        closePopover={() => setMobilePopoverIsOpen(false)}>
        <div className="guideOptionsPopover">{renderGithub()}</div>
      </OuiPopover>
    );
  }

  const rightSideItems = isMobileSize
    ? [<GuideThemeSelector />, renderMobileMenu()]
    : [<GuideThemeSelector />, renderGithub()];

  return (
    <OuiHeader
      position="fixed"
      theme="dark"
      sections={[
        {
          items: [renderLogo(), renderVersion()],
          borders: 'none',
        },
        {
          items: rightSideItems,
          borders: 'none',
        },
      ]}
    />
  );
};
