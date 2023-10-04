const fs = require('fs');
const { join, dirname, parse } = require('path');
const { compileWithVariablesSync } = require('../../lib/compile-scss-with-variables');

const idKey = '!!variables-from-scss!!';
const keyLength = idKey.length;

const forbiddenKeyNames = [...Object.getOwnPropertyNames(Object.prototype), 'prototype'];

module.exports = (babel) => ({
  visitor: {
    ImportDeclaration(path, state) {
      if (path.node.source.value.startsWith(idKey)) {
        const deconstructedAssignments = [];
        const usedVariableNames = [];
        const assignments = [];
        for (const specifier of path.node.specifiers) {
          if (specifier.type === 'ImportDefaultSpecifier') {
            assignments.push(specifier.local.name);
          } else if (specifier.type === 'ImportSpecifier') {
            usedVariableNames.push(specifier.imported.name);
            deconstructedAssignments.push(specifier.imported.name === specifier.local.name ? specifier.local.name : `${specifier.imported.name}: ${specifier.local.name}`);
          }
        }

        const importTarget = join(dirname(state.file.opts.filename), path.node.source.value.substring(keyLength));
        const { variables } = compileWithVariablesSync(importTarget);

        // If no default specifier is used, reduce the variables to only those needed
        const importedVariables = assignments.length === 0 ? usedVariableNames.reduce((acc, name) => {
          if (!forbiddenKeyNames.includes(name)) acc[name] = variables[name];
          return acc;
        }, {}) : variables;

        if (deconstructedAssignments.length > 0) assignments.push(`{ ${deconstructedAssignments.join(', ')} }`);
        path.replaceWith(babel.template.statement.ast(`const ${assignments.join(', ')} = ${JSON.stringify(importedVariables)};`));
      }
    }
  }
});
