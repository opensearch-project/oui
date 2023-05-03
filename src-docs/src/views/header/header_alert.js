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
  OuiAvatar,
  OuiBadge,
  OuiButtonEmpty,
  OuiFlexGroup,
  OuiFlexItem,
  OuiFlyout,
  OuiFlyoutBody,
  OuiFlyoutFooter,
  OuiFlyoutHeader,
  OuiHeader,
  OuiHeaderAlert,
  OuiHeaderLogo,
  OuiHeaderSection,
  OuiHeaderSectionItem,
  OuiHeaderSectionItemButton,
  OuiIcon,
  OuiLink,
  OuiPopover,
  OuiPopoverFooter,
  OuiPopoverTitle,
  OuiPortal,
  OuiSpacer,
  OuiSwitch,
  OuiText,
  OuiTitle,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

const HeaderUpdates = () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const alerts = [
    {
      title: 'Control access to features',
      text: 'Show or hide applications and features per space in Kibana.',
      action: <OuiLink href="">Learn about feature controls</OuiLink>,
      date: '1 May 2019',
      badge: <OuiBadge>7.1</OuiBadge>,
    },
    {
      title: 'Kibana 7.0 is turning heads',
      text:
        'Simplified navigation, responsive dashboards, dark mode… pick your favorite.',
      action: (
        <OuiLink
          target="_blank"
          external
          href="https://www.elastic.co/blog/kibana-7-0-0-released">
          Read the blog
        </OuiLink>
      ),
      date: '10 April 2019',
      badge: <OuiBadge color="hollow">7.0</OuiBadge>,
    },
    {
      title: 'Enter dark mode',
      text:
        'Kibana now supports the easy-on-the-eyes theme across the entire UI.',
      action: <OuiLink href="">Go to Advanced Settings</OuiLink>,
      date: '10 April 2019',
      badge: <OuiBadge color="hollow">7.0</OuiBadge>,
    },
    {
      title: 'Pixel-perfect Canvas is production ready',
      text: 'Your creative space for visualizing data awaits.',
      action: (
        <OuiLink
          target="_blank"
          external
          href="https://www.elastic.co/webinars/intro-to-canvas-a-new-way-to-tell-visual-stories-in-kibana">
          Watch the webinar
        </OuiLink>
      ),
      date: '26 March 2019',
      badge: <OuiBadge color="hollow">6.7</OuiBadge>,
    },
    {
      title: '6.7 release notes',
      text: 'Stay up-to-date on the latest and greatest features.',
      action: (
        <OuiLink
          target="_blank"
          external
          href="https://www.elastic.co/guide/en/kibana/6.7/release-notes-6.7.0.html">
          Check out the docs
        </OuiLink>
      ),
      date: '26 March 2019',
      badge: <OuiBadge color="hollow">6.7</OuiBadge>,
    },
    {
      title: 'Rollups made simple in Kibana',
      text:
        'Save space and preserve the integrity of your data directly in the UI.',
      action: (
        <OuiLink
          target="_blank"
          external
          href="https://www.elastic.co/blog/how-to-create-manage-and-visualize-elasticsearch-rollup-data-in-kibana">
          Read the blog
        </OuiLink>
      ),
      date: '10 January 2019',
      badge: <OuiBadge color="hollow">6.5</OuiBadge>,
    },
  ];

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

  const closePopover = () => {
    setIsPopoverVisible(false);
  };

  const showFlyout = () => {
    setIsFlyoutVisible(!isFlyoutVisible);
  };

  const showPopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  const bellButton = (
    <OuiHeaderSectionItemButton
      aria-controls="headerFlyoutNewsFeed"
      aria-expanded={isFlyoutVisible}
      aria-haspopup="true"
      aria-label={'Alerts feed: Updates available'}
      onClick={() => showFlyout()}
      notification={true}>
      <OuiIcon type="bell" />
    </OuiHeaderSectionItemButton>
  );

  const cheerButton = (
    <OuiHeaderSectionItemButton
      aria-controls="headerPopoverNewsFeed"
      aria-expanded={isPopoverVisible}
      aria-haspopup="true"
      aria-label={"News feed: Updates available'"}
      onClick={showPopover}
      notification={6}>
      <OuiIcon type="cheer" />
    </OuiHeaderSectionItemButton>
  );

  const flyout = (
    <OuiPortal>
      <OuiFlyout
        onClose={closeFlyout}
        size="s"
        id="headerFlyoutNewsFeed"
        aria-labelledby="flyoutSmallTitle">
        <OuiFlyoutHeader hasBorder>
          <OuiTitle size="s">
            <h2 id="flyoutSmallTitle">What&apos;s new</h2>
          </OuiTitle>
        </OuiFlyoutHeader>
        <OuiFlyoutBody>
          {alerts.map((alert, i) => (
            <OuiHeaderAlert
              key={`alert-${i}`}
              title={alert.title}
              action={alert.action}
              text={alert.text}
              date={alert.date}
              badge={alert.badge}
            />
          ))}
        </OuiFlyoutBody>
        <OuiFlyoutFooter>
          <OuiFlexGroup justifyContent="spaceBetween" alignItems="center">
            <OuiFlexItem grow={false}>
              <OuiButtonEmpty
                iconType="cross"
                onClick={closeFlyout}
                flush="left">
                Close
              </OuiButtonEmpty>
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiText color="subdued" size="s">
                <p>Version 7.0</p>
              </OuiText>
            </OuiFlexItem>
          </OuiFlexGroup>
        </OuiFlyoutFooter>
      </OuiFlyout>
    </OuiPortal>
  );

  const popover = (
    <OuiPopover
      id="headerPopoverNewsFeed"
      ownFocus
      repositionOnScroll
      button={cheerButton}
      isOpen={isPopoverVisible}
      closePopover={closePopover}
      panelPaddingSize="none">
      <OuiPopoverTitle paddingSize="s">What&apos;s new</OuiPopoverTitle>
      <div style={{ maxHeight: '40vh', overflowY: 'auto', padding: 4 }}>
        <OuiSpacer size="s" />
        {alerts.map((alert, i) => (
          <OuiHeaderAlert
            key={`alert-${i}`}
            title={alert.title}
            action={alert.action}
            text={alert.text}
            date={alert.date}
            badge={alert.badge}
          />
        ))}
      </div>
      <OuiPopoverFooter paddingSize="s">
        <OuiText color="subdued" size="s">
          <p>Version 7.0</p>
        </OuiText>
      </OuiPopoverFooter>
    </OuiPopover>
  );

  return (
    <>
      {bellButton}
      {popover}
      {isFlyoutVisible && flyout}
    </>
  );
};

const HeaderUserMenu = () => {
  const id = htmlIdGenerator()();
  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const button = (
    <OuiHeaderSectionItemButton
      aria-controls={id}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuButtonClick}>
      <OuiAvatar name="John Username" size="s" />
    </OuiHeaderSectionItemButton>
  );

  return (
    <OuiPopover
      id={id}
      repositionOnScroll
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="none">
      <div style={{ width: 320 }}>
        <OuiFlexGroup
          gutterSize="m"
          className="ouiHeaderProfile"
          responsive={false}>
          <OuiFlexItem grow={false}>
            <OuiAvatar name="John Username" size="xl" />
          </OuiFlexItem>

          <OuiFlexItem>
            <OuiText>
              <p>John Username</p>
            </OuiText>

            <OuiSpacer size="m" />

            <OuiFlexGroup>
              <OuiFlexItem>
                <OuiFlexGroup justifyContent="spaceBetween">
                  <OuiFlexItem grow={false}>
                    <OuiLink>Edit profile</OuiLink>
                  </OuiFlexItem>

                  <OuiFlexItem grow={false}>
                    <OuiLink>Log out</OuiLink>
                  </OuiFlexItem>
                </OuiFlexGroup>
              </OuiFlexItem>
            </OuiFlexGroup>
          </OuiFlexItem>
        </OuiFlexGroup>
      </div>
    </OuiPopover>
  );
};

export default () => {
  const [position, setPosition] = useState('static');
  const [theme, setTheme] = useState('default');

  return (
    <>
      <OuiFlexGroup alignItems="center" gutterSize="m">
        <OuiFlexItem grow={false}>
          <OuiSwitch
            label={'Make header fixed position'}
            checked={position === 'fixed'}
            onChange={(e) => setPosition(e.target.checked ? 'fixed' : 'static')}
          />
        </OuiFlexItem>

        <OuiFlexItem grow={false}>
          <OuiSwitch
            label={'Change theme to dark'}
            checked={theme === 'dark'}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'default')}
          />
        </OuiFlexItem>
      </OuiFlexGroup>

      <OuiSpacer />

      <OuiHeader position={position} theme={theme}>
        <OuiHeaderSection grow={false}>
          <OuiHeaderSectionItem border="right">
            <OuiHeaderLogo>OpenSearch</OuiHeaderLogo>
          </OuiHeaderSectionItem>
        </OuiHeaderSection>
        <OuiHeaderSection side="right">
          <OuiHeaderSectionItem>
            <HeaderUpdates />
          </OuiHeaderSectionItem>
          <OuiHeaderSectionItem>
            <HeaderUserMenu />
          </OuiHeaderSectionItem>
        </OuiHeaderSection>
      </OuiHeader>
    </>
  );
};
