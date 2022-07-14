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
import { OuiStep, OuiStepHorizontal } from '../../../../src/components/steps';
import {
  propUtilityForPlayground,
  createOptionalEnum,
  simulateFunction,
  dummyFunction,
} from '../../services/playground';

export const stepConfig = () => {
  const docgenInfo = Array.isArray(OuiStep.__docgenInfo)
    ? OuiStep.__docgenInfo[0]
    : OuiStep.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.title.value = 'Step';

  propsToUse.status = createOptionalEnum(propsToUse.status);

  propsToUse.children = {
    value: 'Do this first',
    type: PropTypes.String,
    hidden: false,
  };

  return {
    config: {
      componentName: 'OuiStep',
      props: propsToUse,
      scope: {
        OuiStep,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiStep'],
        },
      },
    },
  };
};

export const stepHorizontalConfig = () => {
  const docgenInfo = Array.isArray(OuiStepHorizontal.__docgenInfo)
    ? OuiStepHorizontal.__docgenInfo[0]
    : OuiStepHorizontal.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.title.value = 'Horizontal step';

  propsToUse.status = createOptionalEnum(propsToUse.status);

  propsToUse.onClick = simulateFunction(propsToUse.onClick, true);

  return {
    config: {
      componentName: 'OuiStepHorizontal',
      props: propsToUse,
      scope: {
        OuiStepHorizontal,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiStepHorizontal'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};
