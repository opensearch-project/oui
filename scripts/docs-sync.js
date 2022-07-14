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

execSync('npm run build');
execSync('npm run build-docs');
execSync('git add docs');
execSync('git commit -am "Updated documentation." || echo "No documentation changes."');
execSync('git push upstream');
