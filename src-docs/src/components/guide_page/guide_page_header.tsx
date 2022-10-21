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

// @ts-ignore Not TS
import { CodeSandboxLink } from '../../components/codesandbox/link';
import logoOUI from '../../images/logo-oui.svg';
import {
  GuideThemeSelector,
  GuideSketchLink,
  GuideFigmaLink,
} from '../guide_theme_selector';

const pkg = require('../../../../package.json');

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'version-selector': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export type GuidePageHeaderProps = {
  onToggleLocale: () => {};
  selectedLocale: string;
};

export const GuidePageHeader: React.FunctionComponent<GuidePageHeaderProps> = ({
  onToggleLocale,
  selectedLocale,
}) => {
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);

  function renderLogo() {
    return (
      <OuiHeaderLogo iconType={logoOUI} href="#/" aria-label="OUI home">
        OpenSearch UI
      </OuiHeaderLogo>
    );
  }

  function renderVersion() {
    return <version-selector selected={pkg.version} />;
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

  function renderCodeSandbox() {
    const label = 'Codesandbox';
    return isMobileSize ? (
      <CodeSandboxLink key="codesandbox">
        <OuiButtonEmpty size="s" flush="both" iconType="logoCodesandbox">
          {label}
        </OuiButtonEmpty>
      </CodeSandboxLink>
    ) : (
      <OuiToolTip content="Codesandbox" key="codesandbox">
        <CodeSandboxLink>
          <OuiHeaderSectionItemButton aria-label="Codesandbox">
            <OuiIcon type="logoCodesandbox" aria-hidden="true" />
          </OuiHeaderSectionItemButton>
        </CodeSandboxLink>
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
        <div className="guideOptionsPopover">
          {renderGithub()}
          <GuideSketchLink />
          <GuideFigmaLink />
          {renderCodeSandbox()}
        </div>
      </OuiPopover>
    );
  }

  const rightSideItems = isMobileSize
    ? [
        <GuideThemeSelector
          onToggleLocale={onToggleLocale}
          selectedLocale={selectedLocale}
        />,
        renderMobileMenu(),
      ]
    : [
        <GuideThemeSelector
          onToggleLocale={onToggleLocale}
          selectedLocale={selectedLocale}
        />,
        renderGithub(),
        <GuideSketchLink key="sketch" />,
        <GuideFigmaLink key="figma" />,
        renderCodeSandbox(),
      ];

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
