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

const rimraf = require('rimraf');

rimraf.sync('dist');
rimraf.sync('lib');
rimraf.sync('es');
rimraf.sync('test-env');
rimraf.sync('types');
