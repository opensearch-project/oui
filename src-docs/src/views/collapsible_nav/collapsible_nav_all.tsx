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
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

import {
  OuiCollapsibleNav,
  OuiCollapsibleNavGroup,
} from '../../../../src/components/collapsible_nav';
import {
  OuiHeaderSectionItemButton,
  OuiHeaderLogo,
  OuiHeader,
} from '../../../../src/components/header';
import { OuiIcon } from '../../../../src/components/icon';
import { OuiButtonEmpty } from '../../../../src/components/button';
import { OuiPageTemplate } from '../../../../src/components/page';
import {
  OuiPinnableListGroup,
  OuiListGroupItem,
  OuiPinnableListGroupItemProps,
} from '../../../../src/components/list_group';
import { OuiFlexItem } from '../../../../src/components/flex';
import { OuiHorizontalRule } from '../../../../src/components/horizontal_rule';

import {
  DeploymentsGroup,
  KibanaNavLinks,
  SecurityGroup,
} from './collapsible_nav_list';
import { OuiShowFor } from '../../../../src/components/responsive';
import { OuiImage } from '../../../../src/components/image';
import contentSvg from '../../images/content.svg';
import { useExitPath } from '../../services/routing/routing';

const TopLinks: OuiPinnableListGroupItemProps[] = [
  {
    label: 'Home',
    iconType: 'home',
    isActive: true,
    'aria-current': true,
    onClick: () => {},
    pinnable: false,
  },
];
const KibanaLinks: OuiPinnableListGroupItemProps[] = KibanaNavLinks.map(
  (link) => {
    return {
      ...link,
      onClick: () => {},
    };
  }
);
const LearnLinks: OuiPinnableListGroupItemProps[] = [
  { label: 'Docs', onClick: () => {} },
  { label: 'Blogs', onClick: () => {} },
  { label: 'Webinars', onClick: () => {} },
  { label: 'Elastic.co', href: 'https://elastic.co' },
];

const CollapsibleNavAll = () => {
  const exitPath = useExitPath();
  const [navIsOpen, setNavIsOpen] = useState(true);
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem('nav2IsDocked'))) || false
  );

  /**
   * Accordion toggling
   */
  const [openGroups, setOpenGroups] = useState(
    JSON.parse(String(localStorage.getItem('openNavGroups'))) || [
      'Kibana',
      'Learn',
    ]
  );

  // Save which groups are open and which are not with state and local store
  const toggleAccordion = (isOpen: boolean, title?: string) => {
    if (!title) return;
    const itExists = openGroups.includes(title);
    if (isOpen) {
      if (itExists) return;
      openGroups.push(title);
    } else {
      const index = openGroups.indexOf(title);
      if (index > -1) {
        openGroups.splice(index, 1);
      }
    }
    setOpenGroups([...openGroups]);
    localStorage.setItem('openNavGroups', JSON.stringify(openGroups));
  };

  /**
   * Pinning
   */
  const [pinnedItems, setPinnedItems] = useState<
    OuiPinnableListGroupItemProps[]
  >(JSON.parse(String(localStorage.getItem('pinnedItems'))) || []);

  const addPin = (item: any) => {
    if (!item || find(pinnedItems, { label: item.label })) {
      return;
    }
    item.pinned = true;
    const newPinnedItems = pinnedItems ? pinnedItems.concat(item) : [item];
    setPinnedItems(newPinnedItems);
    localStorage.setItem('pinnedItems', JSON.stringify(newPinnedItems));
  };

  const removePin = (item: any) => {
    const pinIndex = findIndex(pinnedItems, { label: item.label });
    if (pinIndex > -1) {
      item.pinned = false;
      const newPinnedItems = pinnedItems;
      newPinnedItems.splice(pinIndex, 1);
      setPinnedItems([...newPinnedItems]);
      localStorage.setItem('pinnedItems', JSON.stringify(newPinnedItems));
    }
  };

  function alterLinksWithCurrentState(
    links: OuiPinnableListGroupItemProps[],
    showPinned = false
  ): OuiPinnableListGroupItemProps[] {
    return links.map((link) => {
      const { pinned, ...rest } = link;
      return {
        pinned: showPinned ? pinned : false,
        ...rest,
      };
    });
  }

  function addLinkNameToPinTitle(listItem: OuiPinnableListGroupItemProps) {
    return `Pin ${listItem.label} to top`;
  }

  function addLinkNameToUnpinTitle(listItem: OuiPinnableListGroupItemProps) {
    return `Unpin ${listItem.label}`;
  }

  const collapsibleNav = (
    <OuiCollapsibleNav
      id="guideCollapsibleNavAllExampleNav"
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
      {/* Dark deployments section */}
      <OuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        {DeploymentsGroup}
      </OuiFlexItem>

      {/* Shaded pinned section always with a home item */}
      <OuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        <OuiCollapsibleNavGroup
          background="light"
          className="oui-yScroll"
          style={{ maxHeight: '40vh' }}>
          <OuiPinnableListGroup
            aria-label="Pinned links" // A11y : Since this group doesn't have a visible `title` it should be provided an accessible description
            listItems={alterLinksWithCurrentState(TopLinks).concat(
              alterLinksWithCurrentState(pinnedItems, true)
            )}
            unpinTitle={addLinkNameToUnpinTitle}
            onPinClick={removePin}
            maxWidth="none"
            color="text"
            gutterSize="none"
            size="s"
          />
        </OuiCollapsibleNavGroup>
      </OuiFlexItem>

      <OuiHorizontalRule margin="none" />

      {/* BOTTOM */}
      <OuiFlexItem className="oui-yScroll">
        {/* Kibana section */}
        <OuiCollapsibleNavGroup
          title="Kibana"
          iconType="logoKibana"
          isCollapsible={true}
          initialIsOpen={openGroups.includes('Kibana')}
          onToggle={(isOpen: boolean) => toggleAccordion(isOpen, 'Kibana')}>
          <OuiPinnableListGroup
            aria-label="Kibana" // A11y : OuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={alterLinksWithCurrentState(KibanaLinks)}
            pinTitle={addLinkNameToPinTitle}
            onPinClick={addPin}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </OuiCollapsibleNavGroup>

        {/* Security callout */}
        {SecurityGroup}

        {/* Learn section */}
        <OuiCollapsibleNavGroup
          title="Learn"
          iconType="training"
          isCollapsible={true}
          initialIsOpen={openGroups.includes('Learn')}
          onToggle={(isOpen: boolean) => toggleAccordion(isOpen, 'Learn')}>
          <OuiPinnableListGroup
            aria-label="Learn" // A11y : OuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={alterLinksWithCurrentState(LearnLinks)}
            pinTitle={addLinkNameToPinTitle}
            onPinClick={addPin}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </OuiCollapsibleNavGroup>

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
                  'nav2IsDocked',
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

  const leftSectionItems = [
    collapsibleNav,
    <OuiHeaderLogo href={exitPath} iconType="logoOUI">
      Elastic
    </OuiHeaderLogo>,
  ];

  return (
    <>
      <OuiHeader
        position="fixed"
        sections={[
          {
            items: leftSectionItems,
            borders: 'right',
          },
          {
            items: [
              <OuiButtonEmpty href={exitPath} iconType="exit">
                Exit full screen
              </OuiButtonEmpty>,
            ],
          },
        ]}
      />

      <OuiPageTemplate template="centeredBody">
        <OuiImage size="fullWidth" alt="Fake paragraph" url={contentSvg} />
      </OuiPageTemplate>
    </>
  );
};

export default CollapsibleNavAll;
