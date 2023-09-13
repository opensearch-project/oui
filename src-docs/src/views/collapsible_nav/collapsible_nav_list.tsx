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

import { OuiCollapsibleNavGroup } from '../../../../src/components/collapsible_nav';
import {
  OuiListGroup,
  OuiListGroupItemProps,
} from '../../../../src/components/list_group';
import { OuiSelect } from '../../../../src/components/form';
import { OuiSpacer } from '../../../../src/components/spacer';

export const OpenSearchDashboardsLinks: OuiListGroupItemProps[] = [
  { label: 'Overview' },
  { label: 'Discover' },
  { label: 'Dashboard' },
  { label: 'Visualize' },
].map((link) => {
  return {
    ...link,
    onClick: () => {},
  };
});

export const OpenSearchPluginLinks: OuiListGroupItemProps[] = [
  { label: 'Query Workbench' },
  { label: 'Reporting' },
  { label: 'Alerting' },
  { label: 'Anomaly Detection' },
  { label: 'Notification' },
  { label: 'Observability' },
  { label: 'Security Analytics' },
  { label: 'Index Management' },
  { label: 'Search Relevance' },
].map((link) => {
  return {
    ...link,
    onClick: () => {},
  };
});

export const ManagementLinks: OuiListGroupItemProps[] = [
  { label: 'Dev Tools' },
  { label: 'Stack Management' },
].map((link) => {
  return {
    ...link,
    onClick: () => {},
  };
});

export default () => {
  const [background, setBackground] = useState<'dark' | 'light' | 'none'>(
    'none'
  );
  return (
    <>
      <OuiSelect
        prepend="Set background"
        options={[
          {
            value: 'none',
            text: 'none (default)',
          },
          {
            value: 'dark',
            text: 'dark',
          },
          {
            value: 'light',
            text: 'light',
          },
        ]}
        value={background}
        onChange={(e: { target: { value: any } }) =>
          setBackground(e.target.value)
        }
      />
      <OuiSpacer />
      <OuiCollapsibleNavGroup
        background={background}
        title="OpenSearch Dashboards"
        iconType="logoOpenSearch"
        isCollapsible={true}
        initialIsOpen={true}>
        <OuiListGroup
          listItems={OpenSearchDashboardsLinks}
          maxWidth="none"
          color="subdued"
          gutterSize="none"
          size="s"
        />
      </OuiCollapsibleNavGroup>
      <OuiCollapsibleNavGroup
        background={background}
        title="OpenSearch Plugins"
        isCollapsible={true}
        initialIsOpen={true}>
        <OuiListGroup
          listItems={OpenSearchPluginLinks}
          maxWidth="none"
          color="subdued"
          gutterSize="none"
          size="s"
        />
      </OuiCollapsibleNavGroup>
      <OuiCollapsibleNavGroup
        background={background}
        title="Management"
        iconType="gear"
        isCollapsible={true}
        initialIsOpen={true}>
        <OuiListGroup
          listItems={ManagementLinks}
          maxWidth="none"
          color="subdued"
          gutterSize="none"
          size="s"
        />
      </OuiCollapsibleNavGroup>
    </>
  );
};
