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
const { INIT_CWD, PWD = process.cwd() } = process.env;

// Only run when installed as a dep, duplicated `oui` theme files as `eui`
if (!INIT_CWD?.startsWith?.(PWD)) {
  // Clean up and recreate the folders
  fs.rmSync('src/themes/eui', { recursive: true, force: true });
  fs.rmSync('src/themes/eui-amsterdam', { recursive: true, force: true });

  const copyDirectory = (src, dest) => {
    fs.mkdirSync(dest, { recursive: true });

    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const srcItem = path.join(src, entry.name);
      const destItem = path.join(dest, entry.name);

      if (entry.isDirectory()) copyDirectory(srcItem, destItem);
      else fs.copyFileSync(srcItem, destItem);
    }
  };

  copyDirectory('src/themes/oui', 'src/themes/eui');
  copyDirectory('src/themes/oui-cascadia', 'src/themes/eui-amsterdam');
}
/* End of Aliases */
