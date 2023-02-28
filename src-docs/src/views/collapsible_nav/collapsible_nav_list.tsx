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

import React from 'react';

import { OuiCollapsibleNavGroup } from '../../../../src/components/collapsible_nav';
import {
  OuiListGroup,
  OuiListGroupItemProps,
} from '../../../../src/components/list_group';

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

export default () => (
  <>
    <OuiCollapsibleNavGroup
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
