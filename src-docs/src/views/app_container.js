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

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AppView } from './app_view';
import { getRoutes, getLocale } from '../store';

import { toggleLocale } from '../actions';

function mapStateToProps(state, ownProps) {
  return {
    currentRoute: ownProps.currentRoute,
    locale: getLocale(state),
    routes: getRoutes(state),
    ...ownProps,
  };
}

export const AppContainer = withRouter(
  connect(mapStateToProps, {
    toggleLocale,
  })(AppView)
);
