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

const baseConfig = require('../.babelrc.js');
const index = baseConfig.plugins.indexOf(
  './scripts/babel/proptypes-from-ts-props'
);
baseConfig.plugins.splice(
  index + 1,
  0,
  './scripts/babel/react-docgen-typescript'
);
module.exports = baseConfig;
