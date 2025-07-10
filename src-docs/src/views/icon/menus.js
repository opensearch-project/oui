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
  'menusFeatureAdministration',
  'menusFeatureAiFlow',
  'menusFeatureAlerting',
  'menusFeatureAnalyticsWs',
  'menusFeatureAnomalyDetection',
  'menusFeatureDashboards',
  'menusFeatureData',
  'menusFeatureDetectionRules',
  'menusFeatureDevtools',
  'menusFeatureDiscover',
  'menusFeatureEssentialsWs',
  'menusFeatureExperiments',
  'menusFeatureGetStarted',
  'menusFeatureInfo',
  'menusFeatureInfra',
  'menusFeatureIntegrations',
  'menusFeatureJudgements',
  'menusFeatureManage',
  'menusFeatureMaps',
  'menusFeatureModels',
  'menusFeatureNotebooks',
  'menusFeatureNotifications',
  'menusFeatureObservabilityWs',
  'menusFeatureOverview',
  'menusFeatureQuerySets',
  'menusFeatureReports',
  'menusFeatureSearchWs',
  'menusFeatureSecurityCases',
  'menusFeatureSecurityFindings',
  'menusFeatureSecurityWs',
  'menusFeatureServiceMap',
  'menusFeatureServices',
  'menusFeatureSlos',
  'menusFeatureThreatIntel',
  'menusFeatureTicketing',
  'menusFeatureUi',
  'menusSearchConfigurationsln',
];

export default () => (
  <>
    <OuiCodeBlock language="html" isCopyable paddingSize="m">
      {'<OuiIcon type="menusFeatureAdministration" />'}
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
