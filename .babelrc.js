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

module.exports = {
  // We need to preserve comments as they are used by webpack for
  // naming chunks during code-splitting. The compression step during
  // bundling will remove them later.
  "comments": true,

  "presets": [
    ["@babel/env", {
      // `targets` property set via `.browserslistrc`
      "useBuiltIns": process.env.NO_COREJS_POLYFILL ? false : "usage",
      "corejs": 3,
      "modules": process.env.BABEL_MODULES ? process.env.BABEL_MODULES === 'false' ? false : process.env.BABEL_MODULES : "commonjs" // babel's default is commonjs
    }],
    ["@babel/typescript", { isTSX: true, allExtensions: true }],
    "@babel/react"
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "pegjs-inline-precompile",
    "./scripts/babel/proptypes-from-ts-props",
    "./scripts/babel/variables-from-scss",
    "add-module-exports",
    // stage 3
    "@babel/transform-object-rest-spread",
    // stage 2
    "@babel/transform-class-properties",
    [
      "inline-react-svg",
      {
        "ignorePattern": "images/*",
        "svgo": {
          "plugins": [
            { "cleanupIDs": false },
            { "removeViewBox": false }
          ]
        }
      }
    ],
  ],
};
