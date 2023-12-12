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

const findup = require('findup');
const resolve = require('resolve');
const fs = require('fs');
const path = require('path');
const dtsGenerator = require('dts-generator').default;

const baseDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(baseDir, 'src');

function hasParentIndex(pathToFile) {
  const isIndexFile =
    path.basename(pathToFile, path.extname(pathToFile)) === 'index';
  try {
    const fileDirectory = path.dirname(pathToFile);
    const parentIndex = findup.sync(
      // if this is an index file start looking in its parent directory
      isIndexFile ? path.resolve(fileDirectory, '..') : fileDirectory,
      'index.ts'
    );
    // ensure the found file is in the project
    return parentIndex.startsWith(baseDir);
  } catch (e) {
    return false;
  }
}

const generator = dtsGenerator({
  prefix: '@opensearch-project/oui',
  project: baseDir,
  out: 'oui.d.ts',
  exclude: [
    'node_modules/**/*.d.ts',
    '*/custom_typings/**/*.d.ts',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.testenv.ts',
    '**/*.testenv.tsx',
    'src/themes/charts/*', // A separate d.ts file is generated for the charts theme file
    'src/test/*', // A separate d.ts file is generated for test utils
    'src-docs/**/*', // Don't include src-docs
  ],
  resolveModuleId(params) {
    if (
      path.basename(params.currentModuleId) === 'index' &&
      /* OUI -> EUI Aliases */
      !params.currentModuleId.includes('eui_components') &&
      /* End of Aliases */
      !hasParentIndex(path.resolve(baseDir, params.currentModuleId))
    ) {
      // this module is exporting from an `index(.d)?.ts` file, declare its exports straight to @opensearch-project/oui module
      return '@opensearch-project/oui';
    } else {
      // otherwise export as the module's path relative to the @opensearch-project/oui namespace
      if (params.currentModuleId.endsWith('/index')) {
        return path.join(
          '@opensearch-project/oui',
          path.dirname(params.currentModuleId)
        );
      } else {
        return path.join('@opensearch-project/oui', params.currentModuleId);
      }
    }
  },
  resolveModuleImport(params) {
    // only intercept relative imports (don't modify node-modules references)
    const importFromBaseDir = path.resolve(
      baseDir,
      path.dirname(params.currentModuleId)
    );
    const isFromOuiSrc = importFromBaseDir.startsWith(srcDir);
    const isRelativeImport = isFromOuiSrc && params.importedModuleId[0] === '.';

    if (isRelativeImport) {
      // if importing from an `index` file (directly or targeting a directory with an index),
      // then if there is no parent index file this should import from @opensearch-project/oui
      const importPathTarget = resolve.sync(params.importedModuleId, {
        basedir: importFromBaseDir,
        extensions: ['.ts', '.tsx', '.d.ts'],
      });

      const isIndexFile = importPathTarget.endsWith('/index.ts');
      const isModuleIndex = isIndexFile && !hasParentIndex(importPathTarget);

      if (isModuleIndex) {
        // importing an `index` file, in `resolveModuleId` above we change those modules to '@opensearch-project/oui'
        return '@opensearch-project/oui';
      } else {
        // importing from a non-index TS source file, keep the import path but re-scope it to '@opensearch-project/oui' namespace
        return path.join(
          '@opensearch-project/oui',
          path.dirname(params.currentModuleId),
          params.importedModuleId
        );
      }
    } else {
      return params.importedModuleId;
    }
  },
});

// NOTE: once OUI is all converted to typescript this madness can be deleted forever
// 1. strip any `/// <reference` lines from the generated oui.d.ts
// 2. replace any import("src/...") declarations to import("@opensearch-project/oui/src/...")
// 3. replace any import("./...") declarations to import("@opensearch-project/oui/src/...)
// 4. generate & add OuiTokenObject
generator.then(() => {
  const defsFilePath = path.resolve(baseDir, 'oui.d.ts');

  fs.writeFileSync(
    defsFilePath,
    fs
      .readFileSync(defsFilePath)
      .toString()
      .replace(/\/\/\/\W+<reference.*/g, '') // 1.
      .replace(
        /import\("src\/(.*?)"\)/g,
        'import("@opensearch-project/oui/src/$1")'
      ) // 2.
      .replace(
        // start 3.
        // find any singular `declare module { ... }` block
        // {.*?^} matches anything until a } starts a new line (via `m` regex option, and `s` is dotall)
        //
        // aren't regex really bad for this? Yes.
        // However, @babel/preset-typescript doesn't understand some syntax generated in oui.d.ts
        // and the tooling around typescript's parsing & code generation is lacking and undocumented
        // so... because this works with the guarantee that the newline-brace combination matches a module...
        /declare module '(.*?)' {.*?^}/gms,
        (module, moduleName) => {
          // `moduleName` is the namespace for this ambient module
          return module.replace(
            // replace relative imports by attaching them to the module's namespace
            /import\("([.]{1,2}\/.*?)"\)/g,
            (importStatement, importPath) => {
              let target = path.join(path.dirname(moduleName), importPath);

              // if the target resolves to an orphaned index.ts file, remap to '@opensearch-project/oui'
              const filePath = target.replace(
                '@opensearch-project/oui',
                baseDir
              );
              const filePathTs = `${filePath}.ts`;
              const filePathTsx = `${filePath}.tsx`;
              const filePathResolvedToIndex = path.join(filePath, 'index.ts');
              if (
                // fs.existsSync(filePath) === false && // target file doesn't exist
                fs.existsSync(filePathTs) === false && // target file (.ts) doesn't exist
                fs.existsSync(filePathTsx) === false && // target file (.tsx) doesn't exist
                fs.existsSync(filePathResolvedToIndex) && // and it resolves to an index.ts
                hasParentIndex(filePathResolvedToIndex) === false // does not get exported at a higher level
              ) {
                target = '@opensearch-project/oui';
              }

              return `import ("${target}")`;
            }
          );
        }
      ) // end 3.
      .replace(/$/, `\n\n${buildOuiTokensObject()}`) // 4.
  );
  /* OUI -> EUI Aliases */
  fs.writeFileSync(defsFilePath, `\n\n${buildEuiTokensObject()}`, {
    flag: 'a',
    encoding: 'utf8',
  });
  /* End of Aliases */
});

/** For step 4 **/
// i18ntokens.json is generated as the first step in the build and can be relied upon here
function buildOuiTokensObject() {
  // reduce over the tokens list as a few of the tokens are used multiple times and must be
  // filtered down to a list
  const { i18ndefs } = require('../i18ntokens.json').reduce(
    ({ i18ndefs, tokens }, def) => {
      if (!tokens.has(def.token)) {
        tokens.add(def.token);
        i18ndefs.push(def);
      }
      return { i18ndefs, tokens };
    },
    { i18ndefs: [], tokens: new Set() }
  );
  return `
declare module '@opensearch-project/oui' {
  export type OuiTokensObject = {
    ${i18ndefs.map(({ token }) => `"${token}": any;`).join('\n  ')}
  }
}
  `;
}

/* OUI -> EUI Aliases */
function buildEuiTokensObject() {
  const { i18ndefs } = require('../i18ntokens.json').reduce(
    ({ i18ndefs, tokens }, def) => {
      if (!tokens.has(def.token)) {
        tokens.add(def.token);
        i18ndefs.push(def);
      }
      return { i18ndefs, tokens };
    },
    { i18ndefs: [], tokens: new Set() }
  );
  const o2eMapper = { o: 'e', O: 'E' };
  return `
declare module '@opensearch-project/oui' {
  export type EuiTokensObject = {
    ${i18ndefs
      .map(
        ({ token }) =>
          `"${token.replace(/(o)(?=ui)/gi, (m, m1) => o2eMapper[m1])}": any;`
      )
      .join('\n  ')}
  }
}
  `;
}
/* End of Aliases */
