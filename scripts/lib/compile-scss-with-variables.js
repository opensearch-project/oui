const sass = require('sass-embedded');
const { pathToFileURL } = require('url');
const path = require('path');

/* The markers are chosen as symbols that would never be used as variable names under normal
 * circumstances. They also get wrapped in "--" to reduce the chances of collision with an actual variable.
 * The markers could have been dynamically generated after inspecting all of the variables but it is not
 * worth the performance penalty.
 *
 * Note: The `varListMarker` has to start with a colon or period to avoid Sass errors.
 */
const varListMarker = ':֍෴֍߷';
const arrayMarker = '෴';
const objectMarker = '߷';
const forbiddenKeyNames = [...Object.getOwnPropertyNames(Object.prototype), 'prototype'];

/* This loads the entry file as a module to be able to employ sass:meta for extracting
 * the local variables to the module which are in fact our global variables. It then
 * serializes them into CSS variables; if not formatted as CSS variables, there is a risk
 * of Sass errors.
 * The result of the compilation would be made of the actual compiled CSS followed by the
 * injected variables in the form of:
 * :֍෴֍߷ { // <-- start of the injected portion is marked by `varListMarker`
 *   --name: value;
 *   --name--෴--0: value1;  // <-- arrays are identified by `arrayMarker`
 *   --name--෴--1: value2;
 *   --name--߷--key: value; // <-- objects are identified by `objectMarker`
 * }
 */
const compileTemplate = `
@use "sass:map";
@use "sass:meta";
@use "sass:math";
@use "sass:list";

@use "#MODULE_NAME#";

@function to-vars($key, $value) {
  $result: ();
  $type: meta.type-of($value);

  @if $type == 'list' {
    $len: length($value);
    @for $idx from 1 through $len {
      // indexes start at 1 in Sass and we need to deduct 1 to make them zero-indexed.
      $result: map.merge($result, to-vars(#{$key + '--${arrayMarker}--' + calc($idx - 1)}, list.nth($value, $idx)));
    }
  } @else if $type == 'map' {
    @each $k, $v in $value {
      $result: map.merge($result, to-vars(#{$key + '--${objectMarker}--' + $k}, $v));
    }
  } @else {
    $result: map.set($result, $key, $value);
  }

  @return $result;
}

${varListMarker} {
  @each $key, $value in meta.module-variables("#MODULE_NAME#") {
    @each $k, $v in to-vars($key, $value) {
      --#{$k}: #{$v};
    }
  }
}`;

/* `renderedVariables` is a large string of CSS variables, each on a line of their own. The extraction
 * is done by picking each variable's name and value, and translating each name to an object path for
 * setting the value.
 *
 * ToDo: For backward compatibility, arrays are flattened into strings which makes their consumption
 *  challenging. Remove all of the "bwc" logic for OUI 2.
 */
const extractVars = renderedVariables => {
  if (!renderedVariables) return;

  const result = {};
  // For bwc, arrays are flattened into a single string
  const foundArrays = [];
  // For bwc, arrays that point to variable names are comma-seperated and others are space-seperated
  const knownKeys = new Set();

  // originalKey is only used for displaying errors
  const _set = (o, path, value, originalKey) => {
    // To improve performance, since this is a private method, it is not validating `path`
    const [key, type, ...rest] = path;
    if (forbiddenKeyNames.includes(key)) return;
    if (rest.length === 0) {
      if (type) {
        throw new Error(`Unexpected type ${type} for ${key} was found on ${originalKey}`);
      }
      // For bwc, 0px -> 0
      o[key] = isFinite(value) ? parseFloat(value) : (value === '0px' ? 0 : value);
    } else {
      switch (type) {
        case arrayMarker:
          if (key in o) {
            if (!Array.isArray(o[key]))
              throw new Error(`${key} of ${originalKey} was found to be ${Object.prototype.toString.call(o[key])}`);
          } else {
            o[key] = [];
            // Inserting to the beginning to make sure the inner references appear before the outer ones.
            foundArrays.unshift({ node: o, key });
          }
          _set(o[key], rest, value);
          break;

        case objectMarker:
          if (key in o) {
            if (Object.prototype.toString.call(o[key]) !== '[object Object]')
              throw new Error(`${key} of ${originalKey} was found to be ${Object.prototype.toString.call(o[key])}`);
          } else {
            o[key] = {};
            knownKeys.add(key);
          }
          _set(o[key], rest, value);
          break;

        default:
          throw new Error(`Unknown type [${type}] in ${originalKey}`);
      }
    }
  };

  for (const varLine of renderedVariables.split(/[\r\n]+/)) {
    const [, key, value] = varLine.match(/^\s*--([^:]+):\s*(.*);$/) || [];
    if (key) _set(result, key.split('--'), value, key);
  }

  // For bwc, arrays are flattened into a single string. The inner references appear before the outer ones.
  for (const { node, key } of foundArrays) {
    // For bwc, arrays that point to variable names are comma-seperated and others are space-seperated
    if (knownKeys.has(node[key][0])) {
      node[key] = node[key].map(value => `'${value}'`).join(', ');
    } else {
      node[key] = node[key].join(' ');
    }
  }

  // For bwc, hyphens in the names of root variables are converted to underscores
  for (const [key, value] of Object.entries(result)) {
    if (key.indexOf('-') === -1) continue;
    const snakeCaseKeyName = key.replace(/-/g, '_');
    result[snakeCaseKeyName] = value;
    delete result[key];
  }

  return result;
};

const parseResult = compileResult => {
  const [renderedCss, renderedVariables] = compileResult.css?.split(varListMarker) || [];
  const extractedVars = extractVars(renderedVariables);

  return {
    css: renderedCss || '',
    variables: extractedVars || {},
  };
};

const parseOptions = file => {
  const { name, dir } = path.parse(file);
  // Adding the trailing path separator to indicate that the destination is a directory
  const rootURL = pathToFileURL(dir + path.sep);
  return {
    // Sass uses the filename, after stripping starting underscores, as the module name
    moduleName: name.replace(/\.scss$/, '').replace(/^_/, '').replace(/["';]/g, ''),
    compileOptions: {
      importer: {
        findFileUrl: (url) => new URL(url + '.scss', rootURL)
      }
    }
  };
};

module.exports = {
  compileWithVariables: async (file) => {
    const { moduleName, compileOptions } = parseOptions(file);
    return parseResult(await sass.compileStringAsync(compileTemplate.replace(/#MODULE_NAME#/g, moduleName), compileOptions));
  },

  compileWithVariablesSync: (file) => {
    const { moduleName, compileOptions } = parseOptions(file);

    return parseResult(sass.compileString(compileTemplate.replace(/#MODULE_NAME#/g, moduleName), compileOptions));
  }
};
