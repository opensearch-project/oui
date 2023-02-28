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
  OuiListGroupItem,
  OuiListGroup,
} from '../../../../src/components/list_group';
import { OuiFlexItem } from '../../../../src/components/flex';

import {
  ManagementLinks,
  OpenSearchDashboardsLinks,
  OpenSearchPluginLinks,
} from './collapsible_nav_list';
import { OuiShowFor } from '../../../../src/components/responsive';
import { OuiImage } from '../../../../src/components/image';
import contentSvg from '../../images/content.svg';
import { useExitPath } from '../../services/routing/routing';

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
      'OpenSearch Dashboards',
      'OpenSearch Plugins',
      'Management',
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
      {/* BOTTOM */}
      <OuiFlexItem className="oui-yScroll">
        {/* OpenSearch Dashboards section */}
        <OuiCollapsibleNavGroup
          title="OpenSearch Dashboards"
          iconType="logoOpenSearch"
          isCollapsible={true}
          initialIsOpen={openGroups.includes('OpenSearch Dashboards')}
          onToggle={(isOpen: boolean) =>
            toggleAccordion(isOpen, 'OpenSearch Dashboards')
          }>
          <OuiListGroup
            aria-label="OpenSearch Dashboards" // A11y : OuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={OpenSearchDashboardsLinks}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </OuiCollapsibleNavGroup>
        <OuiCollapsibleNavGroup
          title="OpenSearch Plugins"
          isCollapsible={true}
          initialIsOpen={openGroups.includes('OpenSearch Plugins')}
          onToggle={(isOpen: boolean) =>
            toggleAccordion(isOpen, 'OpenSearch Plugins')
          }>
          <OuiListGroup
            aria-label="OpenSearch Plugins" // A11y : OuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={OpenSearchPluginLinks}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </OuiCollapsibleNavGroup>

        <OuiCollapsibleNavGroup
          title="Management"
          isCollapsible={true}
          initialIsOpen={openGroups.includes('Management')}
          onToggle={(isOpen: boolean) => toggleAccordion(isOpen, 'Management')}>
          <OuiListGroup
            aria-label="Management" // A11y : OuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={ManagementLinks}
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
    <OuiHeaderLogo href={exitPath} iconType="logoOpenSearch">
      OpenSearch UI
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
