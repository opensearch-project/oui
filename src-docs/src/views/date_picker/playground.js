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
import { OuiDatePicker } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';
import moment from 'moment';

export const datePickerConfig = () => {
  const docgenInfo = Array.isArray(OuiDatePicker.__docgenInfo)
    ? OuiDatePicker.__docgenInfo[0]
    : OuiDatePicker.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.dateFormat = {
    ...propsToUse.dateFormat,
    type: PropTypes.String,
  };

  propsToUse.selected = {
    ...propsToUse.selected,
    type: PropTypes.Object,
    value: 'moment()',
    stateful: true,
  };

  propsToUse.onChange = {
    ...propsToUse.onChange,
    type: PropTypes.Function,
    value: 'selected => setSelected(selected)',
    propHook: {
      what: 'selected',
      into: 'selected',
    },
  };

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.autoComplete = {
    ...propsToUse.autoComplete,
    hidden: true,
  };

  return {
    config: {
      componentName: 'OuiDatePicker',
      props: propsToUse,
      scope: {
        OuiDatePicker,
        moment,
      },
      imports: {
        '@opensearch-project/oui': {
          named: ['OuiDatePicker'],
        },
        moment: {
          default: 'moment',
        },
      },
    },
  };
};
