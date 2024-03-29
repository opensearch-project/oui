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

import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createHashHistory } from 'history';

import Routes from '../routes';

import localeReducer from './reducers/locale_reducer';
import themeReducer from './reducers/theme_reducer';

export const history = createHashHistory();

/**
 * @param {Object} initialState An object defining the application's initial
 * state.
 */
export default function configureStore(initialState) {
  function rootReducer(state = {}, action) {
    return {
      routing: routerReducer(state.routing, action),
      theme: themeReducer(state.theme, action),
      locale: localeReducer(state.locale, action),
      routes: Routes,
    };
  }

  const finalStore = compose(applyMiddleware(thunk, routerMiddleware(history)))(
    createStore
  )(rootReducer, initialState);

  return finalStore;
}
