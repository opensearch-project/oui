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
import {
  OuiFlexGroup,
  OuiFlexItem,
  OuiFlexGrid,
} from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const flexGroupConfig = () => {
  const docgenInfo = Array.isArray(OuiFlexGroup.__docgenInfo)
    ? OuiFlexGroup.__docgenInfo[0]
    : OuiFlexGroup.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: `<OuiFlexItem>Flex item</OuiFlexItem>
    <OuiFlexItem grow={false}>Grow false</OuiFlexItem>
    <OuiFlexItem component="span">
    This is a span component
  </OuiFlexItem>
  <OuiFlexItem>
    <p>Another flex item</p>
    <p>
      To showcase stretcing (or not) of items
    </p>
  </OuiFlexItem>`,
    hidden: false,
  };

  return {
    config: {
      componentName: 'OuiFlexGroup',
      props: propsToUse,
      scope: {
        OuiFlexGroup,
        OuiFlexItem,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiFlexGroup', 'OuiFlexItem'],
        },
      },
    },
    playgroundClassName: 'guideDemo__highlightGrid',
  };
};

export const flexGridConfig = () => {
  const docgenInfo = Array.isArray(OuiFlexGrid.__docgenInfo)
    ? OuiFlexGrid.__docgenInfo[0]
    : OuiFlexGrid.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: `<OuiFlexItem><div>One</div></OuiFlexItem>
<OuiFlexItem><div>Two</div></OuiFlexItem>
<OuiFlexItem><div>Three</div></OuiFlexItem>
<OuiFlexItem><div>Four</div></OuiFlexItem>
<OuiFlexItem><div>Five</div></OuiFlexItem>
<OuiFlexItem><div>Six</div></OuiFlexItem>
<OuiFlexItem><div>Seven</div></OuiFlexItem>`,
    hidden: false,
  };

  propsToUse.columns = {
    ...propsToUse.columns,
    type: PropTypes.Number,
    value: 3,
  };

  return {
    config: {
      componentName: 'OuiFlexGrid',
      props: propsToUse,
      scope: {
        OuiFlexGrid,
        OuiFlexItem,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiFlexGrid', 'OuiFlexItem'],
        },
      },
    },
    playgroundClassName: 'guideDemo__highlightGrid',
  };
};
