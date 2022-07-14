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

import { GuideSection } from './guide_section';

import { getRoutes } from '../../store';

function mapStateToProps(state) {
  return {
    routes: getRoutes(state),
  };
}

export const GuideSectionContainer = connect(mapStateToProps)(GuideSection);
