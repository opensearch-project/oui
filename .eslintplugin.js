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

exports.rules = {
  i18n: require('./scripts/eslint-plugin/i18n'),
  'href-with-rel': require('./scripts/eslint-plugin/rel'),
  'require-license-header': require('./scripts/eslint-plugin/require_license_header'),
  'forward-ref': require('./scripts/eslint-plugin/forward_ref_display_name'),
};
