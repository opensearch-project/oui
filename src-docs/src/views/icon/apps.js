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
  OuiCopy,
  OuiCodeBlock,
  OuiSpacer,
} from '../../../../src/components';

const iconTypes = [
  'advancedSettingsApp',
  'apmApp',
  'appSearchApp',
  'auditbeatApp',
  'canvasApp',
  'codeApp',
  'consoleApp',
  'crossClusterReplicationApp',
  'dashboardApp',
  'devToolsApp',
  'discoverApp',
  'emsApp',
  'filebeatApp',
  'gisApp',
  'graphApp',
  'grokApp',
  'heartbeatApp',
  'indexManagementApp',
  'indexPatternApp',
  'indexRollupApp',
  'metricsApp',
  'lensApp',
  'logsApp',
  'machineLearningApp',
  'managementApp',
  'metricbeatApp',
  'monitoringApp',
  'notebookApp',
  'packetbeatApp',
  'pipelineApp',
  'recentlyViewedApp',
  'reportingApp',
  'savedObjectsApp',
  'searchProfilerApp',
  'securityAnalyticsApp',
  'securityApp',
  'spacesApp',
  'sqlApp',
  'timelionApp',
  'upgradeAssistantApp',
  'uptimeApp',
  'usersRolesApp',
  'visualizeApp',
  'watchesApp',
  'workplaceSearchApp',
];

export default () => (
  <>
    <OuiCodeBlock language="html" isCopyable paddingSize="m">
      {'<OuiIcon type="addDataApp" size="xl" />'}
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
                <OuiIcon
                  className="oui-alignMiddle"
                  type={iconType}
                  size="xl"
                />{' '}
                &emsp; <small>{iconType}</small>
              </OuiPanel>
            )}
          </OuiCopy>
        </OuiFlexItem>
      ))}
    </OuiFlexGrid>
  </>
);
