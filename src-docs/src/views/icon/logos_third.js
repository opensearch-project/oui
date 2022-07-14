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
  OuiText,
  OuiCopy,
} from '../../../../src/components';

const iconTypes = [
  'logoAerospike',
  'logoApache',
  'logoAWS',
  'logoAWSMono',
  'logoAzure',
  'logoAzureMono',
  'logoCeph',
  'logoCodesandbox',
  'logoCouchbase',
  'logoDocker',
  'logoDropwizard',
  'logoEtcd',
  'logoGCP',
  'logoGCPMono',
  'logoGithub',
  'logoGmail',
  'logoGolang',
  'logoGoogleG',
  'logoHAproxy',
  'logoIBM',
  'logoIBMMono',
  'logoKafka',
  'logoKubernetes',
  'logoMemcached',
  'logoMongodb',
  'logoMySQL',
  'logoNginx',
  'logoOsquery',
  'logoPhp',
  'logoPostgres',
  'logoPrometheus',
  'logoRabbitmq',
  'logoRedis',
  'logoSketch',
  'logoSlack',
  'logoWebhook',
  'logoWindows',
].sort();

export default () => (
  <OuiFlexGrid columns={4}>
    {iconTypes.map((iconType) => (
      <OuiFlexItem
        className="guideDemo__icon"
        key={iconType}
        style={{ width: '200px' }}>
        <OuiCopy textToCopy={iconType} afterMessage={`${iconType} copied`}>
          {(copy) => (
            <OuiPanel onClick={copy} className="oui-textCenter">
              <OuiIcon type={iconType} size="xl" />
              <OuiText size="s">
                <p>{iconType}</p>
              </OuiText>
            </OuiPanel>
          )}
        </OuiCopy>
      </OuiFlexItem>
    ))}
  </OuiFlexGrid>
);
