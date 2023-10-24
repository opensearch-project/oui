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

const { execSync } = require('child_process');

// find names of staged files
const stagedFiles = execSync(
  'git diff --cached --name-only --diff-filter=ACDMR'
)
  .toString()
  .split(/[\r\n]+/g);

if (stagedFiles.length === 1 && stagedFiles[0] === '') {
  process.exit(0);
}

// execute tests related to the staged files
execSync(`yarn test-unit --findRelatedTests ${stagedFiles.join(' ')}`, {
  stdio: 'inherit',
});
