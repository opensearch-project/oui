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
const path = require('path');
const dtsGenerator = require('dts-generator').default;

function compileChartsBundle() {
  console.log('Building chart theme module...');
  execSync(
    'webpack src/themes/charts/themes.ts -o dist/oui_charts_theme.js --config=src/webpack.config.js',
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
    },
  });

  /* OUI -> EUI Aliases */
  execSync(
    'webpack src/themes/charts/themes.ts -o dist/eui_charts_theme.js --config=src/webpack.config.js',
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
      return '@elastic/eui/dist/eui_charts_theme';
    },
    resolveModuleImport(params) {
      if (params.importedModuleId === '../../components/common') {
        return '@elastic/eui/src/components/common';
      }
      return null;
    },
  });
  /* End of Aliases */

  console.log(chalk.green('✔ Finished chart theme module'));
}

compileChartsBundle();
