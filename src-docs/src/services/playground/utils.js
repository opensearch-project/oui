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

import template from '@babel/template';

export const generateAst = (value) => {
  return template.ast(String(value), { plugins: ['jsx'] }).expression;
};

export const generateCustomProps = (props) => {
  return props.reduce((obj, item) => {
    return {
      ...obj,
      [item]: {
        generate: generateAst,
      },
    };
  }, {});
};
