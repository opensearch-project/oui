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

import { iconTypes } from '../../views/icon/icons';
import { iconTypes as logoTypes } from '../../views/icon/logos';
import { mapOptions } from './mapOptions';
import { PropTypes } from 'react-view';

const iconOptions = mapOptions(iconTypes.concat(logoTypes));

export const iconValidator = (prop = { custom: {} }, value) => {
  const newProp = {
    ...prop,
    value: value,
    type: PropTypes.String,
    custom: {
      ...prop.custom,
      validator: (val) => iconOptions[val],
    },
  };
  return newProp;
};
