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

const path = require('path');
const util = require('util');
const { writeFile, mkdir } = require('fs/promises');
const globModule = require('glob');

const chalk = require('chalk');
const postcss = require('postcss');

const { compileWithVariables } = require('./lib/compile-scss-with-variables');
const { deriveSassVariableTypes } = require('./lib/derive-sass-variable-types');

const postcssConfiguration = require('../postcss.config.js');

const glob = util.promisify(globModule);

const postcssConfigurationWithMinification = {
  ...postcssConfiguration,
  plugins: [
    ...postcssConfiguration.plugins,
    require('cssnano')({ preset: 'default' }),
  ],
};

async function compileScssFiles(
  sourcePattern,
  destinationDirectory,
  packageName
) {
  try {
    await mkdir(destinationDirectory);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }

  const inputFilenames = await glob(sourcePattern, undefined);

  await Promise.all(
    inputFilenames.map(async (inputFilename) => {
      console.log(chalk`{cyan …} Compiling {gray ${inputFilename}}`);

      try {
        const { name } = path.parse(inputFilename);
        const outputFilenames = await compileScssFile(
          inputFilename,
          path.join(destinationDirectory, `oui_${name}.css`),
          path.join(destinationDirectory, `oui_${name}.json`),
          path.join(destinationDirectory, `oui_${name}.json.d.ts`),
          packageName
        );

        console.log(
          chalk`{green ✔} Finished compiling {gray ${inputFilename}} to ${outputFilenames
            .map((filename) => chalk.gray(filename))
            .join(', ')}`
        );
      } catch (error) {
        console.log(
          chalk`{red ✗} Failed to compile {gray ${inputFilename}} with ${error.stack}`
        );

        process.exitCode = 1;
        return;
      }

      /* OUI -> EUI Aliases */
      try {
        const { name } = path.parse(inputFilename);
        const outputFilenames = await compileScssFile(
          inputFilename,
          path.join(destinationDirectory, `eui_${name}.css`),
          path.join(destinationDirectory, `eui_${name}.json`),
          path.join(destinationDirectory, `eui_${name}.json.d.ts`),
          packageName,
          true
        );
        console.log(
          chalk`{green ✔} Finished compiling {gray ${inputFilename}} to ${outputFilenames
            .map((filename) => chalk.gray(filename))
            .join(', ')}`
        );
      } catch (error) {
        console.log(
          chalk`{red ✗} Failed to compile {gray ${inputFilename}} with ${error.stack}`
        );

        process.exitCode = 1;
      }
      /* End of Aliases */
    })
  );
}

async function compileScssFile(
  inputFilename,
  outputCssFilename,
  outputVarsFilename,
  outputVarTypesFilename,
  packageName,
  /* OUI -> EUI Aliases */
  renameToEUI = false
  /* End of Aliases */
) {
  const outputCssMinifiedFilename = outputCssFilename.replace(
    /\.css$/,
    '.min.css'
  );

  const {
    css: renderedCss,
    variables: extractedVars,
  } = await compileWithVariables(path.resolve(inputFilename));

  /* OUI -> EUI Aliases: Modified */
  // const extractedVarTypes = await deriveSassVariableTypes(
  const extractedVarTypes_ = await deriveSassVariableTypes(
    /* End of Aliases */
    extractedVars,
    `${packageName}/${outputVarsFilename}`,
    outputVarTypesFilename
  );

  /* OUI -> EUI Aliases */
  const declarationMatcher = /^declare\s+module\s+(['"]@opensearch-project\/oui.*?['"])\s*\{/gms;
  let match;
  const declarations = [];

  while ((match = declarationMatcher.exec(extractedVarTypes_)) !== null) {
    declarations.push(
      `declare module ${match[1].replace(
        '@opensearch-project/oui',
        '@elastic/eui'
      )} {\n` +
        `  import _ from ${match[1]};\n` +
        '  export default _;\n' +
        '}'
    );
  }
  const extractedVarTypes = `${extractedVarTypes_}\n${declarations.join('\n')}`;
  /* End of Aliases */

  const { css: postprocessedCss } = await postcss(postcssConfiguration).process(
    /* OUI -> EUI Aliases: Modified */
    //renderedCss,
    renameToEUI
      ? renderedCss.toString().replace(/([. '"-])oui/g, '$1eui')
      : renderedCss,
    /* End of Aliases */
    {
      from: outputCssFilename,
      to: outputCssFilename,
    }
  );

  const { css: postprocessedMinifiedCss } = await postcss(
    postcssConfigurationWithMinification
  ).process(
    /* OUI -> EUI Aliases: Modified */
    //renderedCss,
    renameToEUI
      ? renderedCss.toString().replace(/([. '"-])oui/g, '$1eui')
      : renderedCss,
    /* End of Aliases */
    {
      from: outputCssFilename,
      to: outputCssMinifiedFilename,
    }
  );

  await Promise.all([
    writeFile(outputCssFilename, postprocessedCss),
    writeFile(outputCssMinifiedFilename, postprocessedMinifiedCss),
    writeFile(outputVarsFilename, JSON.stringify(extractedVars, undefined, 2)),
    writeFile(outputVarTypesFilename, extractedVarTypes),
  ]);

  return [
    outputCssFilename,
    outputCssMinifiedFilename,
    outputVarsFilename,
    outputVarTypesFilename,
  ];
}

if (require.main === module) {
  const [nodeBin, scriptName, ouiPackageName] = process.argv;

  if (process.argv.length < 3) {
    console.log(chalk`{bold Usage:} ${nodeBin} ${scriptName} oui-package-name`);
    process.exit(1);
  }

  compileScssFiles(
    path.join('src', 'theme_*.scss'),
    'dist',
    ouiPackageName
  ).catch((err) => {
    console.error(err);
    process.exit(2);
  });
}
