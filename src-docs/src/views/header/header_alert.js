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
      title: 'New release coming soon',
      text: 'Lots of requested features',
      action: (
        <OuiLink href="https://opensearch.org/blog">Review the roadmap</OuiLink>
      ),
      date: '20 Jul 2023',
      badge: <OuiBadge>2.10</OuiBadge>,
    },
    {
      title: 'OpenSearch 2.8 is here!',
      text:
        'OpenSearch 2.8.0 is now available, with a host of new features and enhancements and experimental functionality that are sure to generate excitement within the community!',
      action: (
        <OuiLink target="_blank" external href="https://opensearch.org/blog">
          Read the blog
        </OuiLink>
      ),
      date: '06 Jun 2023',
      badge: <OuiBadge color="hollow">2.8</OuiBadge>,
    },
    {
      title: 'Query your data across OpenSearch clusters with PPL',
      text:
        'This release expands the OpenSearch observability toolkit, including cross-cluster support for queries using Piped Processing Language (PPL).',
      action: (
        <OuiLink href="https://opensearch.org/blog">Check out the docs</OuiLink>
      ),
      date: '06 Jun 2023',
      badge: <OuiBadge color="hollow">2.8</OuiBadge>,
    },
    {
      title: 'Simplify index management tasks',
      text:
        'Now, operations like refreshing the index to make the latest data available for search are point-and-click.',
      action: (
        <OuiLink target="_blank" external href="https://opensearch.org/blog">
          Check out the docs
        </OuiLink>
      ),
      date: '06 Jun 2023',
      badge: <OuiBadge color="hollow">2.8</OuiBadge>,
    },
    {
      title: 'Augment search applications with experimental functionality',
      text:
        'For search application builders, this functionality unlocks the ability to integrate complex chains of search processors within OpenSearch with no additional processing required by end users.',
      action: (
        <OuiLink target="_blank" external href="https://opensearch.org/blog">
          Leave feeback
        </OuiLink>
      ),
      date: '06 Jun 2023',
      badge: <OuiBadge color="hollow">2.8</OuiBadge>,
    },
    {
      title: 'Enhancements to existing features',
      text:
        'This release includes a range of enhancements to existing features. ',
      action: (
        <OuiLink target="_blank" external href="https://opensearch.org/blog">
          Check out the release notes
        </OuiLink>
      ),
      date: '06 Jun 2023',
      badge: <OuiBadge color="hollow">2.8</OuiBadge>,
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
