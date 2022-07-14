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

const rule = require('./rel');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
});

const valid = [
  'const Component = ({ href, rel }) => {};',
  'const Component = ({ foo, bar, baz}) => {};',
];

const invalid = [
  {
    code: 'const Component = ({ href }) => {};',
    errors: [
      {
        message: 'Props must contain rel if href is defined',
      },
    ],
  },
];

ruleTester.run('href-with-rel', rule, {
  valid,
  invalid,
});
