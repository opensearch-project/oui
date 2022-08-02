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

const fs = require('fs');
const path = require('path');

// the jenkins CI job breaks when deleting the old workspace if it encounters the `这` file
const targetFilePath = path.join(__dirname, '..', 'node_modules', 'nodegit', 'vendor', 'libgit2', 'tests', 'resources', 'status', '这');
if (fs.existsSync(targetFilePath)) {
  console.log(`removing ${targetFilePath}`);
  fs.unlinkSync(targetFilePath);
}

/* OUI -> EUI Aliases */
const shell = require('shelljs');
// Clean up and recreate the folders
shell.rm('-rf', 'src/themes/eui');
shell.rm('-rf', 'src/themes/eui-amsterdam');
shell.mkdir('-p', 'src/themes/eui');
shell.mkdir('-p', 'src/themes/eui-amsterdam');

shell.cp('-fR', 'src/themes/oui/oui_colors_dark.scss', 'src/themes/eui/eui_colors_dark.scss');
shell.cp('-fR', 'src/themes/oui/oui_colors_light.scss', 'src/themes/eui/eui_colors_light.scss');
shell.cp('-fR', 'src/themes/oui/oui_globals.scss', 'src/themes/eui/eui_globals.scss');

shell.cp('-fR', 'src/themes/oui-cascadia/global_styling', 'src/themes/eui-amsterdam/global_styling');
shell.cp('-fR', 'src/themes/oui-cascadia/overrides', 'src/themes/eui-amsterdam/overrides');
shell.cp('-fR', 'src/themes/oui-cascadia/oui_cascadia_colors_dark.scss', 'src/themes/eui-amsterdam/eui_amsterdam_colors_dark.scss');
shell.cp('-fR', 'src/themes/oui-cascadia/oui_cascadia_colors_light.scss', 'src/themes/eui-amsterdam/eui_amsterdam_colors_light.scss');
shell.cp('-fR', 'src/themes/oui-cascadia/oui_cascadia_globals.scss', 'src/themes/eui-amsterdam/eui_amsterdam_globals.scss');
/* End of Aliases */
