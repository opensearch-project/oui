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

import { PropTypes } from 'react-view';
import { OuiBeacon } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const beaconConfig = () => {
  const docgenInfo = Array.isArray(OuiBeacon.__docgenInfo)
    ? OuiBeacon.__docgenInfo[0]
    : OuiBeacon.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.size = {
    ...propsToUse.size,
    type: PropTypes.Number,
    defaultValue: 12,
  };

  return {
    config: {
      componentName: 'OuiBeacon',
      props: propsToUse,
      scope: {
        OuiBeacon,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiBeacon'],
        },
      },
    },
  };
};
