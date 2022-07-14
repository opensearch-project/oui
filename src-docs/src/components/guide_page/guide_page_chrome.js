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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  OuiFieldSearch,
  OuiFlexGroup,
  OuiFlexItem,
  OuiSideNav,
  OuiPageSideBar,
  OuiText,
} from '../../../../src/components';

import { OuiHighlight } from '../../../../src/components/highlight';
import { OuiBadge } from '../../../../src/components/badge';

export class GuidePageChrome extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isSideNavOpenOnMobile: false,
      isPopoverOpen: false,
    };
  }

  componentDidMount = () => {
    this._isMounted = true;

    this.scrollNavSectionIntoViewSync();
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  toggleOpenOnMobile = () => {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
    });
  };

  onSearchChange = (event) => {
    this.setState({
      search: event.target.value,
      isSideNavOpenOnMobile: event.target.value !== '',
    });
  };

  scrollNavSectionIntoViewSync = () => {
    // wait a bit for react to blow away and re-create the DOM
    // then scroll the selected nav section into view
    const selectedButton = document.querySelector(
      '.ouiSideNavItemButton-isSelected'
    );
    if (selectedButton) {
      let root = selectedButton.parentNode;

      while (
        !root.classList.contains('ouiSideNavItem--root') &&
        !root.classList.contains('guideSideNav')
      ) {
        root = root.parentNode;
      }
      root.scrollIntoView();
    }
  };

  scrollNavSectionIntoView = () => {
    setTimeout(() => {
      this.scrollNavSectionIntoViewSync();
    }, 250);
  };

  onButtonClick() {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  renderSubSections = (href, subSections = [], searchTerm = '') => {
    const subSectionsWithTitles = subSections.filter((item) => {
      if (!item.title) {
        return false;
      }

      if (searchTerm) {
        return item.title.toLowerCase().indexOf(searchTerm) !== -1;
      }

      return true;
    });

    // don't render solitary sub-items unless there's an active search
    if (subSectionsWithTitles.length <= (searchTerm ? 0 : 1)) {
      return;
    }

    return subSectionsWithTitles.map(({ title, id }) => {
      let name = title;
      if (searchTerm) {
        name = (
          <OuiHighlight
            className="guideSideNav__item--inSearch"
            search={searchTerm}>
            {title}
          </OuiHighlight>
        );
      }

      return {
        id: `subSection-${id}`,
        name,
        href: href.concat(`#${id}`),
      };
    });
  };

  renderSideNav = (sideNav) => {
    // TODO: Add contents pages
    const sideNavSections = [];

    const searchTerm = this.state.search.toLowerCase();

    sideNav.forEach((section) => {
      let hasMatchingSubItem = false;

      const matchingItems = section.items.filter((item) => {
        if (item.hidden) {
          return false;
        }

        const itemSections = item.sections || [];
        for (let i = 0; i < itemSections.length; i++) {
          const sectionTitle = itemSections[i].title || '';
          if (sectionTitle.toLowerCase().indexOf(searchTerm) !== -1) {
            hasMatchingSubItem = true;
            return true;
          }
        }

        if (item.name.toLowerCase().indexOf(searchTerm) !== -1) {
          return true;
        }
      });

      const items = matchingItems.map((item) => {
        const { name, path, sections, isNew } = item;
        const href = `#/${path}`;

        let newBadge;
        if (isNew) {
          newBadge = (
            <OuiBadge color="accent" className="guideSideNav__newBadge">
              NEW
            </OuiBadge>
          );
        }

        let visibleName = name;
        if (searchTerm) {
          visibleName = (
            <OuiHighlight
              className="guideSideNav__item--inSearch"
              search={searchTerm}>
              {name}
            </OuiHighlight>
          );
        }

        return {
          id: `${section.type}-${path}`,
          name: visibleName,
          href,
          items: this.renderSubSections(href, sections, searchTerm),
          isSelected: item.path === this.props.currentRoute.path,
          forceOpen: !!(searchTerm && hasMatchingSubItem),
          className: 'guideSideNav__item',
          icon: newBadge,
        };
      });

      if (!items.length) {
        return;
      }

      sideNavSections.push({
        name: section.name,
        id: section.type,
        items,
      });
    });

    return sideNavSections;
  };

  render() {
    const sideNav = this.renderSideNav(this.props.navigation);

    let sideNavContent;

    if (sideNav.length) {
      sideNavContent = (
        <OuiSideNav
          mobileTitle="Navigate components"
          toggleOpenOnMobile={this.toggleOpenOnMobile}
          isOpenOnMobile={this.state.isSideNavOpenOnMobile}
          items={sideNav}
          aria-label="OUI"
        />
      );
    } else {
      sideNavContent = (
        <OuiText color="subdued" size="s">
          <p>No matches</p>
        </OuiText>
      );
    }

    return (
      <OuiPageSideBar className="guideSideNav" sticky>
        <OuiFlexGroup
          style={{ height: '100%' }}
          direction="column"
          responsive={false}
          gutterSize="none">
          <OuiFlexItem
            role="search"
            grow={false}
            className="guideSideNav__search">
            <OuiFieldSearch
              fullWidth
              placeholder="Search"
              value={this.state.search}
              onChange={this.onSearchChange}
              aria-label="Search for a docs section"
            />
          </OuiFlexItem>
          <OuiFlexItem className="guideSideNav__content">
            {sideNavContent}
          </OuiFlexItem>
        </OuiFlexGroup>
      </OuiPageSideBar>
    );
  }
}

GuidePageChrome.propTypes = {
  currentRoute: PropTypes.object.isRequired,
  onToggleLocale: PropTypes.func.isRequired,
  selectedLocale: PropTypes.string.isRequired,
  navigation: PropTypes.array.isRequired,
};
