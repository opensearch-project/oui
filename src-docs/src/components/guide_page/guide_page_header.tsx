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

import { GuideThemeSelector } from '../guide_theme_selector';
import { GuideVersionSelector } from '../guide_version_selector';
import figmaLogo from '../../images/logo-figma.svg';

const pkg = require('../../../../package.json');

export const GuidePageHeader: React.FunctionComponent<{}> = () => {
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);

  function renderLogo() {
    return (
      <OuiHeaderLogo iconType="logoOpenSearch" href="#/" aria-label="OUI home">
        OpenSearch UI
      </OuiHeaderLogo>
    );
  }

  function renderVersion() {
    const trimVersion = pkg.version.replace(/^(\d+\.\d+)\..*/, '$1');
    return <GuideVersionSelector selected={trimVersion} />;
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
        <OuiHeaderSectionItemButton aria-label={label} href={href}>
          <OuiIcon type="logoGithub" aria-hidden="true" />
        </OuiHeaderSectionItemButton>
      </OuiToolTip>
    );
  }

  function renderFigma() {
    const href = 'https://www.figma.com/community/file/1319043629276905995';
    const label = 'OUI Figma component library';
    return isMobileSize ? (
      <OuiButtonEmpty size="s" flush="both" iconType={figmaLogo} href={href}>
        {label}
      </OuiButtonEmpty>
    ) : (
      <OuiToolTip content="Figma Component Library">
        <OuiHeaderSectionItemButton aria-label={label} href={href}>
          <OuiIcon type={figmaLogo} aria-hidden="true" />
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
        <div className="guideOptionsPopover">{renderFigma()}</div>
      </OuiPopover>
    );
  }

  const rightSideItems = isMobileSize
    ? [<GuideThemeSelector />, renderMobileMenu()]
    : [<GuideThemeSelector />, renderGithub(), renderFigma()];

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
