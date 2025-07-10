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
  'featureAdministration',
  'featureAiFlow',
  'featureAlerting',
  'featureAnomalyDetection',
  'featureDashboards',
  'featureData',
  'featureDetectionRules',
  'featureDevtools',
  'featureDiscover',
  'featureExperiments',
  'featureGetStarted',
  'featureInfo',
  'featureInfra',
  'featureIntegrations',
  'featureJudgements',
  'featureManage',
  'featureMaps',
  'featureModels',
  'featureNotebooks',
  'featureNotifications',
  'featureOverview',
  'featureQuerySets',
  'featureReports',
  'featureSecurityCases',
  'featureSecurityFindings',
  'featureServiceMap',
  'featureServices',
  'featureSlos',
  'featureThreatIntel',
  'featureTicketing',
  'featureUi',
  'searchConfigurationsln',
];

export default () => (
  <>
    <OuiCodeBlock language="html" isCopyable paddingSize="m">
      {'<OuiIcon type="featureAdministration" />'}
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
