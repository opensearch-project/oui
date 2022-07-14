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
  simulateFunction,
  createOptionalEnum,
} from '../../services/playground';
import { OuiColorPicker } from '../../../../src/components/';
import { PropTypes } from 'react-view';

const colorPickerConfig = () => {
  const docgenInfo = Array.isArray(OuiColorPicker.__docgenInfo)
    ? OuiColorPicker.__docgenInfo[0]
    : OuiColorPicker.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };
  propsToUse.prepend = {
    ...propsToUse.prepend,
    type: PropTypes.String,
  };

  propsToUse.color = {
    ...propsToUse.color,
    stateful: false,
    type: PropTypes.String,
    value: '#D36086',
  };

  propsToUse.secondaryInputDisplay = {
    ...propsToUse.secondaryInputDisplay,
    custom: {
      ...propsToUse.secondaryInputDisplay.custom,
      checkDep: (val, state) => {
        if (state.mode.value === 'secondaryInput' && !val) {
          return 'When mode is set to secondaryInput, you must also provide secondaryInputDisplay';
        }
        return undefined;
      },
    },
  };

  propsToUse.format = createOptionalEnum(propsToUse.format);

  propsToUse.onChange = simulateFunction(propsToUse.onChange);
  propsToUse.onBlur = simulateFunction(propsToUse.onBlur);
  propsToUse.onFocus = simulateFunction(propsToUse.onFocus);

  return {
    config: {
      componentName: 'OuiColorPicker',
      props: propsToUse,
      scope: {
        OuiColorPicker,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiColorPicker'],
        },
      },
      customProps: {
        onChange: dummyFunction,
        onBlur: dummyFunction,
        onFocus: dummyFunction,
      },
    },
  };
};

export default [colorPickerConfig];
