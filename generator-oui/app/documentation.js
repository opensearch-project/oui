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

const Generator = require('yeoman-generator');

const documentationGenerator = require.resolve('../documentation/index.js');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      message: 'What do you want to do?',
      name: 'fileType',
      type: 'list',
      choices: [{
        name: 'Create a new component documentation page',
        value: 'documentation',
      }, {
        name: 'Add an example to an existing component documentation page',
        value: 'demo',
      }],
    }]).then(answers => {
      this.config = answers;
    });
  }

  writing() {
    this.composeWith(documentationGenerator, {
      fileType: this.config.fileType,
    });
  }
}
