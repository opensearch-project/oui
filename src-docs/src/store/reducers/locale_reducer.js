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

import ActionTypes from '../../actions/action_types';

const defaultState = {
  locale: 'en',
};

export default function localeReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_LOCALE: {
      return {
        locale: action.data.locale,
      };
    }

    default:
      break;
  }

  return state;
}
