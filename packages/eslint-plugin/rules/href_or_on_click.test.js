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

/* eslint-disable @typescript-eslint/no-var-requires */

const { RuleTester } = require('eslint');
const rule = require('./href_or_on_click');
const dedent = require('dedent');

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    ecmaVersion: 2018,
  },
});

ruleTester.run('@opensearch-project/oui/href-or-on-click', rule, {
  valid: [
    {
      code: dedent(`
        module.export = () => (
          <OuiButton />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <OuiButton href="/" />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <OuiButton href={'/' + 'home'} />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <OuiButton onClick={executeAction} />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <OuiButton onClick={() => executeAction()} />
        )
      `),
    },
  ],

  invalid: [
    {
      code: dedent(`
        module.export = () => (
          <OuiButton href="/" onClick={fooBar} />
        )
      `),

      errors: [
        {
          message: '<OuiButton> accepts either `href` or `onClick`, not both.',
        },
      ],
    },
    {
      code: dedent(`
        module.export = () => (
          <OuiButtonEmpty href="/" onClick={fooBar} />
        )
      `),

      errors: [
        {
          message:
            '<OuiButtonEmpty> accepts either `href` or `onClick`, not both.',
        },
      ],
    },
    {
      code: dedent(`
        module.export = () => (
          <OuiLink href="/" onClick={fooBar} />
        )
      `),

      errors: [
        {
          message: '<OuiLink> accepts either `href` or `onClick`, not both.',
        },
      ],
    },
  ],
});
