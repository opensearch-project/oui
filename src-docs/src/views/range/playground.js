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
import { OuiRange, OuiDualRange } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
} from '../../services/playground';

export const rangeConfig = () => {
  const docgenInfo = Array.isArray(OuiRange.__docgenInfo)
    ? OuiRange.__docgenInfo[0]
    : OuiRange.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    type: PropTypes.String,
    value: '10',
  };

  propsToUse.onChange = {
    ...propsToUse.onChange,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onChange.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  propsToUse.tickInterval = {
    ...propsToUse.tickInterval,
    custom: {
      ...propsToUse.tickInterval.custom,
      checkDep: (val, state) => {
        if (state.showTicks.value && !val) {
          return 'When passing showTicks to OuiDualRange, you must also provide tickInterval';
        }
        return undefined;
      },
    },
  };

  propsToUse.showInput = {
    ...propsToUse.showInput,
    type: PropTypes.Boolean,
    value: false,
  };
  propsToUse.valueAppend = {
    ...propsToUse.valueAppend,
    type: PropTypes.String,
  };
  propsToUse.valuePrepend = {
    ...propsToUse.valuePrepend,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'OuiRange',
      props: propsToUse,
      scope: {
        OuiRange,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiRange'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};

export const dualRangeConfig = () => {
  const docgenInfo = Array.isArray(OuiDualRange.__docgenInfo)
    ? OuiDualRange.__docgenInfo[0]
    : OuiDualRange.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    type: PropTypes.String,
    value: '10',
  };

  propsToUse.onChange = {
    ...propsToUse.onChange,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onChange.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  propsToUse.showInput = {
    ...propsToUse.showInput,
    type: PropTypes.Boolean,
    value: false,
  };

  propsToUse.tickInterval = {
    ...propsToUse.tickInterval,
    custom: {
      ...propsToUse.tickInterval.custom,
      checkDep: (val, state) => {
        if (state.showTicks.value && !val) {
          return 'When passing showTicks to OuiRange, you must also provide tickInterval';
        }
        return undefined;
      },
    },
  };

  return {
    config: {
      componentName: 'OuiDualRange',
      props: propsToUse,
      scope: {
        OuiDualRange,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiDualRange'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};
