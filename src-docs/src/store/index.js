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

export function getTheme(state) {
  return state.theme.theme;
}

export function getRoutes(state) {
  return state.routes;
}

export function getLocale(state) {
  return state.locale.locale;
}
