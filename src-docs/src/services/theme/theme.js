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

const themes = {};

export function registerTheme(theme, cssFiles) {
  themes[theme] = cssFiles;
}

export function applyTheme(newTheme) {
  Object.keys(themes).forEach((theme) =>
    themes[theme].forEach((cssFile) => cssFile.unuse())
  );
  themes[newTheme].forEach((cssFile) => cssFile.use());
}
