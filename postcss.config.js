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

module.exports = {
  plugins: [
    require('autoprefixer')(), // `browsers` property set via `.browserslistrc`
    require('postcss-inline-svg')({ relative: true, path: __dirname }),
  ],
};
