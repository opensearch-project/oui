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
  iconValidator,
} from '../../services/playground';
import { OuiIcon } from '../../../../src/components/';

export default () => {
  const docgenInfo = Array.isArray(OuiIcon.__docgenInfo)
    ? OuiIcon.__docgenInfo[0]
    : OuiIcon.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.type = iconValidator({ ...propsToUse.type }, 'grid');

  propsToUse.size = {
    ...propsToUse.size,
    defaultValue: 'm',
  };

  return {
    config: {
      componentName: 'OuiIcon',
      props: propsToUse,
      scope: {
        OuiIcon,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiIcon'],
        },
      },

      customProps: {
        onIconLoad: dummyFunction,
      },
    },
  };
};
