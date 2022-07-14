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

import {
  propUtilityForPlayground,
  dummyFunction,
} from '../../services/playground';
import { OuiTab, OuiTabs } from '../../../../src/components/';
import { PropTypes } from 'react-view';

export const tabConfig = () => {
  const docgenInfo = Array.isArray(OuiTab.__docgenInfo)
    ? OuiTab.__docgenInfo[0]
    : OuiTab.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onClick = {
    ...propsToUse.onClick,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onClick.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.String,
    value: 'Tab content',
  };

  return {
    config: {
      componentName: 'OuiTab',
      props: propsToUse,
      scope: {
        OuiTab,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiTab'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};

export const tabsConfig = () => {
  const docgenInfo = Array.isArray(OuiTabs.__docgenInfo)
    ? OuiTabs.__docgenInfo[0]
    : OuiTabs.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    value: '<OuiTab>Tab 1</OuiTab><OuiTab isSelected>Tab 2</OuiTab>',
    type: PropTypes.ReactNode,
    hidden: false,
  };

  return {
    config: {
      componentName: 'OuiTabs',
      props: propsToUse,
      scope: {
        OuiTabs,
        OuiTab,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiTabs', 'OuiTab'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};
