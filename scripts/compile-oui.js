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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


const { execSync } = require('child_process');
const chalk = require('chalk');
const shell = require('shelljs');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const dtsGenerator = require('dts-generator').default;

/* OUI -> EUI Aliases */
function euiBuildTimeAliasSetup() {
  console.log('Setting up build-time EUI aliases');
  // Clean up before starting
  shell.rm('-rf', 'src/eui_components');

  // Create a copy and get rid of unnecessary content
  shell.cp('-fR', 'src/components', 'src/eui_components');
  shell.rm('-rf', 'src/eui_components/**/__snapshots__');
  shell.rm('-rf', 'src/eui_components/**/*.scss');
  shell.rm('-rf', 'src/eui_components/**/*.test.*');
  shell.rm('-rf', 'src/eui_components/**/*.d.ts');

  // Remove any existing `export * from './eui_components';` and add just one
  fs.writeFileSync('src/index.js',
    fs.readFileSync('src/index.js', 'utf8')
      .replace(/[\r\n]export\s+\*\s+from\s+'\.\/eui_components';/g, ''),
    'utf8'
  );
  fs.writeFileSync('src/index.js', `\nexport * from './eui_components';`, { flag: 'a' });

  // Replace specific instances of oui with eui
  shell.find('src/eui_components/**/*.*').forEach(file => {
    shell.sed('-i', /oui/g, 'eui', file);
    shell.sed('-i', /OUI/g, 'EUI', file);
    shell.sed('-i', /Oui/g, 'Eui', file);
    shell.sed('-i', /\/eui/g, '/oui', file);
  });

  // Rename files to *eui*
  shell.find('src/eui_components/**/*Oui*.*').forEach(file => {
    shell.mv('-f', file, file.replace('Oui', 'Eui'));
  });

  // Prevent exporting anything not *eui* from the root and the top-levels
  shell.find([
    'src/eui_components/*/index.ts',
    'src/eui_components/observer/*/index.ts', // doesn't have top-level exporter
    'src/eui_components/date_picker/super_date_picker/index.ts',
    'src/eui_components/index.js'
  ]).forEach(file => {
    shell.sed('-i', /\{\s+/g, '{\n  ', file);
    shell.sed('-i', /,?\s+}/g, ',\n}', file);
    shell.sed('-i', /,\s+/g, ',\n', file);
    fs.writeFileSync(
      file,
      fs.readFileSync(file, 'utf8')
        .replace(/\/\*.+?\*\//sg, '')
        .replace(/^.*(?<!eui\w+),\s*$/mig, ''),
      'utf8'
    );
  });

  // Replace all imports for the exported props that were removed above
  const importableMatcher = /(import\s+\{(?:[^{]*\s)?)(IconType|IconSize|IconColor|PopoverAnchorPosition|useResizeObserver|useMutationObserver|PanelPaddingSize|FocusTarget|useInnerText|ToolTipPositions|Query|ButtonColor)[,\s\n]([^}]*}\s*from\s+['"]([^'"]+)['"])/gs;
  shell.ls('src/eui_components/**/*.*').forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const remapMap = new Map();
    let changed;
    do {
      changed = false;
      content = content.replace(importableMatcher, (m, m1, m2, m3, m4) => {
        const importFrom = path.relative(path.dirname(file), path.join(file, '..', m4).replace('eui_components', 'components'));
        if (!remapMap.has(importFrom)) remapMap.set(importFrom, []);
        remapMap.get(importFrom).push(m2);
        changed = true;
        return m1 + m3;
      });
    } while (changed);

    if (remapMap.size) {
      for (const [key, value] of remapMap.entries()) {
        content = `import { ${value.join(', ')} } from '${key}';\n` + content;
      }

      fs.writeFileSync(file, content, 'utf8');
    }
  });

  // date_picker uses a type def
  shell.sed('-i', `from './react-datepicker'`, `from '../../components/date_picker/react-datepicker'`, 'src/eui_components/date_picker/date_picker.tsx');
}

function euiBuildTimeAliasTearDown() {
  console.log('Tearing build-time EUI aliases');
  shell.rm('-rf', 'src/eui_components');

  // Remove any added `export * from './eui_components';`
  fs.writeFileSync('src/index.js',
    fs.readFileSync('src/index.js', 'utf8')
      .replace(/[\r\n]export\s+\*\s+from\s+'\.\/eui_components';/g, ''),
    'utf8'
  );
}
/* End of Aliases */

function compileLib() {
  shell.mkdir(
    '-p',
    'lib/components/icon/assets/tokens',
    'lib/services',
    'lib/test'
  );

  console.log('Compiling src/ to es/, lib/, and test-env/');

  // Run all code (com|trans)pilation through babel (ESNext JS & TypeScript)

  execSync(
    'babel --quiet --out-dir=es --extensions .js,.ts,.tsx --ignore "**/webpack.config.js,**/*.test.js,**/*.test.ts,**/*.test.tsx,**/*.d.ts,**/*.testenv.js,**/*.testenv.tsx,**/*.testenv.ts" src',
    {
      env: {
        ...process.env,
        BABEL_MODULES: false,
        NO_COREJS_POLYFILL: true,
      },
    }
  );

  execSync(
    'babel --quiet --out-dir=lib --extensions .js,.ts,.tsx --ignore "**/webpack.config.js,**/*.test.js,**/*.test.ts,**/*.test.tsx,**/*.d.ts,**/*.testenv.js,**/*.testenv.tsx,**/*.testenv.ts" src',
    {
      env: {
        ...process.env,
        NO_COREJS_POLYFILL: true,
      },
    }
  );

  execSync(
    'babel --quiet --out-dir=test-env --extensions .js,.ts,.tsx --config-file="./.babelrc-test-env.js" --ignore "**/webpack.config.js,**/*.test.js,**/*.test.ts,**/*.test.tsx,**/*.d.ts" src',
    {
      env: {
        ...process.env,
        NO_COREJS_POLYFILL: true,
      },
    }
  );
  glob('./test-env/**/*.testenv.js', undefined, (error, files) => {
    files.forEach(file => {
      const dir = path.dirname(file);
      const fileName = path.basename(file, '.js');
      const targetName = fileName.replace('.testenv', '');
      fs.renameSync(file, path.join(dir, `${targetName}.js`));
    });
  });

  console.log(chalk.green('✔ Finished compiling src/'));

  // Use `tsc` to emit typescript declaration files for .ts files
  console.log('Generating typescript definitions file');
  execSync(`node ${path.resolve(__dirname, 'dtsgenerator.js')}`, {
    stdio: 'inherit',
  });
  // validate the generated oui.d.ts doesn't contain errors
  execSync('tsc --noEmit -p tsconfig-builttypes.json', { stdio: 'inherit' });
  console.log(chalk.green('✔ Finished generating definitions'));

  // Also copy over SVGs. Babel has a --copy-files option but that brings over
  // all kinds of things we don't want into the lib folder.
  shell.mkdir('-p', 'lib/components/icon/assets');

  glob('./src/components/**/*.svg', undefined, (error, files) => {
    files.forEach(file => {
      const splitPath = file.split('/');
      const basePath = splitPath.slice(2, splitPath.length).join('/');
      shell.cp('-f', `${file}`, `lib/${basePath}`);
    });

    console.log(chalk.green('✔ Finished copying SVGs'));
  });
}

function compileBundle() {
  shell.mkdir('-p', 'dist');

  console.log('Building bundle...');
  execSync('webpack --config=src/webpack.config.js', {
    stdio: 'inherit',
    env: {
      ...process.env,
      BABEL_MODULES: false,
    },
  });

  console.log('Building minified bundle...');
  execSync('NODE_ENV=production NODE_OPTIONS=--max-old-space-size=4096 webpack --config=src/webpack.config.js', {
    stdio: 'inherit',
    env: {
      ...process.env,
      BABEL_MODULES: false,
    },
  });

  console.log('Building test utils .d.ts files...');
  dtsGenerator({
    prefix: '',
    out: 'lib/test/index.d.ts',
    baseDir: path.resolve(__dirname, '..', 'src/test/'),
    files: ['index.ts'],
    resolveModuleId({ currentModuleId }) {
      return `@opensearch-project/oui/lib/test${currentModuleId !== 'index' ? `/${currentModuleId}` : ''}`;
    },
    resolveModuleImport({ currentModuleId, importedModuleId }) {
      if (currentModuleId === 'index') {
        return `@opensearch-project/oui/lib/test/${importedModuleId.replace('./', '')}`;
      }
      return null;
    }
  });
  dtsGenerator({
    prefix: '',
    out: 'es/test/index.d.ts',
    baseDir: path.resolve(__dirname, '..', 'src/test/'),
    files: ['index.ts'],
    resolveModuleId({ currentModuleId }) {
      return `@opensearch-project/oui/es/test${currentModuleId !== 'index' ? `/${currentModuleId}` : ''}`;
    },
    resolveModuleImport({ currentModuleId, importedModuleId }) {
      if (currentModuleId === 'index') {
        return `@opensearch-project/oui/es/test/${importedModuleId.replace('./', '')}`;
      }
      return null;
    }
  });
  console.log(chalk.green('✔ Finished test utils files'));

  console.log('Building chart theme module...');
  execSync(
    'webpack src/themes/charts/themes.ts -o dist/oui_charts_theme.js --output-library-target="commonjs" --config=src/webpack.config.js',
    {
      stdio: 'inherit',
    }
  );
  dtsGenerator({
    prefix: '',
    out: 'dist/oui_charts_theme.d.ts',
    baseDir: path.resolve(__dirname, '..', 'src/themes/charts/'),
    files: ['themes.ts'],
    resolveModuleId() {
      return '@opensearch-project/oui/dist/oui_charts_theme';
    },
    resolveModuleImport(params) {
      if (params.importedModuleId === '../../components/common') {
        return '@opensearch-project/oui/src/components/common';
      }
      return null;
    }
  });

  /* OUI -> EUI Aliases */
  execSync(
    'webpack src/themes/charts/themes.ts -o dist/eui_charts_theme.js --output-library-target="commonjs" --config=src/webpack.config.js',
    {
      stdio: 'inherit',
    }
  );
  dtsGenerator({
    prefix: '',
    out: 'dist/eui_charts_theme.d.ts',
    baseDir: path.resolve(__dirname, '..', 'src/themes/charts/'),
    files: ['themes.ts'],
    resolveModuleId() {
      return '@opensearch-project/oui/dist/eui_charts_theme';
    },
    resolveModuleImport(params) {
      if (params.importedModuleId === '../../components/common') {
        return '@opensearch-project/oui/src/components/common';
      }
      return null;
    }
  });
  /* End of Aliases */

  console.log(chalk.green('✔ Finished chart theme module'));
}

/* OUI -> EUI Aliases */
// Make sure we tear down if an error occurs
process.on('uncaughtException', err => {
  euiBuildTimeAliasTearDown();

  console.error(err);
  process.exit(1);
});

euiBuildTimeAliasSetup();
/* End of Aliases */
compileLib();
/* OUI -> EUI Aliases */
euiBuildTimeAliasTearDown();
/* End of Aliases */
compileBundle();
