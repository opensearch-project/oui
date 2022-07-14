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

import * as t from '@babel/types';

export const dummyFunction = {
  generate: (val) => {
    if (!val) return null;
    const obj = t.arrowFunctionExpression([], t.blockStatement([]), false);
    return obj;
  },
};
