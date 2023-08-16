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
const sass = require('sass-embedded');

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
  const variableNames = extractScssVariableNames(source);
  const variableClasses = variableNames
    .map((name) => `.${name}{value:$${name}}`)
    .join('\n');

  const sourceWithClasses = source + variableClasses;
  const { css } = await sass.compileStringAsync(sourceWithClasses, {
    loadPaths: [loader.context],
    style: 'compressed',
  });

  const variableValues = extractVariableValues(css);

  return `module.exports=${JSON.stringify(variableValues)};`;
};

/**
 * @param {string} source
 * @return {string[]}
 */
const extractScssVariableNames = (source) => {
  const names = [];
  const regex = /^\$([\w\-]+):[^;\n]*;$/gm;

  let m;
  while ((m = regex.exec(source)) !== null) {
    const variableName = m[1];
    names.push(variableName);
  }

  return names;
};

/**
 * @param {string} css
 * @return {Record<string, string>}
 */
const extractVariableValues = (css) => {
  const values = {};
  const regex = /\.(\w+){value:([^}]+)}/g;

  let m;
  while ((m = regex.exec(css)) !== null) {
    const variableName = m[1];

    values[variableName] = m[2];
  }

  return values;
};

module.exports = loader;
