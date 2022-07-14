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
import { OuiText } from '../../../../src/components/text';
import {
  OuiListGroup,
  OuiListGroupProps,
  OuiPinnableListGroup,
  OuiPinnableListGroupItemProps,
} from '../../../../src/components/list_group';
import { OuiSpacer } from '../../../../src/components/spacer';
import { OuiButton, OuiButtonIcon } from '../../../../src/components/button';
import { OuiLink } from '../../../../src/components/link';

const deploymentsList: OuiListGroupProps['listItems'] = [
  {
    label: 'combining-binaries',
    iconType: 'logoAzureMono',
    size: 's',
  },
  {
    label: 'stack-monitoring',
    iconType: 'logoAWSMono',
    size: 's',
  },
];

export const TopNavLinks: OuiPinnableListGroupItemProps[] = [
  {
    label: 'Home',
    iconType: 'home',
    isActive: true,
    pinnable: false,
  },
  { label: 'Dashboards', pinned: true },
  { label: 'Dev tools', pinned: true },
  { label: 'Maps', pinned: true },
];

export const KibanaNavLinks: OuiPinnableListGroupItemProps[] = [
  { label: 'Discover' },
  { label: 'Visualize' },
  { label: 'Dashboards' },
  { label: 'Canvas' },
  { label: 'Maps' },
  { label: 'Machine Learning' },
  { label: 'Graph' },
];

export const DeploymentsGroup = (
  <OuiCollapsibleNavGroup
    title={
      <span>
        <small style={{ fontWeight: 'normal' }}>Deployment</small> <br />
        <strong>personal-databoard</strong>
      </span>
    }
    iconType="logoGCPMono"
    iconSize="xl"
    isCollapsible={true}
    initialIsOpen={false}
    background="dark">
    <div role="group" className="kibanaNavDeployment__content">
      <OuiListGroup listItems={deploymentsList} flush />
      <OuiSpacer size="s" />
      <OuiButton color="ghost" fullWidth>
        Manage deployments
      </OuiButton>
    </div>
  </OuiCollapsibleNavGroup>
);

export const SecurityGroup = (
  <OuiCollapsibleNavGroup
    background="light"
    iconType="logoSecurity"
    title="Elastic Security"
    isCollapsible={true}
    initialIsOpen={true}
    arrowDisplay="none"
    extraAction={
      <OuiButtonIcon
        aria-label="Hide and never show again"
        title="Hide and never show again"
        iconType="cross"
      />
    }>
    <OuiText size="s" color="subdued" style={{ padding: '0 8px 8px' }}>
      <p>
        Threat prevention, detection, and response with SIEM and endpoint
        security.
        <br />
        <OuiLink>Learn more</OuiLink>
      </p>
    </OuiText>
  </OuiCollapsibleNavGroup>
);

export default () => (
  <>
    {DeploymentsGroup}
    <OuiCollapsibleNavGroup background="light">
      <OuiPinnableListGroup
        listItems={TopNavLinks}
        onPinClick={() => {}}
        maxWidth="none"
        color="text"
        gutterSize="none"
        size="s"
      />
    </OuiCollapsibleNavGroup>
    <OuiCollapsibleNavGroup
      title="Kibana"
      iconType="logoKibana"
      isCollapsible={true}
      initialIsOpen={true}>
      <OuiPinnableListGroup
        listItems={KibanaNavLinks}
        onPinClick={() => {}}
        maxWidth="none"
        color="subdued"
        gutterSize="none"
        size="s"
      />
    </OuiCollapsibleNavGroup>
    {SecurityGroup}
  </>
);
