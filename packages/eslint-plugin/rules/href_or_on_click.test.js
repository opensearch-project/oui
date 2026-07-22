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

const { deserialize, serialize } = require('v8');
const { RuleTester } = require('eslint');
const rule = require('./href_or_on_click');
const dedent = require('dedent');
const parser = require('@typescript-eslint/parser');

if (typeof global.structuredClone !== 'function') {
  global.structuredClone = (value) => deserialize(serialize(value));
}

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
    ecmaVersion: 2018,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    sourceType: 'module',
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
    {
      code: dedent(`
        module.export = () => (
          <OuiSmallButton />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <OuiSmallButton href="/" />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <OuiSmallButton href={'/' + 'home'} />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <OuiSmallButton onClick={executeAction} />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <OuiSmallButton onClick={() => executeAction()} />
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
    {
      code: dedent(`
        module.export = () => (
          <OuiSmallButton href="/" onClick={fooBar} />
        )
      `),

      errors: [
        {
          message: '<OuiSmallButton> accepts either `href` or `onClick`, not both.',
        },
      ],
    },
    {
      code: dedent(`
        module.export = () => (
          <OuiSmallButtonEmpty href="/" onClick={fooBar} />
        )
      `),

      errors: [
        {
          message:
            '<OuiSmallButtonEmpty> accepts either `href` or `onClick`, not both.',
        },
      ],
    },
  ],
});
