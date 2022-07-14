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

import { cleanOuiImports } from '../../services';

export const renderJsSourceCode = (code) => {
  let renderedCode = code.default
    .replace(
      /(from )'(..\/)+src\/services(\/?';)/g,
      "from '@opensearch-project/oui/lib/services';"
    )
    .replace(
      /(from )'(..\/)+src\/components\/.*?';/g,
      "from '@opensearch-project/oui';"
    );
  renderedCode = renderedCode.split('\n');
  const linesWithImport = [];
  // eslint-disable-next-line guard-for-in
  for (const idx in renderedCode) {
    const line = renderedCode[idx];
    if (
      line.includes('import') &&
      line.includes("from '@opensearch-project/oui';")
    ) {
      linesWithImport.push(line);
      renderedCode[idx] = '';
    }
  }
  if (linesWithImport.length > 1) {
    linesWithImport[0] = linesWithImport[0].replace(
      " } from '@opensearch-project/oui';",
      ','
    );
    for (let i = 1; i < linesWithImport.length - 1; i++) {
      linesWithImport[i] = linesWithImport[i]
        .replace('import {', '')
        .replace(" } from '@opensearch-project/oui';", ',');
    }
    linesWithImport[linesWithImport.length - 1] = linesWithImport[
      linesWithImport.length - 1
    ].replace('import {', '');
  }
  const newImport = linesWithImport.join('');
  renderedCode.unshift(newImport);
  renderedCode = renderedCode.join('\n');
  let len = renderedCode.replace('\n\n\n', '\n\n').length;
  while (len < renderedCode.length) {
    renderedCode = renderedCode.replace('\n\n\n', '\n\n');
    len = renderedCode.replace('\n\n\n', '\n\n').length;
  }

  return cleanOuiImports(renderedCode);
};
