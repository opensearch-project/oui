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

import {
  OuiFlexGrid,
  OuiFlexItem,
  OuiIcon,
  OuiPanel,
  OuiCodeBlock,
  OuiCopy,
  OuiSpacer,
} from '../../../../src/components';

const iconTypes = [
  'navAdministration',
  'navAiFlow',
  'navAlerting',
  'navAnomalyDetection',
  'navDashboards',
  'navData',
  'navDetectionRules',
  'navDevtools',
  'navDiscover',
  'navExperiments',
  'navGetStarted',
  'navInfo',
  'navInfra',
  'navIntegrations',
  'navJudgements',
  'navManage',
  'navMaps',
  'navModels',
  'navNotebooks',
  'navNotifications',
  'navOverview',
  'navQuerySets',
  'navReports',
  'navSecurityCases',
  'navSecurityFindings',
  'navServiceMap',
  'navServices',
  'navSlos',
  'navThreatIntel',
  'navTicketing',
  'navUi',
  'navSearchConfigurationsln',
];

export default () => (
  <>
    <OuiCodeBlock language="html" isCopyable paddingSize="m">
      {'<OuiIcon type="navAdministration" />'}
    </OuiCodeBlock>
    <OuiSpacer />
    <OuiFlexGrid direction="column" columns={3}>
      {iconTypes.map((iconType) => (
        <OuiFlexItem key={iconType}>
          <OuiCopy
            display="block"
            textToCopy={iconType}
            afterMessage={`${iconType} copied`}>
            {(copy) => (
              <OuiPanel
                hasShadow={false}
                hasBorder={false}
                onClick={copy}
                paddingSize="s">
                <OuiIcon className="oui-alignMiddle" type={iconType} /> &emsp;{' '}
                <small>{iconType}</small>
              </OuiPanel>
            )}
          </OuiCopy>
        </OuiFlexItem>
      ))}
    </OuiFlexGrid>
  </>
);
