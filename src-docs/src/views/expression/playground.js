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
import { OuiExpression } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
} from '../../services/playground';

export const expressionConfig = () => {
  const docgenInfo = Array.isArray(OuiExpression.__docgenInfo)
    ? OuiExpression.__docgenInfo[0]
    : OuiExpression.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    type: PropTypes.String,
    value: '100',
  };

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

  propsToUse.description = {
    ...propsToUse.description,
    type: PropTypes.String,
    value: 'Is above',
  };

  propsToUse.descriptionWidth = {
    ...propsToUse.descriptionWidth,
    type: PropTypes.Number,
  };

  return {
    config: {
      componentName: 'OuiExpression',
      props: propsToUse,
      scope: {
        OuiExpression,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiExpression'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};
