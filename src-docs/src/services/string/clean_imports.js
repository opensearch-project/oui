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

export const hasDisplayToggles = (code) => {
  return /DisplayToggles/.test(code);
};

export const cleanOuiImports = (code) => {
  return code
    .replace(
      /(from )'(..\/)+src\/components(\/?';)/,
      "from '@opensearch-project/oui';"
    )
    .replace(
      /(from )'(..\/)+src\/services(\/?';)/,
      "from '@opensearch-project/oui/lib/services';"
    );
};

export const listExtraDeps = (code) => {
  return code
    .match(
      // Match anything not directly calling oui (like lib dirs)
      /import(?!.*(opensearch-project\/oui|\.))\s.*?'(@[^.]+?\/)?[^.]+?['\/]/g
    )
    .map((match) => match.match(/'(.+)['\/]/)[1])
    .reduce((deps, dep) => {
      // Make sure that we are using the latest version of a dep
      deps[dep] = 'latest';
      return deps;
    }, {});
};
