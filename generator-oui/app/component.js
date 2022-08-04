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

const componentGenerator = require.resolve('../component/index.js');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      message: 'What do you want to create?',
      name: 'fileType',
      type: 'list',
      choices: [{
        name: 'Stateless function',
        value: 'function',
      }, {
        name: 'Component class',
        value: 'component',
      }],
    }]).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    this.composeWith(componentGenerator, {
      fileType: this.answers.fileType,
    });
  }
}
