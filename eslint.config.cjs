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

const { FlatCompat } = require('@eslint/eslintrc');
const { fixupConfigRules } = require('@eslint/compat');
const { globalIgnores } = require('eslint/config');
const eslint = require('eslint');
const { builtinRules } = require('eslint/use-at-your-own-risk');

const rootConfig = require('./.eslintrc.js');
const docsConfig = require('./src-docs/.eslintrc.js');

// eslint-plugin-babel reads built-in rules through Linter#getRules(), which
// was removed in ESLint 10. Keep the legacy plugin working while the shared
// Kibana config still depends on it.
if (!eslint.Linter.prototype.getRules) {
  eslint.Linter.prototype.getRules = () => builtinRules;
}

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

const ignores = [
  'dist',
  'node_modules',
  'es',
  'lib',
  'test-env',
  'types',
  'oui.d.ts',
  '**/.babelrc.js',
  '**/*.snap.js',
  '**/assets/**/*.js',
  'package.json',
  'src-docs/src/views/icon/icon_example.js',
  'packages/react-datepicker/examples',
];

const docsRules = {
  ...docsConfig.rules,
};

module.exports = [
  globalIgnores(ignores),
  {
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
  },
  ...fixupConfigRules(compat.config(rootConfig)),
  {
    files: ['src-docs/**/*.{ts,tsx,js}'],
    rules: docsRules,
  },
];
