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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Uncomment to use in consuming apps
// import theme from '@opensearch-project/oui/dist/oui_theme_light.json';

import {
  OuiAvatar,
  OuiBadge,
  OuiButton,
  OuiCollapsibleNav,
  OuiCollapsibleNavGroup,
  OuiFlexItem,
  OuiFlyout,
  OuiFlyoutBody,
  OuiFlyoutHeader,
  OuiHeader,
  OuiHeaderLink,
  OuiHeaderLinks,
  OuiHeaderLogo,
  OuiHeaderSectionItemButton,
  OuiIcon,
  OuiListGroupItem,
  OuiPageTemplate,
  OuiPopover,
  OuiPortal,
  OuiShowFor,
  OuiText,
  OuiTitle,
  OuiSelectableTemplateSitewide,
  OuiSelectableMessage,
} from '../../../../src/components';
import { ExampleContext } from '../../services';

export default ({ theme }) => {
  useEffect(() => {
    document.body.classList.add('ouiBody--headerIsFixed--double');

    return () => {
      document.body.classList.remove('ouiBody--headerIsFixed--double');
    };
  }, []);

  /**
   * Collapsible Nav
   */
  const [navIsOpen, setNavIsOpen] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false
  );
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false
  );
  const collapsibleNav = (
    <OuiCollapsibleNav
      id="guideHeaderCollapsibleNavExample"
      aria-label="Main navigation"
      isOpen={navIsOpen}
      isDocked={navIsDocked}
      button={
        <OuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}>
          <OuiIcon type={'menu'} size="m" aria-hidden="true" />
        </OuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}>
      <OuiFlexItem className="oui-yScroll">
        {/* Docs callout */}
        <OuiCollapsibleNavGroup title="OuiCollapsibleNav">
          <OuiText size="s" color="subdued" style={{ padding: '0 8px 8px' }}>
            <p>
              Please see the component page for{' '}
              <Link to="/navigation/collapsible-nav">
                <strong>OuiCollapsibleNav</strong>
              </Link>{' '}
              on how to configure your navigation.
            </p>
          </OuiText>
        </OuiCollapsibleNavGroup>
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        {/* Docking button only for larger screens that can support it*/}
        <OuiShowFor sizes={['l', 'xl']}>
          <OuiCollapsibleNavGroup>
            <OuiListGroupItem
              size="xs"
              color="subdued"
              label={`${navIsDocked ? 'Undock' : 'Dock'} navigation`}
              onClick={() => {
                setNavIsDocked(!navIsDocked);
                localStorage.setItem(
                  'navIsDocked',
                  JSON.stringify(!navIsDocked)
                );
              }}
              iconType={navIsDocked ? 'lock' : 'lockOpen'}
            />
          </OuiCollapsibleNavGroup>
        </OuiShowFor>
      </OuiFlexItem>
    </OuiCollapsibleNav>
  );

  /**
   * Header Alerts
   */
  const [isAlertFlyoutVisible, setIsAlertFlyoutVisible] = useState(false);
  const headerAlerts = (
    <OuiPortal>
      <OuiFlyout
        onClose={() => setIsAlertFlyoutVisible(false)}
        size="s"
        id="guideHeaderAlertExample"
        aria-labelledby="guideHeaderAlertExampleTitle">
        <OuiFlyoutHeader hasBorder>
          <OuiTitle size="s">
            <h2 id="guideHeaderAlertExampleTitle">OuiHeaderAlert</h2>
          </OuiTitle>
        </OuiFlyoutHeader>
        <OuiFlyoutBody>
          <OuiText size="s" color="subdued">
            <p>
              Please see the component page for{' '}
              <Link to="/layout/header">
                <strong>OuiHeaderAlert</strong>
              </Link>{' '}
              on how to configure your alerts.
            </p>
          </OuiText>
        </OuiFlyoutBody>
      </OuiFlyout>
    </OuiPortal>
  );

  /**
   * User Menu
   */
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const userMenu = (
    <OuiPopover
      id="guideHeaderUserMenuExample"
      repositionOnScroll
      button={
        <OuiHeaderSectionItemButton
          aria-controls="guideHeaderUserMenuExample"
          aria-expanded={isUserMenuVisible}
          aria-haspopup="true"
          aria-label="User menu"
          onClick={() => setIsUserMenuVisible(!isUserMenuVisible)}>
          <OuiAvatar name="A. User" size="s" />
        </OuiHeaderSectionItemButton>
      }
      isOpen={isUserMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsUserMenuVisible(false)}>
      <div style={{ width: 320 }}>
        <OuiText size="s" color="subdued">
          <p>
            Please see the component page for{' '}
            <Link to="/layout/header">
              <strong>OuiHeader</strong>
            </Link>{' '}
            on how to configure your user menu.
          </p>
        </OuiText>
      </div>
    </OuiPopover>
  );

  /**
   * Spaces Menu
   */
  const [isSpacesMenuVisible, setIsSpacesMenuVisible] = useState(false);
  const spacesMenu = (
    <OuiPopover
      id="guideHeaderSpacesMenuExample"
      repositionOnScroll
      button={
        <OuiHeaderSectionItemButton
          aria-controls="guideHeaderSpacesMenuExample"
          aria-expanded={isSpacesMenuVisible}
          aria-haspopup="true"
          aria-label="Spaces menu"
          onClick={() => setIsSpacesMenuVisible(!isSpacesMenuVisible)}>
          <OuiAvatar type="space" name="Default Space" size="s" />
        </OuiHeaderSectionItemButton>
      }
      isOpen={isSpacesMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsSpacesMenuVisible(false)}>
      <div style={{ width: 320 }}>
        <OuiText size="s" color="subdued">
          <p>
            Please see the component page for{' '}
            <Link to="/layout/header">
              <strong>OuiHeader</strong>
            </Link>{' '}
            on how to configure your spaces menu.
          </p>
        </OuiText>
      </div>
    </OuiPopover>
  );

  /**
   * Deployment Menu
   */
  const [isDeploymentMenuVisible, setIsDeploymentMenuVisible] = useState(false);
  const deploymentMenu = (
    <OuiPopover
      id="guideHeaderDeploymentMenuExample"
      repositionOnScroll
      button={
        <OuiBadge
          color={theme.ouiColorDarkestShade}
          iconType="arrowDown"
          iconSide="right"
          aria-controls="guideHeaderDeploymentMenuExample"
          aria-expanded={isDeploymentMenuVisible}
          aria-haspopup="true"
          onClickAriaLabel="Current deployment: Production logs. Click to open deployment menu."
          onClick={() => setIsDeploymentMenuVisible(!isDeploymentMenuVisible)}>
          Production logs
        </OuiBadge>
      }
      isOpen={isDeploymentMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsDeploymentMenuVisible(false)}>
      <OuiText size="s" color="subdued">
        <p>Deployment menu pattern TBD</p>
      </OuiText>
    </OuiPopover>
  );

  /**
   * Sitewide search
   */
  const search = (
    <OuiSelectableTemplateSitewide
      options={[]}
      searchProps={{
        append: '⌘K',
        compressed: true,
      }}
      popoverButton={
        <OuiHeaderSectionItemButton aria-label="Sitewide search">
          <OuiIcon type="search" size="m" />
        </OuiHeaderSectionItemButton>
      }
      popoverButtonBreakpoints={['xs', 's']}
      popoverProps={{
        repositionOnScroll: true, // Necessary when placing search in a fixed component
      }}
      emptyMessage={
        <OuiSelectableMessage style={{ minHeight: 300 }}>
          <p>
            Please see the component page for{' '}
            <Link to="/forms/selectable">
              <strong>OuiSelectableTemplateSitewide</strong>
            </Link>{' '}
            on how to configure your sitewide search.
          </p>
        </OuiSelectableMessage>
      }
    />
  );

  return (
    <>
      <OuiHeader
        theme="dark"
        position="fixed"
        sections={[
          {
            items: [
              <OuiHeaderLogo
                iconType="logoOpenSearch"
                href="https://oui.opensearch.org/latest/">
                OpenSearch
              </OuiHeaderLogo>,
              deploymentMenu,
            ],
            borders: 'none',
          },
          {
            items: [<OuiShowFor sizes={['m', 'l', 'xl']}>{search}</OuiShowFor>],
            borders: 'none',
          },
          {
            items: [
              <OuiShowFor sizes={['xs', 's']}>{search}</OuiShowFor>,
              <OuiHeaderSectionItemButton
                notification={true}
                aria-label="Notifications: Updates available"
                onClick={() => setIsAlertFlyoutVisible(!isAlertFlyoutVisible)}>
                <OuiIcon type="cheer" size="m" />
              </OuiHeaderSectionItemButton>,
              userMenu,
            ],
            borders: 'none',
          },
        ]}
      />
      <OuiHeader
        position="fixed"
        sections={[
          {
            items: [collapsibleNav, spacesMenu],
            breadcrumbs: [
              {
                text: 'Management',
                onClick: () => {},
              },
              {
                text: 'Users',
              },
            ],
            borders: 'right',
          },
          {
            items: [
              <OuiHeaderLinks
                popoverProps={{
                  repositionOnScroll: true, // Necessary when placing search in a fixed component
                }}>
                <OuiHeaderLink color="primary">Share</OuiHeaderLink>
                <OuiHeaderLink color="primary">Clone</OuiHeaderLink>
                <ExampleContext.Consumer>
                  {({ parentPath }) => (
                    <OuiButton
                      iconType="exit"
                      style={{ minWidth: 80 }}
                      size="s"
                      color="primary"
                      href={`#${parentPath}`}>
                      Exit full screen
                    </OuiButton>
                  )}
                </ExampleContext.Consumer>
              </OuiHeaderLinks>,
            ],
          },
        ]}
      />

      {isAlertFlyoutVisible ? headerAlerts : null}
      <OuiPageTemplate template="empty" />
    </>
  );
};
