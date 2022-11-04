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
import { Link } from 'react-router-dom';

import {
  OuiAvatar,
  OuiButton,
  OuiFlexGroup,
  OuiFlexItem,
  OuiHeader,
  OuiHeaderBreadcrumbs,
  OuiHeaderLogo,
  OuiHeaderSection,
  OuiHeaderSectionItem,
  OuiHeaderSectionItemButton,
  OuiIcon,
  OuiKeyPadMenu,
  OuiKeyPadMenuItem,
  OuiLink,
  OuiPopover,
  OuiPopoverFooter,
  OuiPopoverTitle,
  OuiSelectable,
  OuiSelectableMessage,
  OuiSelectableTemplateSitewide,
  OuiSpacer,
  OuiText,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const renderLogo = () => (
    <OuiHeaderLogo
      iconType="logoElastic"
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label="Go to home page"
    />
  );

  const renderBreadcrumbs = () => {
    const breadcrumbs = [
      {
        text: 'Management',
        href: '#',
        onClick: (e) => {
          e.preventDefault();
        },
        'data-test-subj': 'breadcrumbsAnimals',
        className: 'customClass',
      },
      {
        text: 'Truncation test is here for a really long item',
        href: '#',
        onClick: (e) => {
          e.preventDefault();
        },
      },
      {
        text: 'Hidden',
        href: '#',
        onClick: (e) => {
          e.preventDefault();
        },
      },
      {
        text: 'Users',
        href: '#',
        onClick: (e) => {
          e.preventDefault();
        },
      },
      {
        text: 'Create',
      },
    ];

    return (
      <OuiHeaderBreadcrumbs
        aria-label="Header breadcrumbs example"
        breadcrumbs={breadcrumbs}
      />
    );
  };

  const search = (
    <OuiSelectableTemplateSitewide
      options={[]}
      searchProps={{
        compressed: true,
      }}
      popoverButton={
        <OuiHeaderSectionItemButton aria-label="Sitewide search">
          <OuiIcon type="search" size="m" />
        </OuiHeaderSectionItemButton>
      }
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
    <OuiHeader>
      <OuiHeaderSection grow={false}>
        <OuiHeaderSectionItem border="right">
          {renderLogo()}
        </OuiHeaderSectionItem>
        <OuiHeaderSectionItem border="right">
          <HeaderSpacesMenu />
        </OuiHeaderSectionItem>
      </OuiHeaderSection>

      {renderBreadcrumbs()}

      <OuiHeaderSection side="right">
        <OuiHeaderSectionItem>{search}</OuiHeaderSectionItem>

        <OuiHeaderSectionItem>
          <HeaderUserMenu />
        </OuiHeaderSectionItem>

        <OuiHeaderSectionItem>
          <HeaderAppMenu />
        </OuiHeaderSectionItem>
      </OuiHeaderSection>
    </OuiHeader>
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
      <OuiAvatar name="J. Username" size="s" />
    </OuiHeaderSectionItemButton>
  );

  return (
    <OuiPopover
      id={id}
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
            <OuiAvatar name="J. Username" size="xl" />
          </OuiFlexItem>

          <OuiFlexItem>
            <OuiText>
              <p>J. Username</p>
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

const HeaderSpacesMenu = () => {
  const id = htmlIdGenerator()();
  const spacesValues = [
    {
      label: 'Sales team',
      prepend: <OuiAvatar type="space" name="Sales Team" size="s" />,
      checked: 'on',
    },
    {
      label: 'Engineering',
      prepend: <OuiAvatar type="space" name="Engineering" size="s" />,
    },
    {
      label: 'Security',
      prepend: <OuiAvatar type="space" name="Security" size="s" />,
    },
    {
      label: 'Default',
      prepend: <OuiAvatar type="space" name="Default" size="s" />,
    },
  ];

  const additionalSpaces = [
    {
      label: 'Sales team 2',
      prepend: <OuiAvatar type="space" name="Sales Team 2" size="s" />,
    },
    {
      label: 'Engineering 2',
      prepend: <OuiAvatar type="space" name="Engineering 2" size="s" />,
    },
    {
      label: 'Security 2',
      prepend: <OuiAvatar type="space" name="Security 2" size="s" />,
    },
    {
      label: 'Default 2',
      prepend: <OuiAvatar type="space" name="Default 2" size="s" />,
    },
  ];

  const [spaces, setSpaces] = useState(spacesValues);
  const [selectedSpace, setSelectedSpace] = useState(
    spaces.filter((option) => option.checked)[0]
  );
  const [isOpen, setIsOpen] = useState(false);

  const isListExtended = () => {
    return spaces.length > 4;
  };

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  const onChange = (options) => {
    setSpaces(options);
    setSelectedSpace(options.filter((option) => option.checked)[0]);
    setIsOpen(false);
  };

  const addMoreSpaces = () => {
    setSpaces(spaces.concat(additionalSpaces));
  };

  const button = (
    <OuiHeaderSectionItemButton
      aria-controls={id}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Spaces menu"
      onClick={onMenuButtonClick}>
      {selectedSpace.prepend}
    </OuiHeaderSectionItemButton>
  );

  return (
    <OuiPopover
      id={id}
      button={button}
      isOpen={isOpen}
      anchorPosition="downLeft"
      closePopover={closePopover}
      panelPaddingSize="none">
      <OuiSelectable
        searchable={isListExtended()}
        searchProps={{
          placeholder: 'Find a space',
          compressed: true,
        }}
        options={spaces}
        singleSelection="always"
        style={{ width: 300 }}
        onChange={onChange}
        listProps={{
          rowHeight: 40,
          showIcons: false,
        }}>
        {(list, search) => (
          <>
            <OuiPopoverTitle paddingSize="s">
              {search || 'Your spaces'}
            </OuiPopoverTitle>
            {list}
            <OuiPopoverFooter paddingSize="s">
              <OuiButton
                size="s"
                fullWidth
                onClick={addMoreSpaces}
                disabled={isListExtended()}>
                Add more spaces
              </OuiButton>
            </OuiPopoverFooter>
          </>
        )}
      </OuiSelectable>
    </OuiPopover>
  );
};

const HeaderAppMenu = () => {
  const idGenerator = htmlIdGenerator();
  const popoverId = idGenerator('popover');
  const keypadId = idGenerator('keypad');

  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const button = (
    <OuiHeaderSectionItemButton
      aria-controls={keypadId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Apps menu with 1 new app"
      notification="1"
      onClick={onMenuButtonClick}>
      <OuiIcon type="apps" size="m" />
    </OuiHeaderSectionItemButton>
  );

  return (
    <OuiPopover
      id={popoverId}
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}>
      <OuiKeyPadMenu id={keypadId} style={{ width: 288 }}>
        <OuiKeyPadMenuItem label="Discover">
          <OuiIcon type="discoverApp" size="l" />
        </OuiKeyPadMenuItem>

        <OuiKeyPadMenuItem label="Dashboard">
          <OuiIcon type="dashboardApp" size="l" />
        </OuiKeyPadMenuItem>

        <OuiKeyPadMenuItem label="Dev Tools">
          <OuiIcon type="devToolsApp" size="l" />
        </OuiKeyPadMenuItem>

        <OuiKeyPadMenuItem label="Machine Learning">
          <OuiIcon type="machineLearningApp" size="l" />
        </OuiKeyPadMenuItem>

        <OuiKeyPadMenuItem label="Graph">
          <OuiIcon type="graphApp" size="l" />
        </OuiKeyPadMenuItem>

        <OuiKeyPadMenuItem label="Visualize">
          <OuiIcon type="visualizeApp" size="l" />
        </OuiKeyPadMenuItem>

        <OuiKeyPadMenuItem label="Timelion" betaBadgeLabel="Beta">
          <OuiIcon type="timelionApp" size="l" />
        </OuiKeyPadMenuItem>
      </OuiKeyPadMenu>
    </OuiPopover>
  );
};
