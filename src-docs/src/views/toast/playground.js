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
import { OuiToast } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
  createOptionalEnum,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(OuiToast.__docgenInfo)
    ? OuiToast.__docgenInfo[0]
    : OuiToast.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.title = {
    ...propsToUse.title,
    type: PropTypes.String,
    value: 'Toast content',
  };

  propsToUse.color = createOptionalEnum(propsToUse.color);

  propsToUse.onClose = simulateFunction(propsToUse.onClose);

  return {
    config: {
      componentName: 'OuiToast',
      props: propsToUse,
      scope: {
        OuiToast,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiToast'],
        },
      },
      customProps: {
        onClose: dummyFunction,
      },
    },
  };
};
