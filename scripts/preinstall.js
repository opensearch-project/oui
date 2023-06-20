/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const { rmSync, readdirSync } = require('fs');
const { join } = require('path');

const { INIT_CWD, PWD = process.cwd() } = process.env;

// Only run when installed as a dep
if (!INIT_CWD?.startsWith?.(PWD)) {
  /* These are deps and types which get installed when a production package is installed.
   * When this library is linked as a dep to another project, having all the deps could
   * confuse or conflict the project's compilers.
   *
   * When being installed as dep of another project in production, `node_modules` would
   * be empty.
   */
  const depsToKeep = [
    '@types',
    'csstype',
    'is-buffer',
    'is-plain-obj',
    'mdast-util-definitions',
    'mdast-util-to-hast',
    'mdurl',
    'react-focus-lock',
    'react-focus-on',
    'react-is',
    'react-remove-scroll',
    'react-remove-scroll-bar',
    'react-style-singleton',
    'rehype-react',
    'remark-parse',
    'remark-rehype',
    'unified',
    'unist-builder',
    'unist-util-generated',
    'unist-util-is',
    'unist-util-position',
    'unist-util-remove-position',
    'unist-util-stringify-position',
    'unist-util-visit',
    'unist-util-visit-parents',
    'use-callback-ref',
    'use-sidecar',
    'uuid',
    'vfile-message',
  ];

  for (const name of readdirSync('node_modules')) {
    if (!depsToKeep.includes(name)) rmSync(join('node_modules', name), { recursive: true, force: true });
  }

  const typesToKeep = [
    'chroma-js',
    'lodash',
    'mdast',
    'numeral',
    'prismjs',
    'prop-types',
    'react',
    'react-beautiful-dnd',
    'react-dom',
    'react-input-autosize',
    'react-virtualized-auto-sizer',
    'react-window',
    'refractor',
    'resize-observer-browser',
    'scheduler',
    'unist',
    'vfile-message',
  ];

  for (const name of readdirSync('node_modules/@types')) {
    if (!typesToKeep.includes(name)) rmSync(join('node_modules/@types', name), { recursive: true, force: true });
  }

  const toDeleteFromRoot = [
    '.DS_Store',
    '.cache-loader',
    '.eslintcache',
    '.git',
    '.idea',
    '.nvmrc',
    '.vscode',
    'docs',
    'generator-oui',
    'packages/eslint-plugin',
    'packages/react-datepicker',
    'reports',
    'src-docs',
    'test',
    'tmp',
    'tsconfig-builttypes.json',
    'tsconfig.json',
    'types',
    'wiki',
    'yarn-error.log',
    'yarn.lock',
  ];

  for (const name of toDeleteFromRoot) {
    rmSync(name, { recursive: true, force: true });
  }

  const scriptsToKeep = [
    'postinstall.js',
    'preinstall.js'
  ];

  for (const name of readdirSync('scripts')) {
    if (!scriptsToKeep.includes(name)) rmSync(join('scripts', name), { recursive: true, force: true });
  }

  const deleteNonSCSS = (loc) => {
    for (const entry of readdirSync(loc, { withFileTypes: true })) {
      if (entry.isDirectory()) deleteNonSCSS(join(loc, entry.name));
      else if (entry.isFile() && !entry.name.endsWith('.scss')) rmSync(join(loc, entry.name), { force: true });
    }
  };

  deleteNonSCSS('src');
}
