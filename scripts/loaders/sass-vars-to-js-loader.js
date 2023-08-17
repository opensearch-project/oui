/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * This loader takes a Sass file and turns its variables into JavaScript variables.
 * The high level is that it uses Regex to extract variable names from source code,
 * generates a class for each variable that has a declaration equal to the variable,
 * runs the Sass compiler on the generated code, and extracts the compiled variable
 * values from the compiled code.
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sassExtract = require('sass-extract-dart');

/**
 * @param {string} source
 * @param app
 * @param meta
 * @return {string}
 */
function loader(source, app, meta) {
  const callback = this.async();

  generateJsFromScss(this, source)
    .then((newSource) => callback(null, newSource, app, meta))
    .catch((err) => callback(err));
}

/**
 * @param {require('webpack').loader.LoaderContext} loader
 * @param {string} source
 * @returns {Promise<string>}
 */
const generateJsFromScss = async (loader, source) => {
  const variableValues = sassExtract.extractVariablesFromString(source, {
    path: loader.context,
    url: loader.resourcePath,
  });

  return `module.exports=${JSON.stringify(variableValues)};`;
};

module.exports = loader;
