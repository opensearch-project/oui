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

export const simulateFunction = (
  prop = { custom: {} },
  defaultValue = false
) => {
  const newProp = {
    ...prop,
    type: PropTypes.Custom,
    value: defaultValue,
    custom: {
      ...prop.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };
  return newProp;
};
