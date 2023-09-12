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

import { OuiText } from '../../../../src/components/text';
import { OuiBadge } from '../../../../src/components/badge';
import { OuiSelectableTemplateSitewide } from '../../../../src/components/selectable';
import { OuiSelectableTemplateSitewideOption } from '../../../../src/components/selectable/selectable_templates/selectable_template_sitewide_option';
import { OuiFlexGroup, OuiFlexItem } from '../../../../src/components/flex';
import { OuiLink } from '../../../../src/components/link';
import { OuiButton } from '../../../../src/components/button';

export default () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [searchRef, setSearchRef] = useState<HTMLInputElement | null>(null);
  const searchValueExists = searchValue && searchValue.length;

  /**
   * Timeout to simulate loading (only on key command+k)
   */
  let searchTimeout;
  const startSearchTimeout = () => {
    searchTimeout = setTimeout(() => {
      // Simulate a remotely-executed search.
      setLoading(false);
    }, 400);
  };
  clearTimeout(searchTimeout);
  startSearchTimeout();

  /**
   * Take the first 5 options and simulate recently viewed
   */
  const recents = searchData.slice(0, 5);
  const recentsWithIcon: OuiSelectableTemplateSitewideOption[] = recents.map(
    (recent) => {
      return {
        ...recent,
        icon: {
          type: 'clock',
          color: 'subdued',
        },
      };
    }
  );

  /**
   * Hook up the keyboard shortcut for command+k to initiate focus into search input
   */
  useEffect(() => {
    window.addEventListener('keydown', onWindowKeyDown);

    return function cleanup() {
      window.removeEventListener('resize', onWindowKeyDown);
    };
  });

  const onWindowKeyDown = (e: any) => {
    if (e.metaKey && e.key.toLowerCase() === 'k') {
      window.addEventListener('keyup', onWindowKeyUp);
    }
  };

  const onWindowKeyUp = () => {
    searchRef && searchRef.focus();
    setLoading(true);
    window.removeEventListener('keyup', onWindowKeyUp);
  };

  const onKeyUpCapture = (e: any) => {
    setSearchValue(e.currentTarget.value);
  };

  /**
   * Do something with the selection based on the found option with `checked: on`
   */
  const onChange = (updatedOptions: OuiSelectableTemplateSitewideOption[]) => {
    const clickedItem = updatedOptions.find(
      (option) => option.checked === 'on'
    );
    if (!clickedItem) return;
  };

  return (
    <OuiSelectableTemplateSitewide
      isLoading={isLoading}
      onChange={onChange}
      options={searchValueExists ? searchData : recentsWithIcon}
      searchProps={{
        append: '⌘K',
        onKeyUpCapture: onKeyUpCapture,
        className: 'customSearchClass',
        inputRef: setSearchRef,
      }}
      listProps={{
        className: 'customListClass',
      }}
      popoverProps={{
        className: 'customPopoverClass',
      }}
      popoverButton={<OuiButton>Mobile toggle</OuiButton>}
      popoverButtonBreakpoints={['xs', 's']}
      popoverFooter={
        <OuiText color="subdued" size="xs">
          <OuiFlexGroup
            alignItems="center"
            gutterSize="s"
            responsive={false}
            wrap>
            <OuiFlexItem grow={false}>
              {searchValueExists && <OuiLink>View more results</OuiLink>}
            </OuiFlexItem>
            <OuiFlexItem />
            <OuiFlexItem grow={false}>Quickly search using</OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiBadge>Command + K</OuiBadge>
            </OuiFlexItem>
          </OuiFlexGroup>
        </OuiText>
      }
    />
  );
};

/**
 * The options object
 */
const searchData: OuiSelectableTemplateSitewideOption[] = [
  {
    label: 'Welcome dashboards',
    avatar: {
      name: 'Default Space',
    },
    meta: [
      {
        text: 'Dashboard',
        type: 'application',
        highlightSearchString: true,
      },
    ],
    url: 'welcome-dashboards',
  },
  {
    label:
      '[Flights] Flight Count and Average Ticket Price over the course of several years maybe even decades',
    avatar: {
      name: 'Default Space',
    },
    meta: [
      {
        text: 'Visualization',
        type: 'application',
      },
    ],
  },
  {
    label: '[Flights] Global Flight Dashboard',
    avatar: {
      name: 'Hello World',
    },
    meta: [
      {
        text: 'Dashboard',
        type: 'application',
        highlightSearchString: true,
      },
    ],
  },
  {
    label: '[Logs] Host, Visits and Bytes Table',
    meta: [
      {
        text: 'TSVB visualization',
        type: 'application',
      },
    ],
  },
  {
    label: '[Flights] Flight Log',
    avatar: {
      name: 'Hello World',
    },
    meta: [
      {
        text: 'Discover',
        type: 'application',
      },
    ],
  },
  {
    label: 'Dashboards',
    url: 'dashboards',
    icon: {
      type: 'logoOpenSearch',
    },
  },
  {
    label: '[Logs] Web Traffic',
    url: 'dashboard-logs-web-traffic',
    meta: [
      {
        text: 'Dashboard',
        type: 'application',
        highlightSearchString: true,
      },
    ],
  },
  {
    label: 'Databoard analytics',
    title: 'Databoard analytics; Dashboard; Deployment: Flights Data',
    meta: [
      {
        text: 'Dashboard',
        type: 'application',
      },
      {
        text: 'Flights Data',
        type: 'deployment',
      },
    ],
  },
  {
    label: 'Primary logs',
    avatar: {
      name: 'Another',
    },
    meta: [
      {
        text: 'Flights Data',
        type: 'deployment',
      },
    ],
  },
  {
    label: 'SIEM',
    icon: {
      type: 'logoSecurity',
    },
    meta: [
      {
        text: 'personal-databoard',
        type: 'deployment',
      },
    ],
  },
  {
    label: 'Dev tools',
    url: 'dev-tools-console',
    meta: [
      {
        text: 'Management application',
        type: 'application',
      },
    ],
  },
  {
    label: 'Billing',
    icon: {
      type: 'user',
    },
    meta: [
      {
        text: 'Account',
        type: 'platform',
      },
    ],
  },
  {
    label: 'Maps',
    url: 'maps',
    icon: { type: 'logoOpenSearch' },
    meta: [
      {
        text: 'Analyze application',
        type: 'application',
      },
    ],
    space: 'Hello World',
  },
  {
    label: 'My support tickets',
    icon: {
      type: 'help',
    },
    meta: [
      {
        text: 'Support',
        type: 'platform',
      },
    ],
  },
  {
    label: 'Totally custom',
    searchableLabel: 'Totally custom with pink metadata',
    icon: {
      type: 'alert',
      color: 'accent',
    },
    meta: [
      {
        text: 'I have a custom type',
        type: 'PINK',
      },
    ],
  },
];
